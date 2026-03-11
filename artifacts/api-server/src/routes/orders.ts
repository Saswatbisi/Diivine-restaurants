import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { ordersTable, menuItemsTable } from "@workspace/db/schema";
import { eq, inArray } from "drizzle-orm";
import { CreateOrderBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/orders", async (_req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(ordersTable.createdAt);
    const mapped = orders.map((o) => ({
      ...o,
      totalAmount: parseFloat(o.totalAmount),
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json({ ...order, totalAmount: parseFloat(order.totalAmount) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const parsed = CreateOrderBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid order data", details: parsed.error });
      return;
    }
    const data = parsed.data;

    // Fetch menu items to get prices
    const menuItemIds = data.items.map((i) => i.menuItemId);
    const menuItems = await db.select().from(menuItemsTable).where(
      inArray(menuItemsTable.id, menuItemIds)
    );

    const menuItemMap = new Map(menuItems.map((m) => [m.id, m]));

    let totalAmount = 0;
    const orderItems = data.items.map((item) => {
      const menuItem = menuItemMap.get(item.menuItemId);
      if (!menuItem) throw new Error(`Menu item ${item.menuItemId} not found`);
      const unitPrice = parseFloat(menuItem.price);
      totalAmount += unitPrice * item.quantity;
      return {
        menuItemId: item.menuItemId,
        menuItemName: menuItem.name,
        quantity: item.quantity,
        unitPrice,
        notes: item.notes ?? null,
      };
    });

    const [order] = await db.insert(ordersTable).values({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone ?? null,
      deliveryType: data.deliveryType,
      deliveryAddress: data.deliveryAddress ?? null,
      tableNumber: data.tableNumber ?? null,
      items: orderItems,
      status: "pending",
      totalAmount: totalAmount.toFixed(2),
      specialInstructions: data.specialInstructions ?? null,
    }).returning();

    res.status(201).json({ ...order, totalAmount: parseFloat(order.totalAmount) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
