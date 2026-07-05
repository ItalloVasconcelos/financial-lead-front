
import type { Lead } from  "@/types/lead";
import { formatInitials, formatEstimatedValue, formatLastContactAt } from "@/utils/format";
interface LeadCardProps {
    lead: Lead;
    variant?: "row" | "card"; // List or Kanban view
    onClick?: (leadId: string) => void;
}


export function LeadCard({ lead, variant = "row", onClick }: LeadCardProps) {
// Para colocar o 3 hours ago, fazer o calculo da diferença do new Date(isoDate) e new Date()
    return(
        <div onClick={() => onClick?.(lead.id)}>
            <div>
                {/* Avatar */}
                <span>{formatInitials(lead.name)}</span>
            </div>
            <div>
                {/* Lead Info */}
                <p>{lead.name}</p>
                <p>{lead.company}</p>
            </div>
            {/* Vai virar uma formatção */}
            <p>{formatEstimatedValue(lead.estimatedValue)}</p>
            <span>{lead.status}</span>
            <span>{lead.temperature}</span>
            <span>{formatLastContactAt(lead.lastContactAt)}</span>
        </div>
    )
}