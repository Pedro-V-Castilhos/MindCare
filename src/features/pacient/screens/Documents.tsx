import { PageHeader } from "@/components/Text";
import Layout from "../components/Layout";
import { Plus, FileText, Download, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCard, CustomCardContent } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { useDocumentsStore } from "@/hooks/documentsStore";
import type { Pacient } from "@/types/user";
import { useSessionStore } from "@/hooks/sessionStore";
import type { Document } from "@/types/document";
import { downloadFile } from "@/lib/bucket";

function PacientDocuments() {
    return (
        <Layout>
            <div className="flex flex-row justify-between items-center">
                <PageHeader>Documentos</PageHeader>
                <Button onClick={() => useDocumentsStore.getState().reset()} variant="default" className="bg-black text-white cursor-pointer">
                    <Plus className="mr-2" /> Adicionar Documento
                </Button>
            </div>
            <DocumentList />
        </Layout>
    )
}

function DocumentList() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Pacient;
    const documents = useDocumentsStore(state => state.documents).filter(doc => doc.patientId === user.id);
    return (
        <>
            {documents.map((document) => (
                <DocumentCard key={document.id} userDocument={document} />
            ))}
        </>
    )
}

function DocumentCard({ userDocument }: { userDocument: Document }) {
    const removeDocument = useDocumentsStore(state => state.removeDocument);
    return (
        <CustomCard>
            <CustomCardContent>
                <div className="flex flex-row flex-wrap sm:justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <FileText size={40} className="bg-gray-200 p-2 rounded-lg" />
                        <div>
                            <p className="font-semibold">{userDocument.name} <Badge variant="secondary">{userDocument.type}</Badge></p>
                            <p className="text-muted-foreground">Upload: {new Date(userDocument.uploadDate).toLocaleDateString()} • {userDocument.size} KB</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-2 sm:mt-0 gap-2">
                        <Button onClick={async () => {
                            const path = userDocument.url.split("/").pop()!;
                            const blob = await downloadFile(path);
                            const url = URL.createObjectURL(blob);
                            const a = Object.assign(document.createElement("a"), {
                                href: url,
                                download: userDocument.name,
                            });
                            a.click();
                            URL.revokeObjectURL(url);
                        }} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                            <Download />
                        </Button>
                        <Button variant="destructive" className="bg-red-400! text-white hover:bg-red-500!" onClick={() => removeDocument(userDocument.id)}>
                            <TrashIcon strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </CustomCardContent>
        </CustomCard>
    )
}

export default PacientDocuments;