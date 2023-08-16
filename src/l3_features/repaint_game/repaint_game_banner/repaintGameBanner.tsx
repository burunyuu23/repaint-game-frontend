import React from 'react';
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import Link from 'next/link';

const RepaintGameBanner = () => {
    return (
        <Link href={"/game"}>
            <CarouselPaper>
                <div>
                    TheRepaintingGame
                </div>
            </CarouselPaper>
        </Link>
    );
};

export default RepaintGameBanner;