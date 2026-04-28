const button = document.getElementById('actionButton');
const output = document.getElementById('output');

button.addEventListener('click', () => {
  const now = new Date().toLocaleTimeString();
  output.textContent = `Starter project loaded at ${now}.`;
});
