"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { EstoqueProps } from "../../types/types"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"

export function RelatorioVendas() {
    const [estoque, setEstoque] = useState<EstoqueProps[]>([])
    const [dataInicio, setDataInicio] = useState<string>("")
    const [dataFim, setDataFim] = useState<string>("")

    useEffect(() => {
        fetch("http://192.168.100.44:3001/estoque")
            .then(res => res.json())
            .then(data => setEstoque(data))
            .catch(err => console.error("Erro ao carregar produtos:", err))
    }, [])

    const vendas = estoque
        .filter(venda => venda.motivoSaida === "VENDA")
        .filter(venda => {
            if (dataInicio && dataFim) {
                const dataVenda = venda.dataMovimentacao.split('T')[0] // só a parte da data
                return dataVenda >= dataInicio && dataVenda <= dataFim
            }
            return true
        })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumo de vendas</CardTitle>
                <CardDescription>Resumo das últimas vendas</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-between pace-y-0">
                    <div>
                        <Label className="block text-sm font-medium">Data Início</Label>
                        <Input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium">Data Fim</Label>
                        <Input
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">Data</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead className="hidden md:table-cell">Valor</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vendas.map((v) => {
                            const data = new Date(v.dataMovimentacao)
                            const dataFormatada = `${data.toLocaleDateString('pt-BR')}`
                            return (
                                <TableRow key={v.id}>
                                    <TableCell className="hidden md:table-cell">{dataFormatada}</TableCell>
                                    <TableCell>{v.produto?.nome}</TableCell>
                                    <TableCell className="hidden md:table-cell">R$ {v.produto?.preco.toFixed(2)}</TableCell>
                                    <TableCell className="text-center">{v.quantidade}</TableCell>
                                    <TableCell>R$ {(v.quantidade * v.produto?.preco).toFixed(2)}</TableCell>
                                </TableRow>
                            )
                        })}
                        {vendas.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">Sem vendas para o período</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
