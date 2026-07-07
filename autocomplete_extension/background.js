const MODEL = "openai/gpt-4o-mini"; // OpenRouter prefixes model names with the provider

// The API key is never stored in source. Set it once via the extension's
// options page (right-click the extension icon → Options) and it's kept in
// chrome.storage.local.
function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get("openrouterApiKey", (items) => {
      resolve(items.openrouterApiKey || "");
    });
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_COMPLETION") {
    getApiKey()
      .then((apiKey) => {
        if (!apiKey) {
          sendResponse({ suggestion: "", error: "No API key set. Open the extension's Options page and paste your OpenRouter key." });
          return;
        }
        return fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "https://github.com/LaithMimi/System-Design-Course.git", // OpenRouter wants this — identifies your app
            "X-Title": "AI Text Autocomplete", // shows up in OpenRouter's dashboard/logs
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: "system", content: "Continue the user's text naturally in a few words. Return ONLY the continuation, no quotes." },
              { role: "user", content: msg.text },
            ],
            max_tokens: 20,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const suggestion = data.choices?.[0]?.message?.content?.trim() ?? "";
            sendResponse({ suggestion });
          });
      })
      .catch((err) => sendResponse({ suggestion: "", error: String(err) }));

    return true;
  }
});
