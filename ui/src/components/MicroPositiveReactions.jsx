import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAvaxToast } from './AvaxToast'

/** 小额 + 免费积极反馈，贴合 Avalanche 高频、低 gas 激励 */
export const MICRO_AMOUNTS = { flower: 0.001, clap: 0.005, star: 0.01 }

const btnBase =
  'inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed'

export function MicroPositiveReactions({
  authorName = '学姐',
  compact = false,
  className = '',
}) {
  const toast = useAvaxToast()
  const [done, setDone] = useState({ flower: false, clap: false, star: false, note: false })

  function mark(key) {
    setDone((d) => ({ ...d, [key]: true }))
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {!compact && (
        <span className="w-full text-[10px] uppercase tracking-wider text-white/35">还想夸夸她 · 小额也上链</span>
      )}
      <motion.button
        type="button"
        disabled={done.flower}
        className={`${btnBase} border-pink-400/20 bg-pink-500/10 text-pink-200/90 hover:bg-pink-500/20`}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          mark('flower')
          toast.pay(MICRO_AMOUNTS.flower, `送小花 · ${authorName}`)
        }}
      >
        💐 {MICRO_AMOUNTS.flower}
      </motion.button>
      <motion.button
        type="button"
        disabled={done.clap}
        className={`${btnBase} border-amber-400/20 bg-amber-500/10 text-amber-200/90 hover:bg-amber-500/20`}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          mark('clap')
          toast.pay(MICRO_AMOUNTS.clap, `鼓掌 · ${authorName}`)
        }}
      >
        👏 {MICRO_AMOUNTS.clap}
      </motion.button>
      <motion.button
        type="button"
        disabled={done.star}
        className={`${btnBase} border-[#f9ca24]/25 bg-[#f9ca24]/10 text-[#f9ca24]/90 hover:bg-[#f9ca24]/20`}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          mark('star')
          toast.pay(MICRO_AMOUNTS.star, `超赞 · ${authorName}`)
        }}
      >
        ⭐ {MICRO_AMOUNTS.star}
      </motion.button>
      <motion.button
        type="button"
        disabled={done.note}
        className={`${btnBase} border-[#a29bfe]/25 bg-[#a29bfe]/10 text-[#d4c4ff]/95 hover:bg-[#a29bfe]/20`}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          mark('note')
          toast.record(`好感笔记 · ${authorName}（零费记录，可批量上链）`)
        }}
      >
        📝 记一笔好感
      </motion.button>
    </div>
  )
}
