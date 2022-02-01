import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { HiMenu } from "react-icons/hi";
import { useStateValue } from '../StateProvider';
import { BASE_URL_WPJSON, BASE_URL_WPJSON_WP_V2 } from "../utils/wordpress";
import MenuItem from './MenuItem';

const menuNameClass = "px-8 mb-2 text-xl font-bold";
const menuUlClass = "flex flex-col pb-3 mb-6 border-b-2 border-gray-300";

const Header = () => {
    const [logo, setLogo] = useState("");
    const [productCategories, setProductCategories] = useState([]);
    const [menuStatus, setMenuStatus] = useState(false);
    const [menuPrimary, setMenuPrimary] = useState([]);
    const [menuDigitalName, setMenuDigitalName] = useState("");
    const [menuDigital, setMenuDigital] = useState([]);
    const [menuDepartmentName, setMenuDepartmentName] = useState("");
    const [menuDepartment, setMenuDepartment] = useState([]);
    const [menuProgramsName, setMenuProgramsName] = useState("");
    const [menuPrograms, setMenuPrograms] = useState([]);
    const [{bucket}] = useStateValue();

    useEffect(() => {
        async function fetchData() {
            // OPTION PAGE
            const optionPageRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/pages/29`); 
            const optionPage = await optionPageRes.json();
            
            // LOGO
            const logoRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/media/${optionPage.acf.logo}`); 
            const logo = await logoRes.json();
            
            // PRODUCT CATEGORIES
            const productCatRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/product_cat`); 
            const productCat = await productCatRes.json();
            
            // MENU PRIMARY
            const menuPrimaryRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/20`); 
            const menuPrimary = await menuPrimaryRes.json();

            // MENU Digital Content & Devices
            const menuDigitalRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/24`); 
            const menuDigital = await menuDigitalRes.json();

            // MENU Shop By Department
            const menuDepartmentRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/28`); 
            const menuDepartment = await menuDepartmentRes.json();

            // MENU Programs & Features
            const menuProgramsRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/29`); 
            const menuPrograms = await menuProgramsRes.json();

            setLogo(logo.source_url);
            setProductCategories(productCat);
            setMenuPrimary(menuPrimary.items);
            setMenuDigitalName(menuDigital.name);
            setMenuDigital(menuDigital.items);
            setMenuDepartmentName(menuDepartment.name);
            setMenuDepartment(menuDepartment.items);
            setMenuProgramsName(menuPrograms.name);
            setMenuPrograms(menuPrograms.items);
        }
        fetchData();
    }, []);
    
    return (
        <header className="">
            <div className="bg-[#131921] py-2 px-2 md:px-7 flex md:flex-row flex-col items-center justify-between md:space-x-5">
                <div className="relative">
                    {logo ? <Link href="/"><a><Image src={logo} width={100} height={35} alt="Amazon logo"/></a></Link> : ""}
                </div>
                <div className="flex flex-col items-center w-full overflow-hidden rounded-md md:w-auto md:h-10 md:flex-row bg-amber-500 grow">
                    <select name="" className="w-full h-full px-2 py-2 bg-gray-200 border-r-2 border-gray-300 md:w-auto md:py-0">
                        {productCategories.map(category => (
                            <option value={category.slug} key={category.slug}>{category.name}</option>
                        ))}
                    </select>
                    <input type="text" className="w-full h-full p-2 font-semibold outline-none md:w-auto grow" />
                    <AiOutlineSearch className="w-10 cursor-pointer" size={25} />
                </div>
                <div className="">
                    <ul className="flex items-center text-white">
                        <MenuItem url="#" text="Accounts &#38; Lists" subText="Hello" />
                        <MenuItem url="#" text="&#38; Orders" subText="Returns" />
                        <MenuItem url="/cart" Icon={<FiShoppingCart size={30} />} count={bucket.length} />
                    </ul>
                </div>
            </div>
            <div className="bg-[#232F3E] py-1 px-4 text-white">
                <ul className="flex items-center">
                    <MenuItem url="#" text="ALL" Icon={<HiMenu size={25} />} onClick={() => setMenuStatus(true)} />
                    <div className="items-center hidden md:flex">
                        {menuPrimary?.map(({id, object_slug, title}) => (
                            <MenuItem url="#" text={title} key={id} />
                        ))}       
                    </div>       
                </ul>
                {menuStatus ? (
                <>
                    <div className="absolute top-0 left-0 z-10 w-full h-screen bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 z-20 w-full h-full pt-5 overflow-scroll text-black bg-white md:w-4/12">
                        <GrClose size={25} className="absolute z-50 cursor-pointer top-3 right-3" onClick={() => setMenuStatus(false)} />
                        <h2 className={menuNameClass}>{menuDigitalName}</h2>
                        <ul className={menuUlClass}>
                            {menuDigital?.map(({id, object_slug, title}) => (
                                <MenuItem url={`/category/${object_slug}`} text={title} key={id} className="" hamburger onClick={() => setMenuStatus(false)} />
                            ))}
                        </ul>  
                        <h2 className={menuNameClass}>{menuDepartmentName}</h2>
                        <ul className={menuUlClass}>
                            {menuDepartment?.map(({id, object_slug, title}) => (
                                <MenuItem url={`/category/${object_slug}`} text={title} key={id} className="" hamburger onClick={() => setMenuStatus(false)} />
                            ))}
                        </ul>
                        <h2 className={menuNameClass}>{menuProgramsName}</h2>
                        <ul className={menuUlClass}>
                            {menuPrograms?.map(({id, object_slug, title}) => (
                                <MenuItem url={`/category/${object_slug}`} text={title} key={id} className="" hamburger onClick={() => setMenuStatus(false)} />
                            ))}
                        </ul>
                    </div>  
                </>
                ) : ""}
            </div>                
        </header>
    )
}

export default Header
  
