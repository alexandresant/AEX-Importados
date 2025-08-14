"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { TotalItensEstoque } from "./TotalItens"
import { QuantidadeTotalEstoque } from "./QuatidadeTotal"
import { TotalVendas } from "./TotalVendas"
import { ValorEstoque } from "./ValorEstoque"
import { RelatoriosEstoque } from "./RelatoriosEstoque"
import { RelatorioVendas } from "./RelatorioVendas"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../components/ui/select"
import { useState } from "react"

const relatorio = [
    {value: "vendas", label: "Relatório de vendas"},
    {value: "estoque", label: "Relatórios de estoque"},
    {value: "nenhum", label: "Selecione um relatório"}
]

export function Relatorios(){
    const [tipoRelatorio, setTipoRelatorio] = useState("nenhum")
    
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Relatórios</CardTitle>
                <CardDescription>Relatórios completos, estoque e venda</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <TotalItensEstoque />
                    <QuantidadeTotalEstoque />
                    <TotalVendas />
                    <ValorEstoque />
                </div>
                {/* Select para escolher o relatório */}
        <div className="mt-4 w-64">
          <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um relatório" />
            </SelectTrigger>
            <SelectContent>
              {relatorio.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
                {/* Renderização condicional */}
        <div className="mt-4 w-full overflow-x-auto">
          {tipoRelatorio === "estoque" && <RelatoriosEstoque />}
          {tipoRelatorio === "vendas" && <RelatorioVendas />}
        </div>
            </CardContent>
        </Card>
    )
}