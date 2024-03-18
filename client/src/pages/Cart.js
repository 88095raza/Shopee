import React, { useEffect, useState } from 'react'
import CartItem  from '../components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const productData= useSelector((state)=> state .shopee.productData)
  const [totalAmount,setTotalAmt]=useState("");
  const userInfo = useSelector((state)=> state.shopee.userInfo);
  const [usePaynow,setPaynow]=useState(false);
  useEffect(()=>{
    let price=0;
    productData.map((item)=>{
      price= price+ item.price * item.quantity;
      return price;
    })
    setTotalAmt(price.toFixed(2))
  },[productData])
  const handleCheckout =()=>{
    if(userInfo){
      setPaynow(true);
    }else{
      toast.error("please sign in to checkout")
    }
  }
  const Payment=async(token)=>{
    await axios.post("http://localhost:8000/pay",{
      amount:totalAmount * 100,
      token:token,
    })
  }
  return (
    
    <div className=''>
      
      <img className='w-full h-60 object-cover' src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="cover img" />
      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <CartItem />
        <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
          <div className='flex flex-col border-b-[1px] gap-6 border-b-gray-400 pb-6 '>
            <h2 className='text-2xl font-medium'>cartTotals</h2>
            <p className='flex items-center text-base'>
              Subtotal{" "}
              
              <span className='flex items-center font-titleFont text-lg font-bold'><LiaRupeeSignSolid/>{totalAmount}</span>
            </p>
            <p className=''>
              Shipping{" "}
              <span>
              lorem ipsum lorem icons Velit occaecat dolore est adipisicing officia voluptate.  
              lorem ipsum lorem icons Velit occaecat dolore est adipisicing officia voluptate.  
              </span>
            </p>
            <p className='flex justify-between font-titleFont font-semibold mt-6'>
              Total
              <span className='flex items-center font-titleFont text-lg font-bold'><LiaRupeeSignSolid/>{totalAmount}</span>
            </p>
            <button onClick={handleCheckout} 
             className='text-base bg-black text-white mr-6 py-3 hover:bg-gray-800 duration-300'>Proceed to checkout
             </button>
             {
              usePaynow && (
              <div className='w-full mt-6 flex items-center justify-center'> 
                <StripeCheckout
                 stripeKey="pk_live_51NwK9RSBQsBWIz3NlSBaxVBLXAd2wt2WEzsGNDueQAYLzAaINXgk4u1Q6OWaOUNNeyn3KioMlPqPGRItwDa2pj5Q00Jmq3EjMx"
                 email={userInfo.email}
                 description={`Your Payment amount is Rs${totalAmount}`}
                 Label="Pay to shopee"
                 amount={totalAmount * 100}
                 name="Shopee Online Shopping"
                 token={Payment}
                />
              </div>
             )}
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Cart;