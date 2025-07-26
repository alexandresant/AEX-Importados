import './index.css'
import { Sidebar } from './components/Sidebar'
import { Produtos } from './pages/produtos/Produtos'
import { CadastroFornecedor} from './pages/fornecedores/Fornecedores'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './pages/login/login'
import { Navigate } from 'react-router-dom' 

export default function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      {!isLoginPage &&
        <Sidebar />
      }
      

      <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/fornecedores" element={<CadastroFornecedor/>} />
          </Routes>
      </main>
    </div>
  )
}
