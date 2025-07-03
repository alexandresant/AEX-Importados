import { useEffect, useState } from "react"
import { data } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"

import { ShowModalCadastro } from "./ModalCadastroProduto"
import { ShowModalEditar } from "./ModalEditarProduto"

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
    const [showModalEditar, setShowModalEditar] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

    //Campos do formulário de cadastro
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const categoriasBase = ['Eletrônico', 'Acessórios', 'Vestuário', 'Beleza', 'Periféricos']
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
    const [novaCategoria, setNovaCategoria] = useState('')
    const [categorias, setCategorias] = useState<string[]>(categoriasBase)

    const [editando, setEditando] = useState(false)
    const [codEditar, setCodEditar] = useState('')

    //Campo de entrada para o estoque
    const [quantEntrada, setQuantEntrada] = useState('')
    const [nomeEdit, setNomeEdit] = useState('')
    const [categoriaEdit, setCategoriaEdit] = useState('')
    const [quantEdit, setQuantEdit] = useState('')
    const [precoEdit, setPrecoEdit] = useState('')

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
        //setShowModalEntrada(true)
    }

    function editarProduto(p: Produto){
        setEditando(true)
        setProdutoSelecionado(p)
        setNomeEdit(p.nome)
        setPrecoEdit(p.preco.toString())
        setQuantEdit(p.quantidade.toString())
        setShowModalEditar(true)
        setCategoriaEdit(p.categoria)
    }
    //Excluir produto
    async function excluirProduto(){

        if(!produtoSelecionado){
            return
        }
        try{
            const res = await fetch(`http://192.168.100.44:3001/produtos/${produtoSelecionado.codigo}/excluir`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"}
            })
            if (!res.ok){
                throw new Error("Falha ao atualizar")
            }

            const produtoAtualizado = await res.json()

            setProdutos((prevProdutos) =>
                prevProdutos.filter((p) => p.codigo !== produtoSelecionado.codigo)
            )

            setCategoriaEdit('')
            setNomeEdit('')
            setPrecoEdit('')
            setQuantEdit('')
            setShowModalEditar(false)
            setProdutoSelecionado(null)           
        }
        catch (error) {
            alert("Erro ao atualizar quantidade: " + error.message);
        }
    }
    //Confirmar Edição do produto
    async function confirmarEdicao(){
        const quantidadeAjuste = parseInt(quantEdit, 10)
        const nomeAjuste = nomeEdit
        const categoriaAjuste = categoriaEdit
        const precoAjuste = parseFloat(precoEdit)
        const produtoEditado: Partial<Produto> = {
            quantidade: quantidadeAjuste,
            nome: nomeAjuste,
            categoria: categoriaAjuste,
            preco: precoAjuste
        }

        if (!nomeAjuste || !precoAjuste || !quantidadeAjuste || !categoriaAjuste){
            alert("Informe um quantidade válida")
            return
        }
        if (!produtoSelecionado){
            return
        }
        
        try{
            const res = await fetch(`http://192.168.100.44:3001/produtos/${produtoSelecionado.codigo}/editar`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produtoEditado)
            })
            
            if (!res.ok){
                throw new Error("Falha ao atualizar produto")
            }

            const produtoAtualizado = await res.json();

            setProdutos((prevProdutos) =>
                prevProdutos.map((p) =>
                    p.codigo === produtoAtualizado.codigo ? produtoAtualizado : p
                )
            )
            setCategoriaEdit('')
            setNomeEdit('')
            setPrecoEdit('')
            setQuantEdit('')
            setShowModalEditar(false)
            setProdutoSelecionado(null)
            
            await fetch("http://192.168.100.44:3001/produtos")
            .then((res) => res.json())
            .then((data) => setProdutos(data))
            .catch((err) => console.error("Erro ao recarregar produtos:", err));
        }
        catch{
            alert("Erro ao atualizar Produtos")
        }

    }
     // Confirmar entrada de estoque
    async function confirmarEntrada(adicionar: boolean) {
        const quantidadeAjuste = parseInt(quantEntrada, 10);

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

            setShowModalEditar(false);
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
    }, [])

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
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</TableHead>
                <TableHead className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</TableHead>
                <TableHead className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</TableHead>
                <TableHead className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {produtosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              ) : (
                produtosFiltrados.map((p) => (
                  <TableRow key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      <div className="font-medium">{p.nome}</div>
                      <div className="sm:hidden text-xs text-gray-500">{p.codigo}</div>
                      <div className="md:hidden text-xs text-gray-500">{p.categoria}</div>
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
                        onClick={() => editarProduto(p)}
                        className="flex bg-blue-600 mr-2 py-1 px-2 text-xs sm:py-2 sm:px-3 sm:text-sm md:py-2 md:px-4 md:text-base"
                      >
                        <span className="hidden sm:inline">Editar</span>
                      </Button>
                   
                    </td>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

        {/* Modal Cadastro */}
        {showModalCadastro && (
        <ShowModalCadastro 
            nome={nome}
            setNome={setNome}
            preco={preco}
            setPreco={setPreco}
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            novaCategoria={novaCategoria}
            setNovaCategoria={setNovaCategoria}
            categorias={categorias}
            setCategorias={setCategorias}
            onCancel={() =>setShowModalCadastro(false)}
            onConfirm = {cadastrarProduto}
            onClick = {() => excluirProduto()}
            />
        )}
        {showModalEditar && produtoSelecionado && (
            <ShowModalEditar 
                nomeEdit={nomeEdit}
                setNomeEdit={setNomeEdit}
                precoEdit={precoEdit}
                setPrecoEdit={setPrecoEdit}
                quantEdit={quantEdit}
                setQuantEdit={setQuantEdit}
                categoriaEdit={categoriaEdit}
                setCategoriaEdit={setCategoriaEdit}
                categorias={categorias}
                novaCategoria={novaCategoria}
                setNovaCategoria={setNovaCategoria}
                onCancel={()=> setShowModalEditar(false)}
                onConfirm={confirmarEdicao}
                onClick = {excluirProduto}
            />
        )}
    </div>
    )
}