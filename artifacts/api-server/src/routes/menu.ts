import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { menuItemsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/menu", async (_req, res) => {
  try {
    const items = await db.select().from(menuItemsTable).orderBy(menuItemsTable.category, menuItemsTable.name);
    const mapped = items.map((item) => ({
      ...item,
      price: parseFloat(item.price),
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

router.get("/menu/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [item] = await db.select().from(menuItemsTable).where(eq(menuItemsTable.id, id));
    if (!item) {
      res.status(404).json({ error: "Menu item not found" });
      return;
    }
    res.json({ ...item, price: parseFloat(item.price) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
});

export default router;
