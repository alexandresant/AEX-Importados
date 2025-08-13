import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Package } from "lucide-react"
import { Produto } from "../../types/types"

import { Label } from "../../components/ui/label"
import { useEffect, useState } from "react"
export function TotalProdutos(){
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        fetch("http://192.168.100.44:3001/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error("Erro ao carregar produtos: ", err))
    })

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