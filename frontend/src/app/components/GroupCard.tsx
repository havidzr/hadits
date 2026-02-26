"use client";

import { Skeleton, Tooltip } from "@nextui-org/react";
import { FC } from "react";
import { TbBook } from "react-icons/tb";
import arabNameGenerator from "../utils/arabNameGenerator";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";

type GroupCardLoadingProps = {
    isLoading: true;
};

type GroupCardKitabProps = {
    isLoading: false;
    type: "kitab";
    id: string;
    number: number;
    available: number;
    kitab_name: string;
};

type GroupCardTemaProps = {
    isLoading: false;
    type: "tema";
    id: string;
    number: number;
    available: number;
    tema: string;
    deskripsi: string;
};

type GroupCardProps = GroupCardLoadingProps | GroupCardKitabProps | GroupCardTemaProps;

const GroupCard: FC<GroupCardProps> = (props) => {
    const { isLoading } = props;

    const router = useRouter();

    if (!isLoading) {
        const { type, id, number, available } = props;

        const handleNavigation = (id: string) => {
            const url = `${type}/${id}/`;
            router.push(url);
        };

        return (
            <div
                className='flex justify-between bg-white gap-3 cursor-pointer items-center group hover:bg-mint-secondary transition-colors w-full py-6 shadow-none border-b-1 border-zinc-200 dark:border-zinc-700 dark:hover:bg-mint-secondary dark:bg-black-primary dark:text-white md:dark:bg-[#444444] md:rounded-[16px] md:border-none md:shadow-smooth md:p-6'
                onClick={() => handleNavigation(id)}>
                <div className='flex gap-[18px] items-center'>
                    <div className='relative w-[52px] h-[52px] flex justify-center items-center rounded-full md:rounded-[8px]'>
                        <Image src={"/images/numberFrame.png"} alt="number-frame" width={1024} height={1024} className="absolute z-[5] w-[52px] h-[52px] object-cover top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                        <span className='font-bold text-sm text-mint-primary'>{number}</span>
                    </div>
                    <div className={`flex flex-col max-w-[142px] ${type == "kitab" ? "gap-2" : "gap-1"}`}>
                        <h1 className={`font-semibold text-mint-primary ${type == "kitab" ? "font-arab text-[24px] hidden md:block" : "text-[18px]"}`}>
                            {type == "kitab" ? arabNameGenerator(id) : props.tema}
                        </h1>
                        <p className={`text-base ${type == "kitab" ? "text-base font-semibold md:font-bold" : "font-semibold text-sm"}`}>{type == "kitab" ? props.kitab_name : props.deskripsi}</p>
                        <div
                            className={`items-center bg-black-primary dark:bg-white dark:bg-opacity-10 bg-opacity-10 px-3 py-1 rounded-[32px] w-fit h-fit gap-1 group-hover:bg-white dark:group-hover:bg-black-primary transition-colors ${
                                type == "kitab" ? "flex md:hidden" : "hidden"
                            }`}>
                            <TbBook className='text-black-secondary dark:text-zinc-300' />
                            <span className='text-xs font-medium text-black-secondary dark:text-zinc-300'>{available}</span>
                        </div>
                    </div>
                </div>
                <Tooltip showArrow={true} content='Jumlah Hadits' closeDelay={100} classNames={{ content: "bg-white shadow-none text-xs text-black font-medium", arrow: "shadow-none" }}>
                    <div
                        className={`items-center bg-black-primary dark:bg-white dark:bg-opacity-10 bg-opacity-10 px-3 py-1 rounded-[32px] h-fit gap-1 group-hover:bg-white dark:group-hover:bg-black-primary transition-colors ${
                            type == "kitab" ? "hidden md:flex" : "flex"
                        }`}>
                        <TbBook className='text-black-secondary dark:text-zinc-300' />
                        <span className='text-sm font-medium text-black-secondary dark:text-zinc-300'>{available}</span>
                    </div>
                </Tooltip>

                <h1 className={`font-semibold text-mint-primary ${type == "kitab" ? "font-arab text-[24px] md:hidden" : "text-[18px] hidden"}`}>
                    {type == "kitab" ? arabNameGenerator(id) : props.tema}
                </h1>
            </div>
        );
    } else {
        return (
            <div className='flex justify-between bg-white gap-3 items-center w-full py-6 shadow-none border-b-1 border-zinc-200 dark:border-zinc-700 dark:hover:bg-mint-secondary dark:bg-black-primary dark:text-white md:dark:bg-[#444444] md:rounded-[16px] md:border-none md:shadow-smooth md:p-6'>
                <div className='flex gap-[18px] items-center'>
                    <Skeleton className='w-[32px] h-[32px] flex justify-center items-center rounded-full md:rounded-[8px]' />
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-[162px] rounded-[12px] h-[24px] md:h-[36px]' />
                        <Skeleton className='font-medium text-base w-[110px] h-[24px] rounded-[12px]' />
                    </div>
                </div>
                <Skeleton className='w-[70px] h-[26px] rounded-[32px]' />
            </div>
        );
    }
};

export default GroupCard;
