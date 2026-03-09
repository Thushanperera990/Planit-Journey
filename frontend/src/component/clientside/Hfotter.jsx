import React from 'react';
import { Link } from 'react-router-dom';

const Hfooter = () => {
    const style = {
        backgroundColor: "#000000",
        minHeight: "20vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0"
    };

    return (
        <div className='w-full text-white' style={style}>
            <div className='flex flex-wrap justify-center items-center gap-8 px-4'>
                
                {/* 1. Customer Support -> Contact Us */}
                <Link to="/contactus" className='hover:text-amber-400 cursor-pointer transition-colors'>
                    Customer Support
                </Link>

                {/* Privacy Policy */}
                <Link to="/privacy" className='hover:text-amber-400 cursor-pointer transition-colors'>
                    Privacy & Policy
                </Link>
                
                {/* 2. About Us -> Contact Us */}
                <Link to="/contactus" className='hover:text-amber-400 cursor-pointer transition-colors'>
                    About Us
                </Link>
                
                {/* Terms & Conditions */}
                <Link to="/terms" className='hover:text-amber-400 cursor-pointer transition-colors'>
                    Terms & conditions
                </Link>
            </div>
            <p className='text-center mt-4 text-gray-400 text-sm'>
                Copyright © 2026 Planit Journey. All Rights Reserved.
            </p>
        </div>
    );
};

export default Hfooter;