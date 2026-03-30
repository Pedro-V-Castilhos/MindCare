import { AlignJustify, Calendar, FileText, FileUp, MessageCircle, TrendingUp } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../../../components/ui/navigation-menu";

function TherapistNavMenu() {
    return (
        <NavigationMenu className="lg:px-30 px-4 gap-4 my-2 flex-none">
            <NavigationMenuList className="flex flex-row flex-wrap bg-white border border-gray-300 px-4 rounded-lg">
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/therapist" className="text-black font-semibold"><AlignJustify />Início</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/therapist/appointments" className="text-black font-semibold"><Calendar />Agendamentos</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/therapist/progress" className="text-black font-semibold"><TrendingUp />Progresso</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/therapist/notes" className="text-black font-semibold"><FileText />Anotações</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="/therapist/documents" className="text-black font-semibold"><FileUp />Documentos</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="hover:bg-gray-200 focus:bg-gray-200" asChild><a href="#" className="text-black font-semibold"><MessageCircle />Chat</a></NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default TherapistNavMenu;