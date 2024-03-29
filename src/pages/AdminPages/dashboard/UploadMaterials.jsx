import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import upload from '../../../assets/upload-cloud.png'
import success from '../../../assets/upload.png'
import { useAdminStore } from '../../../store/adminStore';
import axios from 'axios';

export const UploadMaterials = () => {
    const { addMaterial } = useAdminStore();
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [rank, setRank] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [handleUpload, setHandleUpload] = useState(false);
    const materials = useAdminStore((state) => state.materials);

    const handleCoverImageChange = (e) => {
        console.log(e);
        const file = new FileReader();
        file.readAsDataURL(e.target.files[0]);
        file.onload = (e) => {
            if (file && file.size > 1048576) {
                setUploadError('Cover image size should not exceed 1MB');
                setCoverImage(null);
            } else {
                setUploadError('');
                setCoverImage(e.target.result);
            }
            file.onerror = (e) => {
                setUploadError('Error uploading cover image');
                setCoverImage(null);
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 10485760) {
            setUploadError('File size should not exceed 10MB');
            setFile(null);
        } else {
            setUploadError('');
            setFile(file);
        }
    }

    const [displayedMaterials, setDisplayedMaterials] = useState(
        JSON.parse(localStorage.getItem('materials')).slice(0, 10)
    );

    // useEffect(() => {
    //     if (materials.length > 10) {
    //         setDisplayedMaterials(materials.slice(0, 10));
    //     }
    //     console.log(displayedMaterials);
    // }, [materials]);

    const uploadMaterial = async () => {
        if (name === "" || author === "" || rank === "" || coverImage === null || file === null) {
            setUploadError('Please fill in all the required fields');
            return;
        } else {
            const material = {name, author, rank, coverImage, file}
            console.log(material)
            try {
                const response = await axios.post(
                    "https://ncs-cbt-api.onrender.com/material/upload",
                    material,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log(response);
            } catch (err) {
                if (!err?.response) {
                    console.log(err);
                    console.log(err.message);
                } else if (err.response?.status === 409) {
                    setUploadError(err.response.data.message);
                } else {
                    setUploadError("Uplaod Failed");
                }
            }
            setName('');
            setAuthor('');
            setRank('');
            setCoverImage(null);
            setFile(null);
            setUploadError('');
        }
        // const storedMaterials = JSON.parse(localStorage.getItem('materials')) || [];
        // storedMaterials.push(material);
        // localStorage.setItem('materials', JSON.stringify(storedMaterials));
        // addMaterial(material);
        // console.log('upload successful')
        // setShowModal(false);
        // setHandleUpload(!handleUpload)
        // Reset the form fields

    };

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
        setDisplayedMaterials(materials);
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
                            <Button title="Upload Material" btnStyles="px-4 py-3 text-white bg-primary rounded-md" btnClick={() => setShowModal(!showModal)} />
                        </div>
                    </div>
                    <div className="text-2xl mt-6">Uploaded Materials</div>
                    <div className="grid grid-cols-5 gap-4">
                        {/* {displayedMaterials.map(material => (
                            <div key={material.rank} className="p-4">
                                <img
                                    src={material.coverImage}
                                    alt={material.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="text-lg font-bold mt-2">{material.name}</div>
                                <div className='text-xs font-light'>Rank: {material.rank}</div>
                            </div>
                        ))}

                        {materials.length > 10 && (
                            <button onClick={handleSeeMore}>See More</button>
                        )} */}
                    </div>
                </section>
            </main>
            {showModal &&
                <Modal
                    closeModal={() => setShowModal(false)}
                    title="Upload Material"
                    content={
                        <div className='flex flex-col items-center gap-4 my-2'>
                            {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}
                            <div className='w-full flex flex-col'>
                                <label htmlFor="name">Material Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="border rounded-md py-2 px-4"
                                    placeholder="Material Name"
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="author">Author's Name</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => { setAuthor(e.target.value) }}
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
                                    <label htmlFor="coverImage" className="flex flex-col items-center justify-center my-10">
                                        <div className="flex flex-col items-center justify-center">
                                            <img src={upload} alt="upload" />
                                            <div className='text-primary'>Drag & Drop</div>
                                        </div>
                                        <div className='text-sm'>or select file from device</div>
                                        <input
                                            type="file"
                                            id="coverImage"
                                            accept="image/*"
                                            onChange={handleCoverImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <div className='text-xs -mb-8'>max. 1MB</div>
                                </div>
                                {coverImage ? (
                                    <div className='rounded-md px-4 py-3 border border-primary'>
                                        <div className='flex w-full justify-end text-red-500 cursor-pointer' onClick={() => setCoverImage(null)}>X</div>
                                        <img src={coverImage} alt="Cover" className="w-full object-cover rounded-md mb-2" />
                                    </div>
                                ) : ("")}
                                <div className='border border-dotted border-primary rounded-lg flex flex-col justify-center items-center px-14 py-10'>
                                    <div className='flex justify-start w-full -mt-8 -ml-14'>Upload file</div>
                                    <label htmlFor="fileUpload" className="flex flex-col items-center justify-center my-10">
                                        <div className="flex flex-col items-center justify-center">
                                            <img src={upload} alt="upload" />
                                            <div className='text-primary'>Drag & Drop</div>
                                        </div>
                                        <div className='text-sm'>or select file from device</div>
                                        <input
                                            type="file"
                                            id="fileUpload"
                                            accept='.pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt, .zip, .mp4, .mp3, .wav, .flac, .avi, .mkv, .mov, .wmv, .webm, .ogg'
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <div className='text-xs -mb-8'>max. 10MB</div>
                                </div>
                                {file ? (
                                    <div className='flex w-full justify-between items-center rounded-md px-4 py-2 border border-primary'>
                                        <div>{file.name}</div>
                                        <div className='cursor-pointer text-red-500' onClick={() => setFile(null)}>X</div>
                                    </div>
                                ) : ("")}
                            </div>
                        </div>
                    }
                    buttons={
                        <Button
                            title="Upload Material"
                            btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5"
                            btnClick={uploadMaterial} />
                    }
                    modStyles="bg-secondary h-5/6 w-1/2 overflow-y-scroll"
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
