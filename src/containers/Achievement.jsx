"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-vertical-timeline-component/style.min.css";

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false }
);

export const Achievement = ({ achievement }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
        backdropFilter: "blur(16px)",
        border: "2px solid transparent",
        borderImage:
          "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3)) 1",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        color: "#fff",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(168, 85, 247, 0.4)",
      }}
      date={achievement.date || "En cours..."}
      dateClassName="text-gray-300"
      iconStyle={{
        background: "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
        boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={achievement.icon}
            alt={achievement.company_name}
            className="object-contain rounded-full"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-2xl font-bold mb-2">
          {Array.isArray(achievement.title)
            ? achievement.title.map((t, i) => <div key={i}>{t}</div>)
            : achievement.title}
        </h3>
        <div className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mb-5"></div>
      </div>

      <span className="text-white font-semibold">{achievement.company_name}</span>

      <ul className="mt-4 list-disc ml-5 space-y-3">
        {achievement.points.map((point, index) => (
          <li
            key={`achievement-point-${index}`}
            className="text-gray-300 text-base pl-1 tracking-wide leading-relaxed"
          >
            {point}
            {achievement.credential && (
              <div className="my-2">
                <a
                  href={achievement.credential[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {achievement.credential[index] || "En cours..."}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};
