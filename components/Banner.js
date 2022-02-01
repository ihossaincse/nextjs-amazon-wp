import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Banner = ({slider}) => {
    const [current, setCurrent] = useState(0);
    
    const handleClick = (direction) => {
        if(direction == "left") {
            if(current > 0) {
                setCurrent(current-1);
            } else {
                setCurrent(slider.length-1);
            }
        } else if(direction == "right") {
            if(current < slider.length-1) {
                setCurrent(current+1);
            } else {
                setCurrent(0);
            }
        } 
    }

    return (
        <div className="h-80">
            {slider && (
                <div className="relative h-full text-center">
                    <div className="relative w-full h-full opacity-70">
                        <Image src={slider[current][0]} alt={slider[current][1]} layout="fill" objectFit="cover" />
                    </div>
                    <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full h-full">
                        <MdArrowBackIosNew size={40} className="cursor-pointer" onClick={() => handleClick("left")} />
                        <Link href={`/category/${slider[current][2]}`}>
                            <a>
                                <h2 className="text-4xl font-semibold">{slider[current][1]}</h2>
                            </a>
                        </Link>
                        <MdArrowForwardIos size={40} className="cursor-pointer" onClick={() => handleClick("right")} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Banner
