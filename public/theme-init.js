// Run before the page is painted so the saved theme does not flash.
;(function () {
  let preference
  try {
    preference = localStorage.getItem('techsells.theme')
  } catch {
    /* Use the system preference. */
  }
  const dark =
    preference === 'dark' ||
    (preference !== 'light' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
})()
