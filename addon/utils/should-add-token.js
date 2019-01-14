import { getWithDefault } from '@ember/object';
/**
 * Logic to determine when we should attach a token to a ArcGIS Server / Hosted Service call
 */
export default function shouldAddToken (url, serverInfo, portalInfo) {
  // default to not sending tokens
  let shouldSendToken = false;
  // check if the server even accepts tokens
  const acceptsTokens = getWithDefault(serverInfo, 'authInfo.isTokenBasedSecurity', false);
  if (acceptsTokens) {
    const serverDomain = stripToDomain(url).toLowerCase();
    const portalDomain = stripToDomain(portalInfo.portalHostname).toLowerCase();
    const authorizedCrossOriginDomains = portalInfo.authorizedCrossOriginDomains || [];
    const isAuthorizedUrl = authorizedCrossOriginDomains.indexOf(serverDomain) > -1;
    const isArcGisDomain = !!url.toLowerCase().match('.arcgis.com/');

    // if the server isn't federated with portal, dont send a token
    if (!serverInfo.owningSystemUrl) {
      return shouldSendToken;
    }
    const owningDomain = stripToDomain(serverInfo.owningSystemUrl).toLowerCase();
    // if all three are the same domain... send it
    if ((serverDomain === portalDomain) && (portalDomain === owningDomain)) {
      shouldSendToken = true;
    } else if (portalDomain === owningDomain && isAuthorizedUrl) {
      shouldSendToken = true;
    } else if (portalDomain === owningDomain && isArcGisDomain) {
      shouldSendToken = true;
    }
  }

  return shouldSendToken;
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
