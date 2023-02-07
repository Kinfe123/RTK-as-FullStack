import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import { openModal } from "./modalSlice";
// import axios from 'axios'
const initialState = {
    cartItems: [],
    amount:cartItems.length ,
    total:0,
    isLoading:true,
}

const URL = "https://course-api.com/react-useReducer-cart-project"
export const getCartItems = createAsyncThunk('cart/getCartItems', 
    async (_ , thunkAPI) => {
        try {

            console.log(thunkAPI.getState())
            thunkAPI.dispatch(openModal())
            const response = await fetch(URL)
        
        // we should be returning down to extra reducers

        thunkAPI.fulfillWithValue('this is a data:)')
        return response.json()
            
        } catch (error) {
            thunkAPI.rejectWithValue('Again :(')
            
        }

    }

)
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart: (state) => {
            state.cartItems = []
        },
        removeCart : (state , action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)


        },
        increase: (state , action)=> {
            const itemId = action.payload
            const cartItem = state.cartItems.find(item => item.id == itemId)
            cartItem.amount+=1

        },
        decrease: (state , action)=> {
            const itemId = action.payload
            const cartItem = state.cartItems.find(item => item.id == itemId)
            cartItem.amount-=1

        },
        calculateTotal: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((items)=> {
                amount += items.amount
                total += items.amount * items.price
            })
            state.total = total
            state.amount = amount

        }
    },
    extraReducers: {
        [getCartItems.pending]:(state)=>{
            state.isLoading = true
        },
        [getCartItems.fulfilled]:(state , action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.cartItems = action.payload

        },
        [getCartItems.rejected]: (state , action)=> {
            console.log(action)
            state.isLoading = false
        }

    }
})


export const {clearCart , removeCart , increase , decrease , calculateTotal} = cartSlice.actions
export default cartSlice.reducer
