'use client'

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "nextjs-toploader/app";
import { FC, useState } from "react";
import { TbSearch } from "react-icons/tb";

type SearchButtonProps = {
    onClick: () => void;
}

const SearchButton: FC<SearchButtonProps> = ({ onClick }) => {
    return (
        <Button className='bg-mint-primary p-0 min-w-0 h-fit text-white font-semibold text-[14px] px-[24px] py-[8px] rounded-[28px]' onClick={onClick}>
            Cari
        </Button>
    );
};

type SearchBarProps = {
    autoFocus?: boolean
}

const SearchBar: FC<SearchBarProps> = ({ autoFocus }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const router = useRouter();

    const handleSearch = (keyword: string): void => {
        if (keyword == '' || !keyword) {
            router.push('/')
        } else {
            router.push(`/search?keyword=${keyword}`)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSearch(searchValue);
        }
    };

    return (
        <Input
            type='text'
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Cari hadits berdasarkan isi hadits'
            classNames={{ base: "w-fit", inputWrapper: "m-0 p-0 min-h-0 h-fit w-full p-1 pl-4 border-2 border-[#98d6d6] rounded-[24px] w-full max-w-[512px] caret-black-primary dark:caret-white dark:border-[#026666] dark:bg-black-primary", input: "placeholder:text-black-secondary text-sm min-w-[204px] md:text-[14px] md:min-w-[242px]" }}
            endContent={<SearchButton onClick={() => handleSearch(searchValue)} />}
            startContent={<TbSearch className='text-mint-primary text-[24px] mr-2' />}
            autoFocus={autoFocus}
            required
        />
    );
};

export default SearchBar;
