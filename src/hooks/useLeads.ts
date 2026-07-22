import type { Lead } from '../types/lead';
import { useState, useEffect } from 'react';

/**
 * Primeiro a gente começa pelos estados que vão existir.
 * No caso esses estados já vêm do lead.ts que contém os tipos definidos do dado que vem do banco de dados
 * Correção: Não, eles são criados aqui, para eu usar aqui!
 * Os estados são 4: loading, empty, success e error.
 */


type AsyncState<T> = 
| { status: "loading" } //Aqui é o estado de carregamento, preciso fazer a tela e chamar no Dashboard
| { status: "empty" } // Empty é uma tela vazia, quando o dado não chega ou não tem
| { status: "success"; data: T;  } //Aqui sucesso. Vai todo o dado do meu banco (Vou fazer as chamadas para esse estado)
| { status: "error"; message: string; }; //Quando der erro, exibir uma mensagem (Não sei da onde vem esse erro.)

/**
 * Agora vamos fazer a chamada da API, mas sem usar React.
 * Preciso fazer o fetch e eu vou fazer de duas maneiras, usando apenas o then e usando o async (Padrão)
 * Vou fazer a validação de erros
 * OBS: Depois vou fazer um try catch, só pra deixar mais seguro.
 */

// function fetchLeadsThen(): Promise<Lead[]> { Tipo como Promise (Não sei o motivo)
//     fetch("..mock/leads.mock.json") Chamo o fetch para buscar a API
//     .then((response) => response.json()) Transformo os dados vindo da API em objetos JSON
//     .catch((erro) => console.error(erro.message)) Faço a validação de possiveis erros
// }

async function fetchLeadsAsync(signal ?: AbortSignal): Promise<Lead[]> {

    const response = await fetch(`../../mock/leads.mock.json`, { signal }) //Faço a requisição e passo o sinal do controle para o fetch 
    if(!response.ok) {  // Fazendo a validação de erro que o fetch não faz.
        throw new Error(`HTTP Erro: ${response.status}`)
    }
    return response.json() //Retornando os dados, já com JSON.

}
/**Essa aqui é a parte mais complicada pra mim, mas mais por entendimento em si
 * 1. Eu não sei muito bem o que o useEffect faz e também não sei pq ele ta sem dependencias
 * 2. O useState eu entendi que deixa o estado dos estados e gera ações para cada estado que estiver
 * 3. Faço as lógicas dos estados e é isso.
 */
export function useLeads() {
    const [state, setState] = useState<AsyncState<Lead[]>>({status: "loading"})
    useEffect(() => {
        const controller = new AbortController();
        fetchLeadsAsync(controller.signal) //Chamo a função que chama os dados da API e passo como argumento o signal definido no fetch, para funcionar.
        .then((leads) => { //Coloca o leads como os dados que vem da API
            if(leads.length === 0) { //Valido caso o tamanho dos dados seja 0, logo ele vem como vazio ("Empty")
                setState({status:"empty"})
            } else {
                setState({status: "success", data: leads}) //Caso venha 1 ou mais, ele da o status sucesso e me retorna os itens.
            }
        })
        .catch((erro) => {
            //Melhora no código: 
            const message = erro instanceof Error ? erro.message: String(erro)
            erro.name === "AbortError" ? console.log("Last Request canceled") : setState({status: 'error', message}) // Refazendo com o AbortController.
        })
        return () => {
            controller.abort()
        }
    }, [])
    return state; //Retorno o estado atual (Loading) e as mudanças. Agora eu não entendi pq ele é fora do useEffect.
}

// Aqui eu fiz tudo junto e queria saber se consigo fazer assim, mais direto
// Outra duvida é: Esse fetchLeads().then... Eu posso usar async também? Se for sim, deixa eu fazer de exercicio.
/**Posso usar assim, mas não é recomendado por 2 motivos:
 * 1. Testabilidade: Colocando fetchLeads dentro do hook, perco a capacidade de testar essa função isoladamente.
 * 2. Lint: Reclamaria de: "Missing dependecy: fetchLeads", porque fetchLeads é uma função declarada dentro do escopo do hook e referenciada dentro do useEffect.
 */
// export function useLeads1() {
//     async function fetchLeads(): Promise<Lead[]> {
//         const response = await fetch("mock")
//         return response.json();
//     }
//     const [status, setStatus] = useState<AsyncState<Lead[]>>({status: "loading"})
//     useEffect(() => {
//         fetchLeads()
//         .then((leads) => {
//             if(leads.length === 0) {
//                 setStatus({status: "empty"})
//             } else {
//                 setStatus({status: "success", data: leads})
//             }
//         })
//         .catch((error) => {
//             setStatus({status: "error", message: error})
//         })
//     },[])
//     return status;
// }

// /** Versão do hook com Async e try/catch */
// export function useLeads1() {
//     const [state, setState] = useState<AsyncState<Lead[]>>({status: "loading"})
    
//     useEffect(() => {
//         const controller = new AbortController();

//         async function loadLeads() {
//             try {
//                 const leads = await fetchLeadsAsync(controller.signal); // Erro de esperar 0, mas tem um argumento. Não sei como resolvo isso.
//                 leads.length === 0 ? setState({status: "empty"}) : setState({status: "success", data: leads})
//             }
//             catch (erro) {
//                 const message = erro instanceof Error ? erro.message: String(erro)
//                 setState({status: "error", message}) //O tratamento de erro, caso venha erro.
//             }
//             return state
//         }
//         loadLeads()
//         return () => controller.abort();
//     }, [])
// }