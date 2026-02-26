import { readdirSync } from "fs";

export type HadithContent = {
    number: number;
    arab: string;
    id: string;
};

export type Hadith = {
    name: string;
    id: string;
    available: number;
};

export type HadithContentBySearch = {
    kitabId: string;
    number: number;
    name: string;
    arab: string;
    id: string;
};

export type HadithResultBySearch = {
    keyword: string;
    totalResults: number;
    requested: number;
    limit: number;
    page: number;
    availablePages: number;
    hadiths: HadithContentBySearch[];
};

export type Hadiths = {
    [name: string]: HadithContent[];
};

const basePath = __dirname + "/../../dir_books";

class HadithModel {
    private getAllHadithsMetadata() {
        return readdirSync(basePath)
            .filter(file => file.endsWith(".json"))
            .map(file => ({
                id: file.replace(".json", ""),
                fileName: file
            }));
    }

    private loadHadithFile(haditsName: string): HadithContent[] {
        try {
            const filePath = `../../dir_books/${haditsName}.json`;
            // Using require here is fine for occasional manual loading, 
            // but in a real production environment with many files, 
            // fs.readFileSync + JSON.parse might be better for memory management.
            return require(filePath);
        } catch (error) {
            console.error(`Error loading hadith file ${haditsName}:`, error);
            return [];
        }
    }

    public available(): Hadith[] {
        const metadata = this.getAllHadithsMetadata();
        return metadata.map((item) => {
            const data = this.loadHadithFile(item.id);
            return {
                name: `HR. ${this.beautyName(item.id)}`,
                id: item.id,
                available: data.length,
            };
        });
    }

    public getByName(haditsName: string): HadithContent[] {
        return this.loadHadithFile(haditsName);
    }

    public getByNumberRange(hadits: HadithContent[], from: number, to: number): HadithContent[] {
        const data: HadithContent[] = [];
        if (!hadits) throw new Error(`Not Available`);
        if (from > to) {
            for (from; from >= to; from--) {
                data.push(hadits[from - 1]);
            }
        } else {
            for (from; from <= to; from++) {
                data.push(hadits[from - 1]);
            }
        }
        return data;
    }

    public getByNumber(hadits: HadithContent[], number: number): HadithContent | undefined {
        return hadits.find((hadith) => hadith.number === number);
    }

    public getBySearch(keyword: string, page: number = 1): HadithResultBySearch {
        const results: HadithContentBySearch[] = [];

        const lowerCaseKeyword = keyword.toLowerCase();

        const metadata = this.getAllHadithsMetadata();

        // Melakukan iterasi pada setiap koleksi hadits
        metadata.forEach((item) => {
            const data = this.loadHadithFile(item.id);
            // Mencari hadits dalam koleksi yang id-nya atau arab-nya mengandung keyword
            const filteredHadiths = data.filter((hadith) =>
                (hadith.id && hadith.id.toLowerCase().includes(lowerCaseKeyword)) ||
                (hadith.arab && hadith.arab.toLowerCase().includes(lowerCaseKeyword))
            );

            // Jika ada hadits yang cocok, tambahkan ke results
            filteredHadiths.forEach((hadith) => {
                results.push({
                    name: `HR. ${this.beautyName(item.id)}`,
                    kitabId: item.id,
                    number: hadith.number,
                    arab: hadith.arab,
                    id: hadith.id,
                });
            });
        });

        const limit = 10;

        // Total jumlah hadits yang ditemukan
        const totalResults = results.length;

        // Menghitung offset berdasarkan page
        const offset = (page - 1) * limit;

        // Mengambil hadits sesuai dengan limit dan offset
        const paginatedHadiths = results.slice(offset, offset + limit);

        const availablePages = Math.ceil(totalResults / limit);

        // Mengembalikan hasil pencarian
        return {
            keyword,
            totalResults,
            requested: paginatedHadiths.length,
            limit,
            page,
            availablePages,
            hadiths: paginatedHadiths,
        };
    }

    public beautyName(haditsName: string): string {
        const words = haditsName.split("-");
        return words.reduce((acc, word) => acc + ` ${word[0].toUpperCase() + word.substr(1).toLowerCase()}`, "").trim();
    }

    public convertNomorTema(id: string): number | null | undefined {
        if (!id) {
            return null;
        } else {
            switch (id) {
                case "iman":
                    return 1;
                case "ilmu":
                    return 2;
                case "umat-terdahulu":
                    return 3;
                case "perjalanan-hidup":
                    return 4;
                case "al-quran":
                    return 5;
                case "akhlaq-dan-adab":
                    return 6;
                case "ibadah":
                    return 7;
                case "makanan-minuman":
                    return 8;
                case "pakaian-perhiasan":
                    return 9;
                case "masalah-kepribadian":
                    return 10;
                case "muamalah":
                    return 11;
                case "putusan-hukum":
                    return 12;
                case "kriminalitas":
                    return 13;
                case "jihad":
                    return 14;
                default:
                    null;
            }
        }
    }

    public convertNameHadits(name: string): string {
        switch (name) {
            case "Shahih Bukhari":
                return "HR. Bukhari";
            case "Sunan Abu Dawud":
                return "HR. Abu Daud";
            case "Musnad Ahmad":
                return "HR. Ahmad";
            case "Sunan Darimi":
                return "HR. Darimi";
            case "Sunan Ibnu Majah":
                return "HR. Ibnu Majah";
            case "Muwatha' Malik":
                return "HR. Malik";
            case "Shahih Muslim":
                return "HR. Muslim";
            case "Sunan Nasa'i":
                return "HR. Nasai";
            case "Sunan Tirmidzi":
                return "HR. Tirmidzi";
            default:
                return name;
        }
    }
}

export default new HadithModel();
