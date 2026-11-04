import { Users, MapPin, GraduationCap, UserRound } from 'lucide-react'
import { socials } from '@/utils/constants'

const Me = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-800">

      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-pink-200/40 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-200/40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/40 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-16">

        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Photo */}
          <div className="flex justify-center lg:col-span-5 lg:justify-start">

            <div className="group relative">

              {/* Gradient frame */}
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 opacity-30 blur-lg transition duration-500 group-hover:opacity-50" />

              <div className="relative rounded-[2rem] bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-[3px]">

                <div className="overflow-hidden rounded-[calc(2rem-3px)] bg-white p-1">

                  <img
                    src="/me.png"
                    alt="LAMRISSI Bahaa-eddine"
                    className="h-64 w-64 rounded-[calc(2rem-7px)] bg-slate-100 object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                  />

                </div>
              </div>

              {/* Photo decoration */}
              <div className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-100 bg-white text-purple-600 transition-transform duration-300 group-hover:-translate-y-1">
                <UserRound size={30} />
              </div>

            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 text-center lg:col-span-7 lg:text-left">

            {/* Header */}
            <div className="space-y-5">

              <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                <UserRound size={15} />
                About Me
              </span>

              <h1 className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-4xl">
                LAMRISSI Bahaa-eddine
              </h1>

              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 lg:mx-0" />

              <p className="text-sm font-medium tracking-wide text-slate-400">
                Full Stack Developer | Cloud & DevOps
              </p>

            </div>

            {/* Information badges */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">

              <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-purple-300">

                <GraduationCap className="h-4 w-4 shrink-0 text-purple-500" />

                <span>
                  Master's Student in Computer Systems & Networks
                </span>

              </div>

              <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-cyan-300">

                <MapPin className="h-4 w-4 shrink-0 text-cyan-500" />

                <span>
                  FST Settat, Morocco
                </span>

              </div>

            </div>

            {/* Description */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 text-left">

              <div className="absolute left-0 top-6 h-12 w-1 rounded-r-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500" />

              <p className="mx-auto max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
                Passionate about computer technologies and innovation, I specialize
                in Full Stack development, Cloud Computing, and DevOps practices.
                I love designing high-performance web and mobile applications,
                setting up cloud infrastructures, automating deployment processes,
                and leveraging containerization technologies. My goal is to build
                reliable, scalable solutions tailored to real-world needs.
              </p>

            </div>

            {/* Social networks */}
            <div className="space-y-5 border-t border-slate-200 pt-6">

              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 lg:justify-start">

                <Users className="h-4 w-4 text-purple-500" />

                <span>
                  Social Networks
                </span>

              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">

                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black font-bold transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 ${social.hover}`}
                  >

                    <social.icon className="h-4 w-4" />

                    {social.name}

                  </a>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Me