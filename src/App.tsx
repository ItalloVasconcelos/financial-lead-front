import { LeadCard } from "./components/leads/LeadCard/LeadCard"
const mockData = 
    {
    id: "1", 
    initials: "L1",
    name: "Lead 1", 
    company: "Company A", 
    estimatedValue: 10000, 
    status: "NEW", 
    temperature: "COLD", 
    lastContactAt: "2023-09-01"
}

function App() {
  return (
    <div className='bg-brand-700 text-white p-4 rounded-lg'> Aqui jaz um teste
    <LeadCard lead={mockData} />
    </div>
  )
}

export default App
