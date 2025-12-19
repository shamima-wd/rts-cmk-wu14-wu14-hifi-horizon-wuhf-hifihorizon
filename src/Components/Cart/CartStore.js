import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        if (!item || !item.id) return

        const items = get().items
        const existing = items.find(i => i.id === item.id)

        if (existing) {
          const newQuantity = Math.min(
            existing.quantity + quantity,
            item.stock
          )

          set({
            items: items.map(i =>
              i.id === item.id
                ? { ...i, quantity: newQuantity }
                : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                quantity: Math.min(quantity, item.stock),
              },
            ],
          })
        }
      },

      updateQuantity: (id, quantity) => {
        const item = get().items.find(i => i.id === id)
        if (!item) return

        if (quantity < 1) {
          set({ items: get().items.filter(i => i.id !== id) })
          return
        }

        if (quantity > item.stock) return

        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
)
