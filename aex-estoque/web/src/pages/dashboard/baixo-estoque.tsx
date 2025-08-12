"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { TrendingUp } from "lucide-react"
import { Produto } from "../../types/types"
import { useEffect, useState } from "react"

export function BaixoEstoque(){
    const [produtos, setProdutos] = useState<Produto[]>([])

    const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5).length
    
      useEffect(() =>{
        fetch("http://192.168.100.44:3001/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error("Erro ao carregar produtos: " + err))
      })

    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Baixo estoque</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <Label className="flex text-2xl">{produtosEstoqueBaixo}</Label>
                <Label className="text-xs text-muted-foreground">Produtos com pouco estoque</Label>
            </CardContent>
        </Card>
    )
}