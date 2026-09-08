"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden bg-[#082c20] px-6 py-24 text-[#f1ead4] md:py-32"
      >
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#4f7f55]/20 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#bd7654]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-[#a8bd8f]">
              <Leaf size={18} />

              <p className="text-sm uppercase tracking-[0.3em]">
                Get Involved
              </p>
            </div>

            <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-tight md:text-7xl">
              Let&apos;s grow a greener campus together.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#bdc9bd]">
              Join a Green Campus activity, submit an environmental idea or
              report a problem such as water leakage, waste or unnecessary
              electricity use.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:college@example.com"
                className="group flex items-center gap-4 text-[#f1ead4]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a8bd8f] transition group-hover:bg-[#f1ead4] group-hover:text-[#082c20]">
                  <Mail size={20} />
                </span>

                <span>
                  <small className="block text-xs uppercase tracking-[0.2em] text-[#829d88]">
                    Email
                  </small>
                  college@example.com
                </span>
              </a>

              <a
                href="tel:+910000000000"
                className="group flex items-center gap-4 text-[#f1ead4]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a8bd8f] transition group-hover:bg-[#f1ead4] group-hover:text-[#082c20]">
                  <Phone size={20} />
                </span>

                <span>
                  <small className="block text-xs uppercase tracking-[0.2em] text-[#829d88]">
                    Phone
                  </small>
                  +91 00000 00000
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a8bd8f]">
                  <MapPin size={20} />
                </span>

                <span>
                  <small className="block text-xs uppercase tracking-[0.2em] text-[#829d88]">
                    Address
                  </small>
                  IHRD Government Polytechnic College, Kerala
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-9"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#a8bd8f]">
              Send a Message
            </p>

            <h3 className="mt-3 text-4xl font-semibold">
              Share your green idea
            </h3>

            {submitted && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#a8bd8f]/30 bg-[#a8bd8f]/10 p-4 text-[#dce8d5]">
                <CheckCircle2 size={21} />

                <p className="text-sm">
                  Your form was completed. Database saving will be added later.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-[#bdc9bd]">
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[#f1ead4] outline-none transition placeholder:text-[#6f8979] focus:border-[#a8bd8f]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-[#bdc9bd]">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[#f1ead4] outline-none transition placeholder:text-[#6f8979] focus:border-[#a8bd8f]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm text-[#bdc9bd]">
                  Message type
                </label>

                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-2xl border border-white/10 bg-[#0d3b2a] px-5 py-4 text-[#f1ead4] outline-none transition focus:border-[#a8bd8f]"
                >
                  <option>Submit a green idea</option>
                  <option>Join as a volunteer</option>
                  <option>Report waste</option>
                  <option>Report water leakage</option>
                  <option>Report energy wastage</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-[#bdc9bd]">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Write your message"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[#f1ead4] outline-none transition placeholder:text-[#6f8979] focus:border-[#a8bd8f]"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f1ead4] px-7 py-4 font-semibold text-[#082c20] transition hover:-translate-y-1 hover:bg-white"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#061f17] px-6 py-10 text-[#f1ead4]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1ead4] text-[#082c20]">
              <Leaf size={21} />
            </span>

            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
                Green Campus
              </p>

              <p className="text-xs text-[#829d88]">
                IHRD Government Polytechnic College
              </p>
            </div>
          </a>

          <div className="flex flex-wrap gap-5 text-sm text-[#bdc9bd]">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#initiatives" className="transition hover:text-white">
              Initiatives
            </a>
            <a href="#events" className="transition hover:text-white">
              Events
            </a>
            <a href="#gallery" className="transition hover:text-white">
              Gallery
            </a>
          </div>

          <p className="text-sm text-[#829d88]">
            © {new Date().getFullYear()} Green Campus
          </p>
        </div>
      </footer>
    </>
  );
}