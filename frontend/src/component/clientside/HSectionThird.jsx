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
                            <p className="fs-6 text-dark">Host our community of good-natured campers, glampers, and RV travelers on your land or at your cabin.</p>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="col-md-4">
                        <div className="p-4 text-center h-100">
                            <div className="d-flex justify-content-center p-3">
                                <img src={Img2} alt="Camps" width={140} />
                            </div>
                            <h2 className="fs-4 fw-bold p-2 text-dark">200+ Camps To Visit</h2>
                            <p className="fs-6 text-dark">Host our community of good-natured campers, glampers, and RV travelers on your land or at your cabin.</p>
                        </div>
                    </div>

                    {/* Block 3 */}
                    <div className="col-md-4">
                        <div className="p-4 text-center h-100">
                            <div className="d-flex justify-content-center p-3">
                                <img src={Img3} alt="Community" width={140} />
                            </div>
                            <h2 className="fs-4 fw-bold p-2 text-dark">Big Community</h2>
                            <p className="fs-6 text-dark">Host our community of good-natured campers, glampers, and RV travelers on your land or at your cabin.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HSectionThird;