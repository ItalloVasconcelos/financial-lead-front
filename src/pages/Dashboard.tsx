import { LeadCard } from "@/components/leads/LeadCard/LeadCard"
import { useLeads } from '@/hooks/useLeads'
import { LoadingState } from '@/components/ui/LoadingState/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'

export function Dashboard() {
    const leadsState = useLeads()
  switch (leadsState.status) {
    case "loading":
      return <LoadingState />;
    case "error":
      return <ErrorState />
    case "empty":
      return <EmptyState />
    case "success":
      return (
        <div className='bg-brand-700 text-white p-4 rounded-lg'>
          {
            leadsState.data.map((leads) =>
              <LeadCard key={leads.id} lead={leads} variant='row'/>)
          }
        </div>
      )
  }

}