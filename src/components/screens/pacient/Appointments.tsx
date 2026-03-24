import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";
import Layout from "./Layout";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardSubtitle, CustomCardTitle } from "@/components/Card";
import { MutedText } from "@/components/Text";
import { Badge } from "@/components/ui/badge";

function Appointments() {
    return (
        <Layout>
            <AppointmentsList />
            <AppointmentsHistory />
        </Layout>
    )
}

function AppointmentsList() {
    return (
        <div>
            <div className="flex sm:flex-row flex-col sm:justify-between items-start sm:items-center my-4 gap-2 sm:gap-0">
                <h2 className="text-black text-xl font-semibold">Próximas Sessões</h2>
                <Button variant="default" className="bg-black text-white px-3 py-4 w-full sm:w-auto flex">
                    <Plus />
                    Novo Agendamento
                </Button>
            </div>
            <CustomCard>
                <CustomCardContent className="flex flex-col gap-4 justify-center items-center py-4">
                    <MutedText>Nenhuma sessão agendada!</MutedText>
                </CustomCardContent>
            </CustomCard>
        </div>
    )
}

function AppointmentsHistory() {
    return (
        <div className="my-4">
            <h2 className="text-black text-xl font-semibold mb-4">Histórico</h2>
            <div className="flex flex-col gap-4">
                <AppointmentCard />
            </div>
        </div>
    )
}

function AppointmentCard() {
    return (
        <CustomCard>
            <CustomCardHeader>
                <div className="flex flex-col gap-2">
                    <CustomCardTitle>Sessão de Terapia</CustomCardTitle>
                    <CustomCardSubtitle><Calendar className="inline-block" /> 20 de Setembro de 2024</CustomCardSubtitle>
                    <CustomCardSubtitle><Clock className="inline-block" /> 14:00 - 15:00</CustomCardSubtitle>
                </div>
                <Badge variant="default">Agendado</Badge>
            </CustomCardHeader>
        </CustomCard>
    )
}

export default Appointments;