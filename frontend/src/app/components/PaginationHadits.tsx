"use client";

import { Pagination, Skeleton } from "@nextui-org/react";
import { FC } from "react";

type PaginationLoadingProps = {
    isLoading: true;
};

type PaginationMainProps = {
    isLoading: false;
    total: number;
    initialPage: number;
    action: (pagination: number) => void;
};

type PaginationProps = PaginationLoadingProps | PaginationMainProps;

const PaginationHadits: FC<PaginationProps> = (props) => {
    const { isLoading } = props;

    if (!isLoading) {
        const { total, initialPage, action } = props;

        return (
            <Pagination
                isCompact
                isDisabled={total > 0 ? false : true}
                onChange={(page: number) => action(page)}
                showControls
                total={total}
                initialPage={initialPage}
                classNames={{
                    item: "bg-black-primary dark:bg-white dark:bg-opacity-10 bg-opacity-10 font-semibold text-black-secondary min-w-0 w-[38px] h-[38px] md:w-[42px] md:h-[42px] text-xs md:text-sm",
                    cursor: "font-semibold bg-mint-primary  rounded-[12px] min-w-0 w-[38px] h-[38px] md:w-[42px] md:h-[42px] text-xs md:text-sm",
                    prev: "bg-black-primary dark:bg-white dark:bg-opacity-10 bg-opacity-10 data-[disabled=true]:text-black-secondary text-mint-primary text-[18px] min-w-0 w-[38px] h-[38px] md:w-[42px] md:h-[42px]",
                    next: "bg-black-primary dark:bg-white dark:bg-opacity-10 bg-opacity-10 data-[disabled=true]:text-black-secondary text-mint-primary text-[18px] min-w-0 w-[38px] h-[38px] md:w-[42px] md:h-[42px]",
                    ellipsis: "w-[24px] h-[24px] text-mint-primary ",
                }}
            />
        );
    } else {
        return <Skeleton className='h-[42px] rounded-[12px] w-full md:w-[378px]' />;
    }
};

export default PaginationHadits;
