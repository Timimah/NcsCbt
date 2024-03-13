import React, { useState } from 'react';
import { Button } from './Button';

export const Modal = ({ title, content, modStyles, buttons }) => {

    return (
        <div className="absolute inset-0 top-0 bottom-0 left-0 right-0 p-8 flex items-center bg-black justify-center w-full z-10">
            <div className={`relative rounded-lg max-w-full shadow-lg transform transition-all duration-300 p-8 ${modStyles}`}>
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-primary -ml-2">{title}</h2>
                </div>
                {/* Modal Content */}
                <div className="flex flex-col w-full">
                    <div className="">{content}</div>
                    {buttons}
                </div>
            </div>
        </div>
    );
};