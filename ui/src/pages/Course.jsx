import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    id: 1, video: '/videos/step1.mp4', title: '看见变化',
    description: '这个点在曲线上移动。在某一刻，它变化得快还是慢？',
    type: 'quiz',
    question: '要知道这一刻的变化快慢，你会先怎么做？',
    options: ['看一小段的变化', '直接背公式', '随便猜一个'],
    correct: 0,
    feedback: '没错！我们先看一小段的变化——这就是"平均变化率"的思路。',
  },
  {
    id: 2, video: '/videos/step2.mp4', title: '平均变化',
    description: '用两个点连一条线（割线），它的斜率就是这段的平均变化率。',
    type: 'quiz',
    question: '割线的斜率告诉我们什么？',
    options: ['这一段的平均变化快慢', '某一瞬间的变化', '函数的最大值'],
    correct: 0,
    feedback: '对！割线斜率 = 平均变化率。但我们想知道的是"这一瞬间"的变化……',
  },
  {
    id: 3, video: '/videos/step3.mp4', title: '问题出现',
    description: '第二个点放在不同位置，得到的斜率不一样。结果不稳定！',
    type: 'quiz',
    question: '怎么才能得到更准确的"瞬时"变化？',
    options: ['让两个点靠得更近', '让两个点离得更远', '多算几次取平均'],
    correct: 0,
    feedback: '聪明！让两个点无限靠近——这就是"取极限"的直觉。',
  },
  {
    id: 4, video: '/videos/step4.mp4', title: '逼近切线',
    description: '两个点越来越近，割线越来越接近……切线！',
    type: 'quiz',
    question: '当 Δx 趋近于 0，割线最终变成了什么？',
    options: ['切线', '消失了', '变成曲线本身'],
    correct: 0,
    feedback: '没错！割线的极限就是切线。而切线的斜率，就是导数。',
  },
  {
    id: 5, video: '/videos/step5.mp4', title: '导数登场',
    description: '切线的斜率 = 导数 = 这一刻函数变化的速度。',
    type: 'finish',
    question: null, options: null, correct: null,
    feedback: null,
  },
]

export default function Course() {
  const [currentStep, setCurrentStep] = useState(0)
  const [videoEnded, setVideoEnded] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const step = STEPS[currentStep]
  const isLast = currentStep >= STEPS.length - 1

  function handleSelect(i) {
    setSelected(i)
    setShowFeedback(true)
  }

  function nextStep() {
    if (isLast) {
      setCurrentStep(0)
    } else {
      setCurrentStep(prev => prev + 1)
    }
    setVideoEnded(false)
    setSelected(null)
    setShowFeedback(false)
  }

  return (
    <div className="min-h-screen bg-mesh text-[#f0eef5]">
      <div className="mx-auto max-w-3xl px-4 py-6">

        {/* 进度条 */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/tree" className="text-xs text-[#a29bfe] hover:text-white transition-colors">← 返回</Link>
          <div className="flex-1 flex gap-1">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStep ? 'bg-gradient-to-r from-[#ff6b6b] to-[#f9ca24]' : 'bg-white/10'}`} />
            ))}
          </div>
          <span className="text-xs text-white/40 tabular-nums">{currentStep + 1} / {STEPS.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* 标题 */}
            <h2 className="text-xl font-bold text-white mb-1">
              <span className="text-[#f9ca24] mr-2">第{step.id}步</span>
              {step.title}
            </h2>
            <p className="text-sm text-white/50 mb-4">{step.description}</p>

            {/* 视频 */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-black mb-5">
              <video
                key={step.video}
                src={step.video}
                autoPlay
                playsInline
                onEnded={() => setVideoEnded(true)}
                controls
                className="w-full"
                style={{ maxHeight: 400 }}
              />
            </div>

            {/* 问题区 */}
            <AnimatePresence>
              {videoEnded && step.type === 'quiz' && !showFeedback && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-white/[0.08] mb-4">
                  <p className="text-sm font-semibold text-white mb-3">{step.question}</p>
                  <div className="space-y-2">
                    {step.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleSelect(i)}
                        className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all border ${
                          selected === i
                            ? i === step.correct
                              ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'
                              : 'border-red-400/50 bg-red-500/15 text-red-200'
                            : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:border-white/20'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="text-white/30 mr-2 font-mono text-xs">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 反馈 */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-emerald-400/20 bg-emerald-500/[0.06] mb-4">
                  <p className="text-sm text-emerald-200 leading-relaxed">
                    {selected === step.correct ? '✅ ' : '💡 '}
                    {step.feedback}
                  </p>
                  <motion.button
                    onClick={nextStep}
                    className="mt-4 w-full rounded-xl py-3 text-sm font-semibold bg-gradient-to-r from-[#ff6b6b] via-[#a29bfe] to-[#f9ca24] text-[#1a0a0a]"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    继续 →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 最后一步 */}
            <AnimatePresence>
              {videoEnded && step.type === 'finish' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 border border-[#f9ca24]/20 text-center">
                  <p className="text-2xl mb-2">🎉</p>
                  <p className="text-lg font-bold text-white mb-1">恭喜你理解了导数！</p>
                  <p className="text-sm text-white/50 mb-4">导数 = 切线的斜率 = 这一刻函数变化的速度</p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      onClick={nextStep}
                      className="rounded-xl px-6 py-2.5 text-sm font-semibold border border-white/20 text-white/70 hover:text-white"
                      whileTap={{ scale: 0.98 }}
                    >
                      再来一遍
                    </motion.button>
                    <Link to="/tree">
                      <motion.button
                        className="rounded-xl px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#ff6b6b] to-[#f9ca24] text-[#1a0a0a]"
                        whileTap={{ scale: 0.98 }}
                      >
                        回到知识树
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
