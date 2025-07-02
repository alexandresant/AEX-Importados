import { Import } from "lucide-react";
import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Produto } from "../types/produto"
import { Separator } from "../components/ui/separator"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Select, SelectItem } from "../components/ui/select"
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";


export function CadastroForncedor(){
    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([])

    useEffect(() =>{
        fetch("http://192.168.100.44:3001/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error("Erro ao carregar produtos:", err))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const fornecedor = {
            nome,
            contato,
            produtos: produtosSelecionados,
        }

        try{
            const res = await fetch("http://192.168.100.44:3001/fornecedores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fornecedor),
            })

            if (res.ok) {
                alert("Fornecedor cadastrado com sucesso")
                setNome("")
                setContato("")
                setProdutosSelecionados([])
            }
            else{
                alert("Erro ao cadastrar fornecedores.")
            }
        }
        catch (err){
            console.log("Erro na requisição: ", err)
            alert("Erro inesperado ao cadastrar fornecedores.")
        }
    }

    return(
        <div className="max-w-full mx-auto mt-">
            <Card>
                <CardHeader>
                    <h2 className="text-center text-2xl font-semibold">Cadastro de Fornecedor</h2>
                </CardHeader>
                <Separator />
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="contato">Contato</Label>
                            <Input id="contato" value={contato} onChange={e => setContato(e.target.value)} required/>
                        </div>
                        <div>
                            <Label>Produtos Fornecidos</Label>
                            <Select onValueChange={(value) =>{
                                if (!produtosSelecionados.includes(value)){
                                    setProdutosSelecionados(prev => [...prev, value])
                                }
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um produto"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {produtos.map(prod =>(
                                        <SelectItem key={prod.codigo} value={prod.codigo}>
                                            {prod.nome} ({prod.codigo})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {produtosSelecionados.length > 0 && (
                                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                                    {produtosSelecionados.map((codigo, index) =>
                                        <li key={index}>{codigo}</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="items-center">
                        <Button type="submit" className="max-w-xl">Cadastrar Fornecedores</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
