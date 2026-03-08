import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import LocIcon from '../../Images/loc.png'
import doc from '../../Images/document.png'
import mic2 from '../../Images/microphone.png'
import "../CSS/style.css"
import axios from "axios"
import Joyride, { STATUS } from 'react-joyride';

const LocMap = () => {
    const [{ run, steps }, setState] = useState({
        run: true,
        steps: [
            {
                content: <h2 className='text-2xl'> Let's begin Tour 🛩️ </h2>,
                locale: { skip: 'Skip tutorial' },
                placement: 'center',
                target: "body"
            },
            {
                content: <h2 className='text-xl'>Explore travel with the document 📂</h2>,
                locale: { skip: 'Skip tutorial' },
                placement: 'bottom',
                target: "#step1",
                title: "First Step"
            },
            {
                content: <h2 className='text-xl'>Explore the location , Drag the map man into the flag icon 🗺️ </h2>,
                locale: { skip: 'Skip tutorial' },
                placement: 'center',
                target: "#map1",
                title: "Second Step"
            }
        ]
    });

    const [listPoints, setListPoints] = useState([]);
    const { id } = useParams();
    const [actvemark, setactvemark] = useState(null);

    const [p1, setp1] = useState([4]);
    const [p2, setp2] = useState([4]);
    const [p3, setp3] = useState([4]);
    const [p4, setp4] = useState([4]);
    const [p5, setp5] = useState([4]);
    const [p6, setp6] = useState([4]);
    const [p7, setp7] = useState([4]);
    const [p8, setp8] = useState([4]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/dest/getdest/" + id);
                setListPoints(response.data);
                setp1(response.data.points1);
                setp2(response.data.points2);
                setp3(response.data.points3);
                setp4(response.data.points4);
                setp5(response.data.points5);
                setp6(response.data.points6);
                setp7(response.data.points7);
                setp8(response.data.points8);
            } catch (err) {
                console.log("Error fetching data", err);
            }
        };
        fetchData();
    }, [id]);

    const style = {
        section2: {
            position: "absolute",
            width: "80px",
            display: "block",
            height: "300px",
            bottom: "25px",
            left: "20px",
            zIndex: "1",
            alignItems: "center"
        },
        section3: {
            padding: "5px",
            borderRadius: "20%",
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `AIzaSyB_bV8jC1ZvhLaBWnt8NHqyqNFojFho6t0` 
    });

    const markers = [
        { id: 1, name: p1[0], position: { lat: parseFloat(p1[1]), lng: parseFloat(p1[2]) }, des: p1[3] },
        { id: 2, name: p2[0], position: { lat: parseFloat(p2[1]), lng: parseFloat(p2[2]) }, des: p2[3] },
        { id: 3, name: p3[0], position: { lat: parseFloat(p3[1]), lng: parseFloat(p3[2]) }, des: p3[3] },
        { id: 4, name: p4[0], position: { lat: parseFloat(p4[1]), lng: parseFloat(p4[2]) }, des: p4[3] },
        { id: 5, name: p5[0], position: { lat: parseFloat(p5[1]), lng: parseFloat(p5[2]) }, des: p5[3] },
        { id: 6, name: p6[0], position: { lat: parseFloat(p6[1]), lng: parseFloat(p6[2]) }, des: p6[3] },
        { id: 7, name: p7[0], position: { lat: parseFloat(p7[1]), lng: parseFloat(p7[2]) }, des: p7[3] },
        { id: 8, name: p8[0], position: { lat: parseFloat(p8[1]), lng: parseFloat(p8[2]) }, des: p8[3] }
    ];

    const displayOut = (id) => {
        if (id !== actvemark) setactvemark(id);
    };

    return (
        <div className='w-[100%] h-[100vh] flex justify-center items-center overflow-hidden'>
            <Joyride
                continuous
                run={run}
                steps={steps}
                hideCloseButton
                scrollToFirstStep
                showSkipButton
                showProgress 
            />

            {isLoaded ? (
                <GoogleMap 
                    id="map1"
                    mapContainerStyle={{ width: "100%", height: "100vh" }}
                    center={{ lat: 6.7184, lng: 80.7741 }}
                    zoom={10}
                >
                    {markers.map(({ id, name, position, des }) => (
                        <MarkerF 
                            key={id} 
                            position={position} 
                            icon={{
                                url: `${LocIcon}`,
                                scaledSize: { width: 50, height: 50 },
                            }} 
                            onClick={() => displayOut(id)} 
                        >
                            {actvemark === id ? (
                                <InfoWindowF onCloseClick={() => setactvemark(null)}>
                                    <div className="card" style={{ width: "22rem" }}>
                                        <div className="card-body">
                                            <h1 className='card-text fs-4 font-bold text-amber-500'>{name}</h1>
                                            <p className="card-text fs-3 font-bold">{des}</p>
                                        </div>
                                    </div>
                                </InfoWindowF>
                            ) : null}
                        </MarkerF>
                    ))}
                </GoogleMap>
            ) : null}

            <div style={style.section2}>
                <button 
                    id="step1" 
                    style={style.section3} 
                    className='shake2 mb-6 bg-amber-400'
                >
                    <a href={`http://localhost:5000/Upload/images/` + listPoints.pdf} download>
                        <img src={doc} alt="Document" width={50} />
                    </a>
                </button>

                <div className="mt-4">
                    <a href='/tours' className='py-2 px-3 text-white rounded fw-bold bg-red-600'>BACK</a>
                </div>
            </div>
        </div>
    );
}

export default LocMap;