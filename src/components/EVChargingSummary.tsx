import { CheckCircle2, HelpCircle, Zap } from "lucide-react";
import type { Charger } from "../data/hotels";
import { Heading } from "./ui";

function valueOrUnknown(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "Not confirmed") return "Not confirmed";
  return String(value);
}

export default function EVChargingSummary({
  chargers,
  title = "EV charging",
  compact = false,
}: {
  chargers: Charger[];
  title?: string;
  compact?: boolean;
}) {
  const charger = chargers[0];
  if (!charger) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
          <HelpCircle size={16} /> Charging details not confirmed
        </div>
      </div>
    );
  }

  const details = [
    { label: "Access", value: charger.access },
    { label: "Power", value: charger.powerKw ? `${charger.powerKw} kW` : "Not confirmed" },
    { label: "Type", value: charger.acDc },
    { label: "Connector", value: valueOrUnknown(charger.connector) },
    { label: "Fee", value: valueOrUnknown(charger.fee) },
    {
      label: "App required",
      value: charger.appRequired === null ? "Not confirmed" : charger.appRequired ? "Yes" : "No",
    },
  ];

  return (
    <div className={`rounded-2xl border border-brand-200 bg-brand-50 ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{title}</p>
          <Heading level={3} className={`${compact ? "mt-1 text-base" : "mt-2 text-lg"} font-semibold text-neutral-950`}>
            {charger.powerKw ? `${charger.powerKw} kW ${charger.acDc}` : `${charger.acDc} charger`}
          </Heading>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-800">
          <CheckCircle2 size={14} className="text-brand-700" /> Verified
        </span>
      </div>
      <div className={`mt-4 grid ${compact ? "grid-cols-2 gap-3" : "grid-cols-2 gap-4 sm:grid-cols-3"}`}>
        {details.map(detail => (
          <div key={detail.label}>
            <p className="text-xs text-neutral-600">{detail.label}</p>
            <p className="mt-1 text-sm font-semibold text-neutral-950">{detail.value}</p>
          </div>
        ))}
      </div>
      {charger.notes && (
        <p className="mt-4 flex items-start gap-2 border-t border-brand-200 pt-3 text-sm text-neutral-700">
          <Zap size={14} className="mt-1 shrink-0 text-brand-700" />
          {charger.notes}
        </p>
      )}
    </div>
  );
}
