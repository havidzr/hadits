"use client";

import { FC, Key, useCallback, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import TabHome from "../components/TabHome";
import GroupCard from "../components/GroupCard";
import axiosInstance from "../utils/axiosConfig";
import ErrorAPI from "../components/ErrorAPI";

const Home: FC = () => {
    type dataKitab = {
        name: string;
        id: string;
        available: number;
    };

    type dataTema = {
        id: string;
        tema: string;
        deskripsi: string;
        totalHadits: number;
        totalPages: number;
    };

    const [dataKitab, setDataKitab] = useState<dataKitab[]>([]);
    const [dataTema, setDataTema] = useState<dataTema[]>([]);
    const [apiLoading, setApiLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const [section, setSection] = useState<string>("kitab");

    const fetchData = useCallback(async (endpoint: string, setter: (data: any) => void) => {
        setApiLoading(true);
        setApiError(null);
        try {
            const response = await axiosInstance.get(endpoint);
            setApiLoading(false);
            setter(response.data.data);
        } catch (err) {
            setApiError("Ada sesuatu yang error!");
            setApiLoading(false);
        }
    }, []);

    const fetchDataKitab = useCallback(() => fetchData("/books", setDataKitab), [fetchData]);
    const fetchDataTema = useCallback(() => fetchData("/tema", setDataTema), [fetchData]);

    const handleSectionChange = (key: Key) => {
        setSection(key.toString());
    };

    const loadingList = Array.from({ length: 9 }, (_, i) => i); // Generate 9 loading items

    useEffect(() => {
        if (section === "kitab" && dataKitab.length === 0) {
            fetchDataKitab();
        } else if (section === "tema" && dataTema.length === 0) {
            fetchDataTema();
        }
    }, [section, dataKitab.length, dataTema.length, fetchDataKitab, fetchDataTema]);

    const renderContent = () => {
        if (apiLoading) {
            return (
                <div className='grid grid-cols-1 md:gap-[32px] md:grid-cols-2 xl:grid-cols-3'>
                    {loadingList.map((id) => (
                        <GroupCard key={id} isLoading={true} />
                    ))}
                </div>
            );
        } else if (!apiLoading && !apiError) {
            return (
                <div className='grid grid-cols-1 md:gap-[32px] md:grid-cols-2 xl:grid-cols-3'>
                    {section === "kitab"
                        ? dataKitab.map((kitab, index) => (
                            <GroupCard key={kitab.id} isLoading={false} type='kitab' id={kitab.id} number={index + 1} kitab_name={kitab.name} available={kitab.available} />
                        ))
                        : dataTema.map((tema, index) => (
                            <GroupCard key={tema.id} isLoading={false} type='tema' id={tema.id} number={index + 1} tema={tema.tema} deskripsi={tema.deskripsi} available={tema.totalHadits} />
                        ))}
                </div>
            );
        } else if (apiError) {
            return (
                <ErrorAPI
                    action={section === "kitab" ? fetchDataKitab : fetchDataTema}
                    messages={apiError}
                    desc='Ada sesuatu yang error, coba tekan tombol refresh jika masih error coba refresh halaman'
                />
            );
        }
    };

    return (
        <MainLayout>
            <title>Hadits Tsirwah</title>
            <Hero type='home' />

            {/* MAIN CONTENT */}
            <section className='flex justify-center px-6 flex-1 pt-[52px] pb-[32px] md:py-[64px] text-black-primary dark:bg-black-primary dark:text-white'>
                <main className='max-w-[1128px] w-full flex flex-col md:gap-[32px]'>
                    {/* HEAD */}
                    <div className='flex justify-between items-center gap-2 border-b-2 pb-4 border-mint-secondary md:border-b-0 md:pb-0'>
                        <div className='flex flex-col'>
                            <h1 className='font-semibold text-lg mb-0 md:mb-2 md:text-[24px]'>{section === "kitab" ? "Hadits Tsirwah" : "Tematik"}</h1>
                            <p className='font-medium text-black-secondary text-sm md:text-base'>{section === "kitab" ? "Tempat mencari hadits dengan mudah" : "Pengelompokan berdasarkan tema"}</p>
                        </div>
                        <TabHome currentKey={section} action={handleSectionChange} />
                    </div>

                    {/* CONTENT */}
                    {renderContent()}
                </main>
            </section>
        </MainLayout>
    );
};

export default Home;
