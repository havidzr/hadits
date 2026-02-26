"use client";

import { useDarkModeStore } from "./utils/store";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { darkMode } = useDarkModeStore();

    return (
        <html lang='en'>
            <Head>
                <link rel='icon' href='/images/favicon.ico' />
            </Head>
            <body className={`${darkMode ? "dark" : ""}`}>
                <link rel="icon" href="/images/favicon.ico" sizes="any" />
                <NextTopLoader color='#02989A' initialPosition={0.08} crawlSpeed={200} height={4} crawl={true} showSpinner={true} easing='ease' speed={200} shadow='0 0 10px #2299DD,0 0 5px #2299DD' />
                {children}
            </body>
        </html>
    );
}
