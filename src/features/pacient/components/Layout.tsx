import { Header, HeaderInfo, HeaderLogoutButton, HeaderSubtitle, HeaderTitle, HeaderUserIcon } from "../../../components/Header";
import { User } from "lucide-react";
import NavMenu from "./PacientNavMenu";
import { useSessionStore } from "@/hooks/sessionStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { session, clearSession } = useSessionStore();
    const [hydrated, setHydrated] = useState(() => useSessionStore.persist.hasHydrated());

    useEffect(() => {
        const unsub = useSessionStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });
        return unsub;
    }, []);

    useEffect(() => {
        if (hydrated && !session) {
            navigate("/");
        }
        if (hydrated && session && session.user.role !== "pacient") {
            clearSession();
            navigate("/");
        }
    }, [hydrated, session, clearSession, navigate]);

    if (!hydrated) return null; // ou um loading spinner

    if (!session) return null;

    return (
        <section className="flex flex-col w-full min-h-screen bg-violet-50">
            <PacientHeader>
                <HeaderUserIcon><User /></HeaderUserIcon>
                <div>
                    <HeaderTitle>Meu Espaço Terapêutico</HeaderTitle>
                    <HeaderSubtitle>Bem vindo, {session.user.firstName}!</HeaderSubtitle>
                </div>
            </PacientHeader>
            <NavMenu />
            <div className="lg:px-30 px-4">
                {children}
            </div>
        </section>
    )
}

function PacientHeader({ children }: { children?: React.ReactNode }) {
    return (
        <Header>
            <HeaderInfo>
                {children}
            </HeaderInfo>
            <HeaderLogoutButton />
        </Header>
    )
}

export default Layout;