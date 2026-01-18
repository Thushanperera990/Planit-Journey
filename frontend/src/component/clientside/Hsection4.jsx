import React, { useState } from 'react';
import Img from '../../Images/wave-bg.jpg';
import Img2 from '../../Images/map.png';
import Img3 from '../../Images/w1.jpg';

import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const Hsection4 = () => {
    const addImg = {
        width: "100%",
        minHeight: "100vh", // Changed to minHeight for better mobile display
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center"
    };

    const [count, setCount] = useState(false);

    return (
        <div style={addImg} className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    
                    {/* Empty Column for the Left Side (Spacing) */}
                    <div className="col-lg-6 d-none d-lg-block"></div>

                    {/* Content Column for the Right Side */}
                    <div className="col-lg-6 col-md-12">
                        <h1 className="display-5 fw-bold mb-4">
                            Planit Journey is the best way to find tours. Let’s make the most memorable adventures.
                        </h1>

                        <p className="lead mb-4">
                            Planit Journey Tour is an incredible way to have an adventurous.It can search and explore destinations, attractions, accommodations, and dining options.
                        </p>

                        <div className="mt-4">
                            <ScrollTrigger onEnter={() => { setCount(true) }} onExit={() => { setCount(false) }}>
                                <div className="row g-4">
                                    
                                    {/* Counter Block 1 */}
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <img src={Img3} alt="icon" width={70} />
                                        </div>
                                        {count && (
                                            <h2 className="display-4 fw-bold text-warning mb-2">
                                                <CountUp end={1940} duration={5} /> +
                                            </h2>
                                        )}
                                        <h4 className="fw-bold mb-2">The First Trip We Operated</h4>
                                        <p className="text-muted">We have been in this industry for more than 40 years!</p>
                                    </div>

                                    {/* Counter Block 2 */}
                                    <div className="col-sm-6">
                                        <div className="mb-3">
                                            <img src={Img2} alt="icon" width={70} />
                                        </div>
                                        {count && (
                                            <h2 className="display-4 fw-bold text-warning mb-2">
                                                <CountUp end={980} duration={5} /> +
                                            </h2>
                                        )}
                                        <h4 className="fw-bold mb-2">Global Destinations</h4>
                                        <p className="text-muted">Explore our curated list of wilderness locations worldwide.</p>
                                    </div>

                                </div>
                            </ScrollTrigger>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hsection4;