import React, { useEffect, useState } from 'react';
import { BASE_URL_WPJSON } from "../utils/wordpress";
import MenuBlock from './MenuBlock';

const Footer = () => {
    const [menuOne, setMenuOne] = useState([]);
    const [menuOneName, setMenuOneName] = useState("");
    const [menuTwo, setMenuTwo] = useState([]);
    const [menuTwoName, setMenuTwoName] = useState("");
    const [menuThree, setMenuThree] = useState([]);
    const [menuThreeName, setMenuThreeName] = useState("");
    const [menuFour, setMenuFour] = useState([]);
    const [menuFourName, setMenuFourName] = useState("");

    useEffect(() => {
        async function fetchData() {
            // MENU ONE
            const menuOneRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/34`); 
            const menuOneData = await menuOneRes.json();

            // MENU TWO
            const menuTwoRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/35`); 
            const menuTwoData = await menuTwoRes.json();

            // MENU THREE
            const menuThreeRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/36`); 
            const menuThreeData = await menuThreeRes.json();

            // MENU FOUR
            const menuFourRes = await fetch(`${BASE_URL_WPJSON}/wp-api-menus/v2/menus/37`); 
            const menuFourData = await menuFourRes.json();
    
            setMenuOne(menuOneData.items);
            setMenuOneName(menuOneData.name);
            setMenuTwo(menuTwoData.items);
            setMenuTwoName(menuTwoData.name);
            setMenuThree(menuThreeData.items);
            setMenuThreeName(menuThreeData.name);
            setMenuFour(menuFourData.items);
            setMenuFourName(menuFourData.name);
        }
        fetchData();
    }, []);

    return (
        <div className="bg-[#232F3E] py-10 text-white">
            <div className="grid max-w-5xl grid-cols-1 gap-5 px-5 mx-auto text-center md:text-left md:grid-cols-4">
                <MenuBlock menu={menuOne} menuName={menuOneName} />
                <MenuBlock menu={menuTwo} menuName={menuTwoName} />
                <MenuBlock menu={menuThree} menuName={menuThreeName} />
                <MenuBlock menu={menuFour} menuName={menuFourName} />
            </div>
            <hr className="my-10 border-gray-700" />
            <div className="text-xs text-center">
                © 1996-2022, Amazon.com, Inc. or its affiliates
            </div>
        </div>
    )
}

export default Footer
