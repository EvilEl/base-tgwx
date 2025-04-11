import { HttpStatus } from "../enums/http-status";
import {
  PartialProductWithoutId,
  ProductId,
  ProductWithoutId,
} from "../models/Product";
import serviceDiffuser from "../service/serviceDiffuser";
import { Request, Response } from "express";

async function createDiffuser(
  req: Request<{}, {}, ProductWithoutId>,
  res: Response
) {
  try {
    const { name, count, price } = req.body;
    await serviceDiffuser.createDiffuser({ name, count, price });
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("UNIQUE")) {
        res.status(HttpStatus.CONFLICT);
      } else {
        res.status(HttpStatus.OK);
      }
      res.json({ message: err.message });
    }
    res.json({ message: "Ошибка" });
  }
}

async function removeDiffuser(req: Request<{ id: ProductId }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceDiffuser.removeDiffuser(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function updateDiffuser(
  req: Request<{ id: ProductId }, {}, Partial<PartialProductWithoutId>>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;

  try {
    await serviceDiffuser.updateDiffuser(id, body);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function getDiffusers(_req: Request, res: Response) {
  try {
    const data = await serviceDiffuser.getDiffusers();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function getDiffuser(req: Request<{ id: ProductId }>, res: Response) {
  try {
    const { id } = req.params
    const data = await serviceDiffuser.getDiffuser(id);
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}
export default { createDiffuser, removeDiffuser, updateDiffuser, getDiffusers, getDiffuser };
