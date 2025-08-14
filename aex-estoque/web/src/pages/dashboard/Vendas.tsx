"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { DollarSign } from "lucide-react"
import type { EstoqueProps } from "../../types/types"

export function Vendas(){
    const [estoque, setEstoque] = useState<EstoqueProps[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/estoque`)
        .then(res => res.json())
        .then(data => setEstoque(data))
        .catch(err => console.error("Erro ao carregar vendas: ", err))
    }, [])
    
    const vendas = estoque.filter(venda => venda.motivoSaida == "VENDA")

    const total = vendas.reduce((acumulador, item) => {
        return acumulador + item.quantidade * item.produto.preco
    }, 0)

    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Vendas</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <Label className="text-2xl flex">R$ {total.toFixed(2)}</Label>
                <Label className="text-muted-foreground text-xs">Total de vendas</Label>
            </CardContent>
        </Card>
    )
}