import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backend_Url, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '',
    province: '', zipcode: '', country: '', phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(
            backend_Url + '/api/order/place',
            orderData,
            { headers: { token } }
          );
          
          if (response.data.success) {
            setCartItems({});
            toast.success('Order placed successfully!');
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1='DELIVERY' text2='INFORMATION' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} type='email' placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type='text' placeholder='Shipping address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type='text' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='province' value={formData.province} type='text' placeholder='Province' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type='text' placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type='text' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type='number' placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className="mt-12">
  <Title text1="PAYMENT" text2="METHOD" />

  {/* Payment Options */}
  <div className="flex flex-col lg:flex-row gap-4 mt-6">
    {/* Stripe Option */}
    <div
      onClick={() => setMethod('stripe')}
      className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
        method === 'stripe' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
            method === 'stripe' ? 'border-green-500' : 'border-gray-400'
          }`}
        >
          {method === 'stripe' && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
        </span>
        <img className="h-6 mx-2" src={assets.stripe_logo} alt="Stripe" />
      </div>
      <p className="text-gray-700 font-medium text-sm lg:text-base"></p>
    </div>

    {/* Cash on Delivery Option */}
    <div
      onClick={() => setMethod('cod')}
      className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
        method === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
            method === 'cod' ? 'border-green-500' : 'border-gray-400'
          }`}
        >
          {method === 'cod' && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
        </span>
        <p className="text-gray-700 font-medium text-sm lg:text-base mx-2">
          Cash on Delivery
        </p>
      </div>
      <p className="text-gray-500 text-xs lg:text-sm"></p>
    </div>
  </div>

  {/* Place Order Button */}
  <div className="w-full text-center lg:text-end mt-10">
    <button
      type="submit"
      className="bg-black text-white px-10 py-3 rounded-full text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300"
    >
      PLACE ORDER
    </button>
  </div>
</div>

      </div>
    </form>
  );
};

export default PlaceOrder;
