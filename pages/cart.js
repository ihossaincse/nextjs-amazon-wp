import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import CartBlock from '../components/CartBlock';
import Layout from '../components/Layout';
import { actionTypes } from "../reducer";
import { useStateValue } from '../StateProvider';

const Cart = () => {
    const [{bucket}] = useStateValue();
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState(false);
    const [state, dispatch] = useStateValue();
    
    console.log(bucket);

    const handleOrder = () => {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            bucket: []
        });
        setStatus(true);
    }

    useEffect(() => {
        let total = 0;
        bucket?.map(({price}) => {
            total += Number(price);
        });
        setTotalPrice(total.toFixed(2));
    }, [bucket]);

    return (
        <Layout>
            <div className="py-10 bg-gray-100">
                <div className="max-w-5xl p-5 mx-auto bg-white">
                    <h2 className="pb-5 mb-5 text-3xl font-medium border-b-2 border-gray-100">Shopping Cart</h2>
                    <div className="">
                        {status ? (
                            <div className="font-medium text-green-600 text-md">Success! You have completed your order</div>
                        ) : (
                            bucket.length ? (
                                <div className="">
                                    {bucket?.map(({id, name, qty, price, image}) => (
                                        <CartBlock name={name} qty={qty} price={price} image={image} key={id} />
                                    ))}
                                    <div className="font-medium text-right">
                                        <div className="mb-3">
                                            Subtotal: <span className="text-xl font-medium">${totalPrice}</span>
                                        </div>
                                        <Button text="Proceed to Order" onClick={() => handleOrder(true)} />    
                                    </div>    
                                </div>
                                ) : (
                                    <div className="font-medium text-amber-500 text-md">Cart is empty</div>      
                            )
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
