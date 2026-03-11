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

export { MutedText, SemiboldText };