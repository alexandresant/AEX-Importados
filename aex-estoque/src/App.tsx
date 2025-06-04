import './index.css'
import { Sidebar } from './components/Sidebar'

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-full ">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao sistema AEX Estoque</h1>
          <p>Conteúdo principal da aplicação vai aqui.</p>
        </div>
      </main>
    </div>
  )
}
