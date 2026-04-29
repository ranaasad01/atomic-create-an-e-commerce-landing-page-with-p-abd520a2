"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-5">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">
          Get Exclusive Deals
        </h2>
        <p className="text-indigo-200 text-lg mb-8">
          Subscribe to our newsletter and be the first to know about new arrivals, flash sales, and member-only discounts.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full">
            <Check className="w-5 h-5 text-emerald-300" />
            You&apos;re subscribed! Check your inbox for a welcome gift.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition-all"
                required
              />
              {error && <p className="text-red-300 text-xs mt-1 text-left pl-4">{error}</p>}
            </div>
            <button
              type="submit"
              className="flex-shrink-0 bg-white text-indigo-700 font-semibold px-7 py-3.5 rounded-full hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-indigo-300 text-xs mt-4">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
