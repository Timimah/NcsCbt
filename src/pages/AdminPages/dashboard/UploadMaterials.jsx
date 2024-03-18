import React, { useState } from 'react';
import { materials } from '../../../components/user/materials';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import upload from '../../../assets/upload-cloud.png'
import success from '../../../assets/upload.png'
import { useAdminStore } from '../../../store/adminStore';

export const UploadMaterials = () => {
    const  { material } = useAdminStore();
    const [materialName, setMaterialName] = useState('');
  const [authorsName, setAuthorsName] = useState('');
  const [rank, setRank] = useState('select rank');
  const [coverImage, setCoverImage] = useState(null);
  const [file, setFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    // const [uploadedMaterials, setUploadedMaterials] = useState([]);
    const [displayedMaterials, setDisplayedMaterials] = useState(materials.slice(0, 8));
    const [showModal, setShowModal] = useState(false);
    const [handleUpload, setHandleUpload] = useState(false);

    

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
                    <div className="flex mb-4 justify-between">
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
                        <div>
                            <Button title="Upload Material" btnStyles="px-4 py-3 text-white bg-primary rounded-md" btnClick={()=> setShowModal(!showModal)} />
                        </div>
                    </div>
                    <div className="text-2xl mt-6">Uploaded Materials</div>
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
            {showModal &&
                <Modal title="Upload Material" content={
                    <div className='flex flex-col items-center gap-4 my-2'>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="materialName">Material Name</label>
                            <input
                                type="text"
                                value={materialName}
                                className="border rounded-md py-2 px-4"
                                placeholder="Material Name"
                            onChange={(e) => {setMaterialName(e.target.value)}}
                            />
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="authorsName">Author's Name</label>
                            <input
                                type="text"
                                value={authorsName}
                                onChange={(e) => {setAuthorsName(e.target.value)}}    
                                className="border rounded-md py-2 px-4"
                                placeholder="Author's Name"
                            />
                        </div>
                        <div className='w-full flex flex-col'>
                        <label htmlFor="rank" className="block py-1 -mb-1">Select Rank</label>
            <select id="rank" name="rank" value={rank} onChange={(e) => { setRank(e.target.value); }} className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary`}>
              <option value="rank1">Rank 1</option>
              <option value="rank2">Rank 2</option>
              <option value="rank3">Rank 3</option>
            </select>
                        </div>
                        <div className='w-full flex flex-col gap-10'>
                            <div className='border border-dotted border-primary rounded-lg flex flex-col justify-center items-center px-14 py-10'>
                            <div className='flex justify-start w-full -mt-8 -ml-14'>Upload cover image</div>
                                <div className="flex flex-col items-center justify-center">
                                    <img src={upload} alt="upload" />
                                    <div className='text-primary'>Drag & Drop</div>
                                </div>
                                <div className='text-sm'>or select file from device</div>
                                <div className='text-xs mt-14'>max. 1MB</div>
                            </div>
                            <div className='border border-dotted border-primary rounded-lg flex flex-col justify-center items-center px-14 py-10'>
                            <div className='flex justify-start w-full -mt-8 -ml-14'>Upload file</div>
                                <div className="flex flex-col items-center justify-center">
                                    <img src={upload} alt="upload" />
                                    <div className='text-primary'>Drag & Drop</div>
                                </div>
                                <div className='text-sm'>or select file from device</div>
                                <div className='text-xs mt-14'>max. 1MB</div>
                            </div>
                        </div>
                    </div>
                }
                    buttons={
                        <Button title="Upload File" btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5" btnClick={() => {setShowModal(false); setHandleUpload(!handleUpload)}} />
                    }
                    modStyles="bg-secondary h-1/2 w-1/2 overflow-y-scroll"
                />
            }
            {handleUpload &&
            <Modal
            content={
                <div className='flex flex-col gap-4 items-center justify-center py-10'>
                    <div className='motion-safe:animate-bounce duration-75'><img src={success} alt="sucess" /></div>
                    <div className='text-primary text-3xl font-bold'>Upload Successful!</div>
                </div>
            }
            buttons={
                <Button title="Done" btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full" btnClick={() => setHandleUpload(false)} />
            }
            modStyles="bg-secondary w-1/2 transition duration-300 ease-in-out"
            />
            }
        </div>
    );
};
