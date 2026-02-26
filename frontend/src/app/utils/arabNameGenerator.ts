const arabNameGenerator = (name: string): string => {
    switch (name) {
        case "abu-daud":
            return "سنن أبي داود";
        case "ahmad":
            return "مسند أحمد";
        case "bukhari":
            return "صحيح البخاري";
        case "darimi":
            return "سنن الدارمي";
        case "ibnu-majah":
            return "سنن ابن ماجه";
        case "malik":
            return "موطأ مالك";
        case "muslim":
            return "صحيح مسلم";
        case "nasai":
            return "سنن النسائي";
        case "tirmidzi":
            return "سنن الترمذي";
        default:
            return "invalid ID";
    }
};

export default arabNameGenerator;
