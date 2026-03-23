import { PageHeader } from "@/components/Text";
import { FileText, ChevronDown } from "lucide-react";
import Layout from "./Layout";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardTitle } from "@/components/Card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PacientNotes() {
    return (
        <Layout>
            <PageHeader>Anotações de Sessão</PageHeader>
            <NotesList />
        </Layout>
    )
}

function NotesList() {
    return (
        <div className="flex flex-col">
            <NoteCard />
            <NoteCard />
            <NoteCard />
        </div>
    )
}

function NoteCard() {
    return (
        <CustomCard>
            <Collapsible>
                <CustomCardHeader>
                    <CustomCardTitle><FileText className="inline-block mr-2" />Sessão de 20/09/2024</CustomCardTitle>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm" className="group hover:bg-accent-foreground! hover:text-black text-black!">
                            <ChevronDown strokeWidth={4} className="group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                </CustomCardHeader>
                <CustomCardContent>
                    <div className="mt-5">
                        <CustomCardTitle>Estado Emocional</CustomCardTitle>
                        <Badge variant="secondary" className="mt-2">Ansioso, mas esperançoso</Badge>
                    </div>
                    <div className="mt-5">
                        <CustomCardTitle>Tópicos Abordados</CustomCardTitle>
                        <div className="flex flex-row flex-wrap mt-2 gap-2">
                            <Badge variant="default">Técnicas de Respiração</Badge>
                            <Badge variant="default">Ansiedade</Badge>
                            <Badge variant="default">Mindfullness</Badge>
                        </div>
                    </div>
                    <CollapsibleContent>
                        <div className="mt-5">
                            <CustomCardTitle>Conteúdo da Sessão</CustomCardTitle>
                            <p className="text-gray-500">Sessão focada em técnicas de manejo de ansiedade. Paciente relatou melhora significativa nos sintomas após implementar exercícios de respiração.</p>
                        </div>
                        <div className="mt-5">
                            <CustomCardTitle>Próximos Passos</CustomCardTitle>
                            <p className="text-gray-500">Continuar praticando exercícios diários de respiração. Introduzir técnicas de exposição gradual.</p>
                        </div>
                    </CollapsibleContent>
                </CustomCardContent>
            </Collapsible>
        </CustomCard>
    )
}

export default PacientNotes;