import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { useUserStore } from '../../../store/userStore';

export const Materials = () => {
    const {materials} = useUserStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedMaterials, setDisplayedMaterials] = useState([]);
    const [searchedMaterials, setSearchedMaterials] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (materials.length > 10) {
            setDisplayedMaterials(materials.slice(0, 8))
        } else {
            setDisplayedMaterials(materials)
        }
    }, []);
    console.log(materials);

    const handleSearch = (e) => {
        setIsSearching(true);
        setIsSearching(true);
        const filteredMaterials = materials.filter((material) => {
            const regex = new RegExp(searchTerm, 'i');
            const searchProperties = [material.name, material.rank, material.author];
            return searchProperties.some((property) => regex.test(property));
        });

        console.log(filteredMaterials);
        if (filteredMaterials.length === 1) {
            setSearchedMaterials(filteredMaterials);
        } else {
            setSearchedMaterials(filteredMaterials.slice(0, 8));
        }
    };

    return (
        <div className="flex flex-col w-full p-10 gap-4">
            <Header title="Materials" />
            <main className="flex-grow">
                <section className='flex flex-col gap-4'>
                    <div className="flex mb-4">
                        <div className="relative w-full md:w-2/3 flex">
                            <input
                                type="text"
                                className="border rounded-md py-2 px-4 pr-10 w-full"
                                placeholder="Search materials..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSearch}>
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
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {!isSearching && 
                            (
                                displayedMaterials.map((material) => (
                                    <div key={material._id} className="p-4 w-full">
                                        <img
                                            src={material.name}
                                            alt={material.name}
                                            className="w-full h-40 object-cover rounded-md mb-2 bg-cardgreen"
                                        />
                                        <h3 className="text-lg font-semibold mb-1">{material.name}</h3>
                                        <div className='text-xs font-light'>Rank: {material.rank}</div>
                                    </div>
                                ))
                            )
                        }
                        {isSearching && 
                        (searchedMaterials.map((material) => (
                            <div key={material._id} className="p-4 w-full">
                            <img
                                src={material.name}
                                alt={material.name}
                                className="w-full h-40 object-cover rounded-md mb-2 bg-cardgreen"
                            />
                            <h3 className="text-lg font-semibold mb-1">{material.name}</h3>
                            <div className='text-xs font-light'>Rank: {material.rank}</div>
                        </div>
                        )))}
                    </div>
                    {isSearching && <div className="text-primary cursor-pointer text-lg" onClick={() => {setIsSearching(false); setSearchTerm("")}}>See all materials</div>}
                    {displayedMaterials.length > 10 && (
                        <button
                            className="hover:text-primary text-end px-4 py-2 mt-4"
        onClick={() => setDisplayedMaterials(materials)}
                        >
                            See More...
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
};
