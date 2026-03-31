import { CustomCard, CustomCardHeader, CustomCardIcon, CustomCardTitle, CustomCardContent, CustomCardNumberHighlight, CustomCardHighlightDescription, CustomCardSubtitle } from "../../../components/Card";
import { User, Calendar, FileUp, TrendingUp, MessageSquareX, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { MutedText, SemiboldText } from "../../../components/Text";
import Layout from "../components/Layout";
import { Badge } from "../../../components/ui/badge";
import { useSessionStore } from "@/hooks/sessionStore";
import type { Pacient, Therapist } from "@/types/user";
import { useUserStore } from "@/hooks/userStore";
import { useDocumentsStore } from "@/hooks/documentsStore";
import { useAppointmentStore } from "@/hooks/appointmentStore";
import { useShallow } from "zustand/shallow";


function PacientDashboard() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Pacient;
    const therapist = useUserStore((s) => s.users.find(u => u.id === user?.therapistId)) as Therapist;
    const documents = useDocumentsStore((s) => s.documents);
    const totalAppointments = useAppointmentStore((s) => s.appointments.filter(a => a.patientId === user?.id).length);
    const appointments = useAppointmentStore(useShallow((s) => s.appointments.filter(a => a.patientId === user?.id && new Date(a.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));

    return (
        <Layout>
            <DashboardStatistics>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Total de Sessões</CustomCardTitle>
                        <CustomCardIcon><Calendar /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{totalAppointments}</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Sessões realizadas</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Documentos</CustomCardTitle>
                        <CustomCardIcon><FileUp /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{documents.filter(doc => doc.patientId === user?.id).length}</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Documentos enviados</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Em Acompanhamento</CustomCardTitle>
                        <CustomCardIcon><TrendingUp /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{Math.floor((new Date().getTime() - new Date(user?.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7))}</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Semanas de terapia</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
            </DashboardStatistics>
            <DashboardContent>
                <TherapistInfoCard>
                    <SemiboldText>{therapist?.firstName} {therapist?.lastName}</SemiboldText>
                    <MutedText>
                        {therapist?.speciality}
                    </MutedText>
                    <MutedText>
                        CRP {therapist?.CRPNumber}
                    </MutedText>
                    <div className="flex flex-row flex-wrap">
                        <p className="mr-4">{therapist?.email}</p>
                        <p>{therapist?.phone}</p>
                    </div>
                </TherapistInfoCard>
                <CustomCard>
                    <CustomCardHeader>
                        <div>
                            <CustomCardTitle>Próxima Sessão</CustomCardTitle>
                            <CustomCardSubtitle>Detalhes do próximo agendamento</CustomCardSubtitle>
                        </div>
                    </CustomCardHeader>
                    <CustomCardContent>
                        {
                            appointments[0]
                                ? <CustomCard>
                                    <CustomCardHeader>
                                        <div className="flex flex-col gap-2">
                                            <CustomCardTitle>Sessão de Terapia</CustomCardTitle>
                                            <CustomCardSubtitle><Calendar className="inline-block" /> {new Date(appointments[0].date).toLocaleDateString()}</CustomCardSubtitle>
                                            <CustomCardSubtitle><Clock className="inline-block" /> {new Date(appointments[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(new Date(appointments[0].date).getTime() + appointments[0].durationMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</CustomCardSubtitle>
                                        </div>
                                        <Badge variant={appointments[0].status === "scheduled" ? "default" : "secondary"}>{appointments[0].status === "scheduled" ? "Agendado" : appointments[0].status === "completed" ? "Realizado" : "Cancelado"}</Badge>
                                    </CustomCardHeader>
                                </CustomCard>
                                : <div className="flex flex-col items-center justify-center py-4 gap-2">
                                    <MutedText><MessageSquareX size={40} /></MutedText>
                                    <MutedText>Nenhuma sessão agendada. Agende sua próxima sessão!</MutedText>
                                </div>
                        }
                    </CustomCardContent>
                </CustomCard>
                <OrientationCard>
                    <ul className="list-['✓_'] list-inside marker:font-extrabold">
                        <li>Registre seu progresso diário para acompanhar sua evolução</li>
                        <li>Seja honesto(a) e aberto(a) durante as sessões</li>
                        <li>Pratique os exercícios recomendados entre as sessões</li>
                        <li>Mantenha contato com seu terapeuta através do chat quando necessário</li>
                        <li>Salve seus recibos para reembolso do plano de saúde</li>
                    </ul>
                </OrientationCard>
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

function TherapistInfoCard({ children }: { children?: React.ReactNode }) {
    return (
        <CustomCard>
            <CustomCardHeader>
                <div>
                    <CustomCardTitle>Seu Terapeuta</CustomCardTitle>
                    <CustomCardSubtitle>Informações de contato</CustomCardSubtitle>
                </div>
            </CustomCardHeader>
            <CustomCardContent>
                <div className="flex flex-row align-center">
                    <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-violet-200 text-indigo-600 text-2xl"><User /></AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        {children}
                    </div>
                </div>
            </CustomCardContent>
        </CustomCard>
    )
}

function OrientationCard({ children }: { children?: React.ReactNode }) {
    return (
        <CustomCard className="bg-linear-to-r from-purple-500 to-pink-500 text-white">
            <CustomCardHeader>
                <CustomCardTitle>Dicas para Aproveitar ao Máximo sua Terapia</CustomCardTitle>
            </CustomCardHeader>
            <CustomCardContent>
                {children}
            </CustomCardContent>
        </CustomCard>
    )
}

export default PacientDashboard;