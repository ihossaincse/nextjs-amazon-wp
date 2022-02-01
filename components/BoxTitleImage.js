import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BoxTitleImage = ({name, image, slug}) => {
    return (
        <div className="px-5 py-3 bg-white">
            <h2 className="mb-3 text-2xl font-semibold">{name}</h2>
            <div className="relative w-full mb-3 h-80">
                <Link href={`/category/${slug}`}>
                    <a>
                        <Image src={image} alt={name} layout="fill" objectFit="cover" />
                    </a>
                </Link>
            </div>
            <Link href={`/category/${slug}`}>
                <a className="font-semibold text-teal-600 hover:text-orange-700 hover:underline">
                    See more
                </a>
            </Link>
        </div>
    )
}

export default BoxTitleImage
