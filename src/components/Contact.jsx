import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { EarthCanvas } from "../containers/Earth";
import { Toast } from "../containers/Toast";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setToast({
        open: true,
        message: "Please fill in all fields before sending.",
        type: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setToast({
        open: true,
        message: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const subject = `Portfolio new message - ${form.name}`;

      const text = `
Name: ${form.name}
Email: ${form.email}

Message:
${form.message}
      `;

      const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h2 style="color: #9333ea;">New message from the portfolio</h2>

          <p><strong>Name:</strong> ${form.name}</p>
          <p><strong>Email:</strong> ${form.email}</p>

          <hr style="border: 1px solid #eee;" />

          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${form.message}</p>
        </div>
      `;

      const params = new URLSearchParams({
        email: "lam.bahae7@gmail.com",
        subject,
        text,
        html,
      });

      const response = await fetch(
        `https://pahae-utils.vercel.app/api/mail?${params.toString()}`
      );

      const data = await response.json();

      if (response.ok) {
        setToast({
          open: true,
          message: data.message || "Message sent successfully!",
          type: "success",
        });

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setToast({
          open: true,
          message: data.error || "An error occurred while sending the message.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error:", err);

      setToast({
        open: true,
        message: "Network error. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}

      <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-16 text-slate-800 sm:px-6 sm:py-20">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

              {/* Form Section */}
              <div className="space-y-8">
                {/* Header */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={slideIn("left", "tween", 0.2, 1)}
                >
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium tracking-wide text-purple-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                      LET'S STAY IN TOUCH
                    </span>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                      Get in touch
                      <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                        !
                      </span>
                    </h1>

                    <div className="h-1 w-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                  </div>
                </motion.div>

                <motion.p
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={slideIn("left", "tween", 0.2, 1)}
                  className="text-lg leading-relaxed text-slate-500"
                >
                  A question? A project? Feel free to reach out.
                  I'd be happy to chat with you!
                </motion.p>

                {/* Contact Form */}
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  id="contact"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={slideIn("left", "tween", 0.2, 1)}
                >
                  {/* Name */}
                  <motion.div
                    className="space-y-2"
                    variants={slideIn("left", "tween", 0.2, 1)}
                  >
                    <label
                      htmlFor="contact-name"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                      <User className="h-4 w-4 text-purple-500" />
                      Full Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-purple-400 focus:bg-white"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    variants={slideIn("left", "tween", 0.3, 1)}
                  >
                    <label
                      htmlFor="contact-email"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                      <Mail className="h-4 w-4 text-purple-500" />
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-purple-400 focus:bg-white"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    className="space-y-2"
                    variants={slideIn("left", "tween", 0.4, 1)}
                  >
                    <label
                      htmlFor="contact-message"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-purple-400 focus:bg-white"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-7 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={slideIn("left", "tween", 0.5, 1)}
                  >
                    <Send className="h-5 w-5" />
                    {loading ? "Sending..." : "Send"}
                  </motion.button>
                </motion.form>
              </div>

              {/* Earth Canvas Section */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={slideIn("right", "tween", 0.2, 1)}
              >
                <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-10 blur-2xl" />

                  <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                    <div className="h-full w-full overflow-hidden rounded-[calc(1.5rem-2px)] bg-slate-100">
                      <EarthCanvas />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;