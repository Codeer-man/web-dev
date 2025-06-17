import { Request, Response } from "express";
import { db } from "../lib/db";
import { authTable } from "../lib/schema/auth.sql";
import { eq } from "drizzle-orm";

export const insert = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const data = await db.insert(authTable).values({
      userName: username, // Make sure this matches your schema!
      email,
      password,
    });

    console.log("Insert result:", data);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const {email} = req.body
    const data = await db
      .update(authTable)
      .set({ email: email })
      .where(eq(authTable.id, 1));
    console.log("Insert result:", data);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const {id} = req.body
    const data = await db
      .delete(authTable).where(eq(authTable.id,id))
    res.json({ success: true, data });
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
