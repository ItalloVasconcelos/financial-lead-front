import type { LeadStatus, LeadTemperature } from "@/types/lead";

export const STATUS_LABELS: Record<LeadStatus, string> = {      
    "NEW": "New",
    "CONTACT_ATTEMPT": "Contact Attempt",
    "MEETING_SCHEDULED": "Meeting Scheduled",
    "PROPOSAL_SENT": "Proposal Sent",
    "WON": "Won",
    "LOST": "Lost"
};

export const STATUS_STYLES: Record<LeadStatus, string> = {
  NEW: "bg-gray-100 text-gray-700",
  CONTACT_ATTEMPT: "bg-gray-100 text-gray-700",
  MEETING_SCHEDULED: "bg-brand-100 text-brand-800",
  PROPOSAL_SENT: "bg-brand-100 text-brand-800",
  WON: "bg-green-100 text-green-700",
  LOST: "bg-gray-200 text-gray-500",
};

export const TEMPERATURE_LABELS: Record<LeadTemperature, string> = {
    "COLD": "Cold",
    "WARM": "Warm",
    "HOT": "Hot"
};

export const TEMPERATURE_DOT_STYLES: Record<LeadTemperature, string> = {
  HOT: "bg-red-600",
  WARM: "bg-amber-600",
  COLD: "bg-gray-400",
};

export const TEMPERATURE_BADGE_STYLES: Record<LeadTemperature, string> = {
  HOT: "bg-red-50 text-red-700",
  WARM: "bg-amber-50 text-amber-700",
  COLD: "bg-gray-100 text-gray-500",
};