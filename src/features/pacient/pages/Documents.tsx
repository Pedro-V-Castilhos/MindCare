import { PageHeader } from "@/components/Text";
import Layout from "../components/Layout";
import { Plus, FileText, Download, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCard, CustomCardContent } from "@/components/Card";
import { Badge } from "@/components/ui/badge";

function PacientDocuments() {
    return (
        <Layout>
            <div className="flex flex-row justify-between items-center">
                <PageHeader>Documentos</PageHeader>
                <Button variant="default" className="bg-black text-white cursor-pointer">
                    <Plus className="mr-2" /> Adicionar Documento
                </Button>
            </div>
            <DocumentList />
        </Layout>
    )
}

function DocumentList() {
    return (
        <>
            <DocumentCard />
            <DocumentCard />
        </>
    )
}

function DocumentCard() {
    return (
        <CustomCard>
            <CustomCardContent>
                <div className="flex flex-row flex-wrap sm:justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <FileText size={40} className="bg-gray-200 p-2 rounded-lg" />
                        <div>
                            <p className="font-semibold">Recibo - Sessão 05/03/2026 <Badge variant="secondary">Recibo</Badge></p>
                            <p className="text-muted-foreground">Upload: 05/03/2026 • 124 KB</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-2 sm:mt-0 gap-2">
                        <Button variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                            <Download />
                        </Button>
                        <Button variant="destructive" className="bg-red-400! text-white hover:bg-red-500!">
                            <TrashIcon strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </CustomCardContent>
        </CustomCard>
    )
}

export default PacientDocuments;