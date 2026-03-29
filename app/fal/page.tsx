"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function shuffleArray<T>(array: T[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countParam = searchParams.get("count");
  const targetCount = Number(countParam) || 3;

  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const cards = useMemo(() => {
    const baseCards = Array.from({ length: 78 }, (_, i) => i + 1);
    return shuffleArray(baseCards);
  }, []);

  function toggleCard(cardId: number) {
    const isSelected = selectedCards.includes(cardId);

    if (isSelected) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
      return;
    }

    if (selectedCards.length >= targetCount) {
      return;
    }

    setSelectedCards([...selectedCards, cardId]);
  }

  function handleOpenReading() {
    if (selectedCards.length !== targetCount) return;

    const selectedQuery = selectedCards.join(",");
    router.push(`/ac?count=${targetCount}&cards=${selectedQuery}`);
  }

  const isReady = selectedCards.length === targetCount;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, rgba(120,70,180,0.18) 0%, rgba(35,15,55,1) 35%, rgba(0,0,0,1) 100%)",
        color: "white",
        padding: "30px 20px 150px",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px",
            color: "#f8eaff",
            textShadow: "0 0 18px rgba(210,160,255,0.25)",
          }}
        >
          Kartlarını Seç
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#e4cfff",
            marginBottom: "30px",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          İçinden gelen kartları seç. Seçimlerin tamamlandığında kartlarını
          açacağız.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "14px",
          }}
        >
          {cards.map((cardId) => {
            const isSelected = selectedCards.includes(cardId);

            return (
              <button
                key={cardId}
                onClick={() => toggleCard(cardId)}
                style={{
                  position: "relative",
                  height: "140px",
                  borderRadius: "14px",
                  border: isSelected
                    ? "3px solid #ffd6ff"
                    : "1px solid rgba(255,255,255,0.16)",
                  background: "black",
                  cursor: "pointer",
                  boxShadow: isSelected
                    ? "0 0 26px rgba(214, 122, 255, 0.95), 0 0 50px rgba(180, 80, 255, 0.45)"
                    : "0 0 8px rgba(0,0,0,0.25)",
                  overflow: "hidden",
                  padding: 0,
                  transform: isSelected
                    ? "translateY(-6px) scale(1.05)"
                    : "scale(1)",
                  transition: "all 0.22s ease",
                }}
              >
                <img
                  src="/cards/back/card-back.jpeg"
                  alt="Tarot Kartı"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: isSelected
                      ? "brightness(1.15) saturate(1.08)"
                      : "brightness(0.95)",
                    transition: "all 0.22s ease",
                  }}
                />

                {isSelected && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(180,80,255,0.18))",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "26px",
                        height: "26px",
                        borderRadius: "999px",
                        background: "rgba(130, 35, 180, 0.95)",
                        border: "2px solid #f4d9ff",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                        fontWeight: "bold",
                        boxShadow: "0 0 12px rgba(220,150,255,0.8)",
                      }}
                    >
                      ✓
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: "20px",
          transform: "translateX(-50%)",
          background: "rgba(10,10,14,0.96)",
          border: "1px solid rgba(231,198,255,0.25)",
          borderRadius: "22px",
          padding: "16px 20px",
          minWidth: "280px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(120, 50, 200, 0.25)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            color: "#f3dcff",
            marginBottom: "4px",
          }}
        >
          {selectedCards.length}/{targetCount}
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#cdb7df",
            marginBottom: "14px",
          }}
        >
          Kart seçildi
        </div>

        <button
          onClick={handleOpenReading}
          disabled={!isReady}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "14px",
            border: isReady
              ? "1px solid rgba(255,255,255,0.25)"
              : "1px solid rgba(255,255,255,0.08)",
            background: isReady
              ? "linear-gradient(135deg, #b14cff, #7a2ad3)"
              : "rgba(120,120,120,0.35)",
            color: "white",
            fontSize: "17px",
            fontWeight: 600,
            cursor: isReady ? "pointer" : "not-allowed",
            boxShadow: isReady
              ? "0 0 18px rgba(176, 76, 255, 0.35)"
              : "none",
            transition: "all 0.2s ease",
          }}
        >
          Tarot Falıma Bak
        </button>
      </div>
    </main>
  );
}