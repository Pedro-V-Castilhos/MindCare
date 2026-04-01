import { PageHeader } from "@/components/Text";
import Layout from "../components/Layout";
import { Plus, FileText, Download, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCard, CustomCardContent } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { useDocumentsStore } from "@/hooks/documentsStore";
import type { Therapist } from "@/types/user";
import { useSessionStore } from "@/hooks/sessionStore";
import type { Document } from "@/types/document";
import { downloadFile } from "@/lib/bucket";
import { useUserStore } from "@/hooks/userStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

interface DocumentFormData {
    pacientId: number;
    name: string;
    type: "receipt" | "report" | "prescription" | "other";
    file: FileList;
}

function TherapistDocuments() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Therapist;
    const patients = useUserStore(useShallow(state => state.users.filter(u => u.role === "pacient" && u.therapistId === user.id)));
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<DocumentFormData>({
        defaultValues: {
            pacientId: 0,
            name: "",
            type: "receipt",
            file: undefined,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });
    const documentTypes: { [key: string]: string } = {
        receipt: "Recibo",
        report: "Relatório",
        prescription: "Prescrição",
        other: "Outro"
    };
    const file = watch("file");
    const { documents, addDocument } = useDocumentsStore()

    const submitNewDocument = async (data: DocumentFormData) => {
        const file = data.file[0];
        try {
            addDocument({
                id: documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1,
                name: data.name,
                type: data.type,
                uploadDate: new Date(),
                size: Math.round(file.size / 1024),
                patientId: data.pacientId,
                therapistId: user.id,
            } as Document, file)
            toast.success("Documento adicionado com sucesso!");
        } catch (error) {
            toast.error("Erro ao fazer upload do documento:" + (error instanceof Error ? error.message : "Erro desconhecido"));
        } finally {
            setOpen(false);
        }
    }

    return (
        <Layout>
            <div className="flex flex-row justify-between items-center">
                <PageHeader>Documentos</PageHeader>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="bg-black text-white cursor-pointer">
                            <Plus className="mr-2" /> Adicionar Documento
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-white backdrop:fill-accent-foreground">
                        <form onSubmit={handleSubmit(submitNewDocument)}>
                            <DialogHeader>
                                <DialogTitle className="text-black">Fazer Upload de Documento</DialogTitle>
                                <DialogDescription>Adicione um novo documento ao sistema</DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="py-4">
                                <Field>
                                    <FieldLabel className="text-black">Paciente:</FieldLabel>
                                    <Controller control={control} name="pacientId" rules={{ required: "Paciente é obrigatório" }} render={({ field }) => (
                                        <Combobox items={patients} onValueChange={(value) => field.onChange(Number(value))} value={field.value} itemToStringLabel={(value) => {
                                            const item = patients.find(u => u.id === value);
                                            return item ? `${item.firstName} ${item.lastName}` : "";
                                        }}>
                                            <ComboboxInput placeholder="Selecione o paciente..." aria-invalid={errors.pacientId ? "true" : "false"} className="z-50 w-full sm:w-auto text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
                                    <FieldError>{errors.pacientId?.message}</FieldError>

                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Nome do Documento:</FieldLabel>
                                    <Input {...register("name", { required: "Nome do documento é obrigatório" })} placeholder="Ex: Recibo - Sessão --/--/----" aria-invalid={errors.name ? "true" : "false"} className="text-black w-full bg-gray-100! placeholder:text-muted-foreground! border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <FieldError>{errors.name?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Tipo do Documento:</FieldLabel>
                                    <Controller control={control} name="type" rules={{ required: "Tipo do documento é obrigatório" }} render={({ field }) => (
                                        <Combobox items={Object.keys(documentTypes)} onValueChange={field.onChange} value={field.value ?? ""} itemToStringLabel={(value) => documentTypes[value]}>
                                            <ComboboxInput placeholder="Selecione o tipo de documento" aria-invalid={errors.type ? "true" : "false"} className="z-50 w-full sm:w-auto text-black! bg-gray-100! border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                            <ComboboxContent>
                                                <ComboboxList className="pointer-events-auto">
                                                    {(item) => (
                                                        <ComboboxItem
                                                            key={item}
                                                            value={item}
                                                            className="cursor-pointer px-3 py-2 rounded-md hover:bg-gray-200"
                                                        >
                                                            {documentTypes[item]}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    )} />
                                    <FieldError>{errors.type?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel className="text-black">Arquivo:</FieldLabel>
                                    <Input id="file" {...register("file", { required: "Arquivo é obrigatório", max: { value: 52428800, message: "O arquivo deve ter no máximo 50MB" } })} type="file" accept=".pdf,.doc,.docx,.txt,.jpg,.png,.jpeg" className="hidden" />
                                    <label htmlFor="file" className="w-full cursor-pointer bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-black hover:bg-gray-200">
                                        <FileText className="inline-block mr-2" />{file && file.length > 0 ? file[0].name : "Selecione um arquivo"}
                                    </label>
                                    <FieldDescription className="text-sm text-muted-foreground">Tipos permitidos: PDF, DOC, DOCX, TXT, JPG, PNG, JPEG (Max: 50MB)</FieldDescription>
                                    <FieldError>{errors.file?.message}</FieldError>
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
            <DocumentList />
        </Layout>
    )
}

function DocumentList() {
    const session = useSessionStore((s) => s.session);
    const user = session?.user as Therapist;
    const documents = useDocumentsStore(state => state.documents).filter(doc => doc.therapistId === user.id);
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
    const pacient = useUserStore(state => state.users.find(u => u.id === userDocument.patientId));

    return (
        <CustomCard>
            <CustomCardContent>
                <div className="flex flex-row flex-wrap sm:justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <FileText size={40} className="bg-gray-200 p-2 rounded-lg" />
                        <div>
                            <p className="font-semibold">{userDocument.name} <Badge variant="secondary">{userDocument.type}</Badge></p>
                            <p className="text-muted-foreground">Paciente: {`${pacient?.firstName} ${pacient?.lastName}`}</p>
                            <p className="text-muted-foreground">Upload: {new Date(userDocument.uploadDate).toLocaleDateString()} • {userDocument.size} KB</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-2 sm:mt-0 gap-2">
                        <Button onClick={async () => {
                            const path = userDocument.url.split("/").pop()!;
                            console.log("Downloading file from path:", path);
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

export default TherapistDocuments;