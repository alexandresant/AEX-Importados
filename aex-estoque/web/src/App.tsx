import './index.css'
import { Sidebar } from './components/Sidebar'
import { Produtos } from './pages/produtos/Produtos'
import { CadastroFornecedor} from './pages/fornecedores/Fornecedores'
import { Login } from './pages/login/Login'
import { CadastroUsuarios } from "./pages/login/CadastroUsuario"
import { EntradasSaidas } from './pages/entradas-saidas/EntradasSaidas'
import { DashBoardPage } from './pages/dashboard/Dashboard'
import { Relatorios } from './pages/relatorios/Relatorios'

import { Navigate } from 'react-router-dom' 
import { PrivateRoute } from './pages/login/PrivateRoute'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === "/login" || location.pathname === "/cadastroUsuario"
  
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
            <Route path="/cadastroUsuario" element={<CadastroUsuarios />}/>

            <Route 
              path="/produtos"  
              element={
                <PrivateRoute>
                  <Produtos />
                </PrivateRoute>
                } 
            />
            <Route 
              path="/fornecedores" 
                element={
                  <PrivateRoute>
                    <CadastroFornecedor/>
                  </PrivateRoute>} 
            />

            <Route
              path="/movimentacoes"
              element={
                <PrivateRoute>
                  <EntradasSaidas />
                </PrivateRoute>
              }
            />
                
            <Route 
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashBoardPage />
                </PrivateRoute>
              }
            />

            <Route 
              path="/relatorios"
              element={
                <PrivateRoute>
                  <Relatorios />
                </PrivateRoute>
              }
            />
          </Routes>
      </main>
    </div>
  )
}
