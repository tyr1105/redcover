// 小红书封面模板数据
export interface Template {
  id: string
  name: string
  category: string
  bg: string // CSS gradient or color
  textColor: string
  textPosition: 'top' | 'center' | 'bottom'
  fontSize: number
  subtitle?: boolean
  tags?: string[]
}

export const categories = [
  { id: 'all', name: '全部', emoji: '🔥' },
  { id: 'food', name: '美食', emoji: '🍜' },
  { id: 'travel', name: '旅行', emoji: '✈️' },
  { id: 'fashion', name: '穿搭', emoji: '👗' },
  { id: 'beauty', name: '美妆', emoji: '💄' },
  { id: 'fitness', name: '健身', emoji: '💪' },
  { id: 'study', name: '学习', emoji: '📚' },
  { id: 'lifestyle', name: '生活', emoji: '🏠' },
  { id: 'tech', name: '数码', emoji: '📱' },
  { id: 'pet', name: '萌宠', emoji: '🐱' },
]

export const templates: Template[] = [
  // 美食类
  {
    id: 'food-1',
    name: '美食探店',
    category: 'food',
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecf9e 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
    tags: ['美食', '探店', '好吃'],
  },
  {
    id: 'food-2',
    name: '减脂便当',
    category: 'food',
    bg: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 34,
    subtitle: true,
    tags: ['减脂', '便当', '健康'],
  },
  {
    id: 'food-3',
    name: '烘焙日记',
    category: 'food',
    bg: 'linear-gradient(135deg, #f5c472 0%, #e8a87c 50%, #d4848e 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
  },
  // 旅行类
  {
    id: 'travel-1',
    name: '旅行攻略',
    category: 'travel',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    textPosition: 'bottom',
    fontSize: 36,
    subtitle: true,
    tags: ['旅行', '攻略', '自由行'],
  },
  {
    id: 'travel-2',
    name: '周末好去处',
    category: 'travel',
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 34,
    subtitle: true,
  },
  {
    id: 'travel-3',
    name: '小众秘境',
    category: 'travel',
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 36,
  },
  // 穿搭类
  {
    id: 'fashion-1',
    name: 'OOTD穿搭',
    category: 'fashion',
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 38,
    subtitle: true,
    tags: ['穿搭', 'OOTD', '日常'],
  },
  {
    id: 'fashion-2',
    name: '平价好物',
    category: 'fashion',
    bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 34,
    subtitle: true,
  },
  // 美妆类
  {
    id: 'beauty-1',
    name: '护肤分享',
    category: 'beauty',
    bg: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
  },
  {
    id: 'beauty-2',
    name: '化妆教程',
    category: 'beauty',
    bg: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    textColor: '#6b4c7a',
    textPosition: 'center',
    fontSize: 34,
  },
  // 健身类
  {
    id: 'fitness-1',
    name: '健身打卡',
    category: 'fitness',
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 38,
    subtitle: true,
    tags: ['健身', '减脂', '运动'],
  },
  {
    id: 'fitness-2',
    name: '居家运动',
    category: 'fitness',
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: '#ffffff',
    textPosition: 'bottom',
    fontSize: 34,
  },
  // 学习类
  {
    id: 'study-1',
    name: '考研上岸',
    category: 'study',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
    tags: ['考研', '学习', '上岸'],
  },
  {
    id: 'study-2',
    name: '读书笔记',
    category: 'study',
    bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 34,
  },
  // 生活类
  {
    id: 'lifestyle-1',
    name: '独居生活',
    category: 'lifestyle',
    bg: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    textColor: '#5a5a5a',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
  },
  {
    id: 'lifestyle-2',
    name: '收纳整理',
    category: 'lifestyle',
    bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 34,
  },
  // 数码类
  {
    id: 'tech-1',
    name: '数码好物',
    category: 'tech',
    bg: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
  },
  // 萌宠类
  {
    id: 'pet-1',
    name: '猫咪日常',
    category: 'pet',
    bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    textColor: '#6b4c3b',
    textPosition: 'center',
    fontSize: 36,
    subtitle: true,
  },
  {
    id: 'pet-2',
    name: '养狗心得',
    category: 'pet',
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    textColor: '#ffffff',
    textPosition: 'center',
    fontSize: 34,
  },
]

export const fonts = [
  { id: 'default', name: '默认黑体', family: 'system-ui, -apple-system, sans-serif' },
  { id: 'serif', name: '宋体', family: '"Songti SC", "SimSun", serif' },
  { id: 'round', name: '圆体', family: '"Hannotate SC", "Yuanti SC", sans-serif' },
  { id: 'hand', name: '手写体', family: '"STKaiti", "KaiTi", cursive' },
  { id: 'hei', name: '黑体粗', family: '"PingFang SC", "Microsoft YaHei", sans-serif' },
]
