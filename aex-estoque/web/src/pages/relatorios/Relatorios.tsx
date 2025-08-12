"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Table } from "../../components/ui/table"
import { Package, DollarSign, FileText } from "lucide-react"

export function Relatorios(){
    
    return(
        <Card>
            <CardHeader>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Relatórios completos, estoque e venda</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    
                </div>
            </CardContent>
        </Card>
    )
}