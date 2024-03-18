import { createSlice } from "@reduxjs/toolkit";
const initialState={
    productData:[],
    userInfo:null,
};

export const shopeeSlice=createSlice({
    name:"shopee",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=state.productData.find((item)=>item._id === action.payload._id);
            if(item){
                item.quantity+=action.payload.quantity;
            }else{
                state.productData.push(action.payload);
            }
        },
        deleteItem: (state, action) => {
            state.productData = state.productData.filter(
              (item) => item._id !== action.payload
            );
          },
          resetCart:(state)=>{
            state.productData=[];
          },
          decrementQuantity:(state,action)=>{
            const item=state.productData.find(
                (item)=> item._id === action.payload._id
            );
            if(item.quantity === 1){
                item.quantity = 1;
            }else{
                item.quantity--;
            }
          },
          increamentQuantity:(state,action)=>{
            const item=state.productData.find(
                (item)=> item._id === action.payload._id
            );
          if(item){
            item.quantity++;
          }
          },
          addUser: (state, action) => {
            state.userInfo = action.payload;
          },
          removeUser: (state) => {
            state.userInfo = null;
          },
    },
});

export const {  addToCart,deleteItem,addUser,removeUser,resetCart,increamentQuantity,decrementQuantity }=shopeeSlice.actions;
export default shopeeSlice.reducer;