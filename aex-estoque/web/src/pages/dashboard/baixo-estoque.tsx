"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { TrendingUp } from "lucide-react"

export function BaixoEstoque(){
    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Baixo estoque</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <Label className="flex text-2xl">0</Label>
                <Label className="text-xs text-muted-foreground">Produtos com pouco estoque</Label>
            </CardContent>
        </Card>
    )
}