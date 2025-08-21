"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/common-functions";

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

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-gray-800 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 mb-6">
        Have questions? Fill out the form and we’ll get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 p-8">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone (optional)</label>
          <input
            type="text"
            name="phone"
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <input
          type="text"
          name="honey"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* {statusObj && statusObj.status && (
        <p
          className={`mt-6 text-center font-medium ${statusObj.status === "success" ? "text-green-500" : "text-red-500"}`}
        >
          {statusObj.message}
        </p>
      )} */}
    </main>
  );
}
