import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({name, slug, image, price}) => {
    return (
        <div className="overflow-hidden border-2 border-gray-100 rounded-md">
            <Link href={`/product/${slug}`}> 
                <a>
                    <div className="relative w-full h-64">
                        <Image src={image} alt={name} layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-2">
                        <h2 className="mb-2 font-medium hover:text-orange-700">{name}</h2>
                        <div className="text-xl font-semibold">${price}</div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default Product
