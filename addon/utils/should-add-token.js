export default function shouldAddToken (url, serverInfo, portalInfo) {
  if (hostsMatch(portalInfo.portalHostname, serverInfo.owningSystemUrl)) {
    // make sure the server and the portal are on the same domain
    return true;
  }

  // or it's in authorizedCrossOriginDomains
  const domain = stripToDomain(url);
  const authorizedCrossOriginDomains = portalInfo.authorizedCrossOriginDomains || [];
  const isAuthorizedUrl = authorizedCrossOriginDomains.includes(domain);
  const isArcGisDomain = !!url.toLowerCase().match('.arcgis.com/');
  return isArcGisDomain && isAuthorizedUrl;
}

export function hostsMatch (currentHost, requestedUrl) {
  try {
    const portalTopTwo = stripToDomain(currentHost);
    const requestedTopTwo = stripToDomain(requestedUrl);
    return portalTopTwo === requestedTopTwo;
  } catch (e) {
    return false;
  }
}

function stripToDomain (url) {
  return url
  .replace(/^https?:\/\//, '')
  .split(':')[0]
  .split('/')[0];
}
