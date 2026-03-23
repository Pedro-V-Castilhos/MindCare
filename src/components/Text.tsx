function MutedText({ children }: { children?: React.ReactNode }) {
    return (
        <p className="text-sm text-muted-foreground">{children}</p>
    )
}

function SemiboldText({ children }: { children?: React.ReactNode }) {
    return (
        <p className="text-lg font-semibold">{children}</p>
    )
}

function PageHeader({ children }: { children?: React.ReactNode }) {
    return (
        <h2 className="text-black text-xl font-semibold my-4">{children}</h2>
    )
}

export { MutedText, SemiboldText, PageHeader };