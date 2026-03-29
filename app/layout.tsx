"use client";

import "./globals.css";
import { useEffect, useRef } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/music/bg.mp3");
    audio.loop = true;
    audio.volume = 0.4;

    audioRef.current = audio;

    const startMusic = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", startMusic);
    };

    // 🔥 kullanıcı ilk tıklayınca başlar (browser kuralı)
    document.addEventListener("click", startMusic);

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}