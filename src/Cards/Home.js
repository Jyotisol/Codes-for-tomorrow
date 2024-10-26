// Home.js
import React, { useEffect, useState } from 'react';
import Image from "../asets/ram-img.png";
import Pagination from './Pagination';

const Home = () => {
    const [dataUrl, setDataUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Show 6 items per page

    const url = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resp = await fetch(url);
                const data = await resp.json();
                const limitedData = data.slice(0, 6); // Limit to 6 items initially
                setTimeout(() => {
                    setDataUrl(limitedData);
                    setLoading(false);
                }, 5000);
            } catch (err) {
                console.error("Fetching error:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    const handleRemoveCard = (id) => {
        setDataUrl((prevData) => {
            const updatedData = prevData.filter((item) => item.id !== id);
            // Check if currentPage has more pages than available after deletion
            if ((currentPage - 1) * itemsPerPage >= updatedData.length) {
                setCurrentPage(currentPage - 1); // Move to previous page if no items on current page
            }
            return updatedData;
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataUrl ? dataUrl.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil((dataUrl ? dataUrl.length : 0) / itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            {loading && <h1 className='text-center text-xl'>Loading...</h1>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((item) => (
                    <div key={item.id} className='border p-4 bg-white shadow rounded-lg relative'>
                        <button 
                            onClick={() => handleRemoveCard(item.id)} 
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
                        >
                            X
                        </button>
                        <h2 className='text-lg font-bold mb-6'>{truncateText(item.title, 8)}</h2>
                        <p className='mb-4'>{truncateText(item.body, 10)}</p>
                        <img src={Image} alt="IMG" className='w-full h-auto rounded' />
                    </div>
                ))}
            </div>

            {!loading && dataUrl && dataUrl.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        if (page > 0 && page <= totalPages) {
                            setCurrentPage(page);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Home;
