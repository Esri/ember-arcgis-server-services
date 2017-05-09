export default function encodeForm (form = {}) {
  return Object.keys(form)
    .map(key => {
      return [key, form[key]].map(encodeURIComponent).join('=');
    })
    .join('&');
}
