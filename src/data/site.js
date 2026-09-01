// ============ 唯一数据源：个人信息 / 作品 / 博客元数据 ============

export const site = {
  brand: '晨',
  // 打字机逐句播放（Home 页）
  taglines: [
    '前端方向在读 · 实习 MCN 数据运营',
    '把重复劳动写成工具',
    '正在认真冲全栈',
  ],
  intro:
    '你好，我是「晨」。前端方向在读，目前在 MCN 机构做数据运营实习，' +
    '日常和 5 个平台的达人数据打交道。为了偷懒，我把手动抄数做成了工具；' +
    '为了证明自己，我又把工具做成了一整条测试流水线。这个站点记录我的作品和踩坑。',
  github: 'https://github.com/herenjiuwuli',
  email: 'gerocery@qq.com',
  resume: './resume.pdf',
  location: '中国',
}

// 作品（Projects 页）—— 不放 MCN 运营案例
// repo: GitHub 仓库链接（有则展示）；post: 关联博客 slug（有则展示「相关文章」）
export const projects = [
  {
    slug: 'mcn-data-tool',
    title: 'MCN 数据工具',
    initial: 'M',
    color: '#7a8ca8',
    colorDark: '#5f7393',
    blurb: '5 平台达人数据「采集 → 看板 → 飞书多维表格」全链路提效工具。分层采集 + 数据后端化（服务端 REST 接口）+ E2E 接入 CI，82 个单测全绿。',
    tech: ['Vue3', 'Playwright', 'Chrome 扩展', 'SQLite', '飞书 API', 'GitHub Actions'],
    repo: 'https://github.com/herenjiuwuli/mcn-data-tool',
    post: 'extension-scraping',
  },
  {
    slug: 'ai-topic-agent',
    title: 'AI 热点选题助手',
    initial: 'AI',
    color: '#8b83b5',
    colorDark: '#6e659b',
    blurb: '基于 DeepSeek 的 ReAct Agent：自主抓热榜 → 挑题 → 生成脚本 → 排期，5 个工具 + SSE 轨迹可视化，35 个测试全绿。',
    tech: ['Vue3', 'Express', 'DeepSeek', 'Agent/ReAct', 'Vercel', 'Vitest'],
    repo: 'https://github.com/herenjiuwuli/ai-hot-topic-assistant',
    post: 'pytest-api-testing',
  },
  {
    slug: 'api-test-platform',
    title: 'API 自动化测试平台',
    initial: 'AP',
    color: '#b08b6a',
    colorDark: '#8f6e52',
    blurb: '面向业务的 API 自动化测试平台：Fastify + node:sqlite 存储用例，JSONPath 断言 + node-cron 定时跑，手写 HS256 JWT 鉴权，单端口部署，41 个测试全绿。',
    tech: ['Node', 'Fastify', 'SQLite', 'JSONPath', 'node-cron', 'JWT'],
    repo: 'https://github.com/herenjiuwuli/-api-test-platform',
  },
  {
    slug: 'resume-interview',
    title: 'AI 简历面试模拟器',
    initial: 'R',
    color: '#c27a72',
    colorDark: '#a35e57',
    blurb: '粘贴简历 → AI 评分推荐岗位 → 多轮模拟面试 → 复盘报告 → AI 生成并排版简历。岗位知识库单一数据源 + 追问上下文保留，4 套版式模板导出 PDF，24 个 pytest 接口测试全绿。',
    tech: ['Vue3', 'Vite', 'Express5', 'DeepSeek', 'pytest', 'html2pdf'],
    repo: 'https://github.com/herenjiuwuli/resume-interview',
  },
  {
    slug: 'acg-shop',
    title: '二次元商城',
    initial: 'S',
    color: '#7c9a6d',
    colorDark: '#5f7d52',
    blurb: 'Vue3 全栈练手商城：JWT 真鉴权 + 订单状态机 + mock↔真后端一键切换，配套新手向全讲解。',
    tech: ['Vue3', 'Pinia', 'Node', 'JWT', '状态机', 'Docker'],
    post: 'shop-recap',
  },
]

// 博客元数据（与 src/posts/*.md 按 slug 对应；标题来自 md 内 H1）
export const posts = [
  {
    slug: 'pytest-api-testing',
    title: '给全栈项目写 pytest 接口测试：14 个用例全绿 + TDD 修掉 2 个真实 bug',
    date: '2026-08-24',
    tags: ['测试', '接口测试'],
    desc: '用「检查实际表现是否符合预期」的心态给自己项目写接口测试，顺手学了 mock 第三方 AI。',
    color: '#7c9a6d',
  },
  {
    slug: 'shop-recap',
    title: '二次元商城 Vue3 练手复盘：把前端核心能力串起来',
    date: '2026-08-25',
    tags: ['前端', 'Vue3'],
    desc: '状态管理 + 数据流 + 持久化才是练手的重点，界面只是皮。',
    color: '#a9c49c',
  },
  {
    slug: 'extension-scraping',
    title: '浏览器扩展抓数踩坑：循环引用、异步渲染与数据一致性',
    date: '2026-08-25',
    tags: ['踩坑', '浏览器扩展'],
    desc: '在 5 个平台网页上捕获互动数据，踩了循环引用、SPA 异步渲染、并发「张冠李戴」等坑。',
    color: '#5f7d52',
  },
]
