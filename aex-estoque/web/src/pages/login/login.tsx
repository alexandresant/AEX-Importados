import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Form } from "../../components/ui/form"
import { Label } from "../../components/ui/label"
import { useState } from "react"

export function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    return(
        <div className="flex items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle >Login</CardTitle>
                    <CardDescription>Faça login para ter acesso</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label>Email</Label>
                    <Input 
                        type="text"
                        className="exemplo@exemplo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        className="******"
                        value={email}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Button className=" w-full mt-2">
                        Login
                    </Button>
                </CardContent>
                
            </Card>
        </div>
    )
}