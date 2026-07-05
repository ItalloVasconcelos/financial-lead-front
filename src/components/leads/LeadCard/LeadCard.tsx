import type { Lead } from "@/types/lead";
import { formatEstimatedValue, formatInitials, formatLastContactAt } from "@/utils/format";
import {
  STATUS_LABELS,
  STATUS_STYLES,
  TEMPERATURE_LABELS,
  TEMPERATURE_DOT_STYLES,
} from "@/constants/leadStatus";

interface LeadCardProps {
  lead: Lead;
  variant?: "row" | "card";
  onClick?: (leadId: string) => void;
}

export function LeadCard({ lead, variant = "row", onClick }: LeadCardProps) {
  const isRow = variant === "row";

  return (
    <div
      onClick={() => onClick?.(lead.id)}
      className={`
        flex items-center bg-white border border-gray-200 rounded-lg
        p-4 gap-4 cursor-pointer transition-colors hover:border-brand-300
        ${isRow ? "flex-row" : "flex-col items-start"}
      `}
    >
      {/* Avatar + identidade */}
      <div className={`flex items-center gap-3 ${isRow ? "flex-1 min-w-0" : "w-full"}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
          {formatInitials(lead.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{lead.name}</p>
          <p className="truncate text-sm text-gray-500">{lead.company}</p>
        </div>
      </div>

      {/* Valor + status */}
      <div className={`flex items-center gap-3 ${isRow ? "" : "w-full justify-between mt-2"}`}>
        <span className="text-sm font-bold text-gray-900">
          {formatEstimatedValue(lead.estimatedValue)}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[lead.status]}`}
        >
          {STATUS_LABELS[lead.status]}
        </span>
      </div>

      {/* Temperatura */}
      <div className={`flex items-center gap-1.5 ${isRow ? "" : "w-full mt-2"}`}>
        <span className={`h-2 w-2 rounded-full ${TEMPERATURE_DOT_STYLES[lead.temperature]}`} />
        <span className="text-xs font-medium text-gray-600">
          {TEMPERATURE_LABELS[lead.temperature]}
        </span>
      </div>

      {/* Último contato */}
      <span className={`text-xs text-gray-400 ${isRow ? "ml-auto shrink-0" : "w-full mt-2"}`}>
        {formatLastContactAt(lead.lastContactAt)}
      </span>
    </div>
  );
}