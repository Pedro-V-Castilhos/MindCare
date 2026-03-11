import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function CustomCard({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <Card className={`bg-white text-black border border-gray-300 rounded-lg p-4 my-2 ${className}`}>
            {children}
        </Card>
    )
}

function CustomCardHeader({ children }: { children: React.ReactNode }) {
    return (<CardHeader className="flex flex-row justify-between">{children}</CardHeader>);
}

function CustomCardTitle({ children }: { children: React.ReactNode }) {
    return (<CardTitle className="text-md font-semibold">{children}</CardTitle>);
}

function CustomCardSubtitle({ children }: { children: React.ReactNode }) {
    return (<CardTitle className="text-sm text-muted-foreground">{children}</CardTitle>);
}

function CustomCardIcon({ children }: { children: React.ReactNode }) {
    return (<p className="text-sm text-gray-500">{children}</p>);
}

function CustomCardContent({ children }: { children: React.ReactNode }) {
    return (<CardContent className="">{children}</CardContent>);
}

function CustomCardNumberHighlight({ children }: { children: React.ReactNode }) {
    return (<p className="text-2xl font-bold mt-5">{children}</p>);
}

function CustomCardHighlightDescription({ children }: { children: React.ReactNode }) {
    return (<p className="text-sm text-muted-foreground">{children}</p>);
}

export { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardSubtitle, CustomCardIcon, CustomCardContent, CustomCardNumberHighlight, CustomCardHighlightDescription };