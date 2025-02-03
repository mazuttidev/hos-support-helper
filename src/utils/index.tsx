export default function formatMarkdownMessage(jsonString: string | undefined | null) {
    if (typeof jsonString !== "string") {
        console.warn("Problemas em formatMarkdownMessage:", jsonString);
        return ""; // Retorna uma string vazia se o input não for válido
    }

    const message = jsonString
        .replace(/\n\n/g, "\n") // Remove linhas extras
        .replace(/\\n/g, "\n") // Substitui caracteres escapados
        .replace(/(\*\w+):\*/g, "**$1:**") // Negrito para títulos
        .replace(/File \d <(https?:\/\/.+?)>/g, "- [File $1]($1)") // Converte links de anexos
        .replace(/<https?:\/\/.+?>/g, (match) => {
            const url = match.slice(1, -1);
            return `[${url}](${url})`;
        }); // Formata links

    return message.trim();
}
