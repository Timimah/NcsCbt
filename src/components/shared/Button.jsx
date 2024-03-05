import React from 'react'

export const Button = ({ title, btnStyles, btnClick }) => {
    return (
        <div className="relative flex w-full">
            <button className={`relative text-center flex justify-center items-center ${btnStyles}`} onClick={btnClick}>
                <span className="relative">{title}</span>
            </button>
            {/* <button className="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping transition-all duration-300">
    <span className="relative">Bouton</span>
  </button>
  <button className="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
    <span className="relative">Bouton</span>
  </button> */}
        </div>
    )
}
