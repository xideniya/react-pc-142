import React from 'react'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import './index.scss'

export default function Login() {
  const rootstore = useStore()
  const navigate = useNavigate()
  // 登录回调
  async function onFinish(values) {
    try {
      // 获取token
      await rootstore.loginStore.getToken(values.phone, values.code)
      // 跳转到首页
      navigate('/', { replace: true })
      message.success('登录成功')
    } catch (error) {
      message.error(error.response?.data?.message || '登录失败')
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          labelCol={{
            span: 5
          }}
          wrapperCol={{
            span: 20
          }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* 手机号码 */}
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入手机号码'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          {/* 验证码 */}
          <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码'
              },
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 5,
              span: 20
            }}
          >
            <Checkbox className="login-checkbox-label">我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>
          {/* 登录按钮 */}
          <Form.Item wrapperCol={{ span: 25 }}>
            <Button type="primary" htmlType="submit" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
