"use client";

import ErrorAPI from "@/app/components/ErrorAPI";
import HaditsCard from "@/app/components/HaditsCard";
import Hero from "@/app/components/Hero";
import PaginationHadits from "@/app/components/PaginationHadits";
import MainLayout from "@/app/layouts/MainLayout";
import axiosInstance from "@/app/utils/axiosConfig";
import { useRouter } from "nextjs-toploader/app";
import { FC, useCallback, useEffect, useState } from "react";

type TemaPageProps = {
    params: {
        temaId: string;
        page?: string;
    };
};

const TemaPage: FC<TemaPageProps> = ({ params }) => {
    const URLParams = {
        ...params,
        page: params.page ?? "1",
    };

    const router = useRouter();

    if (!isNaN(Number(params.page)) == false) {
        router.push("/");
    }

    type dataHadits = {
        id: string;
        tema: string;
        deskripsi: string;
        totalHadits: number;
        totalPages: number;
        currentPage: number;
        hadits: {
            name: string;
            arab: string;
            id: string;
        }[];
    };

    const [dataHadits, setDataHadits] = useState<dataHadits | null>(null);
    const [apiLoading, setApiLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const fetchDataHadits = useCallback(async () => {
        setApiLoading(true);
        setApiError(null);
        try {
            const response = await axiosInstance.get(`/tema/${URLParams.temaId}/${URLParams.page}`);
            if (response.data.code === 200) {
                setDataHadits(response.data.data);
                setApiLoading(false);
            } else {
                setDataHadits(null);
                setApiError(response.data.code);
                setApiLoading(false);
            }
        } catch (err: any) {
            setDataHadits(null);
            if (err.status == 404) {
                setApiError("404");
            } else {
                setApiError("Ada sesuatu yang error!");
            }
            setApiLoading(false);
        }
    }, [URLParams.temaId, URLParams.page]);

    const handlePagination = (pagination: number): void => {
        const url = `/tema/${dataHadits?.id}/${pagination}`;
        router.push(url);
    };

    useEffect(() => {
        setApiError(null);
        fetchDataHadits();
    }, [fetchDataHadits]);

    console.log(dataHadits);

    return (
        <MainLayout>
            {/* TITLE */}
            <title>Hadits Tsirwah | {dataHadits?.tema}</title>

            {/* HERO */}
            <Hero type='tema' tema={dataHadits ? dataHadits?.tema : ""} deskripsi={dataHadits ? dataHadits.deskripsi : ""} available={dataHadits ? dataHadits.totalHadits : 0} isLoading={apiLoading} />

            {/* MAIN CONTENT */}
            <section className='flex justify-center px-6 py-6 flex-1 text-black-primary dark:bg-black-primary dark:text-white'>
                <main className='max-w-[1128px] w-full flex flex-col gap-[32px]'>
                    <div className='flex flex-col'>
                        {apiLoading ? (
                            <HaditsCard isLoading={true} />
                        ) : !apiLoading && !apiError ? (
                            dataHadits?.hadits.map((hadits, index) => (
                                <HaditsCard
                                    type='tema'
                                    temaId={dataHadits.id}
                                    id={index + 1 + (dataHadits.currentPage - 1) * 10}
                                    key={index}
                                    number={index + 1 + (dataHadits.currentPage - 1) * 10}
                                    name={hadits.name}
                                    hadits_content={hadits.arab}
                                    hadits_terjemahan={hadits.id}
                                    isLoading={false}
                                />
                            ))
                        ) : !apiLoading && apiError ? (
                            <ErrorAPI
                                action={fetchDataHadits}
                                messages={apiError == "404" ? "404 Tidak Ditemukan" : apiError}
                                desc={apiError == "404" ? `Hadits Tidak Ditemukan` : "Ada sesuatu yang error, coba tekan tombol refresh jika masih error coba refresh halaman"}
                            />
                        ) : null}
                    </div>
                    <div className='flex justify-between items-center pt-6 flex-col gap-6 pb-[32px] md:flex-row md:pb-[52px]'>
                        <PaginationHadits total={dataHadits ? dataHadits?.totalPages : 0} isLoading={apiLoading} initialPage={Number(URLParams.page)} action={handlePagination} />
                        <p className='text-black-secondary text-xs md:text-sm'>Menampilkan 10 hadits per halaman</p>
                    </div>
                </main>
            </section>
        </MainLayout>
    );
};

export default TemaPage;
