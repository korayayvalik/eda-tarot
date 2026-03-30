"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function getCardImage(cardId: number) {
  return `/cards/front/${cardId}.jpeg`;
}

function AcPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cardsParam = searchParams.get("cards");

  const selectedCards = useMemo(() => {
    if (!cardsParam) return [];
    return cardsParam.split(",").map(Number);
  }, [cardsParam]);

  const [openedCount, setOpenedCount] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setOpenedCount(i);
      if (i >= selectedCards.length) clearInterval(interval);
    }, 900);

    return () => clearInterval(interval);
  }, [selectedCards]);

  function toggleExpanded(index: number, isOpen: boolean) {
    if (!isOpen) return;

    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, #3a1466 0%, #14071f 40%, black 100%)",
        padding: "40px 20px",
        color: "white",
        fontFamily: "serif",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "42px" }}>
        Kartların Açıldı ✨
      </h1>

      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Açılan kart: {openedCount}/{selectedCards.length}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
          gap: "25px",
        }}
      >
        {selectedCards.map((cardId, index) => {
          const isOpen = index < openedCount;

          return (
            <div key={index} style={{ perspective: "1200px" }}>
              <div
                onClick={() => toggleExpanded(index, isOpen)}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "7/12",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.9s",
                  transform: isOpen
                    ? "rotateY(180deg) scale(1.05)"
                    : "rotateY(0deg)",
                  cursor: isOpen ? "pointer" : "default",
                }}
              >
                {/* BACK */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    overflow: "hidden",
                    backfaceVisibility: "hidden",
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <img
                    src="/cards/back/card-back.jpeg"
                    alt="Kart Arkası"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* FRONT */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    overflow: "hidden",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    border: "2px solid rgba(255,215,150,0.4)",
                  }}
                >
                  <img
                    src={getCardImage(cardId)}
                    alt={`Kart ${cardId}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN */}
      {expandedCard !== null && (
        <div
          onClick={() => setExpandedCard(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={getCardImage(selectedCards[expandedCard])}
            style={{
              width: "90vw",
              maxWidth: "500px",
              borderRadius: "20px",
            }}
          />
        </div>
      )}
    </main>
  );
}

export default function AcPage() {
  return (
    <Suspense fallback={<div style={{ color: "white" }}>Yükleniyor...</div>}>
      <AcPageContent />
    </Suspense>
  );
}