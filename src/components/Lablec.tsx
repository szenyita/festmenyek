import Image from "next/image";

export default function Lablec() {
  return (
    <div className="flex px-[10vw] bg-gray-200">
      <div className="flex-1 flex flex-col gap-2 py-8">
        {/*LOGO*/}
        <div className="flex items-center justify-center gap-">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <p className="font-semibold text-2xl">Anonim Művészek</p>
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
        <h2 className="font-semibold">Népszerű Stílusok</h2>
        <p>Impresszionizmus</p>
        <p>Realizmus</p>
        <p>Fauvizmus</p>
        <p>Kubizmus</p>
      </div>
      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg-justify-between lg:items-center lg:py-8">
        <h2 className="font-semibold">Népszerű Stílusok</h2>
        <p>Impresszionizmus</p>
        <p>Realizmus</p>
        <p>Fauvizmus</p>
        <p>Kubizmus</p>
      </div>
      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg-justify-between lg:items-center lg:py-8">
        <h2 className="font-semibold">Festmény Méretek</h2>
        <p>40 cm x 60 cm</p>
        <p>50 cm x 60 cm</p>
        <p>60 cm x 90 cm</p>
        <p>90 cm x 120 cm</p>
      </div>
    </div>
  );
}
