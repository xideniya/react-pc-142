import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { history } from './utils/history'
import Layout from "@/pages/Layout";
import AuthComponent from "@/components/Authcomponent";
import './app.scss'
// 路由懒加载
const Login = lazy(() => import('@/pages/Login'))
const Home = lazy(() => import('@/pages/Home'))
const Artical = lazy(() => import('@/pages/Artical'))
const Publish = lazy(() => import('@/pages/Publish'))
const lazyLoad=(node)=>{
    return <Suspense fallback={
        <div>loading</div>
    }>
        {node}
    </Suspense>
}
function App() {
  return (
    <HistoryRouter history={history}>
      <div className="app-container">
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
              <Route  element={lazyLoad(<Home />)} index></Route>
              <Route path="artical" element={lazyLoad(<Artical />)}></Route>
              <Route path="publish" element={lazyLoad(<Publish />)}></Route>
              {/*<Route path="" element={<Navigate to="home" />}></Route>*/}
            </Route>
            <Route path="/" element={<Navigate to="/layout" />}></Route>
          </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
