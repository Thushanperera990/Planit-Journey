import React from 'react'

const Hfotter = () => {
    const style = {
        backgroundColor:"#000000",
        height:"20vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
  return (
    <div className='w-full text-white' style={style}>
        <div className='flex justify-center items-center gap-8'>
            <span className='hover:text-amber-400 cursor-pointer'>Customer Support</span>
            <span className='hover:text-amber-400 cursor-pointer'>Privacy & Policy</span>
            <span className='hover:text-amber-400 cursor-pointer'>About Us</span>
            <span className='hover:text-amber-400 cursor-pointer'>Terms & conditions</span>
        </div>
        <p className='text-center mt-4'>Copyright © 2026 All Rights Reserved.</p>
    </div>
  )
}

export default Hfotter