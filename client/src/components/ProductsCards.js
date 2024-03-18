import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import{ useDispatch } from "react-redux"
import { addToCart } from '../redux/shopeeSlice';
import { ToastContainer, toast } from 'react-toastify';

const ProductsCards = ({ product }) => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const _id=product.title;  //taking name as id
  const idString=(_id)=>{    // for making string of id
    return String(_id).toLowerCase().split(" ").join(""); //change to smallcase and split because router wants small letter
  };
  const rootId=idString(_id);
  const handleDetails=()=>{   // for onclick on a single product
    navigate(`/product/${rootId}`,{
      state:{
        item:product, //whenever click which ever product it pass that first product 
      },
    });
  };

  return (
    <div className='group w-full relative'>
      <div onClick={handleDetails} 
      className='w-full h-96 cursor-pointer overflow-hidden'>
        <img className='w-full h-full object-cover group-hover:scale-110 duration-500'
          src={product.image} alt="product img" />
      </div>
      <div className='w-full border-[1px] px-2 py-4'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='font-titleFont text-base font-bold'>
              {product.title.substring(0, 15)}</h2>
          </div>

          <div className='flex justify-end gap-2 relative overflow-hidden w-28 text-sm'>
            <div className='flex gap-2 transform group-hover:translate-x-24 
             transition-transform duration-500'>
              <p className='font-semibold'>Rs{product.price}</p>
            </div>
            <p onClick={()=>
            dispatch(
              addToCart({
                _id:product._id,
                title:product.title,
                image:product.image,
                price:product.price,
                quantity:1,
                description: product.description,
              })  
              ) & toast.success(`${product.title} is added`)
            }
               className='absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex 
             items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0
               transition-transform cursor-pointer duration-500'>add to cart<span><BsArrowRight/></span>
                </p>
          </div>
        </div>
          <div>
            <p>{product.category}</p>
          </div>
          <div className='absolute top-4 right-0'>{product.isNew && (
            <p className='bg-black text-white font-titleFont font-semibold px-6 py-1   '>sale</p>
          )}</div>
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

export default ProductsCards