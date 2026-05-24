import type { Request, Response } from "express";
import { cnpjPathSchema, cnpjQuerySchema } from "../schemas/cnpj.schema";
import { cnpjService } from "../services/cnpj.service";

const extractCnpjFromParams = (params: Request["params"]): string => {
  if (typeof params.cnpj === "string" && params.cnpj.length > 0) {
    return params.cnpj;
  }
  if (typeof params.part1 === "string" && typeof params.part2 === "string") {
    return `${params.part1}/${params.part2}`;
  }
  return "";
};

export const cnpjController = {
  findAndEnrich: async (req: Request, res: Response): Promise<void> => {
    const raw = extractCnpjFromParams(req.params);
    const { cnpj } = cnpjPathSchema.parse({ cnpj: raw });
    const { contato } = cnpjQuerySchema.parse(req.query);
    const data = await cnpjService.findAndEnrich(cnpj, contato);
    res.json(data);
  },
};
