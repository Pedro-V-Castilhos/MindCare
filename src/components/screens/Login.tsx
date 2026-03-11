import { MutedText, SemiboldText } from "../Text";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Brain } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-violet-100">
            <Card className="flex flex-col w-[90%] max-w-125 bg-white text-black p-5 gap-10">
                <CardHeader className="flex flex-col items-center gap-4 w-full sm:w-[70%] self-center">
                    <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-indigo-600 text-white p-2 rounded-full" >
                            <Brain size={32} />
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <SemiboldText>Sistema de Gestão de Terapia</SemiboldText>
                        <MutedText>Acesse sua conta para gerenciar sessões e acompanhamento</MutedText>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col w-full gap-4 px-0">
                    <form action="#" className="w-full" onSubmit={(e) => {
                        e.preventDefault();
                        navigate("/dashboard");
                    }}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email:</FieldLabel>
                                <Input id="email" type="email" placeholder="Digite seu email" required className="w-full bg-gray-100! py-5" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha:</FieldLabel>
                                <Input id="password" type="password" placeholder="Digite sua senha" required className="w-full bg-gray-100! py-5" />
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-5 cursor-pointer" >Entrar</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    <Division>OU ACESSO RÁPIDO</Division>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <Button onClick={() => navigate("/dashboard")} variant="outline" className="text-wrap w-full py-5 border border-gray-300! cursor-pointer hover:bg-accent-foreground! hover:text-black">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="w-5 h-5"
                                alt="Google"
                            />
                            Entrar com o Google
                        </Button>
                        <Button onClick={() => navigate("/dashboard")} variant="outline" className="text-wrap w-full py-5 border border-gray-300! cursor-pointer hover:bg-accent-foreground! hover:text-black">
                            <img
                                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                                className="w-5 h-5"
                                alt="Facebook"
                            />
                            Entrar com o Facebook
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function Division({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-500">{children}</span>
            <hr className="flex-1 border-gray-300" />
        </div>
    )
}

export default Login;