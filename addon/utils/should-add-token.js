export default function shouldAddToken (url, portalId) {
  // if this is a hosted service that belongs to the user's organization
  // if this is a service with stored credentials
  return !!url.toLowerCase().match(`arcgis.com/${portalId}/arcgis/rest`) || /utility\w+\.arcgis\.com\/sharing\/servers\/\w{32}\/rest\/services\/Hosted/i.test(url);
}
