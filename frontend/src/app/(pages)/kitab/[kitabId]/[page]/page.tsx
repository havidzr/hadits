"use client";

import ErrorAPI from "@/app/components/ErrorAPI";
import HaditsCard from "@/app/components/HaditsCard";
import Hero from "@/app/components/Hero";
import PaginationHadits from "@/app/components/PaginationHadits";
import MainLayout from "@/app/layouts/MainLayout";
import axiosInstance from "@/app/utils/axiosConfig";
import { useRouter } from "nextjs-toploader/app";
import { FC, useEffect, useState } from "react";

type KitabPageProps = {
    params: {
        kitabId: string;
        page?: string;
    };
};

const KitabPage: FC<KitabPageProps> = ({ params }) => {
    const URLParams = params;
    const router = useRouter();

    if (!isNaN(Number(params.page)) == false) {
        router.push("/");
    }

    type dataKitab = {
        name: string;
        id: string;
        available: number;
    };

    type dataHadits = {
        number: number;
        arab: string;
        id: string;
    };

    const [dataKitab, setDataKitab] = useState<dataKitab>({
        name: "",
        id: "",
        available: 0,
    });

    const [dataHadits, setDataHadits] = useState<dataHadits[]>([]);
    const [apiLoading, setApiLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const [dataKitabHasFetched, setDataKitabHasFetched] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0);

    const page = Number(URLParams.page);
    const itemsPerPage = 10;

    const rangeMin = (page - 1) * itemsPerPage + 1;
    let rangeMax = page * itemsPerPage;


    const fetchDataKitab = async () => {
        setApiLoading(true);
        try {
            const response = await axiosInstance.get("/books");
            const responseData = response.data.data;

            setDataKitab(responseData.find((kitab: dataKitab) => kitab.id === URLParams.kitabId));

            setApiError(null);

            setDataKitabHasFetched(true);
        } catch (err: any) {
            setDataKitab({
                name: "",
                id: "",
                available: 0,
            });
            setDataHadits([]);
            if (err.status == 404) {
                setApiError("404");
            } else {
                setApiError("Ada sesuatu yang error!");
            }
            setApiLoading(false);
        }
    };

    const fetchDataHadits = async () => {
        setApiLoading(true);

        if (dataKitab?.available !== 0) {
            if (rangeMax > dataKitab?.available) {
                rangeMax = dataKitab?.available;
            }
        }

        const urlAPI = `/books/${URLParams.kitabId}?range=${rangeMin}-${rangeMax}`;

        try {
            const response = await axiosInstance.get(urlAPI);
            const responseData = response.data.data;

            const { hadiths } = responseData;

            setDataHadits(hadiths || []);

            setApiLoading(false);
            setApiError(null);
        } catch (err: any) {
            setDataKitab({
                name: "",
                id: "",
                available: 0,
            });
            setDataHadits([]);
            if (err.status == 404) {
                setApiError("404");
            } else {
                setApiError("Ada sesuatu yang error!");
            }
            setApiLoading(false);
        }
    };

    const handlePagination = (pagination: number): void => {
        const url = `/kitab/${dataKitab.id}/${pagination}`;
        router.push(url);
    };

    useEffect(() => {
        setApiError(null);
        if (!dataKitabHasFetched) {
            fetchDataKitab();
        }
        if (dataKitabHasFetched) {
            fetchDataHadits();
        }

        setTotalPages(Math.ceil(dataKitab.available / itemsPerPage))
    }, [dataKitabHasFetched]);

    console.log(totalPages);
    

    return (
        <MainLayout>
            {/* TITLE */}
            <title>Hadits Tsirwah | {dataKitab?.name || "Invalid"}</title>

            {/* HERO */}
            <Hero type='kitab' id={dataKitab?.id} kitab_name={dataKitab?.name} available={dataKitab?.available} isLoading={apiLoading} />

            {/* MAIN CONTENT */}
            <section className='flex justify-center px-6 py-6 flex-1 text-black-primary dark:bg-black-primary dark:text-white'>
                <main className='max-w-[1128px] w-full flex flex-col gap-[32px]'>
                    <div className='flex flex-col'>
                        {apiLoading ? (
                            <HaditsCard isLoading={true} />
                        ) : !apiLoading && !apiError ? (
                            dataHadits.map((hadits, index) => (
                                <HaditsCard
                                    key={index}
                                    type='kitab'
                                    kitabId={dataKitab.id}
                                    id={hadits.number}
                                    number={index + rangeMin}
                                    name={dataKitab.name}
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
                    <div className='flex justify-between items-center pt-6 pb-[32px] gap-6 flex-col md:flex-row md:pb-[52px]'>
                        <PaginationHadits total={totalPages} isLoading={apiLoading} initialPage={page} action={handlePagination} />
                        <p className='text-sm text-black-secondary'>Menampilkan 10 hadits per halaman</p>
                    </div>
                </main>
            </section>
        </MainLayout>
    );
};

export default KitabPage;
