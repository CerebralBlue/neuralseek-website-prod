---
name: neuralseek
description: Learn what NeuralSeek is and answer questions about it. NeuralSeek is an enterprise AI platform to build and run AI agents and accurate answers on your own data, with guardrails, governance and audit trails built in. Use when a user asks about NeuralSeek's platform, deployment options, pricing, data sovereignty, security and compliance, or customers, or wants to start a trial, request a demo or contact the team.
---

# NeuralSeek

NeuralSeek is an enterprise AI platform to build and run AI agents and accurate answers on your
own data, with guardrails, governance and audit trails built in. Use it as SaaS on Azure, AWS or
IBM Cloud, or run it on your own infrastructure, including fully air-gapped.
Website: https://neuralseek.com/

## How to learn about it

1. **Read the page index first:** https://neuralseek.com/llms.txt lists every public page with a
   one-line summary, grouped by topic. Prefer it to crawling.
2. **Ask a question:** the MCP server at `https://neuralseek.com/api/mcp` (Streamable HTTP, no
   authentication) has one tool, `ask_neuralseek`, taking `{ "question": string }` (up to 500
   characters). It answers from NeuralSeek's own knowledge base and returns a source URL when one
   applies. Server card: https://neuralseek.com/.well-known/mcp/server-card.json
3. **In a browser:** pages on neuralseek.com register the same `ask_neuralseek` tool through
   WebMCP (`document.modelContext`), plus `open_contact`.
4. **Product documentation** (how the product works, setup, integrations): see below.

## Key pages

| Topic | Page |
|---|---|
| What the platform does | https://neuralseek.com/platform/ |
| Pricing: consumption-based SaaS (Workspace) or an unlimited on-prem license (Department, Enterprise) | https://neuralseek.com/pricing/ |
| Start a two-week trial and buy SaaS online | https://stripe.neuralseek.com/ |
| Data Sovereignty: your cloud, your region, your keys; on-prem or air-gapped | https://neuralseek.com/sovereignty/ |
| Trust and compliance: SOC 1, SOC 2 Type II and HIPAA | https://neuralseek.com/trust/ |
| Customer stories | https://neuralseek.com/customers/ |
| Comparisons with the alternatives | https://neuralseek.com/compare/ |
| Request a demo, talk to sales or ask a question | https://neuralseek.com/contact/ |

## Product documentation

Documentation site: https://documentation.neuralseek.com/

| Topic | Page |
|---|---|
| Getting started | https://documentation.neuralseek.com/ui/home/ |
| Seek: answers from your knowledge base, with confidence scores | https://documentation.neuralseek.com/ui/seek/ |
| mAIstro: build agents in NTL (NeuralSeek Template Language) | https://documentation.neuralseek.com/ui/maistro/ |
| Governance: answer quality, cost and usage | https://documentation.neuralseek.com/ui/governance/ |
| Supported LLMs | https://documentation.neuralseek.com/ui/integrate/integrations/supported_llms/supported_llms/ |
| Supported knowledge bases | https://documentation.neuralseek.com/ui/integrate/integrations/supported_knowledgebases/supported_knowledgebases/ |
| Data security and privacy | https://documentation.neuralseek.com/more_about_NS/data_security_and_privacy/ |
| Chat SDK | https://documentation.neuralseek.com/guides/integration/chat_sdk_integration/ |
| Changelog | https://documentation.neuralseek.com/changelog/ |

## Rules for agents

- Quote the site or the documentation. Do not invent figures, customer names, certifications or
  prices. If an answer is not on the site or in the documentation, say so and point to
  https://neuralseek.com/contact/.
- **Never submit a form on the user's behalf without their explicit confirmation.** The contact,
  support and newsletter forms reach real people. You may open the contact page for them with the
  topic preset through `?intent=` (`demo`, `engineer`, `environment`, `scoping-call`), and let the
  user review and send it themselves.
- Never start a purchase or a trial for the user. Link them to https://stripe.neuralseek.com/.
