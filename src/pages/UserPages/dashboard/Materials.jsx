import React, { useState } from 'react';
import { Header } from '../../../components/shared/Header';

export const Materials = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedMaterials, setDisplayedMaterials] = useState(JSON.parse(localStorage.getItem('materials')).slice(0, 8));
    const [searchedMaterials, setSearchedMaterials] = useState(JSON.parse(localStorage.getItem('materials')).slice(0, 8));
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const regex = new RegExp(term, 'i');
        const filteredMaterials = displayedMaterials.filter((material) =>
            regex.test(material.materialName)
        );

        if (filteredMaterials.length === 1) {
            setSearchedMaterials(filteredMaterials);
        } else {
            setSearchedMaterials(filteredMaterials.slice(0, 8));
        }
    };

    const searchMaterials = () => {
        setIsSearching(true);
        handleSearch();
    }

    const handleSeeMore = () => {
        const start = displayedMaterials.length;
        const end = start + 8;
        const newMaterials = materials.slice(start, end);
        setDisplayedMaterials([...displayedMaterials, ...newMaterials]);
    };

    return (
        <div className="flex flex-col w-full p-10 gap-4">
            <Header title="Dashboard" username="Bedlam" />
            <main className="flex-grow">
                <section className='flex flex-col gap-4'>
                    <div className="flex mb-4">
                        <div className="relative w-2/3 flex">
                            <input
                                type="text"
                                className="border rounded-md py-2 px-4 pr-10 w-full"
                                placeholder="Search materials..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={searchMaterials}>
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-8">
                        {!isSearching && 
                            (
                                displayedMaterials.map((material) => (
                                    <div key={material.rank} className="p-4">
                                        <img
                                            src={material.coverImage}
                                            alt={material.materialName}
                                            className="w-full h-40 object-cover rounded-md mb-2"
                                        />
                                        <h3 className="text-lg font-semibold mb-1">{material.materialName}</h3>
                                        <div className='text-xs font-light'>Rank: {material.rank}</div>
                                    </div>
                                ))
                            )
                        }
                        {isSearching && 
                        (searchedMaterials.map((material) => (
                            <div key={material.rank} className="p-4">
                                <img
                                    src={material.coverImage}
                                    alt={material.materialName}
                                    className="w-full h-40 object-cover rounded-md mb-2"
                                />
                                <h3 className="text-lg font-semibold mb-1">{material.materialName}</h3>
                                <div className='text-xs font-light'>Rank: {material.rank}</div>
                            </div>
                        )))}
                    </div>
                    {isSearching && <div className="text-primary cursor-pointer text-lg" onClick={() => {setIsSearching(false); setSearchTerm("")}}>See all materials</div>}
                    {displayedMaterials.length > 10 && (
                        <button
                            className="hover:text-primary text-end px-4 py-2 mt-4"
                            onClick={handleSeeMore}
                        >
                            See More...
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
};
