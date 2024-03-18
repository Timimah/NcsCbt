import React from 'react'

export const Button = ({ title, btnStyles, btnClick, type }) => {
    return (
        <>
            <button type={type} className={`relative text-center flex justify-center items-center ${btnStyles}`} onClick={btnClick}>
                <span className="relative">{title}</span>
            </button>
        </>
    )
}
