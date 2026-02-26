"use client";

import Hero from "@/app/components/Hero";
import MainLayout from "@/app/layouts/MainLayout";
import { FC, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HaditsCard from "@/app/components/HaditsCard";
import axiosInstance from "@/app/utils/axiosConfig";
import ErrorAPI from "@/app/components/ErrorAPI";
import { useRouter } from "nextjs-toploader/app";
import PaginationHadits from "@/app/components/PaginationHadits";

const SearchPage: FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const keyword = searchParams.get("keyword") || "";
    const page = Number(searchParams.get("page")) || 1;

    const isArabicText = (text: string): boolean => {
        const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
        return arabicRegex.test(text);
    };

    const isArab = isArabicText(keyword);

    type dataSearch = {
        keyword: string;
        totalResults: number;
        requested: number;
        limit: number;
        page: number;
        availablePages: number;
        hadiths: {
            kitabId: string;
            number: number;
            name: string;
            arab: string;
            id: string;
        }[];
    };

    const [dataSearch, setDataSearch] = useState<dataSearch>({ keyword: "", totalResults: 0, requested: 0, limit: 0, page: 0, availablePages: 0, hadiths: [] });
    const [apiLoading, setApiLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const fetchDataSearch = async () => {
        setApiLoading(true);
        try {
            const response = await axiosInstance.get(`/search?keyword=${keyword}&page=${page}`);
            if (response.data.code === 200) {
                setDataSearch(response.data.data);
                setApiLoading(false);
            } else {
                setDataSearch({ keyword: "", totalResults: 0, requested: 0, limit: 0, page: 0, availablePages: 0, hadiths: [] });
                setApiError(response.data.code);
                setApiLoading(false);
            }
            console.log(response);
        } catch (err: any) {
            setDataSearch({ keyword: "", totalResults: 0, requested: 0, limit: 0, page: 0, availablePages: 0, hadiths: [] });
            if (err.status == 404) {
                setApiError("404");
            } else {
                setApiError("Ada sesuatu yang error!");
            }
            setApiLoading(false);
        }
    };

    const handlePagination = (pagination: number): void => {
        const url = `/search?keyword=${keyword}&page=${pagination}`;
        router.push(url);
    };

    if (!apiLoading && !apiError) {
        if (page > dataSearch.availablePages || page < 1) {
            router.push(`/search?keyword=${keyword}&page=${dataSearch.availablePages}`);
        }
    }

    useEffect(() => {
        setApiError(null);
        fetchDataSearch();
    }, [page, keyword]);

    return (
        <MainLayout>
            {/* TITLE */}
            <title>Hadits Tsirwah | Search</title>

            {/* HERO */}
            <Hero type='search' keyword={keyword} available={dataSearch.totalResults} isArab={isArab} isLoading={apiLoading} />

            {/* MAIN CONTENT */}
            <section className='flex justify-center px-6 py-6 flex-1 text-black-primary dark:bg-black-primary dark:text-white'>
                <main className='max-w-[1128px] w-full flex flex-col gap-[32px]'>
                    <div className='flex flex-col'>
                        {apiLoading ? (
                            <HaditsCard isLoading={true} />
                        ) : !apiLoading && !apiError ? (
                            dataSearch.hadiths.map((hadits, index) => (
                                <>
                                    <HaditsCard
                                        type='kitab'
                                        kitabId={hadits.kitabId}
                                        id={hadits.number}
                                        key={index}
                                        number={(page - 1) * dataSearch.limit + (index + 1)}
                                        name={hadits.name}
                                        hadits_content={hadits.arab}
                                        hadits_terjemahan={hadits.id}
                                        isSearch={isArab ? "arab" : "indonesia"}
                                        keyword={keyword}
                                        showNumber={true}
                                        isLoading={false}
                                    />
                                </>
                            ))
                        ) : !apiLoading && apiError ? (
                            <ErrorAPI
                                action={fetchDataSearch}
                                messages={apiError == "404" ? "404 Tidak Ditemukan" : apiError}
                                desc={
                                    apiError == "404"
                                        ? `keyword "${keyword}" tidak ditemukan, coba cari lagi dengan keyword yang lain`
                                        : "Ada sesuatu yang error, coba tekan tombol refresh jika masih error coba refresh halaman"
                                }
                                isSearch={true}
                            />
                        ) : null}
                    </div>
                    <div className='flex justify-between items-center pt-6 pb-[32px] gap-6 flex-col md:flex-row md:pb-[52px]'>
                        <PaginationHadits total={dataSearch.availablePages} isLoading={apiLoading} initialPage={page} action={handlePagination} />
                        <p className='text-sm text-black-secondary'>Menampilkan 10 hadits per halaman</p>
                    </div>
                </main>
            </section>
        </MainLayout>
    );
};

const Page: FC = () => {
    return (
        <Suspense>
            <SearchPage />
        </Suspense>
    );
};

export default Page;
