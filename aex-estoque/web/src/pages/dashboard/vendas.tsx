"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { DollarSign } from "lucide-react"

export function Vendas(){
    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Vendas</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <Label className="text-2xl flex">R$ 0</Label>
                <Label className="text-muted-foreground text-xs">Total de vendas</Label>
            </CardContent>
        </Card>
    )
}