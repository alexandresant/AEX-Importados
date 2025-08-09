"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { DollarSign } from "lucide-react"

export function TotalEstoque(){
    return(
        <Card>
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Valor do estoque</CardTitle>
                <DollarSign className="text-muted-foreground h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <Label className="flex text-2xl">R$ 0</Label>
                <Label className="text-muted-foreground text-xs">Valor total</Label>
            </CardContent>
        </Card>
    )
}