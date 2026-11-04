import { Quote, Linkedin } from "lucide-react";
import { feedbacks } from "../utils/constants";

const Feedbacks = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-20 text-slate-800 sm:px-6">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium tracking-wide text-purple-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            RETOURS D'EXPÉRIENCE
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Témoignages
            <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              & collaborations
            </span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Découvrez les retours des professionnels avec lesquels
            j'ai eu l'opportunité de collaborer et de partager des
            expériences enrichissantes.
          </p>
        </div>

        {/* Feedbacks Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback, index) => (
            <article
              key={index}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-purple-300"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Quote Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50">
                <Quote className="h-6 w-6 text-purple-500" />
              </div>

              {/* Feedback Text */}
              <p className="mb-8 flex-grow text-base leading-relaxed text-slate-600">
                "{feedback.text}"
              </p>

              {/* Author Info */}
              <div className="mt-auto border-t border-dashed border-slate-200 pt-5">
                <div className="mb-5 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-30 blur-md" />
                    <img
                      src={feedback.image}
                      alt={feedback.name}
                      className="relative h-14 w-14 rounded-full border-2 border-white object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-grow">
                    <h3 className="truncate text-lg font-semibold text-slate-900">
                      {feedback.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {feedback.description}
                    </p>
                  </div>
                </div>

                {/* LinkedIn Button */}
                {feedback.linkedin ? (
                  <a
                    href={feedback.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Linkedin className="h-4 w-4" />
                    Voir le profil
                  </a>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-400">
                    <Linkedin className="h-4 w-4" />
                    Profil indisponible
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;