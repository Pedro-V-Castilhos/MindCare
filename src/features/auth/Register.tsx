import { MutedText, SemiboldText } from "../../components/Text";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Brain } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useUserStore } from "@/hooks/userStore";
import { useState } from "react";
import type { Pacient, Therapist } from "@/types/user";

type Role = "pacient" | "therapist";

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    therapistId: string;
    speciality: string;
    CRPNumber: string;
}

function Register() {
    const navigate = useNavigate();
    const userStore = useUserStore();
    const [role, setRole] = useState<Role>("pacient");
    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            therapistId: '',
            speciality: '',
            CRPNumber: '',
        },
    });

    const handleRegister = (data: RegisterFormData) => {
        const emailExists = userStore.users.some(user => user.email === data.email);
        if (emailExists) {
            setError("email", { message: "Este email já está cadastrado" });
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", { message: "As senhas não coincidem" });
            return;
        }

        const newId = Math.max(0, ...userStore.users.map(u => u.id)) + 1;
        const now = new Date();

        if (role === "pacient") {
            if (!data.therapistId) {
                setError("therapistId", { message: "Selecione um terapeuta" });
                return;
            }
            const newPacient: Pacient = {
                id: newId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone || undefined,
                password: data.password,
                role: "pacient",
                therapistId: Number(data.therapistId),
                totalSessions: 0,
                createdAt: now,
                updatedAt: now,
            };
            userStore.addUser(newPacient);
        } else {
            const newTherapist: Therapist = {
                id: newId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone || undefined,
                password: data.password,
                role: "therapist",
                speciality: data.speciality,
                CRPNumber: data.CRPNumber,
                createdAt: now,
                updatedAt: now,
            };
            userStore.addUser(newTherapist);
        }

        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-violet-100 py-10">
            <Card className="flex flex-col w-[90%] max-w-125 bg-white text-black p-5 gap-10">
                <CardHeader className="flex flex-col items-center gap-4 w-full sm:w-[70%] self-center">
                    <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-indigo-600 text-white p-2 rounded-full" >
                            <Brain size={32} />
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <SemiboldText>Criar Conta</SemiboldText>
                        <MutedText>Preencha os dados abaixo para se cadastrar</MutedText>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col w-full gap-4 px-0">
                    <form action="#" className="w-full" onSubmit={handleSubmit(handleRegister)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Tipo de conta:</FieldLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        type="button"
                                        variant={role === "pacient" ? "default" : "outline"}
                                        className={`py-5 cursor-pointer ${role === "pacient" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-gray-300! hover:bg-accent-foreground! hover:text-black"}`}
                                        onClick={() => setRole("pacient")}
                                    >
                                        Paciente
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={role === "therapist" ? "default" : "outline"}
                                        className={`py-5 cursor-pointer ${role === "therapist" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-gray-300! hover:bg-accent-foreground! hover:text-black"}`}
                                        onClick={() => setRole("therapist")}
                                    >
                                        Terapeuta
                                    </Button>
                                </div>
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="firstName">Nome:</FieldLabel>
                                    <Input {...register("firstName", { required: "Nome é obrigatório" })} id="firstName" type="text" placeholder="Digite seu nome" required className="w-full bg-gray-100! py-5" />
                                    <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.firstName?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="lastName">Sobrenome:</FieldLabel>
                                    <Input {...register("lastName", { required: "Sobrenome é obrigatório" })} id="lastName" type="text" placeholder="Digite seu sobrenome" required className="w-full bg-gray-100! py-5" />
                                    <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.lastName?.message}</FieldError>
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email:</FieldLabel>
                                <Input {...register("email", { required: "Email é obrigatório" })} id="email" type="email" placeholder="Digite seu email" required className="w-full bg-gray-100! py-5" />
                                <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.email?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone">Telefone (opcional):</FieldLabel>
                                <Input {...register("phone")} id="phone" type="tel" placeholder="(00) 00000-0000" className="w-full bg-gray-100! py-5" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha:</FieldLabel>
                                <Input {...register("password", { required: "Senha é obrigatória", minLength: { value: 4, message: "Senha deve ter no mínimo 4 caracteres" } })} id="password" type="password" placeholder="Digite sua senha" required className="w-full bg-gray-100! py-5" />
                                <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.password?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirmar Senha:</FieldLabel>
                                <Input {...register("confirmPassword", { required: "Confirmação de senha é obrigatória" })} id="confirmPassword" type="password" placeholder="Confirme sua senha" required className="w-full bg-gray-100! py-5" />
                                <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.confirmPassword?.message}</FieldError>
                            </Field>
                            {role === "pacient" && (
                                <Field>
                                    <FieldLabel htmlFor="therapistId">Terapeuta:</FieldLabel>
                                    <select
                                        {...register("therapistId", { required: role === "pacient" ? "Selecione um terapeuta" : false })}
                                        id="therapistId"
                                        className="w-full bg-gray-100 rounded-md border border-input px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="">Selecione um terapeuta</option>
                                        {userStore.users
                                            .filter((u): u is import("@/types/user").Therapist => u.role === "therapist")
                                            .map(t => (
                                                <option key={t.id} value={t.id}>
                                                    {t.firstName} {t.lastName} — {t.speciality} (CRP: {t.CRPNumber})
                                                </option>
                                            ))}
                                    </select>
                                    <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.therapistId?.message}</FieldError>
                                </Field>
                            )}
                            {role === "therapist" && (
                                <>
                                    <Field>
                                        <FieldLabel htmlFor="speciality">Especialidade:</FieldLabel>
                                        <Input {...register("speciality", { required: role === "therapist" ? "Especialidade é obrigatória" : false })} id="speciality" type="text" placeholder="Ex: Psicologia Clínica" required className="w-full bg-gray-100! py-5" />
                                        <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.speciality?.message}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="CRPNumber">Número do CRP:</FieldLabel>
                                        <Input {...register("CRPNumber", { required: role === "therapist" ? "Número do CRP é obrigatório" : false })} id="CRPNumber" type="text" placeholder="Ex: 06/123456" required className="w-full bg-gray-100! py-5" />
                                        <FieldError className="text-red-500 text-sm mt-1 font-semibold">{errors.CRPNumber?.message}</FieldError>
                                    </Field>
                                </>
                            )}
                            <Field>
                                <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-5 cursor-pointer">Cadastrar</Button>
                            </Field>
                            <Field className="text-center">
                                <p>Já tem uma conta? <Button variant="link" onClick={() => navigate("/")} className="p-0 text-indigo-700">Entrar</Button></p>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register;