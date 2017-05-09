export default function addToken (url, token) {
  // append the token
  if (token) {
    if (url.indexOf('?') > -1) {
      return `${url}&token=${token}`;
    } else {
      return `${url}?token=${token}`;
    }
  } else {
    return url;
  }
}
