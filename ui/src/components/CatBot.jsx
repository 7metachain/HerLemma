import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatWithAssistant } from '../utils/ai'

export default function CatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '嗨～我是你的数学小狐狸 🦊\n有问题随时问我，也可以拍照上传！' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingImage, setPendingImage] = useState(null)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendWithImage = useCallback(async (text, imageDataUrl) => {
    if ((!text.trim() && !imageDataUrl) || loading) return
    const content = []
    if (imageDataUrl) content.push({ type: 'image_url', image_url: { url: imageDataUrl } })
    content.push({ type: 'text', text: text.trim() || '请帮我看看这道题' })
    const userMsg = { role: 'user', content }
    const displayMsg = { role: 'user', content: text.trim() || '📷 [上传了图片]', image: imageDataUrl }
    setMessages(prev => [...prev, displayMsg])
    setInput('')
    setPendingImage(null)
    setLoading(true)
    try {
      const history = [...messages.slice(-4).map(m => {
        if (m.image) return { role: m.role, content: [{ type: 'image_url', image_url: { url: m.image } }, { type: 'text', text: m.content }] }
        return { role: m.role, content: m.content }
      }), userMsg]
      const reply = await chatWithAssistant(history)
      setMessages(prev => [...prev, { role: 'assistant', content: reply || '让我再想想～' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '网络问题，稍后再试～' }])
    } finally { setLoading(false) }
  }, [messages, loading])

  return (
    <>
      {/* 桌宠小猫按钮 */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-2xl"
        style={{ background: 'linear-gradient(135deg, #ff6b6b, #f9ca24)', boxShadow: '0 4px 24px rgba(255,107,107,0.4)' }}
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {open ? '✕' : '🦊'}
      </motion.button>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[500px] flex flex-col glass rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/[0.08] bg-gradient-to-r from-[#ff6b6b]/10 to-[#f9ca24]/10">
              <div className="flex items-center gap-2">
                <span className="text-lg">🦊</span>
                <div>
                  <p className="text-sm font-semibold text-white">数学小狐狸</p>
                  <p className="text-[10px] text-white/30">随时提问，拍照也行</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5" style={{ maxHeight: 320 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-coral-500/30 to-violet-500/20 text-white/90 rounded-br-sm'
                      : 'bg-white/[0.07] text-white/75 rounded-bl-sm'
                  }`}>
                    {msg.image && <img src={msg.image} alt="" className="max-w-full max-h-24 rounded-lg mb-1.5" />}
                    <p className="whitespace-pre-wrap text-[13px]">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.07] rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <motion.div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.5, delay: i * 0.12, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-2.5 border-t border-white/[0.08] space-y-1.5">
              {pendingImage && (
                <div className="relative inline-block">
                  <img src={pendingImage} alt="" className="h-12 rounded-lg border border-white/10" />
                  <button onClick={() => setPendingImage(null)} className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black/70 text-white text-[9px] flex items-center justify-center">✕</button>
                </div>
              )}
              <div className="flex gap-1.5">
                <label className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/[0.04] cursor-pointer hover:bg-white/[0.08] transition-colors text-sm">
                  📷
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = ev => setPendingImage(ev.target.result)
                    reader.readAsDataURL(file)
                    e.target.value = ''
                  }} />
                </label>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendWithImage(input, pendingImage))}
                  onPaste={e => {
                    const items = e.clipboardData?.items
                    if (!items) return
                    for (const item of items) {
                      if (item.type.startsWith('image/')) {
                        e.preventDefault()
                        const file = item.getAsFile()
                        const reader = new FileReader()
                        reader.onload = ev => setPendingImage(ev.target.result)
                        reader.readAsDataURL(file)
                        break
                      }
                    }
                  }}
                  placeholder={pendingImage ? '描述图中问题…' : '问个问题…'}
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg px-2.5 py-1.5 text-sm text-white/90 placeholder:text-white/25 focus:outline-none focus:border-violet-400/40"
                />
                <motion.button
                  onClick={() => sendWithImage(input, pendingImage)}
                  disabled={loading || (!input.trim() && !pendingImage)}
                  className="shrink-0 rounded-lg bg-gradient-to-r from-coral-500/80 to-violet-500/80 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                  whileTap={{ scale: 0.95 }}
                >
                  发送
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
