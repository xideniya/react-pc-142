import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { history } from './utils/history'
import './app.scss'
// 路由懒加载
const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/pages/Layout'))
const Home = lazy(() => import('@/pages/Home'))
const Artical = lazy(() => import('@/pages/Artical'))
const Publish = lazy(() => import('@/pages/Publish'))
const AuthComponent = lazy(() => import('@/components/Authcomponent.js'))

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="app-container">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/layout"
              // 鉴权高阶组件包裹
              element={
                <AuthComponent>
                  <Layout />
                </AuthComponent>
              }
            >
              <Route path="home" element={<Home />}></Route>
              <Route path="artical" element={<Artical />}></Route>
              <Route path="publish" element={<Publish />}></Route>
              <Route path="" element={<Navigate to="home" />}></Route>
            </Route>
            <Route path="/" element={<Navigate to="/layout" />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
