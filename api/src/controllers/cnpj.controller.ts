import type { Request, Response } from "express";
import { cnpjPathSchema, cnpjQuerySchema } from "../schemas/cnpj.schema";
import { cnpjService } from "../services/cnpj.service";

export const cnpjController = {
  findAndEnrich: async (req: Request, res: Response): Promise<void> => {
    const { cnpj } = cnpjPathSchema.parse(req.params);
    const { contato } = cnpjQuerySchema.parse(req.query);
    const data = await cnpjService.findAndEnrich(cnpj, contato);
    res.json(data);
  },
};
