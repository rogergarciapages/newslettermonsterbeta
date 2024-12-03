import { PropsWithChildren } from "react";

export default function TagLayout({ children }: PropsWithChildren) {
  return <div className="relative min-h-screen bg-white dark:bg-[#111827]">{children}</div>;
}