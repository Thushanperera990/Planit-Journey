import React from 'react';

const HsectionSecond = () => {
    const customStyle = {
        marginTop: "-65px", // Keeps the overlap effect with HsectionOne
        zIndex: "10",       // Ensures it stays on top of the image
        position: "relative"
    };

    const noBorder = {
        border: "none",
        outline: "none",
        boxShadow: "none"
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div 
                    className="col-11 col-lg-10 bg-white shadow-lg rounded-pill p-4 d-flex align-items-center" 
                    style={customStyle}
                >
                    <form className="row w-100 align-items-center g-3 px-lg-4">
                        
                        {/* Keyword Block */}
                        <div className="col-md-3">
                            <label htmlFor="keyword" className="form-label mb-0 fw-bold small text-muted">Keyword</label>
                            <input 
                                style={noBorder} 
                                type="text" 
                                id="keyword" 
                                placeholder="Type Keywords..." 
                                className="form-control" 
                            />
                        </div>

                        {/* Destination Block */}
                        <div className="col-md-3 border-start border-md-none">
                            <label htmlFor="dest" className="form-label mb-0 fw-bold small text-muted">Destination</label>
                            <select id="dest" className="form-select border-0 shadow-none">
                                <option value="colombo">Colombo</option>
                                <option value="kandy">Kandy</option>
                                <option value="jaffna">Jaffna</option>
                                <option value="galle">Galle</option>
                            </select>
                        </div>

                        {/* Duration Block */}
                        <div className="col-md-3 border-start border-md-none">
                            <label htmlFor="dur" className="form-label mb-0 fw-bold small text-muted">Duration</label>
                            <select id="dur" className="form-select border-0 shadow-none">
                                <option value="3">3 days</option>
                                <option value="4">4 days</option>
                                <option value="7">7 days</option>
                                <option value="12">12 days</option>
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="col-md-3 d-grid">
                            <button className="btn btn-warning rounded-pill py-3 fw-bold text-white shadow-sm">
                                Search <i className="fas fa-search ms-2"></i>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default HsectionSecond;