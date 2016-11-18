# ember-arcgis-server-services

Ember Services for working with ArcGIS Server Services.

**Note**  This is still a very nascent project, and things will change.

If you use this project, be sure to lock to a specific version in your `package.json`.

We expect this project to have many releases before the 1.0.0 "Public API" stabilization.

## ArcGIS Server Services
After adding this to your project, you will have a number of services available for injection into your routes/controllers/services.

## Dependencies
This project is now using `ember-network/fetch` to enable fastboot compatibility. Please also `ember install ember-network`

## Installation
* `ember install ember-arcgis-server-services`

### Shared Methods
All the services expose a set of shared helper methods:

| Method |  Returns |Description |
| --- | --- | --- |
| `encodeForm` | `string` | This is used internally. Formats an object into a html form. In most cases, not necessary to call this.|
| `request (url, options)` | `promise` | This is used internally. Promisified xhr that does not basic handling of Portal's 400-in-a-200 errors |
| `parseServiceUrl (url)` | Parses up the url and returns a hash of useful information - the service url, type, layerId if present, orgId if hosted |

### Feature Service
All the services expose a set of shared helper methods:

| Method |  Returns |Description |
| --- | --- | --- |
| `query(url, options)` | promise | Query the feature service |
| `getById(url, id)` | promise | Returns the record by Id |
| `updateFeature(url, feature, token)` | promise | Update a Feature |
| `updateFeatures(url, features, token)` | promise | Update a set of Features |
| `addFeature(url, feature, token)` | promise | Adds a Feature |
| `addFeatures(url, features, token)` | promise | Adds a set of Features |
| `deleteFeature(url, feature, token)` | promise | Delete a Feature |
| `deleteFeatures(url, features, token)` | promise | Deletes a set of Features |
| `applyEdits(url, adds, updated, deletes, token)` | promise | Applies a set of edits to the service |
| `getLayerInfo(url)` | promise | Returns the `f=json` for the service |

### Handling Error Conditions
Barring a catastrophic network or server failure, the ArcGIS Server API will always return a 200, which main contain error information in json.

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
