import Link from 'next/link';
import React from 'react';

const MenuItem = ({ url="#", text, subText, Icon, count, className, hamburger, type, onClick}) => {
    return (
        <li>
            <Link href={url}>
                <a className={`w-full inline-block font-semibold relative ${hamburger ? "px-8 py-2 hover:bg-gray-100" : "px-2 py-1"} ${type == "small" ? "px-0 font-normal hover:border-transparent hover:underline" : "border-2 border-transparent rounded-sm hover:border-white"} ${Icon ? text ? "flex items-center space-x-1" : "" : ""} ${subText ? "leading-none" : ""} ${className}`} onClick={onClick}>
                    {Icon && Icon}
                    <span className="absolute font-semibold text-md -top-3 left-5 text-amber-400">{count}</span>
                    {subText && <span className="text-xs">{subText}<br/></span>} {text && <span>{text}</span>}
                </a>
            </Link>
        </li>
    )
}

export default MenuItem
