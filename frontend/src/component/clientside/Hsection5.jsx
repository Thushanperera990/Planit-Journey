import React from 'react'
import Img1 from '../../Images/g1.png'
import Img2 from '../../Images/g2.png'
import Img3 from '../../Images/g3.png'
import Img4 from '../../Images/g4.png'
import Img5 from '../../Images/g5.png'

const Hsection5 = () => {
    const sectionStyle = {
        minHeight: "30vh", // Adjusted from 50vh to be more proportional for logos
        backgroundColor: "white",
        display: "flex",
        alignItems: "center"
    };

    return (
        <div style={sectionStyle} className="py-5">
            <div className="container">
                {/* row-cols-2: 2 logos per row on mobile 
                    row-cols-md-3: 3 logos per row on tablets
                    row-cols-lg-5: 5 logos per row on desktops
                */}
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center align-items-center text-center">
                    
                    <div className="col">
                        <img src={Img1} alt="Partner 1" className="img-fluid opacity-75" style={{ maxWidth: "160px" }} />
                    </div>
                    
                    <div className="col">
                        <img src={Img2} alt="Partner 2" className="img-fluid opacity-75" style={{ maxWidth: "160px" }} />
                    </div>
                    
                    <div className="col">
                        <img src={Img3} alt="Partner 3" className="img-fluid opacity-75" style={{ maxWidth: "160px" }} />
                    </div>
                    
                    <div className="col">
                        <img src={Img4} alt="Partner 4" className="img-fluid opacity-75" style={{ maxWidth: "160px" }} />
                    </div>
                    
                    <div className="col">
                        <img src={Img5} alt="Partner 5" className="img-fluid opacity-75" style={{ maxWidth: "160px" }} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Hsection5;