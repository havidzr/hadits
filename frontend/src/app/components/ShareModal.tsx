"use client";

import { Button, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { FC, useState } from "react";
import { SiLine } from "react-icons/si";
import { TbBrandFacebook, TbBrandGmail, TbBrandMessenger, TbBrandPinterest, TbBrandTelegram, TbBrandWhatsapp, TbBrandX, TbCheck, TbCopy } from "react-icons/tb";
import { motion } from "framer-motion"

type ShareModalKitabProps = {
    type: "kitab";
    kitabId: string;
    id: number;
    hadits_name: string;
    hadits_arab: string;
    hadits_terjemahan: string;
    onClose: () => void;
};
type ShareModalTemaProps = {
    type: "tema";
    temaId: string;
    id: number;
    hadits_name: string;
    hadits_arab: string;
    hadits_terjemahan: string;
    onClose: () => void;
};

type ShareModalProps = ShareModalKitabProps | ShareModalTemaProps;

const ShareModal: FC<ShareModalProps> = (props) => {
    const { type, id, hadits_name, hadits_arab, hadits_terjemahan } = props;

    const URLHadits = `${window.location.origin}/${type}/${type === "kitab" ? props.kitabId : props.temaId}/hadits/${id}`

    const formatHadits = `\u202B${hadits_arab}

Artinya: ${hadits_terjemahan}

(${hadits_name})

🔗 Selengkapnya: ${URLHadits}

📲 Download Aplikasi Pesantren Digital disini: https://play.google.com/store/apps/details?id=com.wnapp.id1694615184829
`;

    const [isCopied, setIsCopied] = useState(false);

    const handleSalin = () => {
        navigator.clipboard
            .writeText(formatHadits)
            .then(() => {
                setIsCopied(true);
            })
            .catch((err) => {
                console.log(err);
                alert("Gagal menyalin teks ada kesalah!");
            });

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const shareTo = (platform: string) => {
        const encodedText = encodeURIComponent(formatHadits);
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer/sharer.php?u=${URLHadits}`;
                break;
            case "messenger":
                url = `fb-messenger://share/?link=${window.location.href}&app_id=312313`;
                break;
            case "twitter":
                url = `https://twitter.com/intent/tweet?text=${encodedText}`;
                break;
            case "whatsapp":
                url = `https://wa.me/?text=${encodedText}`;
                break;
            case "pinterest":
                url = `https://pinterest.com/pin/create/button/?url=${URLHadits}&description=${URLHadits}`;
                break;
            case "telegram":
                url = `https://telegram.me/share/url?url=${URLHadits}`;
                break;
            case "gmail":
                url = `mailto:?subject=${encodeURIComponent("Hadits")}&body=${encodedText}`;
                break;
            case "line":
                url = `https://social-plugins.line.me/lineit/share?url=${URLHadits}`;
                break;
            default:
                return;
        }

        window.open(url, "_blank");
    };

    return (
        <ModalContent className='max-w-[512px] w-fit dark:bg-black-primary dark:text-white mb-2'>
            <ModalHeader className='flex flex-col gap-1'>Share Hadits</ModalHeader>
            <ModalBody className='pb-8 grid grid-cols-3 gap-8 items-center justify-center w-fit px-8'>
                {/* SALIN CLIPBOARD */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-mint-secondary group hover:bg-mint-primary transition-colors' onClick={handleSalin}>
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                            {isCopied ? (
                                <motion.div key='check' initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.3 }} transition={{ duration: 0.5 }}>
                                    <TbCheck className='text-[32px] text-mint-primary group-hover:text-white' />
                                </motion.div>
                            ) : (
                                <motion.div key='copy' initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.3 }} transition={{ duration: 0.5 }}>
                                    <TbCopy className='text-[32px] text-mint-primary group-hover:text-white' />
                                </motion.div>
                            )}
                        </motion.div>
                    </Button>
                    <p className='text-sm font-medium text-mint-primary'>Salin Hadits</p>
                </div>
                {/* SHARE FACEBOOK */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#0865ff] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("facebook")}>
                        <TbBrandFacebook className='text-[32px] text-[#0865ff] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Facebook</p>
                </div>
                {/* SHARE MESSENGER */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#8f42f3] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("messenger")}>
                        <TbBrandMessenger className='text-[32px] text-[#8f42f3] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Messenger</p>
                </div>
                {/* SHARE TWITTER (X) */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#000] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("twitter")}>
                        <TbBrandX className='text-[32px] text-[#000] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Twitter (X)</p>
                </div>
                {/* SHARE WHATSAPP */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#4fce5d] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("whatsapp")}>
                        <TbBrandWhatsapp className='text-[32px] text-[#4fce5d] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>WhatsApp</p>
                </div>
                {/* SHARE PINTEREST */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#e60024] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("pinterest")}>
                        <TbBrandPinterest className='text-[32px] text-[#e60024] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Pinterest</p>
                </div>
                {/* SHARE TELEGRAM */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#0088cc] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("telegram")}>
                        <TbBrandTelegram className='text-[32px] text-[#0088cc] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Telegram</p>
                </div>
                {/* SHARE GMAIL */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#f2a60c] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("gmail")}>
                        <TbBrandGmail className='text-[32px] text-[#f2a60c] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Gmail</p>
                </div>
                {/* SHARE LINE */}
                <div className='flex flex-col gap-2 items-center'>
                    <Button className='min-w-0 p-0 h-[72px] w-[72px] rounded-full bg-[#08cb48] bg-opacity-10 group hover:bg-opacity-100 transition-colors' onClick={() => shareTo("line")}>
                        <SiLine className='text-[32px] text-[#08cb48] group-hover:text-white' />
                    </Button>
                    <p className='text-sm font-medium'>Line</p>
                </div>
            </ModalBody>
        </ModalContent>
    );
};

export default ShareModal;
