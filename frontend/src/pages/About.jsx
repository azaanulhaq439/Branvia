import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'> 
      <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Welcome to Bravia, your ultimate destination for fashion, style, and elegance. We started with a simple vision — to bring top-quality products and international brands closer to you, all in one place. Our team works tirelessly to handpick collections that combine luxury, comfort, and affordability, ensuring you always stay ahead of the trend.</p>
      <p>At Bravia, customer satisfaction is at the heart of everything we do. From easy browsing to secure payment and fast delivery, we aim to make your shopping experience smooth and enjoyable. Whether it’s a timeless accessory, a classic handbag, or the latest fashion piece — we’re here to make every purchase a statement of style.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>At Bravia, our mission is to redefine online shopping by offering a seamless blend of style, quality, and convenience. We aim to empower our customers with access to premium fashion and lifestyle products from trusted brands, all at competitive prices. Through innovation, trust, and exceptional service, we strive to make Bravia the go-to destination for modern and confident shoppers across Pakistan.</p>
      </div>
      </div>
      <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOSSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Qaulity Assurance:</b>
      <p className='text-gray-600'>At Bravia, we take pride in delivering only the highest quality products to our customers. Every item in our collection goes through a careful selection and inspection process to ensure authenticity, durability, and premium standards. We partner with trusted suppliers and brands to guarantee that you receive products that not only meet but exceed your expectations — because at Bravia, quality is our promise.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Convenience:</b>
      <p className='text-gray-600'>At Bravia, we make shopping effortless and enjoyable. Our user-friendly website, secure payment options, and reliable delivery services are designed to give you a smooth and hassle-free experience from browsing to checkout. With just a few clicks, you can explore top-quality products, place your order, and have it delivered right to your doorstep — because your comfort and convenience are our top priorities.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Exception Customer Service:</b>
      <p className='text-gray-600'>At Bravia, we believe that great products deserve even greater service. Our dedicated support team is always ready to assist you with inquiries, orders, and after-sales support to ensure your shopping experience is nothing short of excellent. We value every customer and strive to provide personalized, prompt, and reliable service, making your satisfaction our top priority every step of the way.</p>
      </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About