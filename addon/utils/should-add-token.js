export default function shouldAddToken (url, portalId = '', portalHost) {
  // if this is a hosted service that belongs to the user's organization
  // if this is a service with stored credentials
  const id = portalId.toLowerCase();
  if (portalHost) {
    return hostsMatch(portalHost, url);
  } else {
    return (
      !!url.toLowerCase().match('arcgis.com/arcgis/rest/services') ||
      !!url.toLowerCase().match(`arcgis.com/${id}/arcgis/rest`) ||
      /utility\w+\.arcgis\.com\/sharing\/servers\/\w{32}\/rest\/services\/Hosted/i.test(url)
    );
  }
}

export function hostsMatch (currentHost, requestedUrl) {
  try {
    const portalTopTwo = stripToTopDomain(currentHost);
    const requestedTopTwo = stripToTopDomain(requestedUrl);
    return portalTopTwo === requestedTopTwo;
  } catch (e) {
    return false;
  }
}

function stripToTopDomain (url) {
  // pop off arcgis.com from server.foo.bar.arcgis.com/foobarbaz
  return url
  .replace(/^https?:\/\//, '')
  .split(':')[0]
  .split('/')[0]
  .split('')
  .reverse()
  .join('')
  .match(/^[^.]+\.[^.]+/)[0];
}
