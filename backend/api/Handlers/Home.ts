import { Request, Response } from "express";
import Handler from "./BaseHandler";

class HomeHandler extends Handler {
    public index(req: Request, res: Response): void {
        try {
            res.status(200).send({
                API: "Hadits Tsirwah API",
                by: "view_source",
                github: "https://github.com/vi3w-s0urce",
            });
        } catch (err) {
            this.handleHttpError(req, res, err as Error);
        }
    }
}

export default new HomeHandler();
