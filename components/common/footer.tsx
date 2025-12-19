import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" bg-white flex justify-between h-18 items-center p-10 border border-[#F5F5F5]">
      <Image src="/Logo-petit.svg" height={40} width={40} alt="Logo petit" />
      <p className="text-xs text-[#565656]">© 2025 Kasa. All rights reserved</p>
    </footer>
  );
}
