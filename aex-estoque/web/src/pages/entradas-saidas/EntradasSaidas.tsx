import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { ChevronDownIcon, Save } from "lucide-react"
import { Input } from "../../components/ui/input"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"
import { EstoqueProps } from "../../types/types"
import { Produto } from "../../types/types"

const motivosEntrada = [
  { value: "COMPRA", label: "Compra" },
  { value: "DEVOLUCAO", label: "Devolução" },
  { value: "AJUSTE_ESTOQUE", label: "Ajuste de estoque" },
]

const motivosSaida = [
  { value: "VENDA", label: "Venda" },
  { value: "CONSUMO_INTERNO", label: "Consumo Interno" },
  { value: "TROCA", label: "Troca" },
  { value: "PERDA", label: "Perda/Avaria" },
  { value: "AJUSTE_ESTOQUE", label: "Ajuste de estoque" },
]

const formSchemaEntrada = z.object({
    produtoId: z.number().min(1, "Selecione um produto válido!" ),
    quantidadeEntrada: z.number().min(1, "Quantidade é obrigatório").positive(),
    motivoEntrada: z.enum(["COMPRA","DEVOLUCAO", "AJUSTE_ESTOQUE"], "Você deve indicar um motivo de entrada"),
    tipoMovimentacao: z.enum(["ENTRADA"], "Você deve indicar um tipo movimentação"),
    usuarioId: z.number().min(1, "Usuario inválido")

})

const formSchemaSaida = z.object({
    produtoId: z.number().min(1, "Selecione um produto válido!"),
    quantidadeSaida: z.number().min(1, "Quantidade é obrigatório").positive(),
    motivoSaida: z.enum(["VENDA", "CONSUMO_INTERNO", "TROCA", "PERDA", "AJUSTE_ESTOQUE"]),
    tipoMovimentacao: z.enum(["SAIDA"], "Você deve indicar um tipo movimentação"),
    usuarioId: z.number().min(1, "Usuario inválido")

})

export function EntradasSaidas(){

    const [openPopoverEntrada, setOpenPopoverEntrada] = useState(false)
    const [openPopoverSaida, setOpenPopoverSaida] = useState(false)
    const [formKeyEntrada, setFormKeyEntrada] = useState(Date.now())
    const [formKeySaida, setFormKeySaida] = useState(Date.now())

    const [produtos, setProdutos] = useState<Produto[]>([])

    let estoque: EstoqueProps[] = []

    type SaidaFormData = z.infer<typeof formSchemaSaida>
    type EntradaFormData = z.infer<typeof formSchemaEntrada>

    const formEntrada = useForm<EntradaFormData>({
        resolver: zodResolver(formSchemaEntrada),
        defaultValues: {
            produtoId: 0,
            quantidadeEntrada: 0,
            motivoEntrada: undefined,
            tipoMovimentacao: "ENTRADA",
            usuarioId: 0
        }
     
    })

    const formSaida = useForm<SaidaFormData>({
        resolver:zodResolver(formSchemaSaida),
        defaultValues: {
            produtoId: 0,
            quantidadeSaida: 0,
            motivoSaida: undefined,
            tipoMovimentacao: "SAIDA",
            usuarioId: 0
        }
    })

    function onSubmitEntrada(data: EntradaFormData){
        movimentacaoEstoqueEntrada(data)
        entradaSaidaEstoque(true)

        formEntrada.reset({
            produtoId: 0,
            quantidadeEntrada: 0,
            motivoEntrada: undefined,
            tipoMovimentacao: "ENTRADA",
            usuarioId: data.usuarioId
        })
        setFormKeyEntrada(Date.now())
    }

    function onSubmitSaida(data: SaidaFormData){
        movimentacaoEstoqueSaida(data)
        entradaSaidaEstoque(false)

        formSaida.reset({
            produtoId: 0,
            quantidadeSaida: 0,
            motivoSaida: undefined,
            tipoMovimentacao: "SAIDA",
            usuarioId: data.usuarioId
        })
        setFormKeySaida(Date.now())
    }

    async function movimentacaoEstoqueEntrada(data: EntradaFormData){
        try{
            const response = await fetch("http://192.168.100.44:3001/estoque", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    produtoId: data.produtoId,
                    quantidade: data.quantidadeEntrada,
                    motivoEntrada: data.motivoEntrada,
                    tipoMovimentacao: data.tipoMovimentacao,
                    usuarioId: data.usuarioId
                })
            })

            if(!response){
                throw new Error("Erro ao cadastrar movimentação de estoque!")
            }
        }
        catch(error){
            alert("Falha ao cadastrar movimentação de estoque")
        }
    }

    async function movimentacaoEstoqueSaida(data: SaidaFormData){
        try{
            const response = await fetch("http://192.168.100.44:3001/estoque", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    produtoId: data.produtoId,
                    quantidade: data.quantidadeSaida,
                    motivoSaida: data.motivoSaida,
                    tipoMovimentacao: data.tipoMovimentacao,
                    usuarioId: data.usuarioId
                })
            })
            if(!response){
                throw new Error("Erro ao cadastrar movimentação de estoque!")
            }
        }
        catch(error){
            alert("Falha ao cadastrar movimentação de estoque")
        }
    }

    async function entradaSaidaEstoque(adicionar: Boolean){
        const entradaEstoque = formEntrada.getValues("quantidadeEntrada")
        const saidaEstoque = formSaida.getValues("quantidadeSaida")
        const produtoSelecionado = formEntrada.getValues("produtoId") || formSaida.getValues("produtoId")

        if (!entradaEstoque && !saidaEstoque){
            alert("Informe uma quantidade válida")
            return
        }
        if (!produtoSelecionado){
            return
        }

        const ajuste = adicionar ? entradaEstoque : -saidaEstoque

        try{
            const response = await fetch(`http://192.168.100.44:3001/produtos/${produtoSelecionado}/quantidade`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ajuste }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erro ao atualizar a quantidade")
            }
        }
        catch(error: any){
            alert(error.message)
        }
    }

    useEffect(() => {
        fetch("http://192.168.100.44:3001/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error("Erro ao carregar produtos: ", err))
    }, [])

    useEffect(() => {
        const usuarioIdSalvo = localStorage.getItem("usuarioId")
        if(usuarioIdSalvo){
            formEntrada.setValue("usuarioId", Number(usuarioIdSalvo))
            formSaida.setValue("usuarioId", Number(usuarioIdSalvo))
        }
        console.log(usuarioIdSalvo)
    }, [])

    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Entradas e Saídas</CardTitle>
                    <CardDescription>Registrar Entradas e Saídas</CardDescription>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Entradas</CardTitle>
                            <CardDescription>Registrar Entradas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form
                                key={formKeyEntrada}
                                {...formEntrada}
                            >
                                <form onSubmit={formEntrada.handleSubmit(onSubmitEntrada)}>
                                    <FormField
                                        control={formEntrada.control}
                                        name="produtoId"
                                        render={({ field }) =>(
                                            <FormItem>
                                                <FormLabel>Produto</FormLabel>
                                                <FormControl>
                                                    <Popover open={openPopoverEntrada} onOpenChange={setOpenPopoverEntrada}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={openPopoverEntrada}
                                                                className={cn(
                                                                    "w-full justify-between hover:bg-transparent font-normal",
                                                                    !field.value ? "text-muted-foreground hover:text-muted-foreground" : ""
                                                                )}
                                                            >
                                                                {produtos.find(f => f.id === field.value)?.nome ?? "Selecione um produto"}                                                               
                                                                <ChevronDownIcon 
                                                                    size={16}
                                                                    className="text-muted-foreground/80 shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0" align="start">
                                                            <Command>
                                                                <CommandInput placeholder="Pesquisar produto" />
                                                                <CommandList>
                                                                    <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {produtos.map((p) =>(
                                                                            <CommandItem 
                                                                                key={p.id}
                                                                                value={p.nome}
                                                                                onSelect={() =>{
                                                                                    field.onChange(p.id)
                                                                                    setOpenPopoverEntrada(false)
                                                                                }}
                                                                            >
                                                                                {p.nome}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>  
                                                <FormMessage />          
                                            </FormItem>
                                        )}
                                    />

                                    <FormField 
                                        control={formEntrada.control}
                                        name="quantidadeEntrada"
                                        render={({ field }) =>(
                                            <FormItem>
                                                <FormLabel>Quantidade</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number"
                                                        placeholder="Digite a quantidade"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage /> 
                                            </FormItem>
                                            
                                        )}
                                    />

                                    <FormField 
                                        control={formEntrada.control}
                                        name="motivoEntrada"
                                        render={({ field }) =>(
                                            <FormItem>
                                                <FormLabel>Motivo</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione um motivo"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {motivosEntrada.map((m) =>(
                                                                <SelectItem
                                                                    key={m.value}
                                                                    value={m.value}
                                                                >
                                                                    {m.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button 
                                        className="w-full mt-2 bg-blue-700 hover:bg-blue-600"
                                        type="submit"
                                    >
                                        Registrar entrada
                                        <Save />
                                    </Button>  
                                     
                                </form>
                            </Form>               
                        </CardContent>
                    </Card>
                        
                    <Card>
                        <CardHeader>
                            <CardTitle>Saídas</CardTitle>
                            <CardDescription>Registrar Saídas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form 
                                key={formKeySaida}
                                {...formSaida}
                            >
                                <form onSubmit={formSaida.handleSubmit(onSubmitSaida)}>
                                    <FormField 
                                        control={formSaida.control}
                                        name="produtoId"
                                        render={({ field })=>(
                                            <FormItem>
                                                <FormLabel>Produto</FormLabel>
                                                <FormControl>
                                                    <Popover open={openPopoverSaida} onOpenChange={setOpenPopoverSaida}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={openPopoverSaida}
                                                                className={cn(
                                                                    "w-full justify-between hover:bg-transparent font-normal",
                                                                    !field.value ? "text-muted-foreground hover:text-muted-foreground" : ""
                                                                )}
                                                            >
                                                                {produtos.find(f => f.id === field.value)?.nome ?? "Selecione um produto"}
                                                                <ChevronDownIcon
                                                                    size={16}
                                                                    className="text-muted-foreground/80 shrink-0"
                                                                    aria-hidden="true" 
                                                                />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0" align="start">
                                                            <Command>
                                                                <CommandInput placeholder="Pesquisar produto"/>
                                                                <CommandList>
                                                                    <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {produtos.map((p) =>(
                                                                            <CommandItem
                                                                                key={p.id}
                                                                                value={p.nome}
                                                                                onSelect={() =>{
                                                                                    field.onChange(p.id)
                                                                                    setOpenPopoverSaida(false)
                                                                                }}
                                                                            >   
                                                                                {p.nome}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField 
                                        control={formSaida.control}
                                        name="quantidadeSaida"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantidade</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number"
                                                        placeholder="Digite uma quantidade"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                    />

                                    <FormField 
                                        control={formSaida.control}
                                        name="motivoSaida"
                                        render={({ field }) =>(
                                            <FormItem>
                                                <FormLabel>Motivo Saída</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione um motivo"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {motivosSaida.map((m) =>(
                                                                <SelectItem
                                                                    key={m.value}
                                                                    value={m.value}
                                                                >
                                                                    {m.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <Button 
                                        className="w-full mt-2 bg-blue-700 hover:bg-blue-600"  
                                        type="submit"
                                    >
                                        
                                        Registrar Saída
                                        <Save />
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
    
}