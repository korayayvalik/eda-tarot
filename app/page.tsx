"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main className="home-page">
      <div className="home-overlay" />

      <div className="home-content">
        <p className="home-welcome">Hoş geldin Eda ✨</p>

        <h1 className="home-title">Eda’nın Tarot Dünyası</h1>

        <p className="home-text">
          Bu dünya, kartların gizemine olan merakın, sezgilerin ve onlara verdiğin
          anlam için hazırlandı.
        </p>

        <p className="home-text">
          Tarot senin için sadece kartlardan ibaret değil; bazen bir işaret, bazen
          bir his, bazen de iç sesinle konuşmanın en güzel yolu.
        </p>

        <p className="home-text">
          Bu yüzden sana ait, sana özel bir alan olsun istedim. İstediğin zaman
          gelip kartlarını seçebileceğin, kendi destenle kendi yolculuğuna
          çıkabileceğin bir yer.
        </p>

        <p className="home-text home-text-last">
          Burada her seçim sana ait. Şimdi, kartların seni nereye çağırdığını
          görme zamanı.
        </p>

        <p className="home-question">Kaç kart çekmek istersin?</p>

        <div className="home-card-counts">
          {[3, 5, 7].map((num) => (
            <button
              key={num}
              onClick={() => setSelected(num)}
              className={`count-btn ${selected === num ? "active" : ""}`}
            >
              {num} Kart
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => router.push(`/fal?count=${selected}`)}
          className={`start-btn ${selected ? "enabled" : ""}`}
        >
          Tarot Falıma Bak
        </button>
      </div>
    </main>
  );
}