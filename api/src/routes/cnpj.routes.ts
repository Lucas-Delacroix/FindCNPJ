import { Router } from "express";
import { cnpjController } from "../controllers/cnpj.controller";
import { asyncHandler } from "../lib/async-handler";

export const cnpjRoutes = Router();

const handler = asyncHandler(cnpjController.findAndEnrich);

cnpjRoutes.get("/:cnpj", handler);
cnpjRoutes.get("/:part1/:part2", handler);
