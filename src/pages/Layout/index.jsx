import { useEffect } from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store/index'
// store 数据变化后更新视图
import { observer } from 'mobx-react-lite'
import './inde.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
  // 获取当前路径
  const { pathname } = useLocation()
  // 获取mobx
  const { userStore, loginStore } = useStore()
  const navigate = useNavigate()
  // 页面挂载后获取用户数据
  useEffect(() => {
    userStore.geruserinfo()
  }, [userStore])
  const confirm = () => {
    //退出登录
    loginStore.clearToken()
    navigate('/login')
  }
  const items = [
    { label: <Link to="home">数据概览</Link>, key: '/layout/home', icon: <HomeOutlined /> }, // 菜单项务必填写 key
    { label: <Link to="artical">内容管理</Link>, key: '/layout/artical', icon: <DiffOutlined /> },
    { label: <Link to="publish">发布文章</Link>, key: '/layout/publish', icon: <EditOutlined /> }
  ]
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={confirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu items={items} mode="inline" theme="dark" selectedKeys={[pathname]} style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)
