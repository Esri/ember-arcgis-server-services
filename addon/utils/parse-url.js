import Ember from 'ember';

/**
 * Parse up the url so we have a better idea what we are dealing with
 */
export default function parseUrl (url) {
  var parsed = {
    url: url,
    layerId: null
  };
  // if there is a trailing slash, remove it
  url = url.replace(new RegExp('/$'), '');

  // get the last segment of the url
  let layerId = Number(url.split('/').pop());
  if (!isNaN(layerId)) {
    parsed.layerId = layerId;
    parsed.serviceUrl = url.replace(new RegExp('/' + parsed.layerId + '$'), '');
    // incase there were double slashes, nix any trailing slash
    parsed.serviceUrl = parsed.serviceUrl.replace(new RegExp('/$'), '');
  } else {
    parsed.serviceUrl = url.replace(new RegExp('/$'), '');
    // this url points at a service, not a layer
  }
  // get the type from the last part of the serviceUrl
  // parsed.serviceType = Ember.String.dasherize(parsed.serviceUrl.split('/').pop());
  // this is not reliable - MapServer can have extensions i.e. /WMSServer
  // so we should check for well-known server types
  parsed.serviceType = 'unknown';
  let wktypes = ['MapServer', 'FeatureServer', 'ImageServer', 'WMSServer'];
  wktypes.forEach((type) => {
    if (url.toLowerCase().indexOf(type.toLowerCase()) > -1) {
      parsed.serviceType = Ember.String.dasherize(type);
    }
  });
  Ember.debug('Service Type: ' + parsed.serviceType);

  // if it's hosted, pull out the orgid
  if (url.indexOf('arcgis.com') > -1) {
    // extract out the org_id
    parsed.isHosted = true;
    parsed.orgId = url.split('/')[3];
  }

  // finally, if this is tiles, the org id is in another position
  if (url.indexOf('arcgis.com/tiles') > -1) {
    // extract out the org_id
    parsed.orgId = url.split('/')[4];
  }
  return parsed;
}

/**
 * Match the "service" part of the url
 */
const serviceRegex = new RegExp(/.+(?:map|feature|image)server/i);
/**
 * Return the service url. If not matched, returns null
 */
export function tryParseServiceUrl (url) {
  const match = url.match(serviceRegex);
  if (match) return match[0];
}
// DEPRECATED
export function parseServiceUrl (url) {
  Ember.deprecate('use tryParseServiceUrl(url).', false, {id: 'tryParseServiceUrlDeprecation', until: '10.0.0'});
  return tryParseServiceUrl(url);
}
/**
 * Match the arcGIS server "root"
 * which always ends with /rest
 */
const serverRegex = new RegExp(/(\/rest).+/i);
/**
 * Return the server url, if not matched, returns null
 */
export function tryParseServerUrl (url) {
  const match = url.match(serverRegex);
  if (match) {
    return url.replace(serverRegex, '$1');
  }
}
// DEPRECATED
export function parseServerUrl (url) {
  Ember.deprecate('use tryParseServerUrl(url).', false, {id: 'tryParseServerUrlDeprecation', until: '10.0.0'});
  return tryParseServerUrl(url);
}
