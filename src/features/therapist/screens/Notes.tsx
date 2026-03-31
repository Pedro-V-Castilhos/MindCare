import { PageHeader } from "@/components/Text";
import { FileText, ChevronDown, Plus } from "lucide-react";
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

function TherapistNotes() {
    return (
        <Layout>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center my-4 gap-2 sm:gap-0">
                <PageHeader>Anotações de Sessão</PageHeader>
                <Button variant="default" className="bg-black text-white px-3 py-4 w-full sm:w-auto flex">
                    <Plus className="inline-block mr-2" />
                    Nova Anotação
                </Button>
            </div>
            <NotesList />
        </Layout>
    )
}

function NotesList() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Therapist;
    const notes = useSessionNoteStore(state => state.sessionNotes).filter(note => note.therapistId === user?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="flex flex-col">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    )
}

function NoteCard({ note }: { note: SessionNote }) {
    return (
        <CustomCard>
            <Collapsible>
                <CustomCardHeader>
                    <CustomCardTitle><FileText className="inline-block mr-2" />Sessão - {new Date(note.date).toLocaleDateString("pt-BR")}</CustomCardTitle>
                    <CollapsibleTrigger asChild>
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
                    </CollapsibleContent>
                </CustomCardContent>
            </Collapsible>
        </CustomCard>
    )
}

export default TherapistNotes;