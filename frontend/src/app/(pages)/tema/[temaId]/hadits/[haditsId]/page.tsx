"use client";

import ErrorAPI from "@/app/components/ErrorAPI";
import HaditsCard from "@/app/components/HaditsCard";
import Hero from "@/app/components/Hero";
import MainLayout from "@/app/layouts/MainLayout";
import axiosInstance from "@/app/utils/axiosConfig";
import { FC, useEffect, useState } from "react";

type TemaHaditsPageProps = {
    params: {
        temaId: string;
        haditsId: string;
    };
};

const TemaHaditsPage: FC<TemaHaditsPageProps> = ({ params }) => {
    const URLParams = params;

    type dataHadits = {
        name: string;
        id: string;
        contents: {
            number: number;
            arab: string;
            id: string;
        };
    };

    const [dataHadits, setDataHadits] = useState<dataHadits>({
        name: "",
        id: "",
        contents: {
            number: 0,
            arab: "",
            id: "",
        },
    });
    const [apiLoading, setApiLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const urlGet = `/tema/${URLParams.temaId}/hadits/${URLParams.haditsId}`;

    const fetchDataHadits = async () => {
        setApiLoading(true);
        try {
            const response = await axiosInstance.get(urlGet);
            const responseData = response.data.data;

            setDataHadits(responseData);

            setApiLoading(false);
            setApiError(null);
        } catch (err: any) {
            if (err.status === 404) {
                setApiError(err.status);
            } else {
                setApiError("Ada sesuatu yang error!");
            }
            setApiLoading(false);
        }
    };

    useEffect(() => {
        setApiError(null);
        fetchDataHadits();
    }, []);

    console.log(apiError);

    return (
        <MainLayout>
            {/* TITLE */}
            <title>Hadits Tsirwah | Hadits</title>

            {/* HERO */}
            <Hero type='hadits' />

            {/* MAIN CONTENT */}
            <section className='flex justify-center px-6 py-6 flex-1 text-black-primary dark:bg-black-primary dark:text-white'>
                <main className='max-w-[1128px] w-full flex flex-col gap-[32px]'>
                    {apiLoading ? (
                        <HaditsCard isLoading={true} />
                    ) : !apiLoading && !apiError ? (
                        <HaditsCard
                            type="tema"
                            temaId={dataHadits.id}
                            id={dataHadits.contents.number}
                            isCardShare={true}
                            number={1}
                            name={dataHadits.name}
                            hadits_content={dataHadits.contents.arab}
                            hadits_terjemahan={dataHadits.contents.id}
                            isLoading={false}
                        />
                    ) : !apiLoading && apiError ? (
                        <ErrorAPI
                            action={fetchDataHadits}
                            messages={apiError == "404" ? "404 Tidak Ditemukan" : apiError}
                            desc={apiError == "404" ? `Hadits Tidak Ditemukan` : "Ada sesuatu yang error, coba tekan tombol refresh jika masih error coba refresh halaman"}
                        />
                    ) : null}
                </main>
            </section>
        </MainLayout>
    );
};

export default TemaHaditsPage;
