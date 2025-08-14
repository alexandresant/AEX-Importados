"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { DollarSign } from "lucide-react"
import type { Produto } from "../../types/types"
import { useEffect, useState } from "react"

export function TotalEstoque(){
    const [produtosEstoque, setProdutosEstoque] = useState<Produto[]>([])
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/produtos`)
        .then(res => res.json())
        .then(data => setProdutosEstoque(data))
        .catch(err => console.error("Erro ao carregar produtos: ", err))
    }, [])

    const total = produtosEstoque.reduce((acumulador, item) => {
        return acumulador + item.preco * item.quantidade
    }, 0) 

    return(
        <Card>
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Valor do estoque</CardTitle>
                <DollarSign className="text-muted-foreground h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <Label className="flex text-2xl">R$ {total.toFixed(2)}</Label>
                <Label className="text-muted-foreground text-xs">Valor total</Label>
            </CardContent>
        </Card>
    )
}