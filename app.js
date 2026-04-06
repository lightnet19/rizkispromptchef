function init() {
  populateSelect("role", PRESETS.roles, PRESETS.defaults.role);
  populateSelect("format", PRESETS.formats, PRESETS.defaults.format);
  populateSelect("tone", PRESETS.tones, PRESETS.defaults.tone);
  renderHistory();
}

function populateSelect(id, options, defaultValue) {
  const el = document.getElementById(id);
  el.innerHTML = options.map(opt =>
    `<option ${opt === defaultValue ? "selected" : ""}>${opt}</option>`
  ).join("");
}

function generatePrompt() {
  const role = document.getElementById("role").value;
  const task = document.getElementById("task").value;
  const context = document.getElementById("context").value;
  const format = document.getElementById("format").value;
  const tone = document.getElementById("tone").value;

  const prompt = `
You are a ${role}.

Task:
${task}

Context:
${context || "General audience"}

Tone:
${tone}

Output format:
${format}

Give a clear, structured, and helpful answer.
`.trim();

  document.getElementById("output").value = prompt;

  Storage.saveHistory(prompt);
  renderHistory();
}

function copyPrompt() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("Copied!");
}

function clearAll() {
  document.getElementById("task").value = "";
  document.getElementById("context").value = "";
  document.getElementById("output").value = "";
}

function renderHistory() {
  const history = Storage.getHistory();
  const container = document.getElementById("history");

  container.innerHTML = history.map(item =>
    `<div class="history-item" onclick="reusePrompt(\`${item}\`)">
      ${item.substring(0, 100)}...
    </div>`
  ).join("");
}

function reusePrompt(prompt) {
  document.getElementById("output").value = prompt;
}

window.onload = init;
