import { pgTable, serial, text, decimal, integer, pgEnum, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const deliveryTypeEnum = pgEnum("delivery_type", ["delivery", "pickup", "dine_in"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"]);

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  deliveryType: deliveryTypeEnum("delivery_type").notNull(),
  deliveryAddress: text("delivery_address"),
  tableNumber: integer("table_number"),
  items: jsonb("items").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
