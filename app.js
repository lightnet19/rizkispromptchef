function generatePrompt() {
  const role = document.getElementById("role").value;
  const task = document.getElementById("task").value;
  const context = document.getElementById("context").value;
  const format = document.getElementById("format").value;

  const prompt = `
You are a ${role}.

Your task:
${task}

Target audience:
${context || "General audience"}

Output format:
${format}

Give clear, structured, and high-quality responses.
`;

  document.getElementById("output").value = prompt;

  saveHistory(prompt);
}

function copyPrompt() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("Copied!");
}

// HISTORY (localStorage)
function saveHistory(prompt) {
  let history = JSON.parse(localStorage.getItem("promptHistory")) || [];
  history.unshift(prompt);
  localStorage.setItem("promptHistory", JSON.stringify(history));
}
