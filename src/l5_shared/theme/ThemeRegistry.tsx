"use client";

import {createTheme, CssBaseline, ThemeOptions, ThemeProvider} from "@mui/material";
import {NextAppDirEmotionCacheProvider} from "@/l5_shared/theme/EmotionCache";
import {Roboto} from "next/font/google";

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

const themeOptions: ThemeOptions = {
    typography: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 22,
    },
    palette: {
        background: {
            default: '#eeeeee'
        }
    },

}

const theme = createTheme(themeOptions);

export default function ThemeRegistry({children} : {children: React.ReactNode}) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui'}}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}