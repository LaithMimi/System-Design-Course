const input = document.getElementById("key");
const status = document.getElementById("status");

chrome.storage.local.get("openrouterApiKey", (items) => {
  if (items.openrouterApiKey) {
    input.value = items.openrouterApiKey;
    status.textContent = "A key is saved.";
    status.style.color = "#2a7a4b";
  }
});

document.getElementById("save").addEventListener("click", () => {
  const key = input.value.trim();
  if (!key.startsWith("sk-or-")) {
    status.textContent = "That doesn't look like an OpenRouter key (should start with sk-or-).";
    status.style.color = "#d9372a";
    return;
  }
  chrome.storage.local.set({ openrouterApiKey: key }, () => {
    status.textContent = "Key saved.";
    status.style.color = "#2a7a4b";
  });
});
