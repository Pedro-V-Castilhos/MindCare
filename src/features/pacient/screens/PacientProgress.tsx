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
import type { Pacient } from "@/types/user";
import { useSessionStore } from "@/hooks/sessionStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { ProgressEntry } from "@/types/progressEntry";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

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

interface ProgressEntryFormData {
    mood: number;
    anxietyLevel: number;
    sleepQuality: number;
    energyLevel: number;
    notes?: string;
}

function PacientProgress() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Pacient;
    const [open, setOpen] = useState(false);
    const { progressEntries, addProgressEntry } = useProgressEntriesStore()
    const hasEntryToday = progressEntries.some(entry => entry.patientId === user.id && new Date(entry.date).toDateString() === new Date().toDateString());
    const { register, handleSubmit, control } = useForm<ProgressEntryFormData>({
        defaultValues: {
            mood: 3,
            anxietyLevel: 3,
            sleepQuality: 3,
            energyLevel: 3,
            notes: "",
        },
    });

    const now = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const latestProgressEntries = progressEntries
        .filter(entry => entry.patientId === user?.id)
        .filter(entry => new Date(entry.date) >= sevenDaysAgo)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const submitNewEntry = (data: ProgressEntryFormData) => {
        if (hasEntryToday) {
            setOpen(false);
            toast.error("Você já registrou seu progresso hoje. Tente novamente amanhã!");
            return;
        }

        try {
            addProgressEntry({
                id: progressEntries.length ? Math.max(...progressEntries.map(e => e.id)) + 1 : 1,
                patientId: user.id,
                date: new Date(),
                mood: data.mood,
                anxietyLevel: data.anxietyLevel,
                sleepQuality: data.sleepQuality,
                energyLevel: data.energyLevel,
                notes: data.notes,
                createdAt: new Date(),
                updatedAt: new Date(),
            } as ProgressEntry)
            toast.success("Mood diário registrado com sucesso!");
        } catch (error) {
            toast.error("Erro ao registrar mood diário: " + (error instanceof Error ? error.message : String(error)));
        } finally {
            setOpen(false);
        }
    }

    return (
        <Layout>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center my-4 gap-2 sm:gap-0">
                <h2 className="text-black text-xl font-semibold">Acompanhamento de Progresso</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="bg-black text-white px-3 py-4 w-full sm:w-auto flex" disabled={hasEntryToday}>
                            <Plus />
                            Registrar Progresso
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-white backdrop:fill-accent-foreground">
                        <form onSubmit={handleSubmit(submitNewEntry)}>
                            <DialogHeader>
                                <DialogTitle className="text-black">Registrar Progresso Diário</DialogTitle>
                                <DialogDescription>Como você está se sentindo hoje?</DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="pt-4">
                                <Field>
                                    <Controller control={control} name="mood" rules={{ required: true }} render={({ field }) => (
                                        <>
                                            <div className="flex items-center justify-between mb-1">
                                                <FieldLabel className="text-black">Humor:</FieldLabel>
                                                <span className="text-sm text-muted-foreground">{field.value}/5</span>
                                            </div>
                                            <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} min={0} max={5} step={1} />
                                        </>
                                    )} />
                                </Field>
                                <Field>
                                    <Controller control={control} name="anxietyLevel" rules={{ required: true }} render={({ field }) => (
                                        <>
                                            <div className="flex items-center justify-between mb-1">
                                                <FieldLabel className="text-black">Ansiedade:</FieldLabel>
                                                <span className="text-sm text-muted-foreground">{field.value}/5</span>
                                            </div>
                                            <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} min={0} max={5} step={1} />
                                        </>
                                    )} />
                                </Field>
                                <Field>
                                    <Controller control={control} name="sleepQuality" rules={{ required: true }} render={({ field }) => (
                                        <>
                                            <div className="flex items-center justify-between mb-1">
                                                <FieldLabel className="text-black">Qualidade do Sono:</FieldLabel>
                                                <span className="text-sm text-muted-foreground">{field.value}/5</span>
                                            </div>
                                            <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} min={0} max={5} step={1} />
                                        </>
                                    )} />
                                </Field>
                                <Field>
                                    <Controller control={control} name="energyLevel" rules={{ required: true }} render={({ field }) => (
                                        <>
                                            <div className="flex items-center justify-between mb-1">
                                                <FieldLabel className="text-black">Nível de Energia:</FieldLabel>
                                                <span className="text-sm text-muted-foreground">{field.value}/5</span>
                                            </div>
                                            <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} min={0} max={5} step={1} />
                                        </>
                                    )} />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Observações (Opcional):</FieldLabel>
                                    <Textarea {...register("notes")} placeholder="Anote qualquer coisa que ache relevante para sua sessão..." className="w-full bg-gray-100! resize-none text-black! placeholder:text-muted-foreground" rows={5} />
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
            <ProgressStatistics>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Humor Médio</CustomCardTitle>
                        <CustomCardIcon><Smile /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(latestProgressEntries.reduce((acc, entry) => acc + entry.mood, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Ansiedade Média</CustomCardTitle>
                        <CustomCardIcon><Activity /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(latestProgressEntries.reduce((acc, entry) => acc + entry.anxietyLevel, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Sono Médio</CustomCardTitle>
                        <CustomCardIcon><Moon /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(latestProgressEntries.reduce((acc, entry) => acc + entry.sleepQuality, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Energia Média</CustomCardTitle>
                        <CustomCardIcon><Battery /></CustomCardIcon>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <CustomCardNumberHighlight>{(latestProgressEntries.reduce((acc, entry) => acc + entry.energyLevel, 0) / 7).toFixed(1)}/5</CustomCardNumberHighlight>
                        <CustomCardHighlightDescription>Últimos 7 dias</CustomCardHighlightDescription>
                    </CustomCardContent>
                </CustomCard>
            </ProgressStatistics>
            <ProgressChart />
            <Toaster richColors />
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
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Pacient;

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const chartData = useProgressEntriesStore(state => state.progressEntries).filter((entry) => entry.patientId === user?.id).filter(entry => new Date(entry.date) >= new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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