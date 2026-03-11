export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks' | 'specials';
  imageUrl?: string | null;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  spicyLevel: number;
};

export type OrderItem = {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  notes?: string | null;
};

export type Order = {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  deliveryType: 'delivery' | 'pickup' | 'dine_in';
  deliveryAddress?: string | null;
  tableNumber?: number | null;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  specialInstructions?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderRequest = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryType: 'delivery' | 'pickup' | 'dine_in';
  deliveryAddress?: string;
  tableNumber?: number;
  items: {
    menuItemId: number;
    quantity: number;
    notes?: string;
  }[];
  specialInstructions?: string;
};

export type Reservation = {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string | null;
  occasion?: 'birthday' | 'anniversary' | 'business' | 'other' | 'none';
  status: 'pending' | 'confirmed' | 'cancelled';
  tableNumber?: number | null;
  createdAt: string;
};

export type CreateReservationRequest = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
  occasion?: 'birthday' | 'anniversary' | 'business' | 'other' | 'none';
};
