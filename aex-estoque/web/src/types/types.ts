export interface ModalEditarFornecedoresProps{
    open: boolean
    openChange: React.Dispatch<React.SetStateAction<boolean>>
    nome: string
    setNome: React.Dispatch<React.SetStateAction<string>>
    contato: string
    setContato: React.Dispatch<React.SetStateAction<string>>
    telefone: string
    setTelefone: React.Dispatch<React.SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    onConfirm: () => void
    onDelete: () => void
}

export interface LoginPageProps{
    login: string
    senha: string
}

export interface AuthContextType{
    isAuthenticated: boolean
    login: () => void
    logout: () => void
}

export interface UserProps {
    id: string
    email: string,
    senha: string,
    nome: string
}


export interface EstoqueProps{
    id: number
    produtoId: number
    quantidade: number
    tipoMovimentacao: string
    dataMovimentacao: string
    motivoSaida: string
    motivoEntrada: string
    dataMovimentação: Date
    usuarioId: number
    usuario?: {
        id: number
        nome: string
    }
    produto: {
        id: number
        nome: string
        preco: number
    }
}

export interface Produto{
    id: number
    nome: string
    codigo: string
    preco: number
    quantidade: number
    categoria: string
    fornecedorId: number
    fornecedor?: {
        id: number
        nome: string
    }
}
