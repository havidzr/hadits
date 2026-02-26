import { FC, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <main className='flex flex-col min-h-[100dvh] text-black-primary dark:bg-black-primary dark:text-white pt-[68px] xl:pt-[76px]'>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default MainLayout;
