import { Request, Response } from "express";
import Handler from "./BaseHandler";
import Hadith from "../Models/Hadith";
import * as cheerio from "cheerio";
import axios from "axios";
import dataTema from "../../dir_tema/dataTema";
import { data } from "cheerio/dist/commonjs/api/attributes";

interface HaditsData {
    name: string;
    arab: string;
    id: string;
}

class TemaHandler extends Handler {
    public async index(req: Request, res: Response) {
        try {
            const data = dataTema;
            this.sendHttp(res, {
                code: 200,
                message: `${data.length} tema sent.`,
                data,
            });
        } catch (err) {
            this.handleHttpError(req, res, err as Error);
        }
    }

    public async getByTema(req: Request, res: Response): Promise<void> {
        const { id, pagination = 1 } = req.params;

        const nomorTema = Hadith.convertNomorTema(id);

        const results: HaditsData[] = [];

        const tema = dataTema.find((tema) => tema.id === id);
        const data = {
            ...tema,
            currentPage: pagination,
            hadits: results,
        };

        try {
            if (!nomorTema)
                this.setHttpError({
                    code: 404,
                    message: "Tema not found!",
                });

            const url = `https://hadits.tazkia.ac.id/hadits/tema/${nomorTema}?page_haditses=${pagination}`;
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);

            $("div.hadits").each((i, div) => {
                const nameText = $(div).find("h2").text().trim().replace(/#/g, "");
                let realName = nameText.replace(/\d+/g, "").trim();
                realName = Hadith.convertNameHadits(realName);

                let arabText = $(div).find("p.arabic").text().trim().replace(/\n/g, " ");
                if (arabText.includes(":")) {
                    arabText = arabText.split(":")[1].trim();
                }

                let idText = $(div).find("p.indonesia").text().trim();
                let idTextCleaned = idText.startsWith(nameText) ? idText.substring(nameText.length).trim() : idText;
                if (idTextCleaned.length > 2) {
                    idTextCleaned = idTextCleaned.substring(2);
                }
                idTextCleaned = idTextCleaned.replace(/\n/g, " ");

                results.push({
                    name: realName,
                    arab: arabText,
                    id: idTextCleaned,
                });
            });

            this.sendHttp(res, {
                code: 200,
                message: "Scraping Berhasil. jumlah data: " + results.length,
                data,
            });
        } catch (error) {
            console.error("Error during request:", error);
            this.handleHttpError(req, res, error as Error);
        }
    }

    public async getSingleHadits(req: Request, res: Response) {
        const { tema, id } = req.params;

        const namaTema = tema;

        type data = {
            name: string,
            id: string,
            contents: {
                number: number,
                arab: string,
                id: string,
            }
        }

        try {
            const nomorTema = Hadith.convertNomorTema(tema);

            if (!nomorTema) {
                this.setHttpError({
                    code: 404,
                    message: "Tema not found!",
                });
            }

            const detailTema = dataTema.find((tema) => tema.id === namaTema);

            if (Number(id) < 1 || Number(id) > Number(detailTema?.totalHadits)) {
                this.setHttpError({
                    code: 404,
                    message: "Hadits not found!",
                });
            }

            const itemsPerPage = 10;
            const pagination = Math.ceil(Number(id) / itemsPerPage);

            const url = `https://hadits.tazkia.ac.id/hadits/tema/${nomorTema}?page_haditses=${pagination}`;

            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);

            const itemId = Number(id)  % 10;

            let data: Partial<data> = {};

            $("div.hadits").each((i, div) => {
                if (i == itemId - 1) {
                    const nameText = $(div).find("h2").text().trim().replace(/#/g, "");
                    let realName = nameText.replace(/\d+/g, "").trim();
                    realName = Hadith.convertNameHadits(realName);

                    let arabText = $(div).find("p.arabic").text().trim().replace(/\n/g, " ");
                    if (arabText.includes(":")) {
                        arabText = arabText.split(":")[1].trim();
                    }

                    let idText = $(div).find("p.indonesia").text().trim();
                    let idTextCleaned = idText.startsWith(nameText) ? idText.substring(nameText.length).trim() : idText;
                    if (idTextCleaned.length > 2) {
                        idTextCleaned = idTextCleaned.substring(2);
                    }
                    idTextCleaned = idTextCleaned.replace(/\n/g, " ");

                    data = {
                        name: realName,
                        id: tema,
                        contents: {
                            number: Number(id),
                            arab: arabText,
                            id: idTextCleaned,
                        }
                    };
                }
            });

            this.sendHttp(res, {
                code: 200,
                message: `Get single hadits`,
                data,
            });
        } catch (err) {
            this.handleHttpError(req, res, err as Error);
        }
    }
}

export default new TemaHandler();
