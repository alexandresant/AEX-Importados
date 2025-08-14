import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"

export function ModalCadastroFornecedores(props: any){
    return(
        <>
            <Dialog open={props.open} onOpenChange={props.openChange}>          
                <DialogContent 
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cadastro de fornecedores</DialogTitle>
                    </DialogHeader>
                    <div className="text-center">
                        <Input 
                            placeholder="Nome"
                            type="text"
                            className="m-1"
                            value={props.nome}
                            onChange={(e)=> props.setNome(e.target.value)}
                            autoFocus={false}
                        />
                        <Input 
                            placeholder="Contato"
                            type="text"
                            className="m-1"
                            value={props.contato}
                            onChange={(e) => props.setContato(e.target.value)}
                        />
                        <Input 
                            placeholder="Telefone"
                            type="text"
                            className="m-1"
                            value={props.telefone}
                            onChange={(e) => props.setTelefone(e.target.value)}
                        />
                        <Input 
                            placeholder="Email"
                            type="text"
                            className="m-1"
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                        />
                        <Button 
                            className="bg-blue-700"
                            onClick={props.onConfirm}
                        >
                            Salvar
                            
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}