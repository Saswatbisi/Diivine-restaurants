import { pgTable, serial, text, integer, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reservationStatusEnum = pgEnum("reservation_status", ["pending", "confirmed", "cancelled"]);
export const occasionEnum = pgEnum("occasion", ["birthday", "anniversary", "business", "other", "none"]);

export const reservationsTable = pgTable("reservations", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  partySize: integer("party_size").notNull(),
  specialRequests: text("special_requests"),
  occasion: occasionEnum("occasion").default("none"),
  status: reservationStatusEnum("status").notNull().default("pending"),
  tableNumber: integer("table_number"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReservationSchema = createInsertSchema(reservationsTable).omit({ id: true, createdAt: true });
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservationsTable.$inferSelect;
