# Minhas Dívidas

Aplicação desenvolvida como parte de um desafio técnico Front-end.

O projeto implementa um fluxo de negociação de dívidas em três etapas:

1. Visualização e seleção de uma oferta;
2. Escolha da forma de pagamento;
3. Revisão e confirmação do acordo.

A interface foi desenvolvida com base no protótipo fornecido no desafio, considerando os layouts desktop e mobile.

## Tecnologias utilizadas

- Next.js
- React
- TypeScript
- TanStack React Query
- MSW (Mock Service Worker)
- CSS Modules
- Vitest
- React Testing Library

## Como executar o projeto

### Pré-requisitos

- Node.js 20.9.0 ou superior
- npm 10 ou superior

### Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

### Ambiente de desenvolvimento

Execute:

```bash
npm run dev
```

Depois, acesse:

```text
http://localhost:3000
```

O MSW é iniciado em ambiente de desenvolvimento para simular as APIs utilizadas pela aplicação.

## Testes

Para executar os testes:

```bash
npm test -- --run
```

Foram implementados testes comportamentais para os principais pontos do fluxo:

- exibição das ofertas retornadas pela API;
- seleção de uma forma de pagamento e habilitação do avanço para a revisão;
- tratamento de erro quando a confirmação do acordo retorna HTTP 500.

## Qualidade e build

Para executar o lint:

```bash
npm run lint
```

Para validar o build de produção:

```bash
npm run build
```

## Decisões técnicas

### React Query para dados da API

O TanStack React Query foi utilizado para gerenciar os dados provenientes das APIs, como ofertas e formas de pagamento.

Essa escolha mantém o estado remoto separado do estado de interação do usuário e centraliza o fluxo de carregamento e erro das requisições.

### Context API para o fluxo de negociação

O `NegotiationContext` mantém as escolhas necessárias entre as etapas, como:

- oferta selecionada;
- forma de pagamento selecionada.

Como esse estado pertence somente ao fluxo de negociação e possui baixa complexidade, a Context API foi suficiente, evitando adicionar uma biblioteca de gerenciamento de estado global sem necessidade.

Estados específicos de uma única tela, como a aceitação dos termos do acordo, permanecem como estado local.

### Proteção das etapas

As etapas de pagamento e revisão dependem das escolhas realizadas anteriormente.

Por isso, foram adicionadas validações de fluxo para impedir que uma etapa seja utilizada sem os dados necessários. Quando isso ocorre, o usuário é redirecionado para a etapa apropriada.

### Mock de API com MSW

O MSW foi utilizado para simular as APIs da aplicação durante o desenvolvimento e nos testes.

Endpoints simulados:

- `GET /api/offers`
- `GET /api/payment-methods`
- `POST /api/review`

No fluxo padrão, a confirmação de um acordo válido retorna HTTP `201`.
Nos testes, o handler do endpoint de revisão é sobrescrito para simular o
cenário HTTP `500`, permitindo validar o comportamento da interface quando
a confirmação do acordo falha.

### Componentização

A interface foi dividida em componentes com responsabilidades específicas, incluindo componentes para:

- cards de ofertas;
- formas de pagamento;
- resumo do acordo;
- termos do acordo;
- confirmação;
- header;
- indicador das etapas do fluxo.

A intenção foi manter as páginas responsáveis principalmente pela composição e orquestração do fluxo, deixando responsabilidades visuais e específicas isoladas em componentes.

### Responsividade e acessibilidade

A interface foi implementada com CSS Modules e adaptada para desktop e mobile.

Também foram utilizados elementos HTML semânticos, labels e atributos ARIA nos pontos em que ajudam a fornecer contexto adicional às tecnologias assistivas.

## Fluxo da aplicação

```text
Ofertas
   ↓
Forma de pagamento
   ↓
Revisão do acordo
   ↓
Confirmação
```

As etapas seguintes utilizam as escolhas realizadas anteriormente para compor o fluxo da negociação.