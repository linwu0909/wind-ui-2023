import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { configure, addDecorator, addParameters } from '@storybook/react'
import "./fix_info_style.scss"
import '../src/styles/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}
// 定义内容居中的组件
const StoryWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addDecorator(StoryWrapper)
// 添加显示组件信息
addDecorator(withInfo);
// 添加配置
addParameters({
  info: {
    inline: true, // 直接显示信息，不需要点击图标
    header: false // 不显示头部，比较好看
  }
})

// const loaderFn = () => {
//   const allExports = []
//   const req = require.context('../src/components', true, /\.stories\.tsx$/)
//   req.keys().forEach(file => allExports.push(req(file)))
//   return allExports
// }

// // automatically import all files ending in *.stories.tsx
// configure(loaderFn, module)