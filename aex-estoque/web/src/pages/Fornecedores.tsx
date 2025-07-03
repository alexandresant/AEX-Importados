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

    const [showModalCadastro, setShowModalCadastro] = useState(false)

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
        </div>
    )
}
