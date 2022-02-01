import React from 'react';
import MenuItem from './MenuItem';

const menuNameClass = "mb-1 text-md font-bold";
const menuUlClass = "text-sm";

const MenuBlock = ({ menu, menuName }) => {
    return (
        <div className="">
            <h2 className={menuNameClass}>{menuName}</h2>
            <ul className={menuUlClass}>
                {menu?.map(({id, object_slug, title}) => (
                    <MenuItem url="#" text={title} key={id} type="small" />
                ))}
            </ul>  
        </div>
    )
}

export default MenuBlock
