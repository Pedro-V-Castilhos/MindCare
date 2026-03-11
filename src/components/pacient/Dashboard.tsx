import { CustomCard, CustomCardHeader, CustomCardIcon, CustomCardTitle, CustomCardContent, CustomCardNumberHighlight, CustomCardHighlightDescription, CustomCardSubtitle } from "../Card";
import { Header, HeaderInfo, HeaderLogoutButton, HeaderSubtitle, HeaderTitle, HeaderUserIcon } from "../Header";
import { User, Calendar, FileUp, TrendingUp, AlignJustify, FileText, MessageCircle, MessageSquareX } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MutedText, SemiboldText } from "../Text";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";

function Dashboard() {
    return (
        <section className="flex flex-col w-full min-h-screen bg-violet-50">
            <DashboardHeader>
                <HeaderUserIcon><User /></HeaderUserIcon>
                <div>
                    <HeaderTitle>Meu Espaço Terapêutico</HeaderTitle>
                    <HeaderSubtitle>Bem vindo, Pedro Viana de Castilhos!</HeaderSubtitle>
                </div>
            </DashboardHeader>
            <NavigationMenu className="lg:px-30 px-4 gap-4 my-2 flex-none">
                <NavigationMenuList className="flex flex-row flex-wrap bg-white border border-gray-300 px-4 rounded-lg">
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><AlignJustify />Início</a></NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><Calendar />Agendamentos</a></NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><TrendingUp />Meu Progresso</a></NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><FileText />Anotações</a></NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><FileUp />Documentos</a></NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><MessageCircle />Chat</a></NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <DashboardStatistics>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Total de Sessões</CustomCardTitle>
                        <CustomCardIcon><Calendar /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>12</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Sessões realizadas</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Documentos</CustomCardTitle>
                        <CustomCardIcon><FileUp /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>2</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Documentos enviados</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Em Acompanhamento</CustomCardTitle>
                        <CustomCardIcon><TrendingUp /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>112</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Semanas de terapia</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
            </DashboardStatistics>
            <DashboardContent>
                <TherapistInfoCard>
                    <SemiboldText>Dr. João Silva</SemiboldText>
                    <MutedText>
                        Psicólogo Clínico
                    </MutedText>
                    <MutedText>
                        CRP 06/123456
                    </MutedText>
                    <div className="flex flex-row flex-wrap">
                        <p className="mr-4">joao.silva@terapia.com</p>
                        <p>(11) 98765-4321</p>
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
                        <div className="flex flex-col items-center justify-center py-4 gap-2">
                            <MutedText><MessageSquareX size={40} /></MutedText>
                            <MutedText>Nenhuma sessão agendada. Agende sua próxima sessão!</MutedText>
                        </div>
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
        </section>
    )
}

function DashboardHeader({ children }: { children?: React.ReactNode }) {
    return (
        <Header>
            <HeaderInfo>
                {children}
            </HeaderInfo>
            <HeaderLogoutButton />
        </Header>
    )
}

function DashboardStatistics({ children }: { children?: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:px-30 px-4 gap-4 gap-y-1">
            {children}
        </div>
    )
}

function DashboardContent({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-full lg:px-30 px-4">
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

export default Dashboard;