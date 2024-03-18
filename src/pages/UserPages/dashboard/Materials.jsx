import React, { useState } from 'react';
import { materials } from '../../../components/user/materials';
import { Header } from '../../../components/shared/Header';

export const Materials = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedMaterials, setDisplayedMaterials] = useState(materials.slice(0, 8));

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const regex = new RegExp(term, 'i');
        const filteredMaterials = materials.filter((material) =>
            regex.test(material.title)
        );

        if (filteredMaterials.length === 1) {
            setDisplayedMaterials(filteredMaterials);
        } else {
            setDisplayedMaterials(filteredMaterials.slice(0, 8));
        }
    };

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
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
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
                        {displayedMaterials.map((material) => (
                            <div key={material.id} className="p-4">
                                <img
                                    src={material.coverImage}
                                    alt={material.title}
                                    className="w-full h-40 object-cover rounded-md mb-2"
                                />
                                <h3 className="text-lg font-semibold mb-1">{material.title}</h3>
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={index < material.rating ? '#fbbf24' : '#e2e8f0'}
                                            className="w-5 h-5"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {displayedMaterials.length < materials.length && (
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
