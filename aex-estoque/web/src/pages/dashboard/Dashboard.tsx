import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

import { TotalProdutos } from "./TotalProdutos"
import { Vendas } from "./Vendas"
import { TotalEstoque } from "./ValorEstoque"
import { BaixoEstoque } from "./BaixoEstoque"
import { ResumoVendas } from "./ResumoVendas"
import { BaixoEstoqueTable } from "./BaixoEstoqueTable"

export function DashBoardPage(){

    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Dashboard</CardTitle>
                <CardDescription>Visão geral estoque e fornecedores</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Vendas />
                    <TotalEstoque />
                    <TotalProdutos />
                    <BaixoEstoque />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <ResumoVendas />
                    <BaixoEstoqueTable />
                </div>
            </CardContent>
        </Card>
    )
}