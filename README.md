# 晨 · 求职作品集

前端方向在读、实习 MCN 数据运营的求职作品集站点。**视差杂志（Parallax Editorial）** 风格：暖纸底、墨黑字、砖红点缀、衬线大标题、滚动视差景深。

## 技术栈
- Vue3 + Vite 5 + vue-router（hash 路由）+ marked
- 设计系统：自定义 CSS 变量（暖纸 `#F5F0E6` / 墨黑 `#1A1712` / 砖红 `#B3401F`）
- 视差引擎：`src/composables/useParallax.js`（transform-only + rAF 节流，移动端与 reduced-motion 归零）

## 本地运行
```bash
npm install
npm run dev      # 开发（http://localhost:5173）
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

## 部署
Cloudflare Pages：连接本仓库 → 框架 Vite → 构建命令 `npm run build` → 输出目录 `dist`（hash 路由无需 rewrite 配置）。

## 目录结构
```
src/
├─ data/site.js        # 个人信息 / 作品 / 博客元数据（唯一数据源）
├─ posts/              # 博客 markdown（import.meta.glob 加载）
├─ composables/        # useParallax / useReveal / useCountUp / useTypewriter
├─ components/         # MagneticButton
└─ views/              # Home / Projects / Blog / BlogPost / About（hash 路由）
```
