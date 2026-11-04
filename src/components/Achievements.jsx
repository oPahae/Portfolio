import React from "react"
import { motion } from "framer-motion"
import { achievements } from "../utils/constants"
import { MapPin, GraduationCap } from "lucide-react"

const Achievement = ({ achievement, index }) => {
  const isLeft = index % 2 === 0

  const title = Array.isArray(achievement.title)
    ? achievement.title.join(" ")
    : achievement.title

  const AchievementCard = () => (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

      <h3 className="mb-2 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
        {title}
      </h3>

      <p className="mb-4 text-sm font-semibold text-purple-600">
        Program:{" "}
        <span className="font-medium text-slate-700">
          {achievement.filliere}
        </span>
      </p>

      <div className="mb-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

      <div className="mb-5 flex items-center gap-2">
        <MapPin className="h-5 w-5 shrink-0 text-purple-500" />
        <span className="font-semibold text-slate-800">
          {achievement.company_name}
        </span>
      </div>

      <ul className="space-y-3">
        {achievement.points?.map((point, idx) => (
          <li
            key={idx}
            className="relative border-l-2 border-purple-200 pl-4 text-sm leading-relaxed text-slate-600"
          >
            <span className="font-medium text-slate-700">
              {point.semester}
            </span>{" "}
            <span className="font-bold text-purple-600">
              {point.credential}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative mb-10 flex w-full items-start md:mb-16"
    >
      {/* Desktop timeline */}
      <div className="hidden w-full items-start md:flex">
        {isLeft ? (
          <>
            <div className="w-5/12 pr-8">
              <AchievementCard />
            </div>

            <div className="relative z-10 flex w-2/12 justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-1">
                {achievement.icon ? (
                  <img
                    src={achievement.icon}
                    alt={achievement.company_name}
                    className="h-full w-full rounded-full bg-white object-contain"
                  />
                ) : (
                  <GraduationCap className="h-7 w-7 text-white" />
                )}
              </div>
            </div>

            <div className="w-5/12 translate-y-4">
              <span className="text-lg font-semibold text-slate-500">
                {achievement.date || "Ongoing..."}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-5/12 translate-y-4 text-right">
              <span className="text-lg font-semibold text-slate-500">
                {achievement.date || "Ongoing..."}
              </span>
            </div>

            <div className="relative z-10 flex w-2/12 justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-1">
                {achievement.icon ? (
                  <img
                    src={achievement.icon}
                    alt={achievement.company_name}
                    className="h-full w-full rounded-full bg-white object-contain"
                  />
                ) : (
                  <GraduationCap className="h-7 w-7 text-white" />
                )}
              </div>
            </div>

            <div className="w-5/12 pl-8">
              <AchievementCard />
            </div>
          </>
        )}
      </div>

      {/* Mobile timeline */}
      <div className="flex w-full md:hidden">
        <div className="mr-4 flex flex-col items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-1">
            {achievement.icon ? (
              <img
                src={achievement.icon}
                alt={achievement.company_name}
                className="h-full w-full rounded-full bg-white object-contain"
              />
            ) : (
              <GraduationCap className="h-6 w-6 text-white" />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 pb-6">
          <span className="mb-3 block text-sm font-semibold text-slate-500">
            {achievement.date || "Ongoing..."}
          </span>

          <AchievementCard />
        </div>
      </div>
    </motion.div>
  )
}

const Achievements = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-20 text-slate-800 sm:px-6 lg:px-8">
      {/* Background halos */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-600">
            <GraduationCap className="h-4 w-4" />
            My Journey
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            My Academic
            <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            An overview of my university journey, the courses I have taken,
            and the milestones that have helped build my skills and expertise
            in the field of computer science.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop central line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-pink-400 via-purple-400 to-cyan-400 opacity-40 md:block" />

          {/* Mobile line */}
          <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-gradient-to-b from-pink-400 via-purple-400 to-cyan-400 opacity-40 md:hidden" />

          {achievements.map((achievement, index) => (
            <Achievement
              key={index}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements