import React from 'react'

const Button = ({text, onClick}) => {
    return (
        <button className="px-10 py-3 text-sm font-semibold rounded-full bg-amber-500 hover:bg-[#FA8900]" onClick={onClick}>{text}</button>
    )
}

export default Button
