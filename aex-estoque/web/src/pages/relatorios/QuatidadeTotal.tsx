"use client"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Package } from "lucide-react"
import { useState, useEffect } from "react"
import type { Produto } from "../../types/types"

export function QuantidadeTotalEstoque() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/produtos`)
            .then(res => res.json())
            .then(data => setProdutos(data))
            .catch(err => console.error("Erro ao carregar produtos: ", err))
    }, [])
    const quantidadeTotal = produtos.reduce((total, produto) => total + (produto.quantidade ?? 0), 0)
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center space-y-0 justify-between pb-2">
                <CardTitle className="text-sm">Quantidade total</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Label className="flex text-2xl">{quantidadeTotal}</Label>
                <Label className="text-muted-foreground text-xs">Unidades em estoque</Label>
            </CardContent>
        </Card>
    )
}