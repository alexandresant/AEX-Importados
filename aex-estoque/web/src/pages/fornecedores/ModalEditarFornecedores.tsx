import { Dialog, DialogContent, DialogHeader } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

import type { ModalEditarFornecedoresProps } from "../../types/types"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"

export function ModalEditarFornecedores({
    open,
    openChange,
    nome,
    setNome,
    contato,
    setContato,
    telefone,
    setTelefone,
    email,
    setEmail,
    onConfirm,
    onDelete
}: ModalEditarFornecedoresProps){
    return(
        <div>
            <Dialog
                open={open}
                onOpenChange={openChange}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Fornecedor: {nome}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <Input 
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <Input 
                        type="text"
                        value={contato}
                        onChange={(e) => setContato(e.target.value)}
                    />
                    <Input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <Input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        className="bg-blue-700"
                        onClick={onConfirm}
                    >
                        Salvar
                    </Button>
                    <Button
                        className="bg-red-700"
                        onClick={onDelete}
                    >
                        Excluir
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
    
}