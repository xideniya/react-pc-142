import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './utils/history'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Artical from '@/pages/Artical'
import Publish from '@/pages/Publish'
import AuthComponent from './components/Authcomponent'
import './app.scss'

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
            <Route path="home" element={<Home />}></Route>
            <Route path="artical" element={<Artical />}></Route>
            <Route path="publish" element={<Publish />}></Route>
            <Route path="" element={<Navigate to="home" />}></Route>
          </Route>
          <Route path="/" element={<Navigate to="/layout" />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
