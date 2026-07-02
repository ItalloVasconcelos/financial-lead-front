/**
 * Script para geração de volume massivo de dados para teste de stress de performance do Growth Hub.
 * Simula de 1000 a 5000 registros mantendo o contrato original da API de Leads.
 */
function generateMassiveLeads(quantity = 2500) {
  const statuses = ["NEW", "CONTACT_ATTEMPT", "MEETING_SCHEDULED", "PROPOSAL_SENT", "WON", "LOST"];
  const temps = ["HOT", "WARM", "COLD"];
  const roles = ["CEO", "Diretor de TI", "CFO", "Médico", "Advogado", "Investidor", "Product Manager", "Engenheiro Sênior"];
  const companies = ["TechCorp", "Inova S.A.", "Alfa Investimentos", "Logística Brasil", "Solar Energy", "MedGroup", "HedgeFund Global"];
  const sources = ["LinkedIn Ads", "Google Search", "Indicação Private", "Webinar Macro 2026", "Instagram Organic"];

  const leads = [];

  for (let i = 1; i <= quantity; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomTemp = temps[Math.floor(Math.random() * temps.length)];
    const value = Math.floor(Math.random() * (20000000 - 30000 + 1)) + 30000; // Valores entre 30k e 20M

    leads.push({
      id: `lead_massive_${i}`,
      name: `Lead Teste Performance Número ${i}`,
      role: roles[Math.floor(Math.random() * roles.length)],
      company: `${companies[Math.floor(Math.random() * companies.length)]} N° ${i}`,
      estimated_value: parseFloat(value.toFixed(2)),
      source: sources[Math.floor(Math.random() * sources.length)],
      status: randomStatus,
      temperature: randomTemp,
      contact: {
        email: `lead.perf.${i}***@growthhubtest.com`,
        phone: `+55 (85) 999***-***${String(i).padStart(2, '0').slice(-2)}`
      },
      last_engagement: {
        action: `Engajamento automatizado simulado de stress de carga para o item ${i}`,
        timestamp: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString() // Últimos 10 dias aleatórios
      },
      sales_enablement: {
        recommended_product: value > 5000000 ? "Gestão de Fortuna Exclusive" : "Carteira Recomendada Automatizada",
        script_preview: `Script genérico para validação de performance em lista virtualizada. ID único do registro: ${i}`,
        asset_links: ["https://internal.growthhub/assets/template-teste-carga.pdf"]
      }
    });
  }

  return leads;
}

// Para usar no seu arquivo de mock do Next.js / React / Vite:
// const massiveLeadsMock = generateMassiveLeads(3000); 
// console.log("Leads gerados para teste de performance: ", massiveLeadsMock.length);