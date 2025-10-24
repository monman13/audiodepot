"use client";
import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
  children: React.ReactNode;
  menu?: string[];       // e.g. ["File", "Edit", "View", "Help"]
  statusLeft?: string;   // e.g. "Ready"
  statusRight?: string;  // e.g. "ENG 12:00"
  className?: string;
};

export default function OsWindow({
  title,
  children,
  menu = ["File", "Edit", "View", "Help"],
  statusLeft = "Ready",
  statusRight = "ENG 12:00",
  className,
}: Props) {
  return (
    <section className={clsx("osw-window", className)}>
      {/* Titlebar */}
      <div className="osw-titlebar">
        <div className="osw-traffic">
          <span className="osw-dot osw-dot-green" />
          <span className="osw-dot osw-dot-yellow" />
          <span className="osw-dot osw-dot-red" />
        </div>
        <div className="osw-title" title={title}>{title}</div>
        <div className="osw-controls">
          <button className="osw-mini" aria-label="Minimize">_</button>
          <button className="osw-mini" aria-label="Maximize">▭</button>
          <button className="osw-mini" aria-label="Close">X</button>
        </div>
      </div>

      {/* Menubar */}
      <div className="osw-menubar">
        {menu.map((m) => (
          <button key={m} className="osw-menuitem">{m}</button>
        ))}
      </div>

      {/* Content */}
      <div className="osw-body">
        {children}
      </div>

      {/* Statusbar */}
      <div className="osw-status">
        <div className="osw-status-left">{statusLeft}</div>
        <div className="osw-status-right">{statusRight}</div>
      </div>
    </section>
  );
}
