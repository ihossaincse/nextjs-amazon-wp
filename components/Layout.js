import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BASE_URL_WPJSON, BASE_URL_WPJSON_WP_V2 } from "../utils/wordpress";
import Footer from "./Footer";
import Header from './Header';

const Layout = ({children}) => {
    const [favicon, setFavicon] = useState("");
    const [siteName, setSiteName] = useState("");

    useEffect(() => {
        async function fetchData() {
            // OPTION PAGE
            const optionPageRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/pages/29`); 
            const optionPage = await optionPageRes.json();
            
            // FAVICON
            const faviconRes = await fetch(`${BASE_URL_WPJSON_WP_V2}/media/${optionPage.acf.favicon}`); 
            const favicon = await faviconRes.json();
            
            // SITE NAME
            const siteNameRes = await fetch(`${BASE_URL_WPJSON}?_fields=name`); 
            const siteName = await siteNameRes.json();

            setFavicon(favicon.source_url);
            setSiteName(siteName.name);
        }
        fetchData();
    }, []);

    return (
        <div className="h-full min-h-screen">
            <Head>
                <title>{siteName}</title>
                <meta name="description" content={siteName} />
                <link rel="icon" href={favicon} />
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
