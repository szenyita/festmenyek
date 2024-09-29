import Image from "next/image";

export default function Lablec() {
  return (
    <div className="flex px-[10vw] bg-gray-200">
      <div className="flex-1 flex flex-col gap-2 py-8">
        {/*LOGO*/}
        <div className="flex items-center justify-center gap-">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <p className="font-semibold text-2xl">Poloshop</p>
        </div>
        {/*SOCIAL*/}
        <div className="flex items-center justify-center gap-2">
          <Image src="/facebook.svg" alt="facebook" width={24} height={24} />
          <Image src="/instagram.svg" alt="instagram" width={24} height={24} />
          <Image src="/tiktok.svg" alt="tiktok" width={24} height={24} />
        </div>
        {/*BIZTONSÁGOS VÁSÁRLÁS*/}
        <div className="flex items-center justify-center">
          <p>Biztonságos Vásárlás</p>
        </div>
        {/*ÜGYFÉLSZOLGÁLAT*/}
        <div className="flex items-center justify-center">
          <p>Ügyfélszolgálat</p>
        </div>
      </div>
      {/*NAGYOBB KIJELZŐK*/}
      <div className="hidden md:flex-1 md:flex md:flex-col md:justify-between md:items-center md:py-8 lg:hidden">
        <h2 className="font-semibold">Népszerű Kategóriák</h2>
        <p>Mintás Póló</p>
        <p>Kivágott Póló</p>
        <p>Piqué Póló</p>
        <p>Jersey Póló</p>
      </div>
      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg-justify-between lg:items-center lg:py-8">
        <h2 className="font-semibold">Népszerű Női Kategóriák</h2>
        <p>Piqué Póló</p>
        <p>Jersey Póló</p>
        <p>Ribbed Póló</p>
        <p>Henley Póló</p>
      </div>
      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg-justify-between lg:items-center lg:py-8">
        <h2 className="font-semibold">Népszerű Férfi Kategóriák</h2>
        <p>Mintás Póló</p>
        <p>Kivágott Póló</p>
        <p>Háromnegyedes Póló</p>
        <p>Rövid Ujjú Póló</p>
      </div>
    </div>
  );
}
