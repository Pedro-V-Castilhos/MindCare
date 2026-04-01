import { PageHeader } from "@/components/Text";
import { FileText, ChevronDown, Plus, X } from "lucide-react";
import Layout from "../components/Layout";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardTitle } from "@/components/Card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSessionNoteStore } from "@/hooks/sessionNoteStore";
import type { SessionNote } from "@/types/sessionNote";
import type { Therapist } from "@/types/user";
import { useSessionStore } from "@/hooks/sessionStore";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { Controller, useForm, type UseFormReset } from "react-hook-form";
import { useUserStore } from "@/hooks/userStore";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { useAppointmentStore } from "@/hooks/appointmentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface NotesFormData {
    id: number | undefined | null;
    patientId: number | undefined | null;
    appointmentId: number | undefined | null;
    mood: string;
    topicsCovered: string[];
    content: string;
    nextSteps: string;
    privateNotes: string;
}

function TherapistNotes() {
    const [open, setOpen] = useState(false);
    const session = useSessionStore((s) => s.session);
    const { sessionNotes, addSessionNote, updateSessionNote } = useSessionNoteStore();
    const user = session?.user as Therapist;
    const patients = useUserStore(useShallow((s) => s.users.filter(u => u.role === "pacient" && u.therapistId === user?.id)));
    const { appointments } = useAppointmentStore()

    const { register, handleSubmit, formState: { errors }, watch, control, setValue, reset, setError } = useForm<NotesFormData>({
        defaultValues: {
            patientId: null,
            appointmentId: null,
            mood: "",
            topicsCovered: [],
            content: "",
            nextSteps: "",
            privateNotes: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const currentPatientId = watch("patientId");
    const tags = watch("topicsCovered");
    const currentId = watch("id");

    useEffect(() => {
        if (!currentId) {
            setValue("appointmentId", null);
        }
    }, [currentPatientId, currentId, setValue]);

    useEffect(() => {
        if (!open) {
            reset({
                id: null,
                patientId: null,
                appointmentId: null,
                mood: "",
                topicsCovered: [],
                content: "",
                nextSteps: "",
                privateNotes: "",
            });
        }
    }, [open, reset]);

    const submitNewNote = (data: NotesFormData) => {
        if (data.topicsCovered.length === 0) {
            setError("topicsCovered", { message: "Este campo é obrigatório" });
            return;
        } else if (data.topicsCovered.length > 5) {
            setError("topicsCovered", { message: "Você pode adicionar no máximo 5 tópicos abordados" });
            return;
        }
        try {
            if (!data.id) {
                const appointmentDate = appointments.find(a => a.id === data.appointmentId)?.date;
                addSessionNote({
                    id: sessionNotes.length ? Math.max(...sessionNotes.map(note => note.id)) + 1 : 1,
                    appointmentId: data.appointmentId,
                    therapistId: user.id,
                    patientId: data.patientId,
                    date: appointmentDate,
                    content: data.content,
                    mood: data.mood,
                    topicsCovered: data.topicsCovered,
                    privateNotes: data.privateNotes,
                    nextSteps: data.nextSteps,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                } as SessionNote);
                toast.success("Anotação de sessão adicionada com sucesso!");
                reset({
                    id: null,
                    patientId: null,
                    appointmentId: null,
                    mood: "",
                    topicsCovered: [],
                    content: "",
                    nextSteps: "",
                    privateNotes: "",
                });

            } else {
                updateSessionNote({
                    id: data.id,
                    appointmentId: data.appointmentId!,
                    therapistId: user.id,
                    patientId: data.patientId,
                    content: data.content,
                    mood: data.mood,
                    topicsCovered: data.topicsCovered,
                    privateNotes: data.privateNotes,
                    nextSteps: data.nextSteps,
                    updatedAt: new Date(),
                } as SessionNote);
                toast.success("Anotação de sessão editada com sucesso!");
                reset({
                    id: null,
                    patientId: null,
                    appointmentId: null,
                    mood: "",
                    topicsCovered: [],
                    content: "",
                    nextSteps: "",
                    privateNotes: "",
                });

            }
        } catch (error) {
            toast.error("Erro ao adicionar anotação de sessão:" + (error instanceof Error ? error.message : "Erro desconhecido"));
        } finally {
            setOpen(false);
        }
    }

    return (
        <Layout>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center my-4 gap-2 sm:gap-0">
                <PageHeader>Anotações de Sessão</PageHeader>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="cursor-pointer bg-black text-white px-3 py-4 w-full sm:w-auto flex">
                            <Plus className="inline-block mr-2" />
                            Nova Anotação
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-white backdrop:fill-accent-foreground">
                        <form onSubmit={handleSubmit(submitNewNote)}>
                            <DialogHeader>
                                <DialogTitle className="text-black">Registrar Anotação de Sessão</DialogTitle>
                                <DialogDescription>Documente os detalhes e observações da sessão</DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="py-4 max-h-[60vh] overflow-y-auto">
                                <Input type="hidden" {...register("id")} />
                                <Field>
                                    <FieldLabel className="text-black">Paciente:</FieldLabel>
                                    <Controller control={control} name="patientId" rules={{ required: "Paciente é obrigatório" }} render={({ field }) => (
                                        <Combobox items={patients} onValueChange={(value) => field.onChange(Number(value))} value={field.value} itemToStringLabel={(value) => {
                                            const item = patients.find(u => u.id === value);
                                            return item ? `${item.firstName} ${item.lastName}` : "";
                                        }}>
                                            <ComboboxInput onBlur={field.onBlur} placeholder="Selecione o paciente..." aria-invalid={errors.patientId ? "true" : "false"} className="z-50 w-full sm:w-auto text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                            <ComboboxContent>
                                                <ComboboxList className="pointer-events-auto">
                                                    {(item) => (
                                                        <ComboboxItem
                                                            key={item.id}
                                                            value={item.id}
                                                            className="cursor-pointer px-3 py-2 rounded-md hover:bg-gray-200"
                                                        >
                                                            {item.firstName} {item.lastName}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    )} />
                                    <FieldError>{errors.patientId?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Sessão:</FieldLabel>
                                    <Controller control={control} name="appointmentId" rules={{ required: "Sessão é obrigatória" }} render={({ field }) => (
                                        <Combobox items={appointments.filter(a => a.patientId === currentPatientId)} onValueChange={(value) => field.onChange(Number(value))} value={field.value} itemToStringLabel={(value) => {
                                            const item = appointments.find(a => a.id === value);
                                            return item ? `${new Date(item.date).toLocaleDateString()} - ${item.time}` : "";
                                        }}>
                                            <ComboboxInput disabled={!currentPatientId} aria-invalid={errors.appointmentId ? "true" : "false"} placeholder="Selecione a sessão..." className="z-50 w-full sm:w-auto text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                            <ComboboxContent>
                                                <ComboboxList className="pointer-events-auto">
                                                    {(item) => (
                                                        <ComboboxItem
                                                            key={item.id}
                                                            value={item.id}
                                                            className="cursor-pointer px-3 py-2 rounded-md hover:bg-gray-200"
                                                        >
                                                            {new Date(item.date).toLocaleDateString()} - {item.time}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    )} />
                                    <FieldError>{errors.appointmentId?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Conteúdo da Sessão:</FieldLabel>
                                    <Textarea {...register("content", { required: "Este campo é obrigatório" })} placeholder="Descreva os principais acontecimentos e discussões da sessão" className="resize-none text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" aria-invalid={errors.content ? "true" : "false"} />
                                    <FieldError>{errors.content?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Estado Emocional:</FieldLabel>
                                    <Input {...register("mood", { required: "Este campo é obrigatório" })} placeholder="Descreva o estado emocional do paciente durante a sessão" className="text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" aria-invalid={errors.mood ? "true" : "false"} />
                                    <FieldError>{errors.mood?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Tópicos Abordados:</FieldLabel>
                                    <Controller control={control} name="topicsCovered" rules={{ required: "Este campo é obrigatório", maxLength: { value: 5, message: "Você pode adicionar no máximo 5 tópicos" } }} render={({ field }) => (
                                        <div>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {tags.map((tag, index) => (
                                                    <Badge key={index} variant="default" className="flex items-center gap-1">
                                                        {tag}
                                                        <Button type="button" variant="ghost" size="icon" className="h-5 w-5 p-0 rounded-full text-gray-500 hover:bg-gray-300" onClick={() => {
                                                            const newTags = [...tags];
                                                            newTags.splice(index, 1);
                                                            field.onChange(newTags);
                                                        }}>
                                                            <span className="sr-only">Remover {tag}</span>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Input name="topicsCovered" type="text" placeholder="Adicionar tópico..." className="text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" aria-invalid={errors.topicsCovered ? "true" : "false"} onKeyDown={(e) => {
                                                if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                                                    e.preventDefault();
                                                    if (!tags.includes(e.currentTarget.value.trim())) {
                                                        field.onChange([...tags, e.currentTarget.value.trim()]);
                                                    }
                                                    e.currentTarget.value = "";
                                                }
                                            }} />
                                        </div>
                                    )} />
                                    <FieldError>{errors.topicsCovered?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Próximos Passos:</FieldLabel>
                                    <Textarea aria-invalid={errors.nextSteps ? "true" : "false"} {...register("nextSteps", { required: "Este campo é obrigatório", maxLength: { value: 500, message: "O texto não pode exceder 500 caracteres" } })} placeholder="Indique os próximos passos ou recomendações para o paciente" className="resize-none text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <FieldError>{errors.nextSteps?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Notas Privadas:</FieldLabel>
                                    <Textarea aria-invalid={errors.privateNotes ? "true" : "false"} {...register("privateNotes", { maxLength: { value: 500, message: "O texto não pode exceder 500 caracteres" } })} placeholder="Adicione notas privadas para esta sessão (visíveis apenas para você)" className="resize-none text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <FieldError>{errors.privateNotes?.message}</FieldError>
                                </Field>
                            </FieldGroup>
                            <DialogFooter className="bg-white">
                                <DialogClose asChild>
                                    <Button variant="outline" className="border-s! border-gray-300! text-black hover:text-black! hover:bg-accent-foreground! cursor-pointer">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white cursor-pointer">Salvar</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <NotesList reset={reset} setOpen={setOpen} />
            <Toaster richColors />
        </Layout>
    )
}

function NotesList({ reset, setOpen }: { reset: UseFormReset<NotesFormData>, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Therapist;
    const notes = useSessionNoteStore(state => state.sessionNotes).filter(note => note.therapistId === user?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="flex flex-col">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} reset={reset} setOpen={setOpen} />
            ))}
        </div>
    )
}

function NoteCard({ note, reset, setOpen }: { note: SessionNote, reset: UseFormReset<NotesFormData>, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { removeSessionNote } = useSessionNoteStore();

    return (
        <CustomCard>
            <Collapsible>
                <CustomCardHeader>
                    <CustomCardTitle><FileText className="inline-block mr-2" />Sessão - {new Date(note.date).toLocaleDateString("pt-BR")}</CustomCardTitle>
                    <CollapsibleTrigger asChild data-testid="collapse-trigger">
                        <Button variant="outline" size="sm" className="group hover:bg-accent-foreground! hover:text-black text-black!">
                            <ChevronDown strokeWidth={4} className="group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                </CustomCardHeader>
                <CustomCardContent>
                    <div className="mt-5">
                        <CustomCardTitle>Estado Emocional</CustomCardTitle>
                        <Badge variant="secondary" className="mt-2">{note.mood}</Badge>
                    </div>
                    <div className="mt-5">
                        <CustomCardTitle>Tópicos Abordados</CustomCardTitle>
                        <div className="flex flex-row flex-wrap mt-2 gap-2">
                            {note.topicsCovered?.map((topic: string, index: number) => (
                                <Badge key={index} variant="default">{topic}</Badge>
                            ))}
                        </div>
                    </div>
                    <CollapsibleContent>
                        <div className="mt-5">
                            <CustomCardTitle>Conteúdo da Sessão</CustomCardTitle>
                            <p className="text-gray-500">{note.content}</p>
                        </div>
                        <div className="mt-5">
                            <CustomCardTitle>Próximos Passos</CustomCardTitle>
                            <p className="text-gray-500">{note.nextSteps}</p>
                        </div>
                        <Separator className="my-5 bg-muted-foreground" />
                        <div className="mt-5">
                            <p className="text-orange-400 font-bold text-md">Notas Privadas (Somente terapeuta)</p>
                            <p className="text-gray-500">{note.privateNotes}</p>
                        </div>
                        <div className="flex mt-5">
                            <Button variant="destructive" className="cursor-pointer" size="sm" onClick={() => { removeSessionNote(note.id); toast.success("Anotação excluída com sucesso!"); }}>Excluir Anotação</Button>
                            <Button variant="default" className="ml-2 cursor-pointer" size="sm" onClick={() => { reset(note); setOpen(true); }}>Editar Anotação</Button>
                        </div>
                    </CollapsibleContent>
                </CustomCardContent>
            </Collapsible>
        </CustomCard>
    )
}

export default TherapistNotes;