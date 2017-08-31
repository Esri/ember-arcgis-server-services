export default function shouldAddToken (url, portalId = '') {
  // if this is a hosted service that belongs to the user's organization
  // if this is a service with stored credentials
  const id = portalId.toLowerCase();
  if (location && location.host && hostsMatch(location.host, url)) {
    return true;
  } else {
    return (
      !!url.toLowerCase().match('arcgis.com/arcgis/rest/services') ||
      !!url.toLowerCase().match(`arcgis.com/${id}/arcgis/rest`) ||
      /utility\w+\.arcgis\.com\/sharing\/servers\/\w{32}\/rest\/services\/Hosted/i.test(url)
    );
  }
}

export function hostsMatch (currentHost, requestedUrl) {
  const portalTopTwo = stripToTopDomain(currentHost);
  const requestedTopTwo = stripToTopDomain(requestedUrl);
  if (portalTopTwo === requestedTopTwo) return true;
}

function stripToTopDomain (url) {
  // pop off arcgis.com from server.foo.bar.arcgis.com/foobarbaz
  url
  .replace(/^https?:\/\//, '')
  .split(':')[0]
  .split('/')[0]
  .split('')
  .reverse()
  .join('')
  .match(/^[^.]+\.[^.]+/)[0];
}
