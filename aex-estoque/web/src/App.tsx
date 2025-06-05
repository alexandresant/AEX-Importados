import './index.css'
import { Sidebar } from './components/Sidebar'
import { Produtos } from './pages/Produtos'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 
export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
          <Routes>
            <Route path="/produtos" element={<Produtos />} />
          </Routes>
      </main>
    </div>
  )
}
