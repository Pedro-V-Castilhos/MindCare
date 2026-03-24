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
import { useProgressEntriesStore } from "@/hooks/progressEntriesStore";
import { Card, CardContent } from "@/components/ui/card";

const chartConfig = {
    mood: {
        label: "Humor",
        color: "var(--color-green-500)",
    },
    anxietyLevel: {
        label: "Ansiedade",
        color: "var(--color-red-500)",
    },
    sleepQuality: {
        label: "Sono",
        color: "var(--color-blue-500)",
    },
    energyLevel: {
        label: "Energia",
        color: "var(--color-yellow-500)",
    },
} satisfies ChartConfig

function PacientProgress() {
    const progressEntries = useProgressEntriesStore(state => state.progressEntries).filter(entry => new Date(entry.date) >= new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
                        <CustomCardNumberHighlight>{(progressEntries.reduce((acc, entry) => acc + entry.mood, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Ansiedade Média</CustomCardTitle>
                        <CustomCardIcon><Activity /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(progressEntries.reduce((acc, entry) => acc + entry.anxietyLevel, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Sono Médio</CustomCardTitle>
                        <CustomCardIcon><Moon /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(progressEntries.reduce((acc, entry) => acc + entry.sleepQuality, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Energia Média</CustomCardTitle>
                        <CustomCardIcon><Battery /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(progressEntries.reduce((acc, entry) => acc + entry.energyLevel, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
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
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const chartData = useProgressEntriesStore(state => state.progressEntries).filter(entry => new Date(entry.date) >= new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
                    <LineChart accessibilityLayer data={width >= 768 ? chartData : chartData.slice(-7)} className="w-full m-0 p-0">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
                        <YAxis tickMargin={8} width={20} domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <XAxis dataKey="date" tickMargin={8} tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                        }} />
                        <ChartTooltip cursor={false} content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;
                            const entry = payload[0].payload;
                            return (
                                <Card className="max-w-50">
                                    <CardContent className="p-3">
                                        <ChartTooltipContent active={active} payload={payload} label={label} />
                                        {entry?.notes && <p className="text-xs text-muted-foreground mt-2 border-t pt-2">{entry.notes}</p>}
                                    </CardContent>
                                </Card>
                            )
                        }} />
                        <Line
                            dataKey="mood"
                            type="monotone"
                            stroke={`var(--color-mood)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="anxietyLevel"
                            type="monotone"
                            stroke={`var(--color-anxietyLevel)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="sleepQuality"
                            type="monotone"
                            stroke={`var(--color-sleepQuality)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="energyLevel"
                            type="monotone"
                            stroke={`var(--color-energyLevel)`}
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