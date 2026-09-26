(function () {
  var root = document.documentElement;
  var theme = null;
  try {
    theme = localStorage.getItem('theme');
  } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);
  root.classList.add('js');
  // Failsafe: if the main script never boots, drop the gate so hidden content shows.
  window.setTimeout(function () {
    if (!root.classList.contains('ready')) root.classList.remove('js');
  }, 4000);
})();
