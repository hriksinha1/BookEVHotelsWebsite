import { CheckCircle2, Clock, XCircle, HelpCircle, Zap, Building2 } from "lucide-react";
import type { ChargerAccess } from "../data/hotels";

export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 bg-brand-50 text-brand-800 border border-brand-200 rounded-full font-semibold ${compact ? "px-2.5 py-0.5 text-[12px] leading-[18px]" : "px-3 py-1 text-[13px] leading-[20px]"}`}>
      <CheckCircle2 size={compact ? 12 : 14} className="text-brand-700 shrink-0" />
      Verified EV Charger
    </span>
  );
}

export function AccessChip({ access, compact = false }: { access: ChargerAccess; compact?: boolean }) {
  if (access === "Public") {
    return (
      <span className={`inline-flex items-center gap-1.5 bg-brand-50 text-brand-800 rounded-full font-semibold ${compact ? "px-2.5 py-0.5 text-[12px] leading-[18px]" : "px-3 py-1 text-[13px] leading-[20px]"}`}>
        <Zap size={compact ? 11 : 13} className="text-brand-700 shrink-0" />
        Public
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 bg-info-bg text-info-text rounded-full font-semibold ${compact ? "px-2.5 py-0.5 text-[12px] leading-[18px]" : "px-3 py-1 text-[13px] leading-[20px]"}`}>
      <Building2 size={compact ? 11 : 13} className="text-info-fill shrink-0" />
      Guest Only
    </span>
  );
}

export function ChargerSpecLine({
  acDc,
  powerKw,
  connector,
  guns,
  compact = false,
}: {
  acDc: string;
  powerKw: number | null;
  connector: string;
  guns: number | null;
  compact?: boolean;
}) {
  const parts: string[] = [];
  if (connector && connector !== "Not confirmed") parts.push(connector);
  parts.push(acDc);
  if (powerKw) parts.push(`${powerKw} kW`);
  else parts.push("Power not confirmed");
  if (guns) parts.push(`${guns} ${guns === 1 ? "charger" : "chargers"}`);

  return (
    <span className={`font-medium text-neutral-700 tabular-nums ${compact ? "text-[13px]" : "text-[14px] leading-[20px]"}`}>
      {parts.join(" · ")}
    </span>
  );
}
