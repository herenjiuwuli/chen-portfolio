# 二次元商城 Vue3 练手复盘：把前端核心能力串起来

> 一句话理解：用 Vue3 做一个「二次元周边」小商城，把列表展示、路由跳转、状态管理（购物车）、本地持久化这些前端核心能力完整地串了一遍。

## 我之前的误解

- 以为「练手项目」就是把界面做像就行——实际上**状态管理 + 数据流 + 持久化**才是练手的重点，界面只是皮。
- 以为购物车要接后端才能做——用 Pinia + localStorage 就能做出「刷新不丢」的完整体验。

## 技术栈

- **Vue 3**（`<script setup>` 组合式 API）
- **Vite 5**（构建 / 开发服务器）
- **Vue Router 4**（页面路由）
- **Pinia**（购物车全局状态 + localStorage 持久化）
- 纯 CSS（作用域 scoped，无 UI 库，方便看懂每一行样式）

## 功能清单

- [x] 首页：banner + 精选商品网格
- [x] 列表页：分类筛选 + 关键词搜索
- [x] 详情页：商品信息 + 数量选择 + 加入购物车
- [x] 购物车：增删改数量、实时总价、localStorage 持久化、模拟结算

## 项目结构（4 页面 + 公共组件）

```
src/
├─ main.js / App.vue            # 入口 + 根组件（导航+路由出口+页脚）
├─ router/index.js              # 路由配置
├─ store/cart.js                # Pinia 购物车状态
├─ data/products.js             # 模拟商品数据
├─ components/                  # NavBar / ProductCard / Footer
└─ views/                       # Home / ProductList / ProductDetail / Cart
```

## 核心要点（这次练到的东西）

1. **动态路由**：详情页用 `:id` 参数，`useRoute()` 取参 + 数据查找，路由从「静态页面」变成「动态页面」
2. **Pinia 购物车**：全局状态 `cart` 存商品 id→数量，actions 封装增删改；组件只调 action，不直接改状态
3. **持久化**：`watch` 购物车变化 → `localStorage.setItem`；`store` 初始化时读回来 → 刷新不丢
4. **组合式过滤**：列表页 `computed` 根据「分类 + 关键词」派生过滤结果，数据流单向、清晰
5. **组件化**：ProductCard 复用（首页/列表共用），改一处全站生效

## 简历亮点（怎么包装）

- 独立用 Vue3 + Vite 搭建「二次元周边商城」前端，实现首页/列表/详情/购物车四大模块
- 用 Vue Router 完成多页路由与动态详情页（`:id` 参数）
- 用 Pinia 管理购物车状态，localStorage 实现刷新不丢
- 列表页分类筛选 + 实时搜索；购物车数量增减、总价计算、模拟结算
- 全程中文注释，无 UI 库，结构清晰

## 待搞懂 / 可进阶

- 接真实后端（axios 替换本地数据）
- 登录/鉴权（token + 路由守卫）
- 补单元测试（Vitest）与 E2E（Playwright）——契合测试转型方向
- 部署上线，补一个线上 demo 链接
