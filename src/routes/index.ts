import { Router } from "express";

const router = Router();

router.get("/", (_, res) => res.send("Welcome service order"));

export { router };
