import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Layout from "../../components/Layout";
import { actionTypes } from "../../reducer";
import { useStateValue } from '../../StateProvider';
import { WooCommerce } from "../../utils/wordpress";

const defaultImg = "/images/default.png";

function createMarkup(data) {
    return {__html: data};
}

const Product = ({ prodDetails }) => {
    const [product, setProduct] = useState(prodDetails.length ? prodDetails[0] : "");
    const [state, dispatch] = useStateValue();
    const [{bucket}] = useStateValue();

    console.log(product);

    return (
        <Layout>
            <div className="max-w-5xl p-10 mx-auto">
                {product && (
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div className="relative w-full min-h-full h-96">
                            <Image src={product.images.length ? product.images[0].src : defaultImg} alt={product.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="">
                            <h2 className="mb-4 text-2xl font-medium">{product.name}</h2>
                            <div className="mb-4">Price: <span className="text-[#B12704] text-xl">${product.price}</span></div>
                            <h4 className="mb-4 text-lg font-medium">About this item</h4>
                            <div className="mb-4 description" dangerouslySetInnerHTML={createMarkup(product.description)} />
                            <div className="">
                                <Button 
                                    text="Add to Cart" 
                                    onClick={() => dispatch({
                                        type: actionTypes.ADD_TO_CART,
                                        bucket: [
                                            ...bucket, 
                                            {
                                                id: product.id, 
                                                name: product.name,
                                                qty: 1,
                                                price: product.price,
                                                image: product.images.length ? product.images[0].src : defaultImg
                                            }
                                        ]
                                    })} 
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Product

export async function getStaticPaths() {
    // PRODUCTS SLUG
    const productsRes = await WooCommerce.get(`products?per_page=100`);
    const products = await productsRes.data;
    const paths = products.map((product) => ({
        params: { slug: product.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
     // PRODUCT DETAILS
    const prodDetailsRes = await WooCommerce.get(`products?slug=${params.slug}`);
    const prodDetails = await prodDetailsRes.data;

    return { props: { prodDetails } }
}
