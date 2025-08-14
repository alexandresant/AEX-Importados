import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select" 

export function ShowModalCadastro(props: any){
    return(
        <div>
            <Dialog open={props.open} onOpenChange={props.openChange}>
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="sm:max-w-[425px]"
                >
                    <DialogHeader>
                        <DialogTitle>Cadastrar Produto</DialogTitle>
                        <DialogDescription>Todos os campos são obrigatórios</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-3">
                    <Input 
                        type="text" 
                        placeholder="Nome"
                        className="w-full border px-3 py-2 rounded"    
                        value={props.nome}
                        onChange={(e) => props.setNome(e.target.value)}
                    />

                    <Input 
                        type="number" 
                        step={0.01}
                        min={0}
                        placeholder="Preço"
                        className="w-full border px-3 py-2 rounded"
                        value={props.preco}
                        onChange={(e) => props.setPreco(e.target.value)}
                    />

                    <Input 
                        type="number" 
                        min={0}
                        placeholder="Quantidade"
                        className="w-full border px-3 py-2 rounded"
                        value={props.quantidade}
                        onChange={(e) => props.setQuantidade(e.target.value)}
                    />
                    
                    <Select
                        value={props.categoriaSelecionada}
                        onValueChange={(e) => props.setCategoriaSelecionada(e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Categoria"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {props.categorias.map((cat: any) =>(
                                    <SelectItem
                                        key={cat}
                                        value={cat}
                                    >
                                        {cat}
                                    </SelectItem>
                                ))}
                                <SelectItem value="nova">+ Nova categoria</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {props.categoriaSelecionada === 'nova' && (
                        <Input
                            type="text"
                            placeholder="Digite nova categoria"
                            className=" border px-3 py-2 rounded"
                            value={props.novaCategoria}
                            onChange={(e) => props.setNovaCategoria(e.target.value)}
                        />
                    )}

                    <Select
                        value={props.fornecedorSelecionado}
                        onValueChange={(e) => props.setFornecedorSelecionado(e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um fornecedor"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {props.fornecedor.map((f: any) => (
                                    <SelectItem
                                        key={f.id}
                                        value={f.id}
                                    >
                                        {f.nome}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={props.onConfirm}
                            className="w-full px-4 py-2 rounded text-white bg-blue-600  hover:bg-blue-700 "
                        >
                            Confirmar
                        </Button>
                    </div>
                </div>
                </DialogContent> 

                
            </Dialog>
        </div>
    )
}