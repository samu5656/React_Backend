import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/motion.jsx";
import { Spark, Arrow } from "../components/icons.jsx";
import { contact } from "../data.js";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 3200);
  }

  const fieldCls =
    "rounded-[var(--r)] border border-[var(--hair-dark)] bg-white/[0.03] px-4 py-[14px] text-[15px] text-on-dark transition-[border-color,background] duration-300 placeholder:text-[#5b676d] focus:border-accent focus:bg-white/[0.05] focus:outline-none";
  const labelCls =
    "mono text-[11px] uppercase tracking-[0.14em] text-on-dark-mut";

  return (
    <section
      id="contact"
      className="section on-dark bg-ink text-center text-on-dark"
    >
      <div className="wrap">
        <Reveal>
          <Spark className="mx-auto mb-[26px] h-[26px] w-[26px] animate-spin-slow" />
          <span className="eyebrow flex justify-center">Connect with us</span>
          <h2 className="h2 mx-auto mt-[22px] max-w-[18ch]">
            Bring precision feeding to your farm.
          </h2>
          <p className="lead mx-auto mt-[22px] text-center">
            Tell us about your ponds and we'll help you spec the right deployment.
          </p>
        </Reveal>

        <div className="mt-[clamp(40px,6vh,72px)] grid grid-cols-1 gap-[clamp(36px,6vw,90px)] text-left lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-[26px]">
            {[
              { k: "Email", v: <a href={`mailto:${contact.email}`} className="hover:text-accent">{contact.email}</a> },
              { k: "Phone", v: <a href={contact.phoneHref} className="hover:text-accent">{contact.phone}</a> },
              { k: "Location", v: contact.location },
            ].map((item) => (
              <div key={item.k}>
                <div className="mono text-[11px] uppercase tracking-[0.18em] text-on-dark-mut">
                  {item.k}
                </div>
                <div className="mt-[6px] text-[clamp(18px,2vw,22px)] font-normal text-on-dark">
                  {item.v}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-[18px] sm:grid-cols-2"
            >
              <div className="flex flex-col gap-[9px]">
                <label htmlFor="f-name" className={labelCls}>Name</label>
                <input id="f-name" name="name" type="text" placeholder="Your name" required className={fieldCls} />
              </div>
              <div className="flex flex-col gap-[9px]">
                <label htmlFor="f-email" className={labelCls}>Email</label>
                <input id="f-email" name="email" type="email" placeholder="you@farm.com" required className={fieldCls} />
              </div>
              <div className="flex flex-col gap-[9px] sm:col-span-2">
                <label htmlFor="f-msg" className={labelCls}>Message</label>
                <textarea id="f-msg" name="message" placeholder="Number of ponds, species, current feeding setup…" className={`${fieldCls} min-h-[120px] resize-y`} />
              </div>
              <div className="mt-[6px] flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                <p className="max-w-[38ch] text-[12.5px] text-on-dark-mut">
                  We'll get back to you within two business days.
                </p>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="btn btn--primary"
                  style={sent ? { pointerEvents: "none" } : undefined}
                >
                  {sent ? (
                    "Thank you — message sent ✓"
                  ) : (
                    <>
                      Send enquiry <Arrow />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
