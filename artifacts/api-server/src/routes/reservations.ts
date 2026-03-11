import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reservationsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { CreateReservationBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/reservations", async (_req, res) => {
  try {
    const reservations = await db.select().from(reservationsTable).orderBy(reservationsTable.createdAt);
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

router.get("/reservations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [reservation] = await db.select().from(reservationsTable).where(eq(reservationsTable.id, id));
    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservation" });
  }
});

router.post("/reservations", async (req, res) => {
  try {
    const parsed = CreateReservationBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid reservation data", details: parsed.error });
      return;
    }
    const data = parsed.data;

    // Assign a random table number between 1-20
    const tableNumber = Math.floor(Math.random() * 20) + 1;

    const [reservation] = await db.insert(reservationsTable).values({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      date: data.date,
      time: data.time,
      partySize: data.partySize,
      specialRequests: data.specialRequests ?? null,
      occasion: data.occasion ?? "none",
      status: "confirmed",
      tableNumber,
    }).returning();

    res.status(201).json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

router.delete("/reservations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [reservation] = await db
      .update(reservationsTable)
      .set({ status: "cancelled" })
      .where(eq(reservationsTable.id, id))
      .returning();

    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel reservation" });
  }
});

export default router;
