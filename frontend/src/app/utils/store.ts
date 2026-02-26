"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";

type StoreState = {
    darkMode: boolean;
    changeMode: () => void;
};

// Buat store Zustand dengan nilai awal default
const useStore = create<StoreState>((set) => ({
    darkMode: false, // Nilai default sementara
    changeMode: () =>
        set((state) => {
            const newDarkMode = !state.darkMode;
            if (typeof window !== "undefined") {
                sessionStorage.setItem("darkMode", JSON.stringify(newDarkMode));
            }
            return { darkMode: newDarkMode };
        }),
}));

export const useDarkModeStore = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { darkMode, changeMode } = useStore();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedDarkMode = sessionStorage.getItem("darkMode");
            if (storedDarkMode !== null) {
                useStore.setState({ darkMode: JSON.parse(storedDarkMode) });
            }
            setIsHydrated(true);
        }
    }, []);

    // Return placeholder UI or component until hydration is complete
    if (!isHydrated) {
        return { darkMode: false, changeMode };
    }

    return { darkMode, changeMode };
};

export default useStore;
