"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { serviceIcons, CheckIcon, ArrowIcon } from "./Icons";
import {
  findProduct,
  formatGBP,
  priceFrom,
  serviceHours,
  PROPERTY_SIZES,
  PROPERTY_SIZE_QUOTE,
} from "@/lib/products";

type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  body: string;
  points: string[];
};

export default function ServiceBookingCard({
  service,
  index,
  expanded = false,
}: {
  service: Service;
  index: number;
  expanded?: boolean;
}) {
  const Icon = serviceIcons[service.icon];

  const product = findProduct(service.slug);
  const from = priceFrom(service.slug);

  const [open, setOpen] = useState(false);

  // Estimated-hours guide by property size (only for the cleaning services
  // that have an hours matrix). Purely informational — booking is not yet live.
  const hoursGuide = product?.variants?.length
    ? [...PROPERTY_SIZES, PROPERTY_SIZE_QUOTE]
        .map((s) => ({ label: s.label, hrs: serviceHours(service.slug, s.id) }))
        .filter((r) => r.hrs)
    : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-colors hover:border-bolt/40"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-bolt/0 blur-2xl transition-all duration-500 group-hover:bg-bolt/20" />
      <div className="absolute left-0 top-0 h-1 w-0 bg-bolt transition-all duration-500 group-hover:w-full" />

      <div className="relative flex items-center justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-bolt/10 text-bolt ring-1 ring-bolt/20 transition-colors group-hover:bg-bolt group-hover:text-white">
          {Icon && <Icon className="h-7 w-7" />}
        </span>
        <div className="text-right">
          {from != null ? (
            <p className="font-display text-2xl font-bold text-slate-900">
              From {formatGBP(from)}
            </p>
          ) : (
            <p className="font-display text-lg font-bold text-bolt">Ask us</p>
          )}
        </div>
      </div>

      <h3 className="relative mt-6 font-display text-xl font-bold text-slate-900">
        {service.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
        {expanded ? service.body : service.short}
      </p>

      <ul className="relative mt-5 space-y-2.5">
        {service.points.slice(0, expanded ? 6 : 4).map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bolt" />
            {point}
          </li>
        ))}
      </ul>

      {/* Actions — online booking is not live yet, so a click reveals a
          "to be confirmed" notice instead of a checkout flow. */}
      <div className="relative mt-6 pt-5">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-bolt px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
          >
            View this service
            <ArrowIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        )}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-bolt/20 bg-bolt/5 p-4">
                <span className="inline-flex items-center rounded-full bg-bolt px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  TBC
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  The full booking form is to be confirmed.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Online booking for this service is coming soon. In the
                  meantime, get in touch and our team will arrange everything
                  for you.
                </p>

                {hoursGuide.length > 0 && (
                  <div className="mt-4 border-t border-bolt/15 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Estimated cleaning time
                    </p>
                    <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                      {hoursGuide.map((r) => (
                        <li
                          key={r.label}
                          className="flex justify-between gap-2 text-xs text-slate-600"
                        >
                          <span>{r.label}</span>
                          <span className="font-medium text-slate-500">
                            {r.hrs}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-bolt px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] no-underline"
                >
                  Get in touch
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
