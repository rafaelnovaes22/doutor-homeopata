import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { Script, runInNewContext } from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function functionSource(name) {
  const start = html.indexOf("function " + name + "(");
  assert.ok(start >= 0, name);
  let candidate = "";
  for (const line of html.slice(start).split("\n")) {
    candidate += line + "\n";
    try {
      new Script("(" + candidate + ")");
      return candidate;
    } catch {}
  }
  throw new Error("Could not extract function: " + name);
}

test("inline scripts parse", () => {
  for (const [, source] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(source);
});

test("typed commands update only the clearly identified local demonstration", () => {
  const agenda = {};
  const output = { textContent: "" };
  const context = { AG: agenda, saveAG() {}, vout: (text) => { output.textContent = text; }, $: () => output, say() {} };
  runInNewContext(functionSource("hear") + "\n" + functionSource("answer") + '\nanswer("agendar consulta amanhã")', context);
  assert.ok(agenda["amanhã"]);
  assert.match(output.textContent, /não agenda uma consulta/);
  runInNewContext(functionSource("hear") + '\nhear("remarcar")', context);
  assert.ok(agenda["amanhã"]);
  assert.match(output.textContent, /Nenhuma consulta real foi alterada/);
  runInNewContext(functionSource("hear") + '\nhear("confirmar retorno")', context);
  assert.match(output.textContent, /Nenhum retorno real foi confirmado/);
});
