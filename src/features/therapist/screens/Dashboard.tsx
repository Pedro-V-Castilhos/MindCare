import { CustomCard, CustomCardHeader, CustomCardIcon, CustomCardTitle, CustomCardContent, CustomCardNumberHighlight, CustomCardHighlightDescription, CustomCardSubtitle } from "../../../components/Card";
import { Calendar, FileUp, TrendingUp, MessageSquareX, Clock } from "lucide-react";
import { MutedText } from "../../../components/Text";
import Layout from "../components/Layout";
import { Badge } from "../../../components/ui/badge";
import { useSessionStore } from "@/hooks/sessionStore";
import type { Pacient, Therapist } from "@/types/user";
import { useUserStore } from "@/hooks/userStore";
import { useAppointmentStore } from "@/hooks/appointmentStore";
import { useShallow } from "zustand/shallow";


function TherapistDashboard() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Therapist;
    const patients = useUserStore(useShallow((s) => s.users.filter((u): u is Pacient => u.role === "pacient" && u.therapistId === user?.id)));
    const appointments = useAppointmentStore(useShallow((s) => s.appointments.filter(a => a.therapistId === user?.id)));
    const nextAppointments = useAppointmentStore(useShallow((s) => s.appointments.filter(a => a.therapistId === user?.id && new Date(a.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));

    return (
        <Layout>
            <DashboardStatistics>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Total de Pacientes</CustomCardTitle>
                        <CustomCardIcon><Calendar /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{patients.length}</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Pacientes ativos em acompanhamento</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Próximas Sessões</CustomCardTitle>
                        <CustomCardIcon><FileUp /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{nextAppointments.length}</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Agendadas para os próximos dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Sessões totais</CustomCardTitle>
                        <CustomCardIcon><TrendingUp /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{appointments.length}</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Sessões totais</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
            </DashboardStatistics>
            <DashboardContent>
                <PatientsInfoCard>
                    {patients.length > 0 ? patients.map(p => (
                        <CustomCard key={p.id} className="mb-4">
                            <CustomCardHeader>
                                <div>
                                    <CustomCardTitle>{p.firstName} {p.lastName}</CustomCardTitle>
                                    <CustomCardSubtitle>{p.email}</CustomCardSubtitle>
                                </div>
                                <div className="text-right">
                                    <CustomCardSubtitle>Total de Sessões: {p.totalSessions}</CustomCardSubtitle>
                                    <CustomCardSubtitle>Desde: {new Date(p.createdAt).toLocaleDateString()}</CustomCardSubtitle>
                                </div>
                            </CustomCardHeader>
                        </CustomCard>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-4 gap-2">
                            <MutedText><MessageSquareX size={40} /></MutedText>
                            <MutedText>Nenhum paciente encontrado.</MutedText>
                        </div>
                    )}

                </PatientsInfoCard>
                <CustomCard>
                    <CustomCardHeader>
                        <div>
                            <CustomCardTitle>Próxima Sessão</CustomCardTitle>
                            <CustomCardSubtitle>Detalhes do próximo agendamento</CustomCardSubtitle>
                        </div>
                    </CustomCardHeader>
                    <CustomCardContent>
                        {
                            nextAppointments[0]
                                ? <CustomCard>
                                    <CustomCardHeader>
                                        <div className="flex flex-col gap-2">
                                            <CustomCardTitle>Sessão de Terapia</CustomCardTitle>
                                            <CustomCardSubtitle><Calendar className="inline-block" /> {new Date(nextAppointments[0].date).toLocaleDateString()}</CustomCardSubtitle>
                                            <CustomCardSubtitle><Clock className="inline-block" /> {new Date(nextAppointments[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(new Date(nextAppointments[0].date).getTime() + nextAppointments[0].durationMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</CustomCardSubtitle>
                                        </div>
                                        <Badge variant={nextAppointments[0].status === "scheduled" ? "default" : "secondary"}>{nextAppointments[0].status === "scheduled" ? "Agendado" : nextAppointments[0].status === "completed" ? "Realizado" : "Cancelado"}</Badge>
                                    </CustomCardHeader>
                                </CustomCard>
                                : <div className="flex flex-col items-center justify-center py-4 gap-2">
                                    <MutedText><MessageSquareX size={40} /></MutedText>
                                    <MutedText>Nenhuma sessão agendada.</MutedText>
                                </div>
                        }
                    </CustomCardContent>
                </CustomCard>
            </DashboardContent>
        </Layout>
    )
}

function DashboardStatistics({ children }: { children?: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-1">
            {children}
        </div>
    )
}

function DashboardContent({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-full">
            {children}
        </div>
    )
}

function PatientsInfoCard({ children }: { children?: React.ReactNode }) {
    return (
        <CustomCard>
            <CustomCardHeader>
                <div>
                    <CustomCardTitle>Meus Pacientes</CustomCardTitle>
                    <CustomCardSubtitle>Informações de contato</CustomCardSubtitle>
                </div>
            </CustomCardHeader>
            <CustomCardContent>
                {children}
            </CustomCardContent>
        </CustomCard>
    )
}

export default TherapistDashboard;