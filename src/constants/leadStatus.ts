import type { LeadStatus, LeadTemperature } from "@/types/lead";

export const STATUS_LABELS: Record<LeadStatus, string> = {      
    "NEW": "New",
    "CONTACT_ATTEMPT": "Contact Attempt",
    "MEETING_SCHEDULED": "Meeting Scheduled",
    "PROPOSAL_SENT": "Proposal Sent",
    "WON": "Won",
    "LOST": "Lost"
};


export const TEMPERATURE_LABELS: Record<LeadTemperature, string> = {
    "COLD": "Cold",
    "WARM": "Warm",
    "HOT": "Hot"
};