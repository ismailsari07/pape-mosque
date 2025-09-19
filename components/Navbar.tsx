"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, PanelLeft } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between md:justify-evenly items-center p-6 text-lg">
      <Link href="/">Logo</Link>

      <div className="hidden md:flex items-center gap-4">
        <Link href={"/about"}>Dernegimiz</Link>
        <Link href={"/service"}>Hizmetlerimiz</Link>
        <Link href={"/donation"}>Bagis</Link>
        <Link href={"/contact"}>Iletisim</Link>
      </div>

      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <PanelLeft size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Hızlı Erişim</SheetTitle>
              <SheetDescription>
                Tüm sayfalarımıza kolayca ulaşmak için menüyü kullanın.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col items-center gap-4">
              <SheetClose asChild>
                <Link href={"/about"}>Dernegimiz</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/service"}>Hizmetlerimiz</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/donation"}>Bagis</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/contact"}>Iletisim</Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Link href={"/donation"} className="hidden md:block">
        <Button className="max-md:text-sm">
          Destekte Bulunun <ArrowRight size={16} />
        </Button>
      </Link>
    </nav>
  );
}
