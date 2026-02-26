import Hadith from "../Handlers/Hadith";
import Tema from "../Handlers/Tema";
import Router from "./BaseRouter";

class SearchRoute extends Router<typeof Hadith> {
    constructor() {
        super(Hadith);
    }

    public routes() {
        this.router.get("/", this.bindHandler(Tema.index));
        this.router.get('/:id/:pagination', this.bindHandler(Tema.getByTema))
        this.router.get('/:tema/hadits/:id', this.bindHandler(Tema.getSingleHadits))
    }
}

export default new SearchRoute().router;
