// ============ 唯一数据源：个人信息 / 作品 / 工作方式 / 博客元数据 ============
// 改文案只改这里，别去改 HomeView.vue 的模板结构。

export const site = {
  name: '周怡晨',
  brand: 'yichen',
  eyebrow: 'PORTFOLIO 2026 — 测试开发 / 全栈开发 · 深圳',
  lede: '写<em>被测试的系统</em>，也写<em>测试它的平台</em>：四组项目、五套系统，近 700 条自动化测试，覆盖接口断言、UI 真机与跨模块一致性对账。',
  lede2: '从数据库表、接口鉴权到单端口部署与 CI 流水线，端到端自己跑通。',
  github: 'https://github.com/herenjiuwuli',
  email: '2932221535@qq.com',
  city: '深圳',
  track: '测试开发 / 全栈开发',
  status: '可到岗',
  cta: '目前在看测试开发、全栈开发方向的机会，深圳可到岗。作品集的每个项目都能现场跑起来，测试数据与失败案例也可以直接演示。',
}

// 作品：首页横向滑轨的四屏
// links: [{ label, href }]；meta: [{ b: 主信息, rest: 补充 }]
export const works = [
  {
    no: '01',
    title: 'API 自动化测试平台',
    sub: '+ 办公 OA 闭环',
    desc: '自研接口测试平台：存用例 → 手动/定时跑 → 多维断言 → 出报告。为了证明它真的好用，我又写了一套办公 OA 当被测系统，用平台把它测穿。',
    links: [
      { label: '平台源码', href: 'https://github.com/herenjiuwuli/api-test-platform' },
      { label: '被测系统', href: 'https://github.com/herenjiuwuli/office-oa' },
    ],
    meta: [
      { b: '211 单测 · 11 E2E', rest: 'Fastify 5 · node:sqlite' },
      { b: '84/84 闭环', rest: 'Vue3 · 手写 JWT' },
      { b: 'Docker 单端口', rest: 'CI 五层流水线' },
    ],
  },
  {
    no: '02',
    title: 'AI 热点选题助手',
    sub: 'ReAct Agent + RAG',
    desc: '工具调用 Agent + 自建 RAG 知识库（智谱 embedding + 自写余弦检索），从热榜拉取到选题建议全链路，已上线可访问。',
    links: [
      { label: '线上演示', href: 'https://ai-hot-topic-assistant.vercel.app' },
      { label: '源码', href: 'https://github.com/herenjiuwuli/ai-hot-topic-assistant' },
    ],
    meta: [
      { b: '37 单测', rest: 'ReAct · RAG' },
      { b: '1024 维向量', rest: '智谱 embedding-2' },
      { b: '已上线', rest: 'Vue3' },
    ],
  },
  {
    no: '03',
    title: 'MCN 数据工具',
    sub: '真实业务里长出来的',
    desc: '5 平台数据采集 → 结构化存储 → 分析看板 → 飞书同步。实习期间每天在用，替代逐条手动复制统计。',
    links: [{ label: '源码', href: 'https://github.com/herenjiuwuli/mcn-data-tool' }],
    meta: [
      { b: '82 单测', rest: 'Chrome MV3 · ECharts' },
      { b: '5 平台采集', rest: '抖音 / 小红书 / B站…' },
      { b: '飞书 Webhook', rest: 'Playwright 定时' },
    ],
  },
  {
    no: '04',
    title: '求职助手',
    sub: 'JobHunter — 把求职做成流水线',
    desc: '简历库、按 JD 定制、匹配打分、投递状态机、AI 模拟面试 —— 把「做简历 / 投简历 / 面试」串成一条可追踪的链。',
    links: [{ label: '源码', href: 'https://github.com/herenjiuwuli/job-hunter' }],
    meta: [
      { b: '61 pytest', rest: 'Vue3 · Express 5' },
      { b: '7 状态流转', rest: '+ 5 结果机' },
      { b: 'DeepSeek', rest: 'PDF 导出 · MV3 扩展' },
    ],
  },
]

// 工作方式：三张叠层卡（h 为两行标题）
export const capabilities = [
  {
    no: '01',
    tag: '测试开发 · 效率改造',
    h: ['把「手动重复」', '变成工具'],
    note: '实习时每天手动点接口验采集脚本，于是把这件事造成一个平台：存用例、定时跑、出报告。习惯先问「这活为什么需要人来做」，再动手写。',
    stack: 'Fastify · node:sqlite · node-cron · SSE',
  },
  {
    no: '02',
    tag: '质量意识 · 一致性验证',
    h: ['不只写功能，', '还写它的证据'],
    note: '每个项目都配自动化测试与跨模块对账：列表 ↔ 导出 ↔ 统计 ↔ 通知必须自洽。全绿不等于没问题 —— 这是踩过坑之后才有的判断。',
    stack: 'Vitest · Playwright · 一致性对账 · 真机取证',
  },
  {
    no: '03',
    tag: '全栈 · 部署 · CI',
    h: ['端到端把东西', '跑起来'],
    note: '从数据库表、接口鉴权、前端组件，到 Docker 单端口部署、CI 五层流水线 —— 不需要别人接手才能上线。',
    stack: 'Vue3 · JWT · Docker · GitHub Actions',
  },
]

// 博客元数据（与 src/posts/*.md 按 slug 对应；标题来自 md 内 H1）
export const posts = [
  {
    slug: 'ai-generate-cases',
    title: '给 API 测试平台加「AI 生成用例」：输入接口，AI 自动出 8 条测试用例',
    date: '2026-09-02',
    tags: ['AI', '测试', '接口测试'],
    desc: '把 AI 接到自研测试平台上自动设计用例，踩了 3 个坑（截断/非法JSON/dotenv），最后 51 个回归全绿。',
    color: '#7a8ca8',
  },
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
