import React from 'react'
import Img from '../../Images/top-bg.jpg'
import Img1 from '../../Images/icon1.png'
import Img2 from '../../Images/icon2.png'
import Img3 from '../../Images/icon3.png'

const HSectionThird = () => {

    const addImg = {
        width: "100%",
        minHeight: "80vh",
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <div style={addImg} className="py-5">
            <div className="container">
                <div className="row g-4 justify-content-center text-dark">

                    {/* Block 1 */}
                    <div className="col-md-4">
                        <div className="p-4 text-center h-100">
                            <div className="d-flex justify-content-center p-3">
                                <img src={Img1} alt="Experience" width={140} />
                            </div>
                            <h2 className="fs-4 fw-bold p-2 text-dark">15 Years of Experiences</h2>
                            <p className="fs-6 text-dark">With over 15 years of experience in Sri Lanka tourism, we create unforgettable journeys across beaches, mountains, wildlife, and heritage destinations.
                            We plan every trip with local expertise and personal care.</p>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="col-md-4">
                        <div className="p-4 text-center h-100">
                            <div className="d-flex justify-content-center p-3">
                                <img src={Img2} alt="Camps" width={140} />
                            </div>
                            <h2 className="fs-4 fw-bold p-2 text-dark">200+ Places to Explore</h2>
                            <p className="fs-6 text-dark">Discover over 200 breathtaking destinations across Sri Lanka, from ancient cities and lush tea plantations to golden beaches and national parks.
Every tour is carefully designed to match your travel style.</p>
                        </div>
                    </div>

                    {/* Block 3 */}
                    <div className="col-md-4">
                        <div className="p-4 text-center h-100">
                            <div className="d-flex justify-content-center p-3">
                                <img src={Img3} alt="Community" width={140} />
                            </div>
                            <h2 className="fs-4 fw-bold p-2 text-dark">Travel Community</h2>
                            <p className="fs-6 text-dark">Join a growing community of happy travelers who trust us to plan safe, comfortable, and memorable tours around Sri Lanka.
Your journey is supported by local knowledge and friendly service.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HSectionThird;