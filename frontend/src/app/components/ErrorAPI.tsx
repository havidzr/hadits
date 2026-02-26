"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";
import SearchBar from "./SearchBar";
import { TbChevronLeft } from "react-icons/tb";
import { useRouter } from "nextjs-toploader/app";

type ErrorAPIProps = {
    messages: string;
    desc: string;
    action: () => void;
    isSearch?: boolean;
};

const ErrorAPI: FC<ErrorAPIProps> = ({ action, messages, desc, isSearch }) => {
    const router = useRouter();

    return (
        <div className='h-full w-full py-[52px] px-6 flex flex-col items-center '>
            {messages == "404 Tidak Ditemukan" ? (
                <Image src={"/svg/404Illustration.svg"} width={0} height={0} className='w-[240px] h-auto mb-6' alt='error-illustration' />
            ) : (
                <Image src={"/svg/errorIllustration.svg"} width={0} height={0} className='w-[240px] h-auto mb-6' alt='error-illustration' />
            )}
            <h1 className='text-[24px] font-semibold mb-2'>{messages}</h1>
            <p className='text-base text-black-secondary max-w-[512px] w-full text-center mb-8'>{desc}</p>
            {messages == "404 Tidak Ditemukan" && isSearch ? (
                <SearchBar />
            ) : messages !== "404 Tidak Ditemukan" && !isSearch ? (
                <Button className='font-semibold bg-mint-primary text-white text-[16px]' onClick={action}>
                    Refresh
                </Button>
            ) : (
                <Button className='text-mint-primary bg-mint-secondary min-w-0 w-fit h-fit px-4 py-2 flex items-center rounded-full' onClick={() => router.push("/")}>
                    <TbChevronLeft />
                    <span className='text-mint-primary font-medium text-sm'>Temukan Hadits Lainnya</span>
                </Button>
            )}
        </div>
    );
};

export default ErrorAPI;
