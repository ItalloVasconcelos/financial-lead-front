import { LeadCard } from "./components/leads/LeadCard/LeadCard"
import leadsData from "../mock/leads.mock.json"
import type { Lead } from "./types/lead"
function App() {

  const leads = leadsData as Lead[];
  return (
    <div className='bg-brand-700 text-white p-4 rounded-lg'> Aqui jaz um teste
    <LeadCard lead={leads[2]} variant = "card" />
    </div>
  )
}

export default App
