import type { Plugin } from 'vite';
import { menuItems } from '../src/data/menu-items';

/**
 * Vite plugin that intercepts /api/* requests and returns mock data.
 * This allows the frontend to work without a running backend server.
 */
export function mockApiPlugin(): Plugin {
  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // GET /api/menu
        if (req.url === '/api/menu' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(menuItems));
          return;
        }

        // GET /api/menu/:id
        const menuItemMatch = req.url?.match(/^\/api\/menu\/(\d+)$/);
        if (menuItemMatch && req.method === 'GET') {
          const id = parseInt(menuItemMatch[1]);
          const item = menuItems.find(m => m.id === id);
          if (item) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(item));
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: "Menu item not found" }));
          }
          return;
        }

        // POST /api/orders
        if (req.url === '/api/orders' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              // Build order items with menu item details
              const orderItems = (data.items || []).map((item: any) => {
                const menuItem = menuItems.find(m => m.id === item.menuItemId);
                return {
                  menuItemId: item.menuItemId,
                  menuItemName: menuItem?.name || 'Unknown',
                  quantity: item.quantity,
                  unitPrice: menuItem?.price || 0,
                  notes: item.notes || null,
                };
              });
              const totalAmount = orderItems.reduce(
                (sum: number, item: any) => sum + item.unitPrice * item.quantity, 0
              );

              const order = {
                id: Math.floor(Math.random() * 9000) + 1000,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                customerPhone: data.customerPhone || null,
                deliveryType: data.deliveryType,
                deliveryAddress: data.deliveryAddress || null,
                tableNumber: data.tableNumber || null,
                items: orderItems,
                status: 'confirmed',
                totalAmount,
                specialInstructions: data.specialInstructions || null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(order));
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
          return;
        }

        // GET /api/orders/:id  (mock — returns a sample order)
        const orderMatch = req.url?.match(/^\/api\/orders\/(\d+)$/);
        if (orderMatch && req.method === 'GET') {
          const id = parseInt(orderMatch[1]);
          const order = {
            id,
            customerName: "Guest",
            customerEmail: "guest@diivine.com",
            deliveryType: "dine_in",
            items: [
              { menuItemId: 6, menuItemName: "Butter Chicken", quantity: 1, unitPrice: 900.00 },
              { menuItemId: 9, menuItemName: "Chicken Biryani", quantity: 1, unitPrice: 1000.00 },
            ],
            status: "preparing",
            totalAmount: 1900.00,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(order));
          return;
        }

        // POST /api/reservations
        if (req.url === '/api/reservations' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const reservation = {
                id: Math.floor(Math.random() * 9000) + 1000,
                ...data,
                status: 'confirmed',
                tableNumber: Math.floor(Math.random() * 20) + 1,
                createdAt: new Date().toISOString(),
              };
              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(reservation));
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
          return;
        }

        // GET /api/healthz
        if (req.url === '/api/healthz' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok' }));
          return;
        }

        next();
      });
    },
  };
}
