import React, { useState } from 'react';
import Banner from "../components/Banner";
import BoxTitleImage from '../components/BoxTitleImage';
import Layout from "../components/Layout";
import { BASE_URL_WPJSON_WP_V2, WooCommerce } from "../utils/wordpress";

export default function Home({ homePageSlider, homePageCategories }) {
  const [slider, setSlider] = useState(homePageSlider);
  const [categories, setCategories] = useState(homePageCategories);

  return (
    <Layout>
      <Banner slider={slider} />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-4">
            {categories?.map(({id, name, image, slug}) => (
              <BoxTitleImage name={name} image={image.src} slug={slug} key={id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // HOME PAGE
  const homePageRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/pages/80`); 
  const homePage = await homePageRes.json();

  // HOME SLIDER
  const homePageSlider = [];
  let count = 0;
  for (let [key, value] of Object.entries(homePage.acf.slide)) {
      const slideImageRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/media/${value.image}`); 
      const slideImage = await slideImageRes.json();
      homePageSlider[count] = [slideImage.source_url, value.text, value.url];
      count++;
  }

  // HOME CATEGORIES
  const homePageCategories = [];
  for (let [key, value] of Object.entries(homePage.acf.category)) {
      const catDataRes = await WooCommerce.get(`products/categories/${value}`);
      const catData = await catDataRes.data;
      homePageCategories.push(catData);
  }

  return { props: { homePageSlider, homePageCategories } }
}
