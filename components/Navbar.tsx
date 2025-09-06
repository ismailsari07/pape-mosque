"use client";

import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-evenly items-center p-6 text-lg">
      <a href="#">Logo</a>

      <div className="flex items-center gap-4">
        <a href="#">Dernegimiz</a>
        <a href="">Hizmetlerimiz</a>
        <a href="">Bagis</a>
        <a href="">Faydali LInkler</a>
      </div>

      <Button>Support Us ❤️</Button>
    </nav>
  );
}
