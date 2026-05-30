import { useState, useCallback, useEffect } from 'react'
import { categories, templates, fonts, type Template } from '../data/templates'
import { renderCover, type CoverData } from '../utils/canvasRenderer'
import { saveAs } from 'file-saver'

const PREVIEW_SCALE = 0.35

export default function CoverEditor() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [showTag, setShowTag] = useState(true)
  const [tagText, setTagText] = useState('')
  const [selectedFont, setSelectedFont] = useState('default')
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom'>('center')
  const [bgImage, setBgImage] = useState<string | null>(null)
  const [rendering, setRendering] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory)

  // 选择模板
  const selectTemplate = useCallback((t: Template) => {
    setSelectedTemplate(t)
    setTextPosition(t.textPosition)
    if (t.tags && t.tags.length > 0 && !tagText) {
      setTagText(t.tags[0])
    }
  }, [tagText])

  // 渲染预览
  const renderPreview = useCallback(async () => {
    if (!selectedTemplate && !bgImage) return
    
    const coverData: CoverData = {
      bg: selectedTemplate?.bg || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      title: title || '输入你的标题',
      subtitle,
      textColor: selectedTemplate?.textColor || '#ffffff',
      fontSize: selectedTemplate?.fontSize || 36,
      textPosition,
      fontFamily: fonts.find(f => f.id === selectedFont)?.family || 'system-ui, sans-serif',
      showTag,
      tagText,
      bgImage,
    }

    try {
      const blob = await renderCover(coverData)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    } catch (err) {
      console.error('预览渲染失败:', err)
    }
  }, [selectedTemplate, title, subtitle, textPosition, selectedFont, showTag, tagText, bgImage, previewUrl])

  // 自动更新预览
  useEffect(() => {
    const timer = setTimeout(renderPreview, 300)
    return () => clearTimeout(timer)
  }, [renderPreview])

  // 导出高清图
  const handleExport = useCallback(async () => {
    setRendering(true)
    try {
      const coverData: CoverData = {
        bg: selectedTemplate?.bg || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        title: title || '输入你的标题',
        subtitle,
        textColor: selectedTemplate?.textColor || '#ffffff',
        fontSize: selectedTemplate?.fontSize || 36,
        textPosition,
        fontFamily: fonts.find(f => f.id === selectedFont)?.family || 'system-ui, sans-serif',
        showTag,
        tagText,
        bgImage,
      }
      const blob = await renderCover(coverData)
      const filename = `redcover-${Date.now()}.png`
      saveAs(blob, filename)
    } catch (err) {
      console.error('导出失败:', err)
      alert('导出失败，请重试')
    } finally {
      setRendering(false)
    }
  }, [selectedTemplate, title, subtitle, textPosition, selectedFont, showTag, tagText, bgImage])

  // 上传背景图
  const handleBgImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setBgImage(reader.result as string)
      setSelectedTemplate(null)
    }
    reader.readAsDataURL(file)
  }, [])

  // 清除背景图
  const clearBgImage = useCallback(() => {
    setBgImage(null)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* 左侧：预览区 */}
      <div className="flex-1 flex flex-col items-center">
        <div className="sticky top-4">
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{ width: 1080 * PREVIEW_SCALE, height: 1440 * PREVIEW_SCALE }}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="封面预览" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <p>选择模板开始制作</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4 justify-center">
            <button
              onClick={handleExport}
              disabled={rendering || (!selectedTemplate && !bgImage)}
              className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-full font-bold
                         hover:bg-[var(--color-primary-dark)] transition disabled:opacity-50
                         disabled:cursor-not-allowed shadow-lg"
            >
              {rendering ? '渲染中...' : '📥 导出高清封面'}
            </button>
            <label className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-full
                              cursor-pointer hover:bg-white/20 transition font-medium">
              📷 上传背景图
              <input type="file" accept="image/*" className="hidden" onChange={handleBgImage} />
            </label>
            {bgImage && (
              <button
                onClick={clearBgImage}
                className="px-4 py-2.5 bg-white/5 text-white/60 rounded-full hover:bg-white/10 transition"
              >
                ✕ 清除图片
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 右侧：编辑区 */}
      <div className="lg:w-[420px] space-y-5">
        {/* 分类选择 */}
        <div className="bg-white/5 rounded-2xl p-4">
          <h3 className="text-white/80 text-sm font-medium mb-3">选择分类</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 模板网格 */}
        <div className="bg-white/5 rounded-2xl p-4">
          <h3 className="text-white/80 text-sm font-medium mb-3">选择模板</h3>
          <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-1">
            {filteredTemplates.map(t => (
              <button
                key={t.id}
                onClick={() => selectTemplate(t)}
                className={`relative rounded-xl overflow-hidden h-20 transition-all ${
                  selectedTemplate?.id === t.id
                    ? 'ring-2 ring-[var(--color-primary)] scale-105'
                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ background: t.bg }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-center px-1 drop-shadow-lg">
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 文字编辑 */}
        <div className="bg-white/5 rounded-2xl p-4 space-y-3">
          <h3 className="text-white/80 text-sm font-medium">编辑内容</h3>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="输入标题（必填）"
            maxLength={30}
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white
                       placeholder-white/30 focus:outline-none focus:border-[var(--color-primary)] transition"
          />
          <input
            type="text"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            placeholder="副标题（选填）"
            maxLength={50}
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white
                       placeholder-white/30 focus:outline-none focus:border-[var(--color-primary)] transition"
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showTag}
                onChange={e => setShowTag(e.target.checked)}
                className="accent-[var(--color-primary)]"
              />
              显示标签
            </label>
            {showTag && (
              <input
                type="text"
                value={tagText}
                onChange={e => setTagText(e.target.value)}
                placeholder="标签文字"
                maxLength={10}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm
                           placeholder-white/30 focus:outline-none focus:border-[var(--color-primary)]"
              />
            )}
          </div>
        </div>

        {/* 样式设置 */}
        <div className="bg-white/5 rounded-2xl p-4 space-y-3">
          <h3 className="text-white/80 text-sm font-medium">样式设置</h3>
          
          {/* 文字位置 */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">文字位置</label>
            <div className="flex gap-2">
              {(['top', 'center', 'bottom'] as const).map(pos => (
                <button
                  key={pos}
                  onClick={() => setTextPosition(pos)}
                  className={`flex-1 py-2 rounded-lg text-sm transition ${
                    textPosition === pos
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {pos === 'top' ? '⬆️ 顶部' : pos === 'center' ? '⏺ 居中' : '⬇️ 底部'}
                </button>
              ))}
            </div>
          </div>

          {/* 字体选择 */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">字体</label>
            <div className="flex flex-wrap gap-2">
              {fonts.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFont(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    selectedFont === f.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                  style={{ fontFamily: f.family }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
