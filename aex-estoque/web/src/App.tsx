import './index.css'
import { Sidebar } from './components/Sidebar'
import { Produtos } from './pages/Produtos'
import { CadastroForncedor } from './pages/Fornecedores'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 
export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <Sidebar />

      <main className="flex-1 p-6">
          <Routes>
            <Route path="/produtos" element={<Produtos />} />
            <Route path="fornecedores" element={<CadastroForncedor/>} />
          </Routes>
      </main>
    </div>
  )
}
