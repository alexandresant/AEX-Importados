import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../components/ui/select"
import { Label } from "../../components/ui/label"

export function ShowModalEditar(props){
    console.log(props.value)
    return(
        <div>
            <Dialog 
              open={props.open}
              onOpenChange={props.openChange}  
            >
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="sm:max-w-[425px]"
                >
                    <DialogHeader>
                        <DialogTitle>Ajustar Estoque: {props.nomeEdit}</DialogTitle>
                    </DialogHeader>
                    <Label>Nome</Label>
                    <Input 
                        type="text" 
                        placeholder="Nome"
                        className="w-full px-3 py-2"
                        value={props.nomeEdit}
                        onChange={(e) => props.setNomeEdit(e.target.value)}
                    />

                    <Label>Preço</Label>
                    <Input 
                        type="text"
                        placeholder="Preço"
                        className="w-full px-3 py-2"
                        value={props.precoEdit}
                        onChange={(e) => props.setPrecoEdit(e.target.value)}
                    />

                    <Label>Quantidade</Label>
                    <Input
                        type="number"
                        min={1}
                        placeholder="Quantidade"
                        className="w-full border px-3 py-2"
                        value={props.quantEdit}
                        onChange={(e) => props.setQuantEdit(e.target.value)}
                    />

                    <Label>Categoria</Label>
                    <Select
                        value={props.categoriaEdit}
                        onValueChange={(e) => props.setCategoriaEdit(e)}
                    >
                        <SelectTrigger>
                            <SelectValue  className="Selecione uma categoria"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {props.categorias.map((cat) => (
                                    <SelectItem
                                        key={cat}
                                        value={cat}
                                    >
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
               
                {props.categoriaEdit === 'nova' && (
                    <input
                        type="text"
                        placeholder="Digite nova categoria"
                        className="w-full border px-3 py-2 rounded"
                        value={props.novaCategoria}
                        onChange={(e) => props.setNovaCategoria(e.target.value)}
                    />
                )}   

                    <div className="mt-2 flex justify-end space-x-2">
                        <Button
                            onClick={props.onConfirm}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Adicionar
                        </Button>
                        <Button
                            onClick={props.onClick}
                            
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                            Excluir
                        </Button>
                    </div>
                </DialogContent>

                
            </Dialog>
        </div>
    )
}