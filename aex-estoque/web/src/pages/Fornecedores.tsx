import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Produto } from "../types/produto"
import { Separator } from "../components/ui/separator"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Select, SelectItem } from "../components/ui/select"
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { ModalCadastroFornecedores } from "./ModalCadastroFornecedores"

import { Fornecedor } from "../types/fornecedores"


export function CadastroFornecedor(){
    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState<Fornecedor | null>(null)

    const [showModalCadastro, setShowModalCadastro] = useState(false)
    const [busca, setBusca] = useState('')

    const fornecedoreFiltrados = fornecedores.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.contato.toLowerCase().includes(busca.toLowerCase())
    )

    function gerarCodigo(){
        return `FORN-${Date.now()}`
    }

    async function cadastrarFornecedor(){
        let fornecedor: Fornecedor
        fornecedor ={
            nome,
            contato,
            telefone,
            email
        }
        setFornecedores((prev)=>[...prev, fornecedor])
   }

   function editarFornecedor(){

   }


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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</TableHead>
                                <TableHead className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</TableHead>
                                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</TableHead>
                                <TableHead className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
                                <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fornecedores.map((p)=>
                                <TableRow >
                                    <TableCell>{p.nome}</TableCell>
                                    <TableCell>{p.contato}</TableCell>
                                    <TableCell>{p.telefone}</TableCell>
                                    <TableCell>{p.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            onClick={editarFornecedor}
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
                            openChange={setShowModalCadastro}    
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
                </CardContent>
            </Card>
        </div>
    )
}
