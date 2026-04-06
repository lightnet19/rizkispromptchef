const Storage = {
  getHistory() {
    try {
      const data = localStorage.getItem("promptHistory");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load history:", error);
      return [];
    }
  },

  saveHistory(prompt) {
    try {
      const history = Storage.getHistory();
      history.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        prompt,
        createdAt: new Date().toISOString()
      });

      const limitedHistory = history.slice(0, 20);
      localStorage.setItem("promptHistory", JSON.stringify(limitedHistory));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  },

  clearHistory() {
    localStorage.removeItem("promptHistory");
  },

  saveDraft(draft) {
    localStorage.setItem("promptDraft", JSON.stringify(draft));
  },

  getDraft() {
    try {
      const data = localStorage.getItem("promptDraft");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to load draft:", error);
      return null;
    }
  }
};
