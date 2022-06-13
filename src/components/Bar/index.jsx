import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

const chartInit = (node, title, xData, yData) => {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: yData
      }
    ]
  })
}

export default function Bar({ title, xData, yData, style }) {
  const domRrf = useRef()
  // 页面加载时渲染图表
  useEffect(() => {
    chartInit(domRrf.current, title, xData, yData)
  }, [title, xData, yData])
  return (
    <div className="bar-container">
      <div ref={domRrf} className="chart-container" style={style}></div>
    </div>
  )
}
