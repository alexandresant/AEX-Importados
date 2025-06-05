import { useState } from "react";

type Produto = {
    id: number
    nome: string
    codigo: string
    preco: number
    quantidade: number
    categoria: string
}

export function Produtos(){
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [busca, setBusca] = useState('')
    const [showModalCadastro, setShowModalCadastro] = useState(false)
    const [showModalEntrada, setShowModalEntrada] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

    //Campos do formulário de cadastro
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const categoriasBase = ['Eletrônico', 'Acessórios', 'Vestuário', 'Beleza', 'Periféricos']
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
    const [novaCategoria, setNovaCategoria] = useState('')
    const [categorias, setCategorias] = useState<string[]>(categoriasBase)

    //Campo de entrada para o estoque
    const [quantEntrada, setQuantEntrada] = useState('')

    //Filtra produtos pela busca
    const produtosFiltrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) || 
        p.codigo.toLowerCase().includes(busca.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busca.toLowerCase())
    )

    //Gerar código do produto
    function gerarCodigoProduto(){
        return `PROD-${Date.now()}`
    }
    //Cadastrar novo produto
    function cadastrarProduto(){
        if (!nome || !preco || !quantidade){
            alert('Preencha todos os campos obrigatórios')
            return
        }
    
        const categoriaFinal = 
            categoriaSelecionada === 'nova' ? novaCategoria.trim() : categoriaSelecionada

        if (!categoriaFinal){
            alert('Informe a categoria')
            return
        }

        if (!categorias.includes(categoriaFinal)){
            setCategorias([...categorias, categoriaFinal])
        }

        if (isNaN(Number(preco)) || Number(preco) <= 0){
            alert('Preço deve ser número maior que zero')
            return
        }

        if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0){
            alert('Quantidade deve ser um número inteiro ou maior que zero')
            return
        }

        const novo: Produto = {
            id: Date.now(),
            nome,
            codigo: gerarCodigoProduto(),
            preco: Number(preco),
            quantidade: Number(quantidade),
            categoria: categoriaFinal,
        }

        setProdutos([...produtos, novo])
        setShowModalCadastro(false)
        limparFormularioCadastro()
    }

    function limparFormularioCadastro(){
        setNome('')
        setPreco('')
        setQuantidade('')
        setCategoriaSelecionada('')
        setNovaCategoria('')
    }

    // Abrir modal de entrada para um produto
    function abrirEntrada(p: Produto) {
        setProdutoSelecionado(p)
        setQuantEntrada('')
        setShowModalEntrada(true)
    }

     // Confirmar entrada de estoque
    function confirmarEntrada(adicionar: boolean) {
        const quantidade = parseInt(quantEntrada, 10)

        if (isNaN (quantidade) || quantidade <=0){
            alert('Informe uma quantidade válida. ')
            return
        }

        setProdutos((prevProdutos) =>
            prevProdutos.map((p) =>
                p.codigo === produtoSelecionado?.codigo
                    ? {
                        ...p,
                        quantidade: adicionar
                            ? p.quantidade + quantidade
                            : Math.max(0, p.quantidade - quantidade)
                    }
                    : p
            )
        );
        setShowModalEntrada(false)
        setQuantEntrada('')
        setProdutoSelecionado(null)
    }

    return(
        <div className="bg-white rounded-lg p-3 max-w-full mx-auto ">
            <div className="flex justify-between item-center mb-4">
                <h1 className="text-2xl font-bold">Produtos</h1>
                <button
                    onClick={() => setShowModalCadastro(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Novo Produto
                </button>
            </div>

            <input
                type="text"
                placeholder="Buscar por nome, código ou categoria"
                className="border border-gray-300 rounded px-3 py-2 mb4 w-full m-3"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
            <table className="w-full border-collapse m-3">
                <thead>
                    <tr className="bg-white">
                        <th className="border px-4 py-2 text-left">Código</th>
                        <th className="border px-4 py-2 text-left">Nome</th>
                        <th className="border px-4 py-2 text-left">Preço</th>
                        <th className="border px-4 py-2 text-left">Quantidade</th>
                        <th className="border px-4 py-2 text-left">Categoria</th>
                        <th className="border px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtosFiltrados.length === 0 ?(
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                Nenhum produto encontrado
                            </td>
                        </tr>
                    ):(
                        produtosFiltrados.map((p) =>(
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{p.codigo}</td>
                                <td className="border px-4 py-2">{p.nome}</td>
                                <td className="border px-4 py-2">R$ {p.preco.toFixed(2)}</td>
                                <td className="border px-4 py-2">{p.quantidade}</td>
                                <td className="border px-4 py-2">{p.categoria}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => abrirEntrada(p)}
                                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                                        title="Adicionar Estoque"
                                    >
                                        Entrada / Saídda
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal Cadastro */}
            {showModalCadastro && (
                 <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>
                        <div className="space-y-3">
                            <input 
                                type="text" 
                                placeholder="Nome"
                                className="w-full border px-3 py-2 rounded"    
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <input 
                                type="number" 
                                step={0.01}
                                min={0}
                                placeholder="Preço"
                                className="w-full border px-3 py-2 rounded"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                            />

                            <input 
                                type="number" 
                                min={0}
                                placeholder="Quantidade"
                                className="w-full border px-3 py-2 rounded"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                            />
                            <select
                                className="w-full border px-3 py-2 rounded"
                                value={categoriaSelecionada}
                                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categorias.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                                <option value="nova">+ Nova categoria</option>
                            </select>

                            {categoriaSelecionada === 'nova' && (
                                <input
                                    type="text"
                                    placeholder="Digite nova categoria"
                                    className="w-full border px-3 py-2 rounded"
                                    value={novaCategoria}
                                    onChange={(e) => setNovaCategoria(e.target.value)}
                                />
                            )}
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModalCadastro(false)}
                                    className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 border-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={cadastrarProduto}
                                    className="px-4 py-2 rounded text-white bg-blue-600  hover:bg-blue-700 "
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalEntrada && produtoSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">
                        Ajustar Estoque: {produtoSelecionado.nome}
                    </h2>

                    <input
                        type="number"
                        min={1}
                        placeholder="Quantidade"
                        className="w-full border px-3 py-2 rounded mb-4"
                        value={quantEntrada}
                        onChange={(e) => setQuantEntrada(e.target.value)}
                    />

                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setShowModalEntrada(false)}
                            className="px-4 py-2 rounded border bg-gray-300 text-black hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => confirmarEntrada(true)}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Adicionar
                        </button>
                        <button
                            onClick={() => confirmarEntrada(false)}
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                            Dar baixa
                        </button>
                    </div>
                    </div>
                </div>
                )}
        </div>
    )
}