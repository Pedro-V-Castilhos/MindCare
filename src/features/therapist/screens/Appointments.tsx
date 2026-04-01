import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";
import Layout from "../components/Layout";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardSubtitle, CustomCardTitle } from "@/components/Card";
import { MutedText } from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { useAppointmentStore } from "@/hooks/appointmentStore";
import type { Appointment } from "@/types/appointment";
import { useUserStore } from "@/hooks/userStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { useState } from "react";
import { toast } from "sonner";
import type { Therapist } from "@/types/user";
import { useSessionStore } from "@/hooks/sessionStore";

interface NewAppointmentData {
    pacientId: number;
    date: string;
    time: string;
    type: "online" | "presential";
    location: string;
    duration: number;
}

function TherapistAppointments() {
    return (
        <Layout>
            <AppointmentsList />
            <AppointmentsHistory />
        </Layout>
    )
}

function AppointmentsList() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Therapist;
    const { users } = useUserStore();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<NewAppointmentData>({
        defaultValues: {
            pacientId: 0,
            date: '',
            time: '',
            type: "online",
            location: '',
            duration: 60,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const { appointments, addAppointment } = useAppointmentStore();

    const newAppointments = appointments.filter(appt => new Date(appt.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const sumbitNewAppointment = (data: NewAppointmentData) => {
        const dateTime = new Date(`${data.date}T${data.time}`);
        try {
            addAppointment({
                id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
                patientId: data.pacientId,
                therapistId: user.id,
                date: dateTime,
                time: data.time,
                durationMinutes: data.duration,
                status: "scheduled",
                location: data.location,
                type: data.type,
                createdAt: new Date(),
                updatedAt: new Date(),
            } as Appointment);
            toast.success("Sessão agendada com sucesso!");
            setOpen(false);
        } catch (error) {
            toast.error("Ocorreu um erro ao agendar a sessão. Por favor, tente novamente.\n" + (error instanceof Error ? error.message : "Erro desconhecido."));
            return;
        }
    };

    return (
        <div>
            <div className="flex sm:flex-row flex-col sm:justify-between items-start sm:items-center my-4 gap-2 sm:gap-0">
                <h2 className="text-black text-xl font-semibold">Próximas Sessões</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="bg-black text-white px-3 py-4 w-full sm:w-auto flex">
                            <Plus />
                            Novo Agendamento
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-white backdrop:fill-accent-foreground">
                        <form onSubmit={handleSubmit(sumbitNewAppointment)}>
                            <DialogHeader className="text-black!">
                                <DialogTitle>Agendar Nova Sessão</DialogTitle>
                                <DialogDescription>Preencha os dados para criar um novo agendamento.</DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="pt-4">
                                <Field>
                                    <FieldLabel className="text-black">Paciente:</FieldLabel>
                                    <Controller
                                        control={control}
                                        name="pacientId"
                                        rules={{ required: "Paciente é obrigatório" }}
                                        render={({ field }) => (
                                            <Combobox value={field.value} itemToStringLabel={(value) => {
                                                const pacient = useUserStore.getState().users.find(u => u.id === value);
                                                return pacient ? pacient.firstName + " " + pacient.lastName : "";
                                            }} onValueChange={(value) => { field.onChange(value) }}>
                                                <ComboboxInput placeholder="Selecione um paciente..." aria-invalid={errors.pacientId ? "true" : "false"} className="z-50 w-full sm:w-auto text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                                <ComboboxContent className="pointer-events-auto">
                                                    <ComboboxList>
                                                        {users.filter((u) => u.role === "pacient" && u.therapistId === user.id).map((user) => (
                                                            <ComboboxItem key={user.id} value={user.id}>
                                                                {user.firstName} {user.lastName}
                                                            </ComboboxItem>
                                                        ))}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        )} />
                                    <FieldError>{errors.pacientId?.message}</FieldError>

                                </Field>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel className="text-black">Data:</FieldLabel>
                                        <Input {...register("date", { required: "Data é obrigatória", min: { value: new Date().toISOString().split("T")[0], message: "A data não pode ser anterior à data atual." } })} type="date" aria-invalid={errors.date ? "true" : "false"} className="text-black w-full bg-gray-100! placeholder:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        <FieldError>{errors.date?.message}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel className="text-black">Hora:</FieldLabel>
                                        <Input {...register("time", { required: "Hora é obrigatória" })} type="time" aria-invalid={errors.time ? "true" : "false"} className="text-black w-full bg-gray-100! placeholder:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        <FieldError>{errors.time?.message}</FieldError>
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel className="text-black">Formato:</FieldLabel>
                                    <Controller
                                        control={control}
                                        name="type"
                                        rules={{ required: "Formato é obrigatório" }}
                                        render={({ field }) => (
                                            <Combobox value={field.value ?? ""} itemToStringLabel={(value) => value === "online" ? "Online" : "Presencial"} onValueChange={(value) => { field.onChange(value) }}>
                                                <ComboboxInput placeholder="Selecione um formato..." aria-invalid={errors.type ? "true" : "false"} className="z-50 w-full sm:w-auto text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                                <ComboboxContent className="pointer-events-auto">
                                                    <ComboboxList>
                                                        <ComboboxItem value="online">Online</ComboboxItem>
                                                        <ComboboxItem value="presential">Presencial</ComboboxItem>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        )} />
                                    <FieldError>{errors.type?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Local/Link:</FieldLabel>
                                    <Input {...register("location", { required: "Local/Link é obrigatório" })} placeholder="Google Meet, Zoom ou endereço físico" type="text" aria-invalid={errors.location ? "true" : "false"} className="text-black w-full bg-gray-100! placeholder:text-muted-foreground! border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <FieldError>{errors.location?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Duração (minutos):</FieldLabel>
                                    <Input {...register("duration", { required: "Duração é obrigatória", valueAsNumber: true, min: { value: 30, message: "A duração mínima é de 30 minutos." } })} type="number" aria-invalid={errors.duration ? "true" : "false"} className="text-black w-full bg-gray-100! placeholder:text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <FieldError>{errors.duration?.message}</FieldError>
                                </Field>
                            </FieldGroup>
                            <DialogFooter className="bg-white">
                                <DialogClose asChild>
                                    <Button variant="outline" className="border-s! border-gray-300! text-black hover:text-black! hover:bg-accent-foreground! cursor-pointer">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white cursor-pointer">Agendar</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {newAppointments.length === 0 ? (
                <CustomCard>
                    <CustomCardContent className="flex flex-col gap-4 justify-center items-center py-4">
                        <MutedText>Nenhuma sessão agendada!</MutedText>
                    </CustomCardContent>
                </CustomCard>
            ) : (
                newAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
            )}
        </div>
    )
}

function AppointmentsHistory() {
    const appointments = useAppointmentStore(state => state.appointments).filter(appt => new Date(appt.date) < new Date()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="my-4">
            <h2 className="text-black text-xl font-semibold mb-4">Histórico</h2>
            <div className="flex flex-col gap-4">
                {appointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </div>
        </div>
    )
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
    const patient = useUserStore(state => state.users.find(p => p.id === appointment.patientId));
    return (
        <CustomCard>
            <CustomCardHeader>
                <div className="flex flex-col gap-2">
                    <CustomCardTitle>Sessão de Terapia - {patient ? `${patient.firstName} ${patient.lastName}` : "Paciente não encontrado"}</CustomCardTitle>
                    <CustomCardSubtitle><Calendar className="inline-block" /> {new Date(appointment.date).toLocaleDateString()}</CustomCardSubtitle>
                    <CustomCardSubtitle><Clock className="inline-block" /> {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(new Date(appointment.date).getTime() + appointment.durationMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</CustomCardSubtitle>
                </div>
                <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"}>{appointment.status === "scheduled" ? "Agendado" : "Realizado"}</Badge>
            </CustomCardHeader>
            <CustomCardContent>
                <MutedText>Local: {appointment.location || "Não informado"}</MutedText>
                <MutedText>Formato: {appointment.type === "presential" ? "Presencial" : appointment.type === "online" ? "Online" : "Não informado"}</MutedText>
                <Button variant="destructive" className="bg-red-400! text-white hover:bg-red-500! my-4 cursor-pointer" onClick={() => {
                    useAppointmentStore.getState().removeAppointment(appointment.id);
                }}>Cancelar Sessão</Button>
            </CustomCardContent>
        </CustomCard>
    )
}

export default TherapistAppointments;