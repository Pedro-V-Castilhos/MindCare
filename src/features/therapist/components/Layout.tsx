import { Header, HeaderInfo, HeaderLogoutButton, HeaderSubtitle, HeaderTitle, HeaderUserIcon } from "../../../components/Header";
import { User } from "lucide-react";
import TherapistNavMenu from "./TherapistNavMenu";
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
        if (hydrated && session && session.user.role !== "therapist") {
            clearSession();
            navigate("/");
        }
    }, [hydrated, session, clearSession, navigate]);

    if (!hydrated) return null; // ou um loading spinner

    if (!session) return null;

    return (
        <section className="flex flex-col w-full min-h-screen bg-violet-50">
            <TherapistHeader>
                <HeaderUserIcon><User /></HeaderUserIcon>
                <div>
                    <HeaderTitle>Gerenciamento de Terapia</HeaderTitle>
                    <HeaderSubtitle>Bem vindo(a), Dr(a). {session.user.firstName}!</HeaderSubtitle>
                </div>
            </TherapistHeader>
            <TherapistNavMenu />
            <div className="lg:px-30 px-4">
                {children}
            </div>
        </section>
    )
}

function TherapistHeader({ children }: { children?: React.ReactNode }) {
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