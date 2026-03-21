import { Header, HeaderInfo, HeaderLogoutButton, HeaderSubtitle, HeaderTitle, HeaderUserIcon } from "../../Header";
import { User } from "lucide-react";
import NavMenu from "@/components/PacientNavMenu";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col w-full min-h-screen bg-violet-50">
            <PacientHeader>
                <HeaderUserIcon><User /></HeaderUserIcon>
                <div>
                    <HeaderTitle>Meu Espaço Terapêutico</HeaderTitle>
                    <HeaderSubtitle>Bem vindo, Pedro Viana de Castilhos!</HeaderSubtitle>
                </div>
            </PacientHeader>
            <NavMenu />
            {children}
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