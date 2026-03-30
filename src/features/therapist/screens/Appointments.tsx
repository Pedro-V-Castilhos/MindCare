import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";
import Layout from "../components/Layout";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardSubtitle, CustomCardTitle } from "@/components/Card";
import { MutedText } from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { useAppointmentStore } from "@/hooks/appointmentStore";
import type { Appointment } from "@/types/appointment";
import { useUserStore } from "@/hooks/userStore";

function TherapistAppointments() {
    return (
        <Layout>
            <AppointmentsList />
            <AppointmentsHistory />
        </Layout>
    )
}

function AppointmentsList() {
    const appointments = useAppointmentStore(state => state.appointments).filter(appt => new Date(appt.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div>
            <div className="flex sm:flex-row flex-col sm:justify-between items-start sm:items-center my-4 gap-2 sm:gap-0">
                <h2 className="text-black text-xl font-semibold">Próximas Sessões</h2>
                <Button variant="default" className="bg-black text-white px-3 py-4 w-full sm:w-auto flex">
                    <Plus />
                    Novo Agendamento
                </Button>
            </div>
            {appointments.length === 0 ? (
                <CustomCard>
                    <CustomCardContent className="flex flex-col gap-4 justify-center items-center py-4">
                        <MutedText>Nenhuma sessão agendada!</MutedText>
                    </CustomCardContent>
                </CustomCard>
            ) : (
                appointments.map(appointment => (
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
                <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"}>{appointment.status === "scheduled" ? "Agendado" : appointment.status === "completed" ? "Realizado" : "Cancelado"}</Badge>
            </CustomCardHeader>
            <CustomCardContent>
                <MutedText>Local: {appointment.location || "Não informado"}</MutedText>
                <MutedText>Formato: {appointment.type === "presential" ? "Presencial" : appointment.type === "online" ? "Online" : "Não informado"}</MutedText>
            </CustomCardContent>
        </CustomCard>
    )
}

export default TherapistAppointments;