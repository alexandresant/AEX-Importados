"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { EstoqueProps, Produto } from "../../types/types"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const tiposRelatorios = [
    { value: "estoque_atual", label: "Estoque atual" },
    { value: "movimentacoes_estoque", label: "Movimentações de estoque" },
]

export function RelatoriosEstoque() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [estoque, setEstoque] = useState<EstoqueProps[]>([])
    const [tipoRelatorio, setTipoRelatorio] = useState("estoque_atual")
    const [dataInicio, setDataInicio] = useState("")
    const [dataFim, setDataFim] = useState("")

    useEffect(() => {
        fetch("http://192.168.100.44:3001/produtos")
            .then(res => res.json())
            .then(data => setProdutos(data))
            .catch(err => console.error("Erro ao carregar produtos: ", err))
    }, [])

    useEffect(() => {
        fetch("http://192.168.100.44:3001/estoque")
            .then(res => res.json())
            .then(data => setEstoque(data))
            .catch(err => console.error("Erro ao carregar movimentações", err))
    }, [])

    const renderRelatorioEstoque = () => {
        switch (tipoRelatorio) {
            case "estoque_atual":
                return (
                    <Card className="w-[300px] md:w-full border-0">
                        <CardHeader>
                            <CardTitle>Relatório detalhado de estoque</CardTitle>
                            <CardDescription>Lista completa de produtos no estoque</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table className="min-w-[960px] table-fixed">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Código</TableHead>
                                        <TableHead>Produto</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Quantidade</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead>Valor Total</TableHead>
                                        <TableHead>Fornecedor</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {produtos.map((p) => {
                                        const valorTotal = p.preco * p.quantidade
                                        return (
                                            <TableRow key={p.id}>
                                                <TableCell>{p.codigo}</TableCell>
                                                <TableCell>{p.nome}</TableCell>
                                                <TableCell>{p.categoria}</TableCell>
                                                <TableCell>{p.quantidade}</TableCell>
                                                <TableCell>R$ {p.preco.toFixed(2)}</TableCell>
                                                <TableCell>R$ {valorTotal.toFixed(2)}</TableCell>
                                                <TableCell>{p.fornecedor?.nome}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {produtos.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center">Nenhum produto encontrado</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )
            case "movimentacoes_estoque":
                const movimentacoesFiltradas = estoque.filter(mov => {
                    if (dataInicio && dataFim) {
                        const dataMov = mov.dataMovimentacao.split("T")[0]
                        return dataMov >= dataInicio && dataMov <= dataFim
                    }
                    return true
                })

                return (
                    <Card className="w-[300px] md:w-full border-0">
                        <CardHeader className="flex flex-col md:flex-row justify-between items-start space-y-2 md:space-y-0">
                            <div>
                                <CardTitle>Filtrar por período</CardTitle>
                                <CardDescription>Selecione o intervalo de datas para filtrar</CardDescription>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between md:space-y-0">
                                <Label className="block text-sm font-medium">Data Início</Label>
                                <Input
                                    type="date"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    className="border rounded px-2 py-1"
                                    placeholder="Data início"
                                />
                                <Label className="block text-sm font-medium">Data Fim</Label>
                                <Input
                                    type="date"
                                    value={dataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                    className="border rounded px-2 py-1"
                                    placeholder="Data fim"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Relatório de movimentações de estoque</CardTitle>
                                    <CardDescription>
                                        {dataInicio && dataFim
                                            ? `Período: ${dataInicio} até ${dataFim} (${movimentacoesFiltradas.length} registros)`
                                            : `Todas as movimentações (${movimentacoesFiltradas.length} registros)`}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table className="min-w-[960px] table-fixed">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Data</TableHead>
                                                <TableHead>Produto</TableHead>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>Motivo</TableHead>
                                                <TableHead className="text-right">Quantidade</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {movimentacoesFiltradas.map((mov) => {
                                                const dataFormatada = new Date(mov.dataMovimentacao).toLocaleDateString("pt-BR")
                                                return (
                                                    <TableRow key={mov.id}>
                                                        <TableCell>{dataFormatada}</TableCell>
                                                        <TableCell>{mov.produto?.nome}</TableCell>
                                                        <TableCell>{mov.tipoMovimentacao.toLowerCase()}</TableCell>
                                                        <TableCell>{(mov.motivoEntrada || mov.motivoSaida).toLowerCase()}</TableCell>
                                                        <TableCell className="text-right">{mov.quantidade}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                            {movimentacoesFiltradas.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center">Nenhuma movimentação encontrada</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                )
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                <div>
                    <CardTitle>Relatórios de estoque e movimentações</CardTitle>
                    <CardDescription>Selecione o tipo de relatório que deseja visualizar</CardDescription>
                </div>
                <div className="w-64">
                    <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo de relatório" />
                        </SelectTrigger>
                        <SelectContent>
                            {tiposRelatorios.map((tipo) => (
                                <SelectItem key={tipo.value} value={tipo.value}>
                                    {tipo.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            {renderRelatorioEstoque()}
        </Card>
    )
}
