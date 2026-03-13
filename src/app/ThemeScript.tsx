const script = `(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme
    : (prefersDark ? 'dark' : 'light');

  document.documentElement.dataset.theme = theme;
})();`;

const ThemeScript = () => {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeScript;
