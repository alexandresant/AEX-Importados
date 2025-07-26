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