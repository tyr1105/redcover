import { useState } from 'react'
import CoverEditor from './components/CoverEditor'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* 顶栏 */}
      <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-[var(--color-surface)]/80">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <h1 className="text-lg font-bold text-white">RedCover</h1>
            <span className="text-xs text-white/40 hidden sm:inline">小红书封面制作工具</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30">1080×1440 · 3:4</span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">免费</span>
          </div>
        </div>
      </header>

      {!started ? (
        /* 首页 Hero */
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-medium">
            🔥 小红书创作者必备工具
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            一键制作
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
              爆款封面
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-2xl mx-auto">
            20+ 精美模板 · 自定义文字 · 上传背景图 · 1080×1440高清导出<br />
            纯浏览器处理，不上传任何数据
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-[var(--color-primary)] text-white text-lg font-bold rounded-full
                       hover:bg-[var(--color-primary-dark)] transition shadow-lg shadow-[var(--color-primary)]/30
                       hover:shadow-[var(--color-primary)]/50 hover:scale-105 active:scale-95"
          >
            开始制作 →
          </button>

          {/* 特性展示 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {[
              { emoji: '🎯', title: '3:4专属比例', desc: '完美适配小红书' },
              { emoji: '🎨', title: '20+模板', desc: '涵盖热门分类' },
              { emoji: '🔒', title: '隐私安全', desc: '纯本地处理' },
              { emoji: '⚡', title: '即时导出', desc: '高清PNG下载' },
            ].map(f => (
              <div key={f.title} className="bg-white/5 rounded-2xl p-4 text-left">
                <div className="text-2xl mb-2">{f.emoji}</div>
                <div className="text-white font-medium text-sm">{f.title}</div>
                <div className="text-white/40 text-xs mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 编辑器 */
        <div className="max-w-7xl mx-auto px-4 py-6">
          <CoverEditor />
        </div>
      )}

      {/* Tool Network Footer */}
      <footer className="border-t border-white/5 mt-12 bg-black/20">
        {/* Google AdSense Placeholder */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-white/5 border border-dashed border-white/10 rounded-lg p-4 text-center text-white/20 text-xs">
            {"Google AdSense 广告位"}
          </div>
        </div>

        {/* Tool Network Links */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="text-sm font-semibold text-white/40 mb-3 text-center">🛠️ Tool Network</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'AI Tools Box', href: 'https://tyr1105.github.io/ai-tools-box/' },
              { name: 'DevKit Tools', href: 'https://tyr1105.github.io/devkit-tools/' },
              { name: 'PicTool', href: 'https://tyr1105.github.io/pictool/' },
              { name: 'QRGen', href: 'https://tyr1105.github.io/qrgen/' },
              { name: 'RedCover', href: 'https://tyr1105.github.io/redcover/' },
              { name: 'ResumeCraft', href: 'https://tyr1105.github.io/resumecraft/' },
              { name: 'ShotPro', href: 'https://tyr1105.github.io/shotpro/' },
              { name: 'WriteBoom', href: 'https://tyr1105.github.io/writeboom/' },
              { name: 'PDFKit', href: 'https://tyr1105.github.io/pdfkit/' },
            ].map(tool => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs text-white/40 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-colors"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>

        {/* 支持作者 */}
        <div className="max-w-7xl mx-auto px-4 pb-6 text-center">
          <p className="text-sm text-white/30 mb-2">☕ 支持作者</p>
          <p className="text-xs text-white/20">如果这些工具对你有帮助，欢迎分享给朋友或 Star 支持！</p>
        </div>

        <div className="border-t border-white/5 py-4 text-center text-white/15 text-xs">
          RedCover · 小红书封面制作工具 · 纯浏览器处理 · 不上传任何数据 · 免费使用 · 无需注册
        </div>
      </footer>
    </div>
  )
}

export default App
