import React from 'react'

export const Button = ({ title, btnStyles, btnClick, type, disable }) => {
    return (
        <>
            <button type={type} className={`relative text-center flex justify-center items-center ${btnStyles}`} onClick={btnClick} disabled={disable}>
                <span className="relative">{title}</span>
            </button>
        </>
    )
}
