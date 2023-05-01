import { IProduct } from '@/data/ProductsData';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ICart {
    [_id: string]: IProduct;
}

export interface IInitialData {
    cartData: ICart;
}

const initialState: IInitialData = {
    cartData: {},
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const payload = action.payload as IProduct;

            if (state.cartData[payload._id]) {
                if (state.cartData[payload._id].quantity < payload.quantity) {
                    state.cartData[payload._id].quantity += 1;
                }
            } else {
                state.cartData[payload._id] = {
                    ...payload,
                    quantity: 1,
                };
            }
        },

        removeFromCart: (state, action) => {
            const { _id } = action.payload;

            if (state.cartData[_id] && state.cartData[_id].quantity > 1) {
                state.cartData[_id].quantity -= 1;
            } else {
                delete state.cartData[_id];
            }
        },

        updateCart: (state, action) => {
            const { _id, quantity } = action.payload;

            if (state.cartData[_id]) {
                if (quantity > 0) {
                    state.cartData[_id].quantity = quantity;
                } else {
                    delete state.cartData[_id];
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, updateCart } = CartSlice.actions;

export const cart = (state: RootState): IInitialData => state.cart;

export default CartSlice.reducer;
