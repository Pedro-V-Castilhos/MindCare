import { AlignJustify, Calendar, FileText, FileUp, MessageCircle, TrendingUp } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"

function PacientNavMenu() {
    return (
        <NavigationMenu className="lg:px-30 px-4 gap-4 my-2 flex-none">
            <NavigationMenuList className="flex flex-row flex-wrap bg-white border border-gray-300 px-4 rounded-lg">
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/dashboard" className="text-black font-semibold"><AlignJustify />Início</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/appointments" className="text-black font-semibold"><Calendar />Agendamentos</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/progress" className="text-black font-semibold"><TrendingUp />Meu Progresso</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><FileText />Anotações</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><FileUp />Documentos</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><MessageCircle />Chat</a></NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default PacientNavMenu;