
import type { Lead } from  "@/types/lead";
interface LeadCardProps {
    lead: Lead;
    variant?: "row" | "card"; // List or Kanban view
    onClick?: (leadId: string) => void;
}


export function LeadCard({ lead, variant = "row", onClick }: LeadCardProps) {
const initials = lead.name.split(" ")
    .map((part: string) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatedEstimatedValue: string = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lead.estimatedValue);

const formatedLastContactAt: string = new Date(lead.lastContactAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// Para colocar o 3 hours ago, fazer o calculo da diferença do new Date(isoDate) e new Date()
    return(
        <div onClick={() => onClick?.(lead.id)}>
            <div>
                {/* Avatar */}
                <span>{initials}</span>
            </div>
            <div>
                {/* Lead Info */}
                <p>{lead.name}</p>
                <p>{lead.company}</p>
            </div>
            {/* Vai virar uma formatção */}
            <p>${formatedEstimatedValue}</p>
            <span>{lead.status}</span>
            <span>{lead.temperature}</span>
            <span>{formatedLastContactAt}</span>
        </div>
    )
}