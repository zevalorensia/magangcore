async function loadComponent(url, elementId) {
  const response = await fetch(url);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
}
