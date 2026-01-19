import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

export function LanguageSlider() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center bg-zinc-900/50 border border-white/10 rounded-full p-1 relative w-[160px] h-9 select-none">
            {/* Slider track background indicator */}
            <div
                className={cn(
                    "absolute top-1 bottom-1 w-[76px] bg-primary rounded-full transition-all duration-300 ease-in-out z-0 shadow-lg shadow-primary/20",
                    currentLang === 'en' ? "left-1" : "left-[81px]"
                )}
            />

            {/* English Button */}
            <button
                onClick={() => changeLanguage('en')}
                className={cn(
                    "flex-1 text-[10px] font-black tracking-widest uppercase z-10 transition-colors duration-300",
                    currentLang === 'en' ? "text-black" : "text-white/40 hover:text-white/70"
                )}
            >
                ENGLISH
            </button>

            {/* Bahasa Button */}
            <button
                onClick={() => changeLanguage('id')}
                className={cn(
                    "flex-1 text-[10px] font-black tracking-widest uppercase z-10 transition-colors duration-300",
                    currentLang === 'id' ? "text-black" : "text-white/40 hover:text-white/70"
                )}
            >
                BAHASA
            </button>
        </div>
    );
}
