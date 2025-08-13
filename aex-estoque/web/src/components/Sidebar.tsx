import React, { useState } from 'react'
import {
  Package,
  Repeat,
  Truck,
  FileText,
  Users,
  Home
} from 'lucide-react'

import  LogoSidebar  from "../assets/AEX-Logo.png"

const menuItems = [
  { label: 'Dashboard', href: 'dashboard', icon: Home },
  { label: 'Produtos', href: '/produtos', icon: Package },
  { label: 'Entradas/Saídas', href: '/movimentacoes', icon: Repeat },
  { label: 'Fornecedores', href: '/fornecedores', icon: Truck },
  { label: 'Relatórios', href: '/relatorios', icon: FileText },
  { label: 'Usuários', href: '/cadastroUsuario', icon: Users },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-blue-600 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <aside
        className={`
          fixed top-0 left-0 min-h-screen w-64 bg-white text-black
          border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <div className="flex items-center h-16 border-b border-gray-200 px-4">
          <img
            src={LogoSidebar}
            alt="Logo AEX"
            className="h-10 w-auto"
          />
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded text-black hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} /> {label}
            </a>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
