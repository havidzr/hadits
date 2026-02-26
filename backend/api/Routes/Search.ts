import Hadith from "../Handlers/Hadith";
import Router from "./BaseRouter";

class SearchRoute extends Router<typeof Hadith> {
    constructor() {
        super(Hadith);
    }

    public routes() {
        this.router.get("/", this.bindHandler(Hadith.getBySearch));
    }
}

export default new SearchRoute().router;
