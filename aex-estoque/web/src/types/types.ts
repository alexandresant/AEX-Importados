import type { Fornecedor } from "./fornecedores"

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

export interface ShowModalEditarProps {
  open: boolean;
  openChange: (isOpen: boolean) => void;
  nomeEdit: string;
  setNomeEdit: (value: string) => void;
  precoEdit: string;
  setPrecoEdit: (value: string) => void;
  //quantEdit: string;
  //setQuantEdit: (value: string) => void;
  categoriaEdit: string;
  setCategoriaEdit: (value: string) => void;
  categorias: string[];
  novaCategoria: string;
  setNovaCategoria: (value: string) => void;
  fornecedores: Fornecedor[];
  fornecedorEdit: string;
  setFornecedorEdit: (value: string) => void;
  onConfirm: () => void;
  onClick: () => void;
  onCancel: () => void;
}

export interface ShowModalCadastroProps {
  open: boolean;
  openChange: (isOpen: boolean) => void;
  nome: string;
  setNome: (value: string) => void;
  preco: string;
  setPreco: (value: string) => void;
  quantidade: string;
  setQuantidade: (value: string) => void;
  categoriaSelecionada: string;
  setCategoriaSelecionada: (value: string) => void;
  novaCategoria: string;
  setNovaCategoria: (value: string) => void;
  categorias: string[];
  setCategorias: (value: string[]) => void;
  fornecedores: Fornecedor[];
  fornecedorSelecionado: string;
  setFornecedorSelecionado: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}