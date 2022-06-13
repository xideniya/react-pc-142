import React from 'react'
import './index.scss'

import Bar from '@/components/Bar'
export default function Home() {
  return (
    <div>
      <Bar title="主流框架使用满意度" xData={['react', 'vue', 'angular ']} yData={[30, 40, 60]} style={{ width: '500px', height: '300px' }}></Bar>
      <Bar title="主流框架使用满意度2" xData={['react', 'vue', 'angular ']} yData={[30, 40, 60]} style={{ width: '500px', height: '300px' }}></Bar>
    </div>
  )
}
