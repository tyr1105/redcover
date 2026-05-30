// Canvas渲染引擎 - 将封面数据渲染为图片

export interface CoverData {
  bg: string
  title: string
  subtitle: string
  textColor: string
  fontSize: number
  textPosition: 'top' | 'center' | 'bottom'
  fontFamily: string
  showTag: boolean
  tagText: string
  // 图片背景
  bgImage?: string | null
}

const CANVAS_W = 1080
const CANVAS_H = 1440

// 将CSS gradient转为Canvas渐变
function parseGradient(ctx: CanvasRenderingContext2D, gradient: string): CanvasGradient | string {
  const match = gradient.match(/linear-gradient\((\d+)deg,\s*(.+)\)/)
  if (!match) return gradient

  const angle = parseInt(match[1])
  const colorStops = match[2].split(',').map(s => {
    const parts = s.trim().match(/(#[0-9a-fA-F]+|rgba?\([^)]+\))\s*(\d+%)?/)
    if (!parts) return { color: '#000000', pos: 0 }
    return { color: parts[1], pos: parts[2] ? parseInt(parts[2]) / 100 : 0 }
  })

  // 将角度转换为起止坐标
  const rad = (angle - 90) * Math.PI / 180
  const x1 = CANVAS_W / 2 - Math.cos(rad) * CANVAS_W / 2
  const y1 = CANVAS_H / 2 - Math.sin(rad) * CANVAS_H / 2
  const x2 = CANVAS_W / 2 + Math.cos(rad) * CANVAS_W / 2
  const y2 = CANVAS_H / 2 + Math.sin(rad) * CANVAS_H / 2

  const canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2)
  
  // 重新计算颜色停止位置（确保均匀分布）
  const stopsWithoutPos = colorStops.filter(s => s.pos === 0)
  if (stopsWithoutPos.length === colorStops.length) {
    colorStops.forEach((s, i) => {
      canvasGradient.addColorStop(i / (colorStops.length - 1), s.color)
    })
  } else {
    colorStops.forEach(s => {
      canvasGradient.addColorStop(s.pos, s.color)
    })
  }

  return canvasGradient
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  let currentLine = ''
  
  for (const char of text) {
    const testLine = currentLine + char
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export async function renderCover(data: CoverData): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  const ctx = canvas.getContext('2d')!
  
  // 绘制背景
  if (data.bgImage) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = reject
      img.src = data.bgImage!
    })
    // Cover fit
    const scale = Math.max(CANVAS_W / img.width, CANVAS_H / img.height)
    const w = img.width * scale
    const h = img.height * scale
    ctx.drawImage(img, (CANVAS_W - w) / 2, (CANVAS_H - h) / 2, w, h)
    // 添加半透明遮罩使文字更清晰
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  } else {
    const bg = parseGradient(ctx, data.bg)
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }

  // 计算文字位置
  ctx.textAlign = 'center'
  ctx.fillStyle = data.textColor

  const titleFontSize = data.fontSize * 2.5 // 高分辨率缩放
  const subtitleFontSize = titleFontSize * 0.45

  // 标签
  if (data.showTag && data.tagText) {
    ctx.font = `bold ${subtitleFontSize * 0.85}px ${data.fontFamily}`
    const tagPadding = subtitleFontSize * 0.5
    const tagText = `#${data.tagText}`
    const tagMetrics = ctx.measureText(tagText)
    const tagW = tagMetrics.width + tagPadding * 2
    const tagH = subtitleFontSize * 1.5
    const tagX = 80
    const tagY = 80
    
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.beginPath()
    ctx.roundRect(tagX, tagY, tagW, tagH, tagH / 2)
    ctx.fill()
    
    ctx.fillStyle = data.textColor
    ctx.textAlign = 'left'
    ctx.fillText(tagText, tagX + tagPadding, tagY + tagH * 0.72)
    ctx.textAlign = 'center'
  }

  // 标题
  ctx.font = `bold ${titleFontSize}px ${data.fontFamily}`
  const titleLines = wrapText(ctx, data.title, CANVAS_W - 160)
  
  // 副标题
  ctx.font = `${subtitleFontSize}px ${data.fontFamily}`
  const subtitleLines = wrapText(ctx, data.subtitle, CANVAS_W - 200)
  
  // 计算总高度
  const titleHeight = titleLines.length * titleFontSize * 1.3
  const subtitleHeight = data.subtitle ? subtitleLines.length * subtitleFontSize * 1.6 : 0
  const gap = 40
  const totalHeight = titleHeight + (subtitleHeight > 0 ? gap + subtitleHeight : 0)
  
  // 根据位置计算Y坐标
  let startY: number
  switch (data.textPosition) {
    case 'top':
      startY = 160 + titleFontSize
      break
    case 'bottom':
      startY = CANVAS_H - 160 - totalHeight + titleFontSize
      break
    default:
      startY = (CANVAS_H - totalHeight) / 2 + titleFontSize
  }

  // 绘制标题（带阴影）
  ctx.font = `bold ${titleFontSize}px ${data.fontFamily}`
  ctx.shadowColor = 'rgba(0,0,0,0.3)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetY = 8
  titleLines.forEach((line, i) => {
    ctx.fillText(line, CANVAS_W / 2, startY + i * titleFontSize * 1.3)
  })
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0

  // 绘制副标题
  if (data.subtitle) {
    ctx.font = `${subtitleFontSize}px ${data.fontFamily}`
    ctx.globalAlpha = 0.85
    const subtitleY = startY + titleHeight + gap
    subtitleLines.forEach((line, i) => {
      ctx.fillText(line, CANVAS_W / 2, subtitleY + i * subtitleFontSize * 1.6)
    })
    ctx.globalAlpha = 1
  }

  // 水印（小字）
  ctx.font = `24px system-ui, sans-serif`
  ctx.globalAlpha = 0.3
  ctx.fillText('RedCover · 小红书封面制作', CANVAS_W / 2, CANVAS_H - 40)
  ctx.globalAlpha = 1

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas toBlob failed'))
    }, 'image/png', 1.0)
  })
}
