const Storage = {
  getHistory() {
    return JSON.parse(localStorage.getItem("promptHistory")) || [];
  },

  saveHistory(prompt) {
    const history = Storage.getHistory();
    history.unshift(prompt);
    localStorage.setItem("promptHistory", JSON.stringify(history.slice(0, 10)));
  },

  clearHistory() {
    localStorage.removeItem("promptHistory");
  }
};
