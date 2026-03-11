import { z } from 'zod';

// === Health ===

export const HealthCheckResponse = z.object({
  status: z.string(),
});

// === Menu ===

export const MenuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(['starters', 'mains', 'desserts', 'drinks', 'specials']),
  imageUrl: z.string().nullable().optional(),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  isGlutenFree: z.boolean(),
  isAvailable: z.boolean(),
  spicyLevel: z.number().int().min(0).max(3),
});

// === Orders ===

export const CreateOrderItemBody = z.object({
  menuItemId: z.number().int(),
  quantity: z.number().int().min(1),
  notes: z.string().optional(),
});

export const CreateOrderBody = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  deliveryType: z.enum(['delivery', 'pickup', 'dine_in']),
  deliveryAddress: z.string().optional(),
  tableNumber: z.number().int().optional(),
  items: z.array(CreateOrderItemBody).min(1),
  specialInstructions: z.string().optional(),
});

// === Reservations ===

export const CreateReservationBody = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7),
  date: z.string(),
  time: z.string(),
  partySize: z.number().int().min(1).max(20),
  specialRequests: z.string().optional(),
  occasion: z.enum(['birthday', 'anniversary', 'business', 'other', 'none']).optional(),
});
