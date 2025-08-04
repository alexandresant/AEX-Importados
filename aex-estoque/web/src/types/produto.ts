export interface Produto{
    id: number
    nome: string
    codigo: string
    preco: number
    quantidade: number
    categoria: string
    fornecedorId: number
    fornecedor?: {
        id: number,
        nome: string
    }
}