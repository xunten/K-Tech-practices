'use client';

import Image from "next/image";

export default function Hero() {
    return (
        <div className="p-6 mx-18 h-[300px]">
            <Image 
            src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/52/b1/52b1bb50bff9caa98ee302e4151a6fd1.png" 
            alt="Hero" className="w-full h-full object-cover rounded-lg " 
            width={1200}
            height={260}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
            priority={true}
            placeholder="empty" />
        </div>
    );
}