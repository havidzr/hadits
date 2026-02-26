import Express, { Application, Request, Response } from "express";
import Cors from "cors";
import Routes from "./api/Routes";


const app: Application = Express();
const port: number | string = process.env.PORT || 3300;

// Middleware
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(Cors());

// Routes
app.use("/api", Routes);

// Request handler
app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Not Found");
});

export default (req: Request, res: Response) => {
    app(req, res);
};

// Run server locally, but not in production
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}
