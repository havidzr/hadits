export const formatHadith = (text: string, mode: 'html' | 'text' = 'html', keyword?: string): string => {
    if (!text) return "";
    let formatted = text;

    // 1. Highlight keyword (only for HTML)
    if (mode === 'html' && keyword?.trim()) {
        const regex = new RegExp(`(${keyword})`, "gi");
        formatted = formatted.replace(regex, '<span class="bg-mint-primary text-white font-medium rounded-[4px]">$1</span>');
    }

    // 2. Bold & Italic for perawi names (only for HTML)
    if (mode === 'html') {
        formatted = formatted.replace(/\[(.*?)\]/g, '<strong class="text-mint-primary italic">[$1]</strong>');
    }

    // 3. Add line breaks for dialogue
    const breakTag = mode === 'html' ? '<br/><br/>' : '\n\n';

    // Split dialogue patterns
    formatted = formatted.replace(/(berkata:|bertanya:|menjawab:)\s*"/g, `$1${breakTag}"`);

    // Add line break after the long sanad intro
    // Usually the Sanad ends where the first quoting begins or after a specific period.
    // We look for a sentence end followed by a quote.
    const quoteIndex = formatted.indexOf('"');
    if (quoteIndex > 50) {
        formatted = formatted.replace(/(\.)\s*"/, `$1${breakTag}"`);
    }

    return formatted;
};
