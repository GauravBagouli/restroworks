"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/common-functions";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      honey: formData.get("honey"),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/contact-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        throw resData;
      }

      toast.success("Thank you! Your message has been sent.");
      form.reset();

    } catch (error) {
      const msg = handleApiError(error);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <main className="max-w-2xl mx-auto text-gray-800">

      <motion.div
        className="absolute inset-0 -z-10 rounded-xl opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #a960ee40, #ff333d40, #90e0ff40, #ffcb5740)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="bg-gray-50 shadow-xl rounded-lg p-10"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-4"
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-6"
          variants={itemVariants}
        >
          Have questions? Fill out the form and we’ll get back to you.
        </motion.p>

        <motion.form onSubmit={handleSubmit} className="space-y-4 p-8">
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium">Phone (optional)</label>
            <input
              type="text"
              name="phone"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </motion.div>

          <input
            type="text"
            name="honey"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </main>
  );
}
