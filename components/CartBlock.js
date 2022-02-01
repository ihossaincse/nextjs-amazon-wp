import Image from 'next/image'
import React from 'react'

const CartBlock = ({ name, qty, price, image }) => {
    return (
        <div className="flex justify-between pb-5 mb-5 space-x-3 border-b-2 border-gray-100">
            <div className="w-3/12">
                <div className="relative w-full h-40">
                    <Image src={image} alt={name} layout="fill" objectFit="cover" />
                </div>
            </div>
            <div className="w-7/12">
                <h2 className="mb-2 font-medium">{name}</h2>
                <h4 className="">Qty: {qty}</h4>
            </div>
            <div className="w-2/12 text-xl font-medium text-right">
                ${price}
            </div>
        </div>
    )
}

export default CartBlock
