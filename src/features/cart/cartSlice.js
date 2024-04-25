import { createSlice } from '@reduxjs/toolkit'

import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  totalQty: 4,
  totalAmount: 0,
  isLoading: true,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.quantity = cartItem.quantity + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.quantity = cartItem.quantity - 1
    },
    calculateTotals: (state) => {
      let totalQty = 0
      let totalAmount = 0
      state.cartItems.forEach((item) => {
        totalQty += item.quantity
        totalAmount += item.quantity * item.price
      })
      state.totalQty = totalQty
      state.totalAmount = parseFloat(totalAmount.toFixed(2))
    },
  },
})

// console.log(cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions
export default cartSlice.reducer
