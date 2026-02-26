"use client";

import { Button, Modal, Skeleton, useDisclosure } from "@nextui-org/react";
import { FC } from "react";
import { TbShare3 } from "react-icons/tb";
import ShareModal from "./ShareModal";

type HaditsCardLoadingProps = {
    isLoading: true;
};

type HaditsCardKitabProps = {
    type: "kitab";
    id: number;
    kitabId: string;
    number: number;
    name: string;
    hadits_content: string;
    hadits_terjemahan: string;
    isLoading: false;
    isCardShare?: boolean;
    isSearch?: "arab" | "indonesia";
    keyword?: string;
    showNumber?: boolean;
};

type HaditsCardTemaProps = {
    type: "tema";
    id: number;
    temaId: string;
    isLoading: false;
    number: number;
    name: string;
    hadits_content: string;
    hadits_terjemahan: string;
    isSearch?: "arab" | "indonesia";
    keyword?: string;
    isCardShare?: boolean;
};

type HaditsCardProps = HaditsCardLoadingProps | HaditsCardKitabProps | HaditsCardTemaProps;

const HaditsCard: FC<HaditsCardProps> = (props) => {
    const { isLoading } = props;

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const formatHadith = (text: string, keyword?: string): string => {
        let formatted = text;

        // 1. Highlight keyword if exists
        if (keyword?.trim()) {
            const regex = new RegExp(`(${keyword})`, "gi");
            formatted = formatted.replace(regex, '<span class="bg-mint-primary text-white font-medium rounded-[4px]">$1</span>');
        }

        // 2. Bold & Italic for perawi names inside brackets [...]
        formatted = formatted.replace(/\[(.*?)\]/g, '<strong class="text-mint-primary italic">[$1]</strong>');

        // 3. Add line breaks for dialogue patterns
        // Patterns: "berkata:", "bertanya:", "menjawab:", or after a closing quote
        formatted = formatted.replace(/(berkata:|bertanya:|menjawab:)\s*"/g, '$1<br/><br/>"');

        // Add line break after the long sanad intro (often ends before the first quote or a specific phrase)
        // This is tricky, but adding a break before the first double quote if it's far into the text helps.
        if (formatted.indexOf('"') > 50) {
            formatted = formatted.replace(/(\.)\s*"/, '$1<br/><br/>"');
        }

        return formatted;
    };

    if (!isLoading) {
        const { id, type, number, name, hadits_content, hadits_terjemahan, isCardShare = false } = props;

        return (
            <div className={`flex flex-col w-full gap-4 ${!isCardShare && "border-b-2 dark:border-zinc-700"} py-[32px] md:py-[52px]`}>
                <div className='flex items-center gap-3'>
                    {!isCardShare && <div className='flex items-center justify-center bg-mint-primary px-3 py-1 text-white text-base font-medium rounded-[8px]'>{number}</div>}
                    <h1 className='text-[20px] font-semibold'>{name}{type == "kitab" && props.showNumber ? <span className="text-mint-primary ml-3">#{id}</span> : null}</h1>
                </div>
                <div className='flex flex-col w-full bg-mint-secondary p-4 rounded-[16px] gap-3'>
                    <div className='p-3 bg-white dark:bg-black-primary rounded-[12px]'>
                        <div className='text-end font-arab leading-[48px] font-medium text-2xl' dangerouslySetInnerHTML={{ __html: props.isSearch == "arab" ? formatHadith(hadits_content, props.keyword) : hadits_content }}></div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='text-sm text-black-secondary'>Terjemahan:</span>
                        <div className='leading-relaxed font-id text-base' dangerouslySetInnerHTML={{ __html: formatHadith(hadits_terjemahan, props.keyword) }}></div>
                        <span className='text-sm text-mint-primary font-medium'>({name})</span>
                    </div>
                </div>
                <div className='flex items-center justify-end gap-3'>
                    <Button className='bg-mint-primary px-4 py-2 h-fit flex items-center gap-2' onClick={onOpen}>
                        <TbShare3 className='text-white text-[18px]' />
                        <span className='text-white font-medium'>Share</span>
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ closeButton: "top-[12px] right-[14px]" }}>
                        {type == "tema" ? (
                            <ShareModal type='tema' temaId={props.temaId} id={id} hadits_name={name} hadits_arab={hadits_content} hadits_terjemahan={hadits_terjemahan} onClose={() => onClose} />
                        ) : type == "kitab" ? (
                            <ShareModal type='kitab' kitabId={props.kitabId} id={id} hadits_name={name} hadits_arab={hadits_content} hadits_terjemahan={hadits_terjemahan} onClose={() => onClose} />
                        ) : null}
                    </Modal>
                </div>
            </div>
        );
    } else {
        return (
            <div className='flex flex-col w-full py-[52px] gap-4 border-b-2 dark:border-zinc-700'>
                <div className='flex items-center gap-3'>
                    <Skeleton className='rounded-[8px] h-[32px] w-[32px]' />
                    <Skeleton className='text-[20px] font-semibold w-[132px] h-[30px] rounded-lg' />
                </div>
                <div className='flex flex-col w-full bg-black-secondary bg-opacity-10 p-4 rounded-[16px] gap-3'>
                    <div className='p-3 bg-white dark:bg-black-primary rounded-[12px] flex flex-col gap-1 items-end'>
                        <Skeleton className='text-end font-arab h-[38px] w-[100%] rounded-lg' />
                        <Skeleton className='text-end font-arab h-[38px] w-[90%] rounded-lg' />
                        <Skeleton className='text-end font-arab h-[38px] w-[50%] rounded-lg' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Skeleton className='w-[100px] h-[16px] rounded-lg' />
                        <div className='flex flex-col w-full gap-1'>
                            <Skeleton className='h-[20px] w-[95%] rounded-lg self-end' />
                            <Skeleton className='h-[20px] w-[90%] rounded-lg' />
                            <Skeleton className='h-[20px] w-[80%] rounded-lg' />
                        </div>
                        <Skeleton className='w-[72px] h-[16px] rounded-lg' />
                    </div>
                </div>
                <div className='flex items-center justify-end gap-3'>
                    <Skeleton className='h-[36px] w-[82px] rounded-lg' />
                </div>
            </div>
        );
    }
};

export default HaditsCard;
