'use client'

import Image from "next/image";
import { FC } from "react";
import SearchBar from "./SearchBar";
import arabNameGenerator from "../utils/arabNameGenerator";
import { Button, Skeleton } from "@nextui-org/react";
import { TbBook, TbChevronLeft } from "react-icons/tb";
import { useRouter } from "nextjs-toploader/app";

type HeroHomeProps = {
    type: "home";
};

type HeroKitabProps = {
    type: "kitab";
    id: string;
    kitab_name: string;
    available: number;
    isLoading: boolean;
};

type HeroTemaProps = {
    type: "tema";
    tema: string;
    deskripsi: string;
    available: number;
    isLoading: boolean;
};

type HeroSearchProps = {
    type: "search";
    keyword: string;
    available: number;
    isArab: boolean;
    isLoading: boolean;
};

type HeroHaditsProps = {
    type: "hadits";
};

type HeroProps = HeroHomeProps | HeroKitabProps | HeroSearchProps | HeroTemaProps | HeroHaditsProps;

const Hero: FC<HeroProps> = (props) => {
    const { type } = props;

    const router = useRouter();

    if (type == "home") {
        return (
            <section className='flex justify-center items-center bg-mint-primary text-white relative overflow-hidden mx-6 mt-2 rounded-[24px] px-6 py-5 xl:py-[52px] xl:rounded-none xl:rounded-b-[32px] xl:mt-0 xl:mx-0'>
                <Image src={"/images/bgHeroHome.png"} alt='kaligrafi' width='1094' height='489' priority className='w-[1094px] absolute right-0 -top-3 object-cover h-[242px] md:h-auto ' />
                <main className='max-w-[1128px] w-full flex items-center relative z-[1] justify-center xl:justify-between'>
                    <div className='flex-col gap-[32px] hidden xl:flex'>
                        <div className='flex flex-col'>
                            <h1 className='text-[32px] font-semibold'>Selamat Datang di Hadits Tsirwah</h1>
                            <p className='text-xl font-medium opacity-70'>Website kumpulan hadits - hadits Rasulullah</p>
                        </div>
                        <SearchBar />
                    </div>
                    <div className='flex flex-col items-center gap-4 md:gap-6'>
                        <Image src={"/images/kaligrafiHome.png"} alt='kaligrafi' width='767' height='297' priority className='w-[162px] md:w-[312px] h-auto' />
                        <div className='flex flex-col gap-2 items-center'>
                            <h1 className='text-white font-semibold italic text-center text-base xl:text-lg font-poppins'>“Sampaikanlah dariku sekalipun satu ayat”</h1>
                            <p className='text-white text-opacity-70 text-xs xl:text-sm'>HR Bukhori 3202</p>
                        </div>
                    </div>
                </main>
            </section>
        );
    } else if (type == "kitab" || type == "tema") {
        return (
            <section className='flex justify-center items-center bg-mint-primary text-white px-6 rounded-b-[32px] py-[32px] md:py-[52px]'>
                <main className={`max-w-[1128px] w-full flex flex-col justify-between items-center ${type == "kitab" ? "gap-3" : "gap-0"}`}>
                    {!props.isLoading ? (
                        <h1 className={`font-semibold ${type == "kitab" ? "font-arab text-[32px]" : "text-center text-[32px]"}`}>{type == "kitab" ? arabNameGenerator(props.id) : props.tema}</h1>
                    ) : (
                        <Skeleton className='h-[48px] w-[162px] rounded-xl opacity-50 mb-2' />
                    )}
                    {!props.isLoading ? (
                        <p className={`font-medium ${type == "kitab" ? "text-[20px]" : "text-sm mt-2 md:text-[20px] md:mt-0"}`}>{type == "kitab" ? "Hadits Riwayat" + props.kitab_name.split(".")[1] : props.deskripsi}</p>
                    ) : (
                        <Skeleton className='h-[30px] w-[232px] rounded-xl opacity-50' />
                    )}
                    {!props.isLoading ? (
                        <div className={`text-base flex items-center gap-2 bg-white text-opacity-70 bg-opacity-20 text-whites px-3 py-1 rounded-2xl ${type == "kitab" ? "mt-2" : "mt-6"}`}>
                            <TbBook className='text-base' />
                            {props.available} Hadits
                        </div>
                    ) : (
                        <Skeleton className='h-[29px] w-[132px] rounded-2xl opacity-50 mt-2' />
                    )}
                </main>
            </section>
        );
    } else if (type == "search") {
        const { keyword, isArab, available } = props;

        return (
            <section className='flex justify-center items-center bg-mint-primary text-white px-6 rounded-b-[32px] py-[32px] md:py-[52px]'>
                <main className='max-w-[1128px] w-full flex flex-col justify-between items-center'>
                    {!props.isLoading ? <h1 className='text-[16px]'>Hasil Pencarian:</h1> : <Skeleton className='h-[24px] w-[162px] rounded-lg opacity-50 mb-2' />}
                    {!props.isLoading ? <p className={`font-semibold text-2xl md:text-[32px] ${isArab && "font-arab mb-3"}`}>{keyword}</p> : <Skeleton className='h-[48px] w-[320px] md:w-[512px] rounded-xl opacity-50' />}
                    {!props.isLoading ? (
                        <div className='text-[14px] mt-3 flex items-center gap-2 bg-white text-opacity-70 bg-opacity-20 text-whites px-3 py-1 rounded-2xl'>
                            <TbBook className='text-base' />
                            {available} Hadits
                        </div>
                    ) : (
                        <Skeleton className='h-[29px] w-[132px] rounded-2xl opacity-50 mt-2' />
                    )}
                </main>
            </section>
        );
    } else if (type == "hadits") {
        return (
            <section className='flex justify-center items-center bg-mint-primary text-white px-6 rounded-b-[32px] py-[32px] md:py-[52px]'>
                <main className='max-w-[1128px] w-full flex flex-col justify-between items-center gap-4'>
                    <h1 className='text-white font-semibold text-[32px]'>Hadits Tsirwah</h1>
                    <Button className='text-mint-primary bg-white min-w-0 w-fit h-fit px-4 py-2 flex items-center rounded-full' onClick={() => router.push('/')}>
                        <TbChevronLeft />
                        <span className='text-mint-primary font-medium text-sm'>Baca Hadits Lainnya</span>
                    </Button>
                </main>
            </section>
        );
    }
};

export default Hero;
