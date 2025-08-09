"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

const vendas = [
  {
    "id": "VENDA-001",
    "data": "2025-08-01",
    "produto": "Fone de Ouvido Bluetooth TWS",
    "valor": 299.90,
    "quantidade": 1,
    "total": 299.90
  },
  {
    "id": "VENDA-002",
    "data": "2025-08-01",
    "produto": "Mouse Óptico Gamer RGB",
    "valor": 89.50,
    "quantidade": 1,
    "total": 89.50
  },
  {
    "id": "VENDA-003",
    "data": "2025-08-02",
    "produto": "Cabo USB-C 2 metros",
    "valor": 22.50,
    "quantidade": 2,
    "total": 45.00
  },
  {
    "id": "VENDA-004",
    "data": "2025-08-02",
    "produto": "Carregador Portátil 10000mAh",
    "valor": 125.00,
    "quantidade": 1,
    "total": 125.00
  },
  {
    "id": "VENDA-005",
    "data": "2025-08-03",
    "produto": "Teclado Mecânico RGB",
    "valor": 499.90,
    "quantidade": 1,
    "total": 499.90
  },
  {
    "id": "VENDA-006",
    "data": "2025-08-04",
    "produto": "Hub USB 3.0 4 Portas",
    "valor": 75.00,
    "quantidade": 1,
    "total": 75.00
  },
  {
    "id": "VENDA-007",
    "data": "2025-08-04",
    "produto": "Suporte de Celular para Carro",
    "valor": 35.00,
    "quantidade": 1,
    "total": 35.00
  },
  {
    "id": "VENDA-008",
    "data": "2025-08-05",
    "produto": "Película de Vidro iPhone 15",
    "valor": 19.99,
    "quantidade": 1,
    "total": 19.99
  },
  {
    "id": "VENDA-009",
    "data": "2025-08-05",
    "produto": "Webcam Full HD 1080p",
    "valor": 79.90,
    "quantidade": 1,
    "total": 79.90
  },
  {
    "id": "VENDA-010",
    "data": "2025-08-06",
    "produto": "Carregador de Parede Turbo",
    "valor": 59.90,
    "quantidade": 2,
    "total": 119.80
  }
]

export function ResumoVendas(){
    return(
        <Card>
            <CardHeader>
                <CardTitle>Resumo de vendas</CardTitle>
                <CardDescription>Resumo das últimas vendas</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">Data</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead className="hidden md:table-cell">Valor</TableHead>
                            <TableHead>Qtd</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                        <TableBody>
                            {vendas.slice(-5).map((v) => (
                                <TableRow
                                    key={v.id}
                                >
                                    <TableCell className="hidden md:table-cell">{v.data}</TableCell>
                                    <TableCell>{v.produto}</TableCell>
                                    <TableCell className="hidden md:table-cell">R$ {v.valor.toFixed(2)}</TableCell>
                                    <TableCell>{v.quantidade}</TableCell>
                                    <TableCell>R$ {v.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            {vendas.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={3}>Sem vendas para o período</TableCell>
                              </TableRow>
                            )}
                        </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}