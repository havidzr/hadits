import Image from "next/image";
import { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className='flex justify-center px-6 py-[32px] bg-mint-primary text-white bottom-[100%]'>
            <div className='max-w-[1128px] w-full flex flex-col justify-between items-center'>
                <div className='w-full flex pb-8 border-b-1 border-[#0000002c] gap-10 flex-col justify-center items-center md:items-center md:flex-row md:justify-between'>
                    <div className='flex flex-col gap-1 w-fit items-center md:items-start'>
                        <Image src={"/images/logo_white.png"} alt='logo' width={564} height={188} className='w-[132px] drop-shadow-sm' />
                        <p className='font-medium text-base opacity-70'>
                            Website kumpulan hadits - hadits Rasulullah
                        </p>
                    </div>
                    <div className='flex flex-col gap-3 col-span-2 items-center md:items-start'>
                        <p className='text-base font-semibold'>Unduh Aplikasi Kami</p>
                        <a href='https://play.google.com/store/apps/details?id=com.wnapp.id1694615184829' target='_blank'>
                            <Image src={"/images/playstore.png"} width={1200} height={356} alt='Playstore' className='w-[182px] h-auto'></Image>
                        </a>
                    </div>
                </div>
                <a href="https://tsirwah.com/" className='font-medium pt-8 text-base'>© 2024 Tsirwah Indonesia. All Right Reserved.</a>
            </div>
        </footer>
    );
};

export default Footer;
