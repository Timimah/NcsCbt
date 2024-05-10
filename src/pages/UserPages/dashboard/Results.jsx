import React, { useState } from 'react'
import { Table } from '../../../components/shared/Table';
import { results } from '../../../components/user/results';
import { Header } from '../../../components/shared/Header';

const columns = [
    { key: 'id', label: 'S/N' },
    { key: 'testDate', label: 'Test Date' },
    { key: 'rank', label: 'Rank' },
    { key: 'score', label: 'Score' },
    { key: 'duration', label: 'Duration' },
];

export const Results = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // const [displayedMaterials, setDisplayedMaterials] = useState(materials.slice(0, 8));

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const regex = new RegExp(term, 'i');
        // const filteredMaterials = materials.filter((material) =>
        //     regex.test(material.title)
        // );

        // if (filteredMaterials.length === 1) {
        //     setDisplayedMaterials(filteredMaterials);
        // } else {
        //     setDisplayedMaterials(filteredMaterials.slice(0, 8));
        // }
        console.log('doesn\'t work just yet');
    };

    return (
        <div className="flex flex-col w-full p-10 gap-4">
            <Header title="Result" />
            <main className="flex-grow">
                <section className='flex flex-col gap-4'>
                    {/* <div className="flex mb-4">
                        <div className="relative w-full md:w-2/3 flex">
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
                    </div> */}
                    <div className="md:w-full font-thin text-lg">
                        <Table data={results} columns={columns} />
                    </div>
                </section>
            </main>
        </div>
    )
}
