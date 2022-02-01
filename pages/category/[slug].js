import React, { useState } from 'react';
import Layout from "../../components/Layout";
import Product from '../../components/Product';
import { WooCommerce } from "../../utils/wordpress";

const defaultImg = "/images/default.png";

const Category = ({ catDetails, catProducts }) => {
    const [category, setCategory] = useState(catDetails);
    const [products, setProducts] = useState(catProducts);
    
    return (
        <Layout>
            <div className="max-w-5xl p-10 mx-auto">
                {category && (
                    <div className="mb-4">
                        <h2 className="mb-2 text-3xl font-semibold">{category[0].name}</h2>
                        <p className="">{category[0].description}</p>
                    </div>
                )}
                {products && (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                        {products?.map(({id, name, slug, images, price}) => (
                            <Product key={id} name={name} slug={slug} image={images.length ? images[0].src : defaultImg} price={price} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Category

export async function getStaticPaths() {
    // CATEGORY SLUG
    const categoriesRes = await WooCommerce.get(`products/categories?per_page=100`);
    const categories = await categoriesRes.data;
    const paths = categories.map((category) => ({
        params: { slug: category.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
     // CATEGORY DETAILS
    const catDetailsRes = await WooCommerce.get(`products/categories?slug=${params.slug}`);
    const catDetails = await catDetailsRes.data;

    // PRODUCTS BY CATEGORY
    const catProductsRes = await WooCommerce.get(`products?category=${catDetails[0].id}`);
    const catProducts = await catProductsRes.data;

    return { props: { catDetails, catProducts } }
}
