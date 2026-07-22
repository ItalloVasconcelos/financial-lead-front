import { LeadCard } from "./components/leads/LeadCard/LeadCard"
import { useLeads } from './hooks/useLeads'
function App() {
  const leadsState = useLeads()
  switch (leadsState.status) {
    case "loading":
      return <h1>"Loading"</h1>
    case "error":
      return leadsState.message
    case "empty":
      return <h1>0</h1>
    case "success":
      return (
        <div className='bg-brand-700 text-white p-4 rounded-lg'>
          {
            leadsState.data.map((leads) =>
              <LeadCard key={leads.id} lead={leads} variant='card'/>)
          }
        </div>
      )
  }

}

export default App
