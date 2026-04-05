<div align="center">

# HerLemma

**谁说女生学不好数学？**

*Lemma — a small proven step that leads to a greater theorem.*
*HerLemma — her small step, helping the next girl go further.*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Avalanche](https://img.shields.io/badge/Avalanche-Fuji-E84142?logo=avalanche&logoColor=white)](https://www.avax.network/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

**数学从来不分性别，但理解方式可以不同。**

HerLemma 让女生用适合自己的方式打开数学，在互相讲解中携手打破偏见。

[在线体验](https://herlemma.vercel.app) · [项目简介](#-项目简介) · [核心机制](#-核心机制) · [技术栈](#-技术栈) · [快速开始](#-快速开始)

</div>

---

## 🎯 项目简介

HerLemma 是一个面向高中女生的数学互助平台。

AI 辅助她用 10 岁小孩都能听懂的话讲解数学，同伴投票「我听懂了」来验证，所有数据记录在 Avalanche 链上。不是刷题，不是补课——是女生用自己的方式理解数学，再讲给下一个女生听。

### 要解决的问题

| 痛点 | HerLemma 的方式 |
|------|----------------|
| 教材只有一种讲法，没听懂就自我否定 | AI 生成多种生活化讲解，找到适合自己的入口 |
| 补课贵且讲法重复 | 同伴讲解免费，用日常语言更容易听懂 |
| 会讲数学的女生没有发挥渠道 | 讲得好可以赚 AVAX，能力被链上认证 |
| "女生理科不行"缺少数据反驳 | 链上集体证据：多少女生在教数学、多少人被教懂 |

---

## ✨ 核心机制

### 1. AI 辅助讲解创作

选一个知识点 → AI 用三种风格生成讲解灵感（生活类比 / 视觉画面 / 日常场景）→ 编辑 → 生成配图 → 生成数学动画 → 录音讲解 → 上链

### 2. 同伴验证

其他女生投票「我听懂了」—— 不是点赞，是教学效果的群体验证。

### 3. 知识路径

四大主题（导数 / 函数 / 数列 / 概率），每个主题按逻辑关系串联成学习路径，点击进入姐妹讲解排行。

### 4. 集体证据

每一次讲解、每一次投票都在链上积累。当数据写着「4832 位女生贡献了 12647 条数学讲解」——偏见不攻自破。

### 5. 榜样学姐

在平台讲过数学的女生，后来考入了北大、复旦、MIT。她们的成就档案就在知识树上。

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | React 18 · Vite · Tailwind CSS · Framer Motion |
| **AI 讲解** | DeepSeek（文本生成 + Chatbot + 动画代码） |
| **AI 配图** | 豆包 Seedream（教学场景图生成） |
| **可视化** | Canvas 2D 数学动画 |
| **智能合约** | Solidity · Foundry · Avalanche Fuji |
| **链上存储** | IPFS (Pinata) |

### 合约模块

| 合约 | 功能 |
|------|------|
| `ExplanationManager.sol` | 讲解提交、投票、悬赏、打赏、分账 |
| `ProveToken.sol` | $PROVE 声誉代币（不可交易） |
| `STEMIndex.sol` | 链上聚合统计 |
| `HerLemmaCredential.sol` | Soulbound 成就凭证 |

---

## 🚀 快速开始

```bash
# 克隆
git clone https://github.com/jchen-devrel/HerLemma.git
cd HerLemma

# 前端
cd ui
npm install
npm run dev
# → http://localhost:5173
```

### 合约部署（可选）

```bash
cd contracts
cp .env.example .env
# 填入 PRIVATE_KEY 和 TREASURY
npm install
npm run deploy:fuji
```

---

## 📂 项目结构

```
HerLemma/
├── ui/                     # 前端应用
│   └── src/
│       ├── pages/          # Home, KnowledgeTree, Create, Profile, TranslationDetail
│       ├── components/     # Navbar
│       ├── data/           # Mock 知识树 + 统计数据
│       └── utils/          # AI API, Chain mock
├── contracts/              # Solidity 智能合约
│   ├── src/                # 4 个核心合约
│   └── script/             # 部署脚本
├── docs/                   # pitch.md, 部署文档
└── README.md
```

---

## 💡 为什么这个项目有意义

当讲解在女生之间发生——一个女生听懂了，用自己的话讲给下一个女生——它就不只是学习行为，而是对偏见的持续回应。

链上记录着多少女生在教数学、多少人被教懂了。每一个参与者都在为整个群体积累证据。当证据足够厚的时候，「女生不擅长数学」这句话就会自然消亡。

不是被谁驳倒的，是被她们自己证明的。

> *Every lemma she proves brings the next girl closer to her theorem.*

---

<div align="center">

**Built for [Pink HerSolidity Hackathon](https://github.com/0xherstory/WWW6.5-Hackathon) 2026**

MIT License

</div>
