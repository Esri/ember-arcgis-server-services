export default function shouldAddToken (url, serverInfo, portalInfo) {
  let hostsDidMatch = false;
  if (portalInfo.portalHostname) {
    // make sure either the server and the portal are on the same domain
    hostsDidMatch = hostsMatch(portalInfo.portalHostname, serverInfo.owningSystemUrl);
  }

  // or it's in authorizedCrossOriginDomains
  const domain = stripToDomain(url);
  const authorizedCrossOriginDomains = portalInfo.authorizedCrossOriginDomains || [];
  const isAuthorizedUrl = authorizedCrossOriginDomains.includes(domain);

  return hostsDidMatch || isAuthorizedUrl;
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
