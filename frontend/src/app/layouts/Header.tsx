"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { TbMenuDeep, TbMoon, TbSearch, TbSun } from "react-icons/tb";
import SearchBar from "../components/SearchBar";
import { Button, Modal, ModalContent, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkModeStore } from "../utils/store";
import Image from "next/image";

const Header: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { darkMode, changeMode } = useDarkModeStore();

    const [isResponsiveMenuOpen, setIsResponsiveMenuOpen] = useState(false);

    return (
        <header className='fixed flex justify-center items-center py-3 px-4 xl:px-6 xl:py-4 w-full bg-white dark:bg-black-primary top-0 left-0 z-[10]'>
            <nav className='max-w-[1128px] w-full flex justify-between items-center z-[11]'>
                <div className='flex w-[86px] xl:hidden'>
                    <Button
                        className='bg-transparent min-w-0 w-fit h-fit p-2 rounded-full hover:bg-mint-secondary'
                        onClick={isResponsiveMenuOpen ? () => setIsResponsiveMenuOpen(false) : () => setIsResponsiveMenuOpen(true)}>
                        <TbMenuDeep className={`text-[26px] scale-x-[-1] ${isResponsiveMenuOpen ? "text-mint-primary" : "text-black-secondary"}`} />
                    </Button>
                </div>
                <Link href={"/"} className='text-mint-primary font-bold text-lg'>
                    <Image src={"/images/logo.png"} alt='logo' width={564} height={188} className='w-[132px] h-auto' />
                </Link>
                <div className='gap-3 items-center hidden xl:flex font-bold text-lg'>
                    <Link href={"/"} className='text-mint-primary py-2 px-4'>
                        Beranda
                    </Link>
                    <a
                        href='https://quran.tsirwah.com/'
                        target='_blank'
                        className='text-black-secondary py-2 px-4 hover:text-mint-primary dark:hover:text-mint-primary rounded-xl hover:bg-mint-secondary transition-colors'>
                        Quran
                    </a>
                    <a
                        href='https://tsirwah.com/'
                        target='_blank'
                        className='text-black-secondary py-2 px-4 hover:text-mint-primary dark:hover:text-mint-primary rounded-xl hover:bg-mint-secondary transition-colors'>
                        Tentang Kami
                    </a>
                </div>
                <div className='flex items-center gap-1 xl:gap-2'>
                    {/* SEARCH DESKTOP */}
                    <Popover placement='bottom'>
                        <PopoverTrigger>
                            <Button className='bg-transparent min-w-0 w-fit h-fit p-2 rounded-full group hover:bg-mint-secondary hidden xl:flex'>
                                <TbSearch className='text-[24px] text-black-secondary cursor-pointer group-hover:text-mint-primary transition-colors' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='bg-transparent h-fit w-fit p-0 mt-1 rounded-[24px]'>
                            <SearchBar autoFocus={true} />
                        </PopoverContent>
                    </Popover>
                    {/* SEARCH MOBILE */}
                    <div>
                        <Button className='bg-transparent min-w-0 w-fit h-fit p-2 rounded-full group hover:bg-mint-secondary flex xl:hidden' onClick={onOpen}>
                            <TbSearch className='text-[24px] text-black-secondary cursor-pointer group-hover:text-mint-primary transition-colors' />
                        </Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ closeButton: "hidden" }} placement='center' className='p-2'>
                            <ModalContent className='w-full flex-row justify-center items-center h-fit bg-transparent shadow-none'>
                                <SearchBar autoFocus={true} />
                            </ModalContent>
                        </Modal>
                    </div>
                    <Button className='bg-transparent min-w-0 w-[42px] h-[42px] rounded-full flex justify-center items-center hover:bg-mint-secondary' onClick={changeMode}>
                        <AnimatePresence>
                            {!darkMode ? (
                                <motion.div
                                    key='sun'
                                    initial={{ fontSize: 0, opacity: 0 }}
                                    animate={{ fontSize: "26px", opacity: 1 }}
                                    exit={{ fontSize: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='absolute'>
                                    <TbSun className='text-black-secondary cursor-pointer group-hover:text-mint-primary transition-colors' />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key='moon'
                                    initial={{ fontSize: 0, opacity: 0 }}
                                    animate={{ fontSize: "26px", opacity: 1 }}
                                    exit={{ fontSize: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}>
                                    <TbMoon className='text-black-secondary cursor-pointer group-hover:text-mint-primary transition-colors' />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </nav>
            {/* RESPONSIVE MENU */}
            <AnimatePresence>
                {isResponsiveMenuOpen && (
                    <motion.div
                        initial={{ height: 0, borderRadius: 0 }}
                        animate={{ height: "228px", borderEndEndRadius: "32px", borderEndStartRadius: "32px" }}
                        className='w-[100dvw] pt-[66px] absolute top-0 left-0 z-[10] rounded-b-[32px] overflow-hidden shadow-xl bg-white dark:bg-black-primary'
                        exit={{ height: 0 }}>
                        <div className='items-center flex flex-col pb-4 px-6 font-bold'>
                            <div className="w-full flex justify-center border-b-1 dark:border-zinc-700">
                                <Link href={"/"} className='text-mint-primary py-3 text-center w-fit'>
                                    Beranda
                                </Link>
                            </div>
                            <div className="w-full flex justify-center border-b-1 py-1 dark:border-zinc-700">
                                <a
                                    href='https://quran.tsirwah.com/'
                                    target='_blank'
                                    className='text-black-secondary hover:text-mint-primary dark:hover:text-mint-primary hover:bg-mint-secondary rounded-xl transition-colors py-2 px-4 text-center w-fit'>
                                    Quran
                                </a>
                            </div>
                            <div className="w-full flex justify-center py-1">
                                <a href='https://tsirwah.com/' target='_blank' className='text-black-secondary hover:text-mint-primary dark:hover:text-mint-primary hover:bg-mint-secondary rounded-xl transition-colors py-2 px-4 text-center w-fit'>
                                    Tentang Kami
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
