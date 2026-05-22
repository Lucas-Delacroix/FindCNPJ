import { Router } from "express";
import { cnpjController } from "../controllers/cnpj.controller";
import { asyncHandler } from "../lib/async-handler";

export const cnpjRoutes = Router();

cnpjRoutes.get("/:cnpj", asyncHandler(cnpjController.findAndEnrich));
