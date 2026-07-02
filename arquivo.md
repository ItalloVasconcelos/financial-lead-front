# Trilha C — Blueprint do Projeto: "Lead Growth Mini-Hub"

Esse documento é o esqueleto do projeto. Eu desenho a estrutura, mas as decisões de design **são suas** — em cada etapa tem perguntas que você precisa responder antes de codar. É assim que um sênior pensa: decide com intenção, não copia template.

---

## Fase 0 — Definir o domínio (faça isso ANTES de abrir o editor)

Você está construindo uma ferramenta de gestão de leads para consultores financeiros. Pegue papel/notas e responda:

**Pergunta 1:** Quais informações um "Lead" precisa ter, no mínimo, pra ser útil pra um consultor financeiro? (pense em: nome, empresa, valor estimado, fonte do lead, status, último contato...)

**Resposta 1:** 

Se o meu assessor ligar para um cara sem saber o básico, ele queima o cartucho e a empresa perde a credibilidade. Para o nosso negócio, o lead precisa ter esses dados na cara do gol:

* Identificação Básica: Nome, Cargo e Empresa (essencial para saber o tom da conversa e o jargão que vai usar).

* O "Pote de Ouro" (Patrimônio Estimado/AUM): Quanto esse cara tem disponível para investir ou qual o faturamento da empresa dele. Se for um lead de R$ 50k, o papo é um; se for R$ 5M, o assessor cancela o almoço para ligar para ele.

* A "Isca" (Origem e Gatilho): De onde ele veio (ex: LinkedIn Ads, Webinar de Cenários Macroeconômicos 2026) e qual foi o último comportamento dele (ex: Baixou a planilha de simulação de previdência há 10 minutos). É isso que dá o pretexto para a ligação.

* Dados de Contato Rápidos: E-mail e o botão direto para o WhatsApp/Telefone.


**Pergunta 2:** Quais são os status possíveis de um lead no funil? (ex: Novo → Contatado → Qualificado → Fechado — mas pense se faz sentido pro seu caso, pode ter "Perdido" também)

**Resposta 2:** 

No mercado financeiro, o funil tem que ser muito claro, porque o tempo entre o primeiro contato e o dinheiro entrar na nossa conta (dinheiro custodiado) pode demorar semanas. O fluxo que funciona na minha cabeça é este:

* Novo (ou "Gatilho Disparado"): O lead acabou de cair na plataforma vindo da nossa automação. Ninguém tocou nele ainda. Corra, porque lead esfria em 20 minutos.

* Tentativa de Contato: O assessor já ligou ou mandou mensagem, mas o cara ainda não respondeu ou pediu para ligar mais tarde.

* Em Reunião/Diagnóstico: O contato foi feito e a primeira reunião de "Wealth Assessment" (entender a vida do cara) foi agendada ou realizada. Aqui a gente estuda a carteira atual dele.

* Proposta Enviada: O assessor montou a carteira recomendada ou a solução de crédito e mandou para o cliente. É a fase do "vai ou racha".

* Ganho (Dinheiro na Mesa): Cliente assinou, transferiu os recursos para a custódia. Sucesso.

* Perdido / Arquivado: Pode ser por "Sem Perfil" (o cara não tem o dinheiro que dizia que tinha) ou "Recusado" (preferiu ficar no bancão). É crucial salvar o motivo da perda para eu calibrar o marketing depois.

**Pergunta 3:** Se você fosse o consultor financeiro usando essa ferramenta todo dia, qual seria a PRIMEIRA coisa que você precisaria ver ao abrir a tela? (isso define sua tela principal)

**Resposta 3:** 

Se o assessor abrir a ferramenta e tiver que caçar o que fazer, o sistema falhou. A primeira tela — o painel principal — tem que responder a três perguntas em 5 segundos: O que deu ruim? O que tá quente? O que eu tenho que fazer agora?

Para mim, a tela principal tem que ser dividida em 3 blocos visuais bem diretos:

1. O "Placar do Mês" (Métricas de Ego e Bolso): Bem em cima, pequeno. Quanto ele já fechou no mês versus a meta dele (ex: R$ 2.3M / R$ 5M custodiados). Isso ativa o modo competitivo do cara.

2. O Bloco de Ação Intermediária ("Atividades de Hoje"): Uma lista limpa e cronológica. 10:00 - Ligar para Roberto (Follow-up da proposta); 11:30 - Reunião com Ana (Apresentação de carteira).

3. O "Feirão de Leads Quentes" (A Mina de Ouro): Uma tabela ou cards com os leads que a nossa plataforma de Growth acabou de pontuar como "Prontos para Ataque" (Hot Leads). Aqueles caras que pontuaram alto no score n

> Escreva as respostas num arquivo `DECISIONS.md` no projeto. Isso vira a base do seu README e da sua história de UX pra entrevista.

---

## Fase 1 — Setup técnico

Estrutura sugerida (React puro com Vite, OU Next.js se quiser já ir treinando — sua escolha, mas pense: qual opção te deixa mais confortável pra entregar algo bom em 13 dias?): React e Typescript

```
lead-growth-hub/
├── src/
│   ├── components/
│   ├── data/          ← mock data (JSON)
│   ├── hooks/         ← custom hooks
│   ├── types/         ← (se usar TS)
│   └── App.jsx
├── DECISIONS.md        ← seu diário de decisões de design
└── README.md
```

**Pergunta 4:** Você vai usar TypeScript ou JavaScript puro? Pense no trade-off: TS é mais "production-grade" (a vaga pede isso explicitamente), mas custa tempo de setup. Qual faz mais sentido pro seu prazo de 13 dias?

**Resposta 4:** Typescript avançado

---

## Fase 2 — Arquitetura de componentes (a parte que mais importa pra entrevista)

Antes de eu te dar qualquer estrutura, responda:

**Pergunta 5:** Pensando na tela principal (lista/kanban de leads) e na tela de detalhe de um lead — quantos componentes "grandes" (não átomos como Button) você imagina nessa tela? Tente desenhar isso numa folha antes de continuar.

**Resposta 5:**
Existem dois cenarios: A e B:
Cenário A: A Tela Principal (O Dashboard de Ataque)
Aqui o assessor descobre quem ele vai caçar hoje. Eu imagino essa tela dividida em 3 grandes componentes estruturais (Organismos):

1. O Painel de Performance (Metric Bar Header)
O que é: Uma barra horizontal fixa no topo.

O que faz: Mostra o volume de dinheiro que o cara trouxe no mês, a meta dele, quantos leads ele converteu e o tamanho do pipeline atual em formato numérico pesado. É o termômetro do bolso dele.

2. O Hub de Atividades do Dia (Action Center Sidebar)
O que é: Uma coluna lateral (esquerda ou direita) focada em tarefas.

O que faz: Uma lista cronológica das tarefas urgentes do dia ("Ligar para fulano às 14h", "Enviar e-mail para beltrano"). É o "to-do list" integrado ao CRM que não deixa o assessor esquecer os compromissos agendados.

3. O Visualizador do Funil (Lead Board / Grid)
O que é: O coração da tela. Pode ser um Kanban ou uma Lista Inteligente (com filtros rápidos de "Mais Quentes", "Novos", "Valor Estimado").

O que faz: Onde os cards dos leads moram. Cada card ali dentro já é um mini-componente robusto que mostra o nome do lead, o valor estimado (R$), o selo de status e o termômetro de temperatura (Lead Quente/Frio).

Cenário B: A Tela de Detalhes do Lead (O "Dossiê" do Cliente)
Quando o assessor clica em um lead, eu não quero que ele mude de página e perca o contexto. Imagino um Painel Lateral Expandido (Slide-over Drawer) ou uma tela dividida em 3 grandes blocos fixos:

1. O Perfil Resumo (Lead Identity Card)
O que é: O bloco de cabeçalho do lead.

O que faz: Nome, cargo, empresa, valor estimado de patrimônio bem grande, e os botões de ação direta (ícone de Telefone, WhatsApp, E-mail). O assessor bate o olho ali e já sabe com quem tá falando e o tamanho do peixe.

2. A Linha do Tempo de Engajamento (Growth Timeline)
O que é: Um feed vertical que unifica o histórico.

O que faz: É aqui que a mágica da nossa plataforma de automação aparece. Mostra de forma cronológica tudo o que o cara fez: "Baixou e-book x há 2 dias", "Abriu e-mail y ontem", "Assessor anotou: liguei e deu caixa postal às 10h". O assessor lê isso em 10 segundos antes de puxar o telefone.

3. A Caixa de Ferramentas de Vendas (Sales Enablement Dock)
O que é: Um bloco focado em conteúdo para o fechamento.

O que faz: Lembra que eu te falei que o backend já sabe o que o cara quer? Esse componente vai sugerir os materiais certos para aquele lead. Se o lead tá qualificado para Previdência Privada, esse bloco já deixa o link da lâmina do fundo de previdência e o simulador de taxas ali na mão, sem

**Pergunta 6:** Onde deveria viver o estado de "qual lead está selecionado"?
- (a) No componente pai (`App.jsx`), passado via props
- (b) Em Context API
- (c) Na URL (ex: `/leads/123`)

**Resposta 6:**

Aqui vai ser um misto. Preciso utilizar o lead na url, mas existem dados sensiveis que preciso preservar no estado. 

Pense no trade-off de cada opção — qual delas é mais "correta" pra esse caso, e por quê? (Dica: pense em o que acontece se o usuário der refresh na página, ou quiser compartilhar o link de um lead específico.)

**Pergunta 7:** A visão "kanban" (colunas por status) e a visão "lista" — elas deveriam ser dois componentes totalmente separados, ou compartilhar uma lógica comum de "LeadCard"? O que você reaproveitaria entre as duas?

**Resposta 7:** Eu penso sempre na otimização de recurso e componentização. Acho que o ideal é criar um componente de mudança entre as duas, melhor do que fazer dois componentes usando o mesmo dado. 

### Esqueleto de componentes (depois de você responder as perguntas acima, valide contra isso)
- `<LeadDashboard>` — orquestra a tela principal
    - `<LeadFilters>` — busca e filtro  
    - `<LeadList>` / `<LeadKanban>` — duas visualizações possíveis dos mesmos dados
- `<LeadCard>` — card individual (reusado nas duas visões)
    - `<LeadActionTrigger>` - Trigger de clique rápido
- `<LeadDetailPanel>` — painel/modal de detalhe ao clicar num lead
    - `<SalesEnablementDock>` - Caixa de ferramentas de vendas rica em dados
    - `<AccessRestrictionBlock>` - Bloqueio minimalista dos dados, caso o usuario não seja dono do lead (Sigilo e segurança dos dados alheios.)
- `<EmptyState>`, `<LoadingState>`, `<ErrorState>` — componentes dedicados (isso é o que demonstra maturidade de UX — não trate como afterthought)
---

## Fase 3 — Ordem de construção sugerida

Construa nessa ordem — cada etapa entrega algo "demonstrável", o que é importante psicologicamente (motivação) e estrategicamente (se o tempo apertar, você já tem algo pra mostrar):

1. **Dados mockados** — crie um `leads.json` com 15-20 leads fake, variados em status
2. **Lista simples** — renderize os leads numa lista básica, sem estilo ainda
3. **Estados de loading/erro/vazio** — simule um delay no carregamento (mesmo sendo mock) e trate os 3 estados
4. **Busca/filtro** — adicione busca por nome e filtro por status
5. **Detalhe do lead** — clique num lead e veja um painel/modal com mais informação
6. **Visão Kanban** — adicione a segunda visualização (arrastar é opcional — pode ser só clique pra mudar status)
7. **Polimento visual** — agora sim, capricha no CSS, espaçamento, hierarquia visual
8. **Acessibilidade** — navegação por teclado, labels, contraste
9. **Responsividade** — testa em mobile
10. **README + DECISIONS.md** — documenta o "porquê" de cada escolha

**Pergunta 8:** Olhando essa lista, qual etapa você imagina que vai te dar mais trabalho? Planeje começar por ela mais cedo (não deixe pro fim, quando o cansaço bate).

**Resposta 8:** Eu acredito que a página inicial vá da mais trabalho, mas vou iniciar pelos estados, pois deixa mais profissional!
---

## Fase 4 — Critérios de "production-grade" (checklist de polimento)

Antes de considerar pronto, valide:

- [ ] Loading, error e empty state estão tratados em TODOS os lugares que buscam dados
- [ ] Nenhum estado é mutado diretamente (sempre cria novo objeto/array)
- [ ] Componentes têm responsabilidade única (se um componente faz "tudo", quebre ele)
- [ ] Navegação funciona por teclado (Tab, Enter)
- [ ] Imagens/ícones têm texto alternativo quando necessário
- [ ] Funciona em tela pequena (mobile) sem quebrar
- [ ] Não tem console.log esquecido nem código comentado morto
- [ ] README explica o que o projeto faz e como rodar

**Pergunta 9:** Olhando pra esse checklist, qual item você normalmente PULA em projetos pessoais por pressa? Esse é exatamente o item que mais vai te diferenciar nessa entrevista — porque "production-grade" é literalmente um requisito da vaga.

---

## Fase 5 — Documentação (vira sua munição de entrevista)

No `DECISIONS.md`, registre pelo menos 3-4 decisões assim:

```markdown
## Decisão: Onde colocar o estado do lead selecionado
**Contexto:** precisava decidir entre Context, prop drilling ou URL state.
**Escolha:** URL state (/leads/:id)
**Por quê:** permite compartilhar link direto pra um lead, sobrevive a refresh,
e evita complexidade desnecessária de Context pra esse caso.
**Trade-off aceito:** um pouco mais de setup com roteamento.
```

Isso vira, literalmente, sua resposta pronta pra "tell me about a UX/technical decision you made."

---
