"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { FC } from "react";

type TabHomeProps = {
    currentKey: string;
    action: (key: any) => void;
};

const TabHome: FC<TabHomeProps> = ({ currentKey = "kitab", action }) => {
    return (
        <Tabs
            selectedKey={currentKey}
            onSelectionChange={action}
            classNames={{
                base: "!h-fit",
                tabList: "bg-mint-secondary p-1 rounded-full gap-0 md:p-2 md:gap-2 font-bold",
                tab: "rounded-none shadow-none px-4 py-2 rounded-full font-bold",
                cursor: "bg-mint-primary text-white shadow-none rounded-full font-bold dark:bg-mint-primary",
                tabContent: "font-medium group-data-[selected=true]:text-white text-xs md:text-sm font-bold",
            }}>
            <Tab key='kitab' title='Kitab' />
            <Tab key='tema' title='Tema' />
        </Tabs>
    );
};

export default TabHome;
