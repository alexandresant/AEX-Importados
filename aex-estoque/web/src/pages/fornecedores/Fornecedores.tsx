import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ModalCadastroFornecedores } from "./ModalCadastroFornecedores"

import type { Fornecedor } from "../../types/fornecedores"
import { ModalEditarFornecedores } from "./ModalEditarFornecedores"


export function CadastroFornecedor(){
    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState<Fornecedor | null>(null)

    const [showModalCadastro, setShowModalCadastro] = useState(false)
    const [showModalEditar, setShowModalEditar] = useState(false)
    const [busca, setBusca] = useState('')

    {/*const fornecedoreFiltrados = fornecedores.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.contato.toLowerCase().includes(busca.toLowerCase())
    )*/}

    function gerarCodigo(){
        return `FORN-${Date.now()}`
    }

    function limparFormularioCadastro(){
        setNome("")
        setContato("")
        setTelefone("")
        setEmail("")
    }

    //função para cadastrar novos produtos
    async function cadastrarFornecedor(){
        //verifica se todos os campos foram preenchidos
        if (!nome || !contato || !telefone || !email){
            alert("Preencha todos os campos obrigatórios")
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/fornecedores`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    contato,
                    telefone,
                    email,
                    codigo: gerarCodigo()
                })
            })

            if (!response){
                throw new Error("Erro ao cadastrar fornecedor")
            } 
            
            const fornecedorCriado = await response.json()
            
            setFornecedores((prev) => [...prev, fornecedorCriado])
            setShowModalCadastro(false)
            limparFormularioCadastro()
        }   
        catch (error){
            alert("Falha ao cadastrar fornecedor: " + error)
        }
   }
   async function confirmarEdicao(){
    const nomeAjuste =  nome
    const contatoAjuste = contato
    const emailAjuste = email
    const telefoneAjuste = telefone

    const fornecedorEditado: Partial<Fornecedor> ={
        nome: nomeAjuste,
        contato: contatoAjuste,
        email: emailAjuste,
        telefone: telefoneAjuste
    }

    if(!nomeAjuste || !contatoAjuste || !emailAjuste || !telefoneAjuste){
        console.log("Nome: ", nomeAjuste)
        alert("Todos os campos devem estar preenchidos!")
        return
    }
    if(!fornecedorSelecionado){
        console.log("Nome: ", nomeAjuste)
        return
    }

    try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fornecedores/${fornecedorSelecionado.codigo}/editar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fornecedorEditado)
        })

        if(!res.ok){
            throw new Error("Falha ao atualizar fornecedor")
        }

        const fornecedorAtualizado = await res.json()

        setFornecedores((prevFornecedor) =>
            prevFornecedor.map((p) =>
                p.codigo === fornecedorAtualizado.codigo ? fornecedorAtualizado : p
            )
        )
        setNome("")
        setContato("")
        setEmail("")
        setTelefone("")
        setShowModalEditar(false)
        setFornecedorSelecionado(null)

        await fetch(`${import.meta.env.VITE_API_URL}/fornecedores`)
        .then((res) => res.json())
        .then((data) => setFornecedores(data))
        .catch((err) => console.error("Erro ao recarregar produtos: ", err))
    }
    catch{
        alert("Erro ao atualizar Fornecedores")
    }
    
   }

    function editarFornecedor(p: Fornecedor){
        setNome(p.nome)
        setContato(p.contato)
        setTelefone(p.telefone)
        setEmail(p.email)
        setShowModalEditar(true)
        setFornecedorSelecionado(p)
    }

    async function excluirFornecedor(){
        if(!fornecedorSelecionado){
            return
        }
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/fornecedores/${fornecedorSelecionado.codigo}/excluir`,{
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            if(!res.ok){
                throw new Error("Falha ao excluir fornecedor")
            }
            //const fornecedorAtualizado = await res.json()

            setFornecedores((prevFornecedor) =>
                prevFornecedor.filter((f) => f.codigo !== fornecedorSelecionado.codigo)
            )
            setNome("")
            setContato("")
            setEmail("")
            setTelefone("")
            setShowModalEditar(false)
        }
        catch(error){
            alert("Erro ao excluir fornecedor: " + error)
        }
    }

   useEffect(() =>{
    fetch(`${import.meta.env.VITE_API_URL}/fornecedores`)
    .then(res => res.json())
    .then(data => setFornecedores(data))
    .catch(err => console.error("Erro ao carregar fornecedores: ", err))
   }, [])

   useEffect(() =>{
    if(!showModalEditar){
        limparFormularioCadastro()
    }
   }, [showModalEditar])

    return(
        <div className="bg-white rounded-lg p-2 max-w-full mx-auto overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
                <h1 className="text-2xl font-bold">Fornecedores</h1>
                <Button
                    onClick={()=> setShowModalCadastro(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Novo Fornecedor
                </Button>
            </div>
            <Input 
                placeholder="Busca por nome ou contato"
                value={busca}
                onChange={(e)=> setBusca(e.target.value)}
                className="mb-2"
            />
            <Card>
                <CardContent>
                    <Table className="min-w-full divide-y divide-gray-200">
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</TableHead>
                                <TableHead className="hidden md:table-cell px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</TableHead>
                                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</TableHead>
                                <TableHead className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
                                <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white divide-y divide-gray-200"> 
                            {fornecedores.map((p)=>
                                <TableRow key={p.codigo}>
                                    <TableCell >{p.nome}</TableCell>
                                    <TableCell className="hidden md:table-cell px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{p.contato}</TableCell>
                                    <TableCell>{p.telefone}</TableCell>
                                    <TableCell className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{p.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            onClick={() => editarFornecedor(p)}
                                            className="bg-blue-600"
                                        >
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {showModalCadastro &&
                        <ModalCadastroFornecedores 
                            open={showModalCadastro}
                            openChange={(isOpen: any) =>{
                                setShowModalCadastro(isOpen)
                                if(!isOpen){
                                    limparFormularioCadastro()
                                }
                            }}    
                            nome={nome}
                            setNome={setNome}
                            contato={contato}
                            setContato={setContato}
                            telefone={telefone}
                            setTelefone={setTelefone}
                            email={email}
                            setEmail={setEmail}
                            onConfirm={cadastrarFornecedor}
                        />
                    }

                    {showModalEditar && 
                        <ModalEditarFornecedores 
                            open={showModalEditar}
                            openChange={(isOpen) =>{
                                setShowModalEditar(isOpen)
                                if(!isOpen){
                                    limparFormularioCadastro()
                                    setFornecedorSelecionado(null)
                                }
                            }}
                            nome={nome}
                            setNome={setNome}
                            contato={contato}
                            setContato={setContato}
                            telefone={telefone}
                            setTelefone={setTelefone}
                            email={email}
                            setEmail={setEmail}
                            onConfirm={confirmarEdicao}
                            onDelete={excluirFornecedor}
                        />
                    }
                </CardContent>
            </Card>
        </div>
    )
}
