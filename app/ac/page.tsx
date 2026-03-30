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
    return cardsParam
      .split(",")
      .map((v) => Number(v))
      .filter((v) => !Number.isNaN(v));
  }, [cardsParam]);

  const [openedCount, setOpenedCount] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCards.length === 0) return;

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
    setExpandedCard((prev) => (prev === index ? null : index));
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
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        Kartların Açıldı ✨
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "18px",
          color: "#ead6ff",
        }}
      >
        Açılan kart: {openedCount}/{selectedCards.length}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
          gap: "25px",
          alignItems: "start",
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
                    boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                    background: "black",
                  }}
                >
                  <img
                    src="/cards/back/card-back.jpeg"
                    alt="Kart Arkası"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
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
                    boxShadow: isOpen
                      ? "0 0 25px rgba(255,215,120,0.5), 0 0 60px rgba(180,100,255,0.4)"
                      : "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      padding: "3px",
                      borderRadius: "20px",
                      background:
                        "linear-gradient(135deg, gold, #ffb3ff, gold)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "14px",
                        overflow: "hidden",
                        position: "relative",
                        background: "#120b1d",
                      }}
                    >
                      <img
                        src={getCardImage(cardId)}
                        alt={`Kart ${cardId}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          transform: "scale(1.12)",
                          transformOrigin: "center center",
                          display: "block",
                        }}
                      />

                      {isOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "60%",
                            height: "100%",
                            background:
                              "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
                            transform: "skewX(-20deg)",
                            animation: "shine 1.2s forwards",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {expandedCard !== null && selectedCards[expandedCard] !== undefined && (
        <div
          onClick={() => setExpandedCard(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "min(92vw, 520px)",
              aspectRatio: "7/12",
              borderRadius: "24px",
              overflow: "hidden",
              border: "3px solid rgba(255,215,150,0.55)",
              boxShadow:
                "0 0 35px rgba(255,215,120,0.45), 0 0 70px rgba(180,100,255,0.35)",
              background:
                "linear-gradient(135deg, rgba(255,220,150,0.25), rgba(180,100,255,0.18))",
              padding: "4px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#120b1d",
              }}
            >
              <img
                src={getCardImage(selectedCards[expandedCard])}
                alt={`Kart ${selectedCards[expandedCard]}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "14px 24px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #b14cff, #7a2ad3)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 600,
            boxShadow: "0 0 18px rgba(176, 76, 255, 0.35)",
          }}
        >
          Baştan Başla
        </button>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 150%;
          }
        }
      `}</style>
    </main>
  );
}

export default function AcPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at center, #3a1466 0%, #14071f 40%, black 100%)",
            color: "white",
            fontFamily: "serif",
          }}
        >
          Yükleniyor...
        </div>
      }
    >
      <AcPageContent />
    </Suspense>
  );
}