function updateGhost(el) {
  if (currentBox) {
    currentBox.remove();
    currentBox = null;
  }

  if (el.value.trim().length < 5) return; // don't bother for tiny input

  chrome.runtime.sendMessage({ type: "GET_COMPLETION", text: el.value }, (res) => {
    if (!res || !res.suggestion) return;
    renderGhostBox(el, res.suggestion);
  });
}

function renderGhostBox(el, suggestionText) {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);

  const box = document.createElement("div");
  box.style.position = "absolute";
  box.style.top = `${window.scrollY + rect.top}px`;
  box.style.left = `${window.scrollX + rect.left}px`;
  box.style.width = `${rect.width}px`;
  box.style.height = `${rect.height}px`;
  box.style.pointerEvents = "none";
  box.style.zIndex = "999999999";
  box.style.font = cs.font;
  box.style.padding = cs.padding;
  box.style.whiteSpace = "pre-wrap";

  const invisiblePart = document.createElement("span");
  invisiblePart.style.color = "transparent";
  invisiblePart.textContent = el.value;

  const fakeSuggestion = document.createElement("span");
  fakeSuggestion.style.color = "grey";
  fakeSuggestion.textContent = suggestionText;

  box.appendChild(invisiblePart);
  box.appendChild(fakeSuggestion);
  document.body.appendChild(box);
  currentBox = box;
}