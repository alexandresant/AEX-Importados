import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { Button } from "../components/ui/button";

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
    async function cadastrarProduto(){
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

        try{
            const response = await fetch("http://192.168.100.44:3001/produtos",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    preco: Number(preco),
                    quantidade: Number(quantidade),
                    categoria: categoriaFinal, codigo: gerarCodigoProduto(),
                }),
            });

            if (!response.ok) throw new Error("Erro ao cadastrar produto")
            
            const produtoCriado = await response.json()

            setProdutos((prev) => [...prev, produtoCriado])
            setShowModalCadastro(false)
            limparFormularioCadastro()
        }
        catch (error){
            alert("Falha ao cadastrar produto: " + error)
        }
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
    async function confirmarEntrada(adicionar: boolean) {
        const quantidadeAjuste = parseInt(quantEntrada, 10);
''
        if (isNaN(quantidadeAjuste) || quantidadeAjuste <= 0) {
            alert("Informe uma quantidade válida.");
            return;
        }

        if (!produtoSelecionado) return;

        const ajuste = adicionar ? quantidadeAjuste : -quantidadeAjuste;

        try {
            const res = await fetch(`http://192.168.100.44:3001/produtos/${produtoSelecionado.codigo}/quantidade`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ajuste }),
            });

            if (!res.ok) {
            throw new Error("Falha ao atualizar quantidade");
            }

            const produtoAtualizado = await res.json();

            setProdutos((prevProdutos) =>
            prevProdutos.map((p) =>
                p.codigo === produtoAtualizado.codigo ? produtoAtualizado : p
            )
            );

            setShowModalEntrada(false);
            setQuantEntrada("");
            setProdutoSelecionado(null);
        } catch (error) {
            alert("Erro ao atualizar quantidade: " + error.message);
        }
        }


    useEffect(() =>{
        fetch("http://192.168.100.44:3001/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error("Erro ao carregar produtos:", err))
    })

    return(
       <div className="bg-white rounded-lg p-2 max-w-full mx-auto overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
                <h1 className="text-2xl font-bold">Produtos</h1>
               <Button
                    onClick={() => setShowModalCadastro(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Novo Produto
                </Button>
            </div>

            <input
                type="text"
                placeholder="Buscar por nome, código ou categoria"
                className="w-full border px-3 py-2 rounded mb-4" 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
             <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Nenhum produto encontrado
                  </td>
                </tr>
              ) : (
                produtosFiltrados.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      <div className="font-medium">{p.nome}</div>
                      <div className="sm:hidden text-xs text-gray-500">{p.codigo}</div>
                      <div className="md:hidden text-xs text-gray-500">R$ {p.preco.toFixed(2)}</div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-900">{p.codigo}</td>
                    <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-900">R$ {p.preco.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.quantidade > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {p.quantidade}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-900">{p.categoria}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => abrirEntrada(p)}
                        className="flex bg-blue-600 mr-2 py-1 px-2 text-xs sm:py-2 sm:px-3 sm:text-sm md:py-2 md:px-4 md:text-base"
                      >
                        <span className="sm:hidden">Estoque</span> 
                        <span className="hidden sm:inline">Entrada / Saída</span>
                      </Button>
                   
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

            {/* Modal Cadastro */}
            {showModalCadastro && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2">
                    <div className="bg-white rounded p-4 w-full max-w-md mx-2">
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
                 <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2">
                    <div className="bg-white rounded p-4 w-full max-w-md mx-2">
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