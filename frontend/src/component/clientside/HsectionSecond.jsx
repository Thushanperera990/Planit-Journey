import React, { useState } from 'react';
import axios from 'axios';

const HsectionSecond = () => {
    // 1. State for filters and results
    const [keyword, setKeyword] = useState('Hiking');
    const [destination, setDestination] = useState('colombo');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const style = { marginTop: "-65px" };
    const board = { border: "none", outline: "none" };

    // 2. Search Logic - Finds matching tours regardless of duration
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Sends the destination to your backend for filtering
            const response = await axios.get(`http://localhost:5000/tours?destination=${destination}&keyword=${keyword}`);
            setResults(response.data);
            setHasSearched(true);
        } catch (error) {
            console.error("Search failed:", error);
            setResults([]);
            setHasSearched(true);
        }
    };

    // 3. Refresh Logic - Resets everything
    const handleRefresh = () => {
        setKeyword('Hiking');
        setDestination('colombo');
        setResults([]);
        setHasSearched(false);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="w-[80%] flex items-center justify-center bg-white h-32 shadow-2xl rounded-lg" style={style}>
                <form onSubmit={handleSearch} className='w-[80%] flex items-center justify-between px-6'>
                    
                    {/* Keyword Filter */}
                    <div className="block1 w-[200px]">
                        <label htmlFor="keyword" className='py-1 font-medium'>Keyword</label><br />
                        <select 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className='w-[100%] py-2 outline-none border-b'
                        >
                            <option value="Hiking">Hiking</option>
                            <option value="Nature">Nature</option>
                            <option value="Religious">Religious</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Photography">Photography</option>
                            <option value="Explore">Explore</option>
                        </select>
                    </div>

                    {/* Destination Filter */}
                    <div className="block2 w-[220px] mx-4" style={board}>
                        <label htmlFor="destination" className='py-1 font-medium'>Destination</label><br />
                        <select 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className='w-[100%] py-2 outline-none border-b'
                        >
                            <option value="colombo">Colombo</option>
                            <option value="Ella">Ella</option>
                            <option value="Sinharaja Rain Forest">Sinharaja Rain Forest</option>
                            <option value="kandy">Kandy</option>
                            <option value="jaffna">Jaffna</option>
                            <option value="galle">Galle</option>
                        </select>
                    </div>

                    {/* Duration Filter (Visual only as per request) */}
                    <div className="block3 w-[150px] mx-4" style={board}>
                        <label htmlFor="duration" className='py-1 font-medium'>Duration</label><br />
                        <select className='w-[100%] py-2 outline-none border-b'>
                            <option value="">Any Duration</option>
                            <option value="1">1 day</option>
                            <option value="2">2 days</option>
                            <option value="7">7 days</option>
                        </select>
                    </div>

                    {/* Actions Group */}
                    <div className="flex items-center gap-2">
                        {/* Refresh Button */}
                        <button 
                            type="button"
                            onClick={handleRefresh}
                            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-all"
                            title="Refresh Filters"
                        >
                            <i className="fas fa-sync-alt"></i>
                        </button>

                        {/* Search Button */}
                        <button 
                            type="submit"
                            className="px-6 py-3 rounded bg-amber-500 text-white font-semibold hover:bg-amber-600 flex items-center shadow-md"
                        >
                            Search <i className="fas fa-search ml-2"></i>
                        </button>
                    </div>
                </form>
            </div>

            {/* --- RESULTS SECTION --- */}
            <div className="w-[80%] mt-12 mb-10">
                {hasSearched && (
                    results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {results.map((tour) => (
                                <div key={tour._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:scale-105 transition-transform">
                                    <div className="p-5">
                                        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{tour.keyword || 'Tour'}</span>
                                        <h3 className="text-xl font-bold text-gray-800 mt-1">{tour.name}</h3>
                                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{tour.description}</p>
                                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                            <span className="font-bold text-lg text-green-600">{tour.price} LKR</span>
                                            <span className="text-gray-400 text-sm"><i className="far fa-clock mr-1"></i>{tour.duration || 'Flexible'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-inner">
                            <i className="fas fa-map-marked-alt text-4xl text-gray-300 mb-4"></i>
                            <h3 className="text-xl font-semibold text-gray-600">Destination not available</h3>
                            <p className="text-gray-400">Try selecting a different location or keyword.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default HsectionSecond;