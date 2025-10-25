"use client";
import React from "react";

type Props = {
  title: string;
  statusLeft?: string;
  statusRight?: string;
  children?: React.ReactNode;
};

export default function OsWindow({ title, statusLeft = "", statusRight = "", children }: Props) {
  return (
    <section className="card">
      {/* Title bar */}
      <div className="header-brand rounded-t-[15px] px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.01em]">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-[12px] opacity-90">
            {statusLeft && <span className="pill bg-white/10 border-white/20 text-white/90">{statusLeft}</span>}
            {statusRight && <span className="pill bg-white/10 border-white/20 text-white/90">{statusRight}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
}