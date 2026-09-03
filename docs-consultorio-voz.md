# Consultório por voz: projeto AI-first

## Objetivo

O doutor e a esposa operam 100% do consultório falando. Nada exige digitar. Toda ação sensível pede confirmação em voz antes de executar e gera trilha de auditoria com data, comando e responsável.

## Comandos v1 (português, Chrome)

- "agendar consulta amanhã" cria o compromisso.
- "listar agenda" lê os compromissos.
- "remarcar" move o primeiro compromisso.
- "confirmar retorno" confirma e registra.
- "ajuda" lista os comandos.

Implementação atual: Web Speech API no navegador, estado local, zero servidor. Demonstração ao vivo no site.

## Camadas seguintes (fora do MVP)

1. Identificação por voz (quem falou: doutor ou esposa) antes de ação sensível.
2. Backend com prontuário ditado e transcrito, anexado ao paciente.
3. Lembretes automáticos de retorno por WhatsApp.
4. Estoque de homeopáticos por voz com baixa automática.
5. Auditoria completa e LGPD de dados de saúde: nada de áudio ou prontuário em canal não aprovado, retenção definida, acesso por papel.

## Regras duras

- Nenhum dado de saúde em trace, log ou provedor sem aprovação.
- Confirmação explícita antes de agendar, remarcar, cancelar ou excluir.
- Degradação segura: sem microfone ou sem rede, o modo digitado assume sem perder nada.
