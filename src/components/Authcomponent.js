// 鉴权
// 高阶组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
function AuthComponent({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace></Navigate>
  }
}
export default AuthComponent
