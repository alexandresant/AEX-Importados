"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Package } from "lucide-react"
import { useState, useEffect } from "react"
import type { Produto } from "../../types/types"

export function TotalItensEstoque(){
const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/produtos`)
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error("Erro ao carregar produtos: ", err))
    }, [])

    const qtdProdutos = produtos.length
    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Total Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
              <CardContent>
                    <Label className="text-2xl flex">{qtdProdutos}</Label>
                    <Label className="text-muted-foreground text-xs">Produtos cadastrados</Label>
                </CardContent>
        </Card>
    )
}