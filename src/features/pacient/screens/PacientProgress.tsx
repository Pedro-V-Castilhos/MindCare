import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";
import { Plus, Smile, Activity, Moon, Battery, TrendingUp } from "lucide-react";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardHighlightDescription, CustomCardIcon, CustomCardNumberHighlight, CustomCardSubtitle, CustomCardTitle } from "@/components/Card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
    {
        id: 'prog-1',
        patientId: 'patient-1',
        date: '2026-02-24',
        mood: 5,
        anxiety: 7,
        sleep: 6,
        energy: 5,
    },
    {
        id: 'prog-2',
        patientId: 'patient-1',
        date: '2026-02-26',
        mood: 6,
        anxiety: 6,
        sleep: 7,
        energy: 6,
    },
    {
        id: 'prog-3',
        patientId: 'patient-1',
        date: '2026-03-01',
        mood: 7,
        anxiety: 5,
        sleep: 7,
        energy: 7,
    },
    {
        id: 'prog-4',
        patientId: 'patient-1',
        date: '2026-03-05',
        mood: 7,
        anxiety: 4,
        sleep: 8,
        energy: 7,
    },
    {
        id: 'prog-5',
        patientId: 'patient-1',
        date: '2026-03-08',
        mood: 8,
        anxiety: 4,
        sleep: 8,
        energy: 8,
    },
];

const chartConfig = {
    mood: {
        label: "Humor",
        color: "var(--color-green-500)",
    },
    anxiety: {
        label: "Ansiedade",
        color: "var(--color-red-500)",
    },
    sleep: {
        label: "Sono",
        color: "var(--color-blue-500)",
    },
    energy: {
        label: "Energia",
        color: "var(--color-yellow-500)",
    },
} satisfies ChartConfig

function PacientProgress() {
    return (
        <Layout>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center my-4 gap-2 sm:gap-0">
                <h2 className="text-black text-xl font-semibold">Acompanhamento de Progresso</h2>
                <Button variant="default" className="bg-black text-white px-3 py-4 w-full sm:w-auto flex">
                    <Plus />
                    Registrar Progresso
                </Button>
            </div>
            <ProgressStatistics>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Humor Médio</CustomCardTitle>
                        <CustomCardIcon><Smile /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>6.7/10</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Ansiedade Média</CustomCardTitle>
                        <CustomCardIcon><Activity /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>5.2/10</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Sono Médio</CustomCardTitle>
                        <CustomCardIcon><Moon /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>6.8/10</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Energia Média</CustomCardTitle>
                        <CustomCardIcon><Battery /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>6.3/10</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
            </ProgressStatistics>
            <ProgressChart />
        </Layout>
    )
}

function ProgressStatistics({ children }: { children?: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-1">
            {children}
        </div>
    )
}

function ProgressChart() {
    return (
        <CustomCard>
            <CustomCardHeader>
                <div>
                    <CustomCardTitle><TrendingUp className="inline-block" /> Evolução do Você</CustomCardTitle>
                    <CustomCardSubtitle>Acompanhe seu progresso ao longo do tempo</CustomCardSubtitle>
                </div>
            </CustomCardHeader>
            <CustomCardContent>
                <ChartContainer config={chartConfig} className="w-full h-80 p-0">
                    <LineChart accessibilityLayer data={chartData} className="w-full m-0 p-0">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
                        <YAxis tickMargin={8} width={20} />
                        <XAxis dataKey="date" tickMargin={8} tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                        }} />
                        <ChartTooltip cursor={false} content={
                            <ChartTooltipContent />
                        } />
                        <Line
                            dataKey="mood"
                            type="monotone"
                            stroke={`var(--color-mood)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="anxiety"
                            type="monotone"
                            stroke={`var(--color-anxiety)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="sleep"
                            type="monotone"
                            stroke={`var(--color-sleep)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="energy"
                            type="linear"
                            stroke={`var(--color-energy)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CustomCardContent>
        </CustomCard>
    )
}


export default PacientProgress;