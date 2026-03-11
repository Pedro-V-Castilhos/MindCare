import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ children }: { children?: React.ReactNode }) {
    return (
        <header className="flex justify-between items-center w-full bg-white text-black lg:px-30 p-4 mb-2">
            {children}
        </header>
    )
}

function HeaderInfo({ children }: { children: React.ReactNode }) {
    return (<div className="flex flex-row items-center w-max gap-4">{children}</div>);
}

function HeaderTitle({ children }: { children: React.ReactNode }) {
    return (<h1 className="text-xl font-semibold">{children}</h1>);
}

function HeaderSubtitle({ children }: { children: React.ReactNode }) {
    return (<p className="text-sm text-muted-foreground">{children}</p>);
}

function HeaderUserIcon({ children }: { children: React.ReactNode }) {
    return (<div className="inline-block bg-violet-600 p-2 rounded-lg text-white">{children}</div>);
}

function HeaderLogoutButton() {
    const navigate = useNavigate();

    return (
        <Button onClick={() => { navigate("/") }} data-icon="inline-start" variant="default" size="lg" className="bg-white border rounded-sm border-gray-300 cursor-pointer text-black hover:text-black hover:bg-gray-200 gap-3 text-lg">
            <LogOut />
            Sair
        </Button>
    );
}

export { Header, HeaderInfo, HeaderTitle, HeaderSubtitle, HeaderUserIcon, HeaderLogoutButton };