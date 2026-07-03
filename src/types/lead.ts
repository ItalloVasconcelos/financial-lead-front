 export type LeadStatus = 
| "NEW" | "CONTACT_ATTEMPT" | "MEETING_SCHEDULED" | "PROPOSAL_SENT" | "WON" | "LOST"

 export type LeadTemperature = "COLD" | "WARM" | "HOT";

 export interface Lead {
    id: string;
    name: string;
    role: string;
    company: string;
    estimatedValue: number;
    source: string; 
    status: LeadStatus;
    temperature: LeadTemperature;
    ownerId: string;
    contact: Contact;
    engagementTimeline: EngagementEvent[];
    lastContactAt: string;
    lostReason?: string;
    salesEnablement: SalesEnablement;
}

 export interface EngagementEvent {
    action: string;
    timestamp: string;
}

 export interface SalesEnablement {
    recommendedProduct: string;
    scriptPreview: string;
    assetLinks: string[];
}

 export interface Contact {
    email: string;
    phone: string;
}