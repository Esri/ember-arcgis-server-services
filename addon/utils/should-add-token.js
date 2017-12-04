export default function shouldAddToken (url, serverInfo, portalInfo) {
  const serverDomain = stripToDomain(url);
  const portalDomain = stripToDomain(portalInfo.portalHostname);
  const owningDomain = stripToDomain(serverInfo.owningSystemUrl);
  const authorizedCrossOriginDomains = portalInfo.authorizedCrossOriginDomains || [];
  const isAuthorizedUrl = authorizedCrossOriginDomains.includes(serverDomain);
  const isArcGisDomain = !!url.toLowerCase().match('.arcgis.com/');

  if (serverDomain === portalDomain === owningDomain) return true;
  else if (portalDomain === owningDomain && isAuthorizedUrl) return true;
  else if (portalDomain === owningDomain && isArcGisDomain) return true;
  return false;
}

function stripToDomain (url) {
  try {
    return url
    .replace(/^https?:\/\//, '')
    .split(':')[0]
    .split('/')[0];
  } catch (e) {
    return url;
  }
}
