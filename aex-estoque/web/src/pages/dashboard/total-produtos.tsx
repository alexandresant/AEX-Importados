import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Package } from "lucide-react"

import { Label } from "../../components/ui/label"
export function TotalProdutos(){

    return(
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Total Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
              <CardContent>
                    <Label className="text-2xl flex">0</Label>
                    <Label className="text-muted-foreground text-xs">Produtos cadastrados</Label>
                </CardContent>
        </Card>
    )
}