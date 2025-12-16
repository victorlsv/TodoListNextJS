Relatório de Entrega – Teste Técnico IM

Nome: Victor Lara Silva
Data: 16/12/2025
Tempo gasto: ~3 horas

O que foi implementado
Funcionalidades Obrigatórias

 Listagem de tarefas

 Criação de tarefas

 Edição de tarefas

 Exclusão de tarefas

 Conclusão de tarefas

 Filtros e busca

 Persistência no localStorage

Funcionalidades Opcionais

 Modal de confirmação para exclusão (AlertDialog do Chakra UI)
 Contador de tarefas (total, pendentes, concluidas)
 Feedback visual com Toasts (sucesso, erro e informação)

 Background com gradiente leve para melhor experiência visual

Decisões Técnicas
*Stack Escolhida

Decisão: Next.js  + React + Chakra UI
Motivo:
O Next.js foi escolhido por oferecer uma estrutura organizada e facilitar muito o Router, acredito ser simples o router das paginas.
O Chakra UI foi utilizado para acelerar o desenvolvimento da interface, garantindo consistência visual, responsividade e acessibilidade sem a necessidade de criar estilos do zero.

*Estrutura de Componentes

Decisão: Componentização por responsabilidade.
Motivo:
Essa abordagem melhora a legibilidade do código, facilita a manutenção e permite reutilização de componentes, além de manter a página principal (page.tsx) mais limpa e focada apenas na lógica de estado e fluxo da aplicação.

*Gerenciamento de Estado

Decisão: useState e useEffect
Motivo:
Como se trata de uma aplicação de escopo pequeno/médio, o uso de useState foi suficiente para gerenciar o estado de tarefas, filtros e formulários.
O useEffect foi utilizado para persistência e recuperação dos dados no localStorage, evitando complexidade desnecessária com bibliotecas externas.

*Dificuldades Encontradas
-Confirmação de exclusão sem uso de alert nativo

Problema:
O uso do confirm() exibia um alerta nativo do navegador, prejudicando a experiência do usuário e a consistência visual da aplicação.

Solução:
Substituí o confirm() pelo AlertDialog do Chakra UI, criando um modal de confirmação customizado, mantendo o padrão visual da aplicação e melhorando a experiência do usuário.

*Tempo Gasto por Tarefa

Setup do projeto: 10 min

Estrutura básica e componentes: 30 min

Funcionalidade de criação: 30 min

Funcionalidade de edição: 20 min

Funcionalidade de exclusão: 20 min

Filtros e busca: 15 min

Persistência localStorage: 20 min

Estilização e responsividade: 20 min

Testes e ajustes finais: 10 min

Total: 3 horas

O que faria diferente com mais tempo

Tentaria aplicar um SCSS para deixar ainda melhor o controle de estilo dos componentes.

Adicionaria funcionalidades extras como ordenação de tarefas e modo dark/light.

*Observações

O foco principal foi entregar uma aplicação funcional, organizada, e com um layout boa pra experiencia do usuario, respeitando boas práticas de componentização/clareza de codigo.
As decisões priorizaram simplicidade, legibilidade e facilidade de manutenção.