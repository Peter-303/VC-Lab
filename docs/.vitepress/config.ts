import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '设计探索之旅',
  description: '探索式设计课程 - 从基础到实践',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '第一章', link: '/chapter1/' },
      { text: '第二章', link: '/chapter2/' },
      { text: '第三章', link: '/chapter3/' },
    ],
    sidebar: [
      {
        text: '学习路线',
        items: [
          { text: '首页', link: '/' },
          { text: '1. 设计基础', link: '/chapter1/' },
          { text: '2. 设计原则', link: '/chapter2/' },
          { text: '3. 实践项目', link: '/chapter3/' },
        ]
      }
    ]
  }
})
