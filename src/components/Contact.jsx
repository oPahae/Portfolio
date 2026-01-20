import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Mail, User, MessageSquare, Send } from 'lucide-react';
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
    const { target } = e;
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setToast({
        open: true,
        message: "Veuillez remplir tous les champs avant d'envoyer.",
        type: "error",
      });
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setToast({
        open: true,
        message: "Veuillez entrer une adresse email valide.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/addMsg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setToast({
          open: true,
          message: data.message || "Message envoyé avec succès!",
          type: "success",
        });

        // Réinitialiser le formulaire
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setToast({
          open: true,
          message: data.error || "Erreur lors de l'envoi du message.",
          type: "error",
        });
      }
    } catch (err) {
      console.error('Erreur:', err);
      setToast({
        open: true,
        message: "Erreur réseau. Veuillez réessayer plus tard.",
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
      <div className="bg-black/80 backdrop-blur-sm min-h-screen text-white flex items-center justify-center md:px-6 md:py-20 relative overflow-hidden">
        <div className="max-w-6xl w-full relative z-10">
          <div className="relative overflow-hidden rounded-3xl p-[2px]">
            <div className="rounded-3xl p-8 sm:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Form Section */}
                <div className="space-y-8">
                  {/* Header */}
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={slideIn('left', 'tween', 0.2, 1)}
                  >
                    <div className="space-y-4">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
                        Contactez-moi !
                      </h1>
                      <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
                    </div>
                  </motion.div>

                  <motion.p
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={slideIn('left', 'tween', 0.2, 1)}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    Une question ? Un projet ? N'hésitez pas à me contacter. Je serais ravi d'échanger avec vous !
                  </motion.p>

                  {/* Form */}
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    id="contact"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={slideIn('left', 'tween', 0.2, 1)}
                  >
                    <motion.div
                      className="space-y-2"
                      variants={slideIn('left', 'tween', 0.2, 1)}
                    >
                      <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <User className="w-4 h-4" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="w-full bg-gray-900 text-gray-300 px-4 py-3 rounded-lg outline-none border border-transparent focus:border-purple-500 transition-all duration-300 placeholder:text-gray-600"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={slideIn('left', 'tween', 0.3, 1)}
                    >
                      <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <Mail className="w-4 h-4" />
                        Adresse Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="vous@exemple.com"
                        className="w-full bg-gray-900 text-gray-300 px-4 py-3 rounded-lg outline-none border border-transparent focus:border-purple-500 transition-all duration-300 placeholder:text-gray-600"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={slideIn('left', 'tween', 0.4, 1)}
                    >
                      <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <MessageSquare className="w-4 h-4" />
                        Votre Message
                      </label>
                      <textarea
                        rows={5}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Parlez-moi de votre projet..."
                        className="w-full bg-gray-900 text-gray-300 px-4 py-3 rounded-lg outline-none border border-transparent focus:border-purple-500 transition-all duration-300 resize-none placeholder:text-gray-600"
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold transform transition-transform duration-300 hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={slideIn('left', 'tween', 0.5, 1)}
                    >
                      <Send className="w-5 h-5" />
                      {loading ? "Envoi en cours..." : "Envoyer"}
                    </motion.button>
                  </motion.form>
                </div>

                {/* Earth Canvas Section */}
                <motion.div
                  className="flex justify-center lg:justify-end"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={slideIn('right', 'tween', 0.2, 1)}
                >
                  <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-20"></div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full bg-black/80 rounded-3xl overflow-hidden">
                        <EarthCanvas />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;