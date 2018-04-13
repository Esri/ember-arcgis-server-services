# ember-arcgis-server-services

Ember Services for working with ArcGIS Server Services.

**Note**  This is still a very nascent project, and things will change.

Be sure to lock to a specific version in your own `package.json`. We expect many breaking changes before a stable `v1.0.0` public API is released.

### ArcGIS Server Services
After adding this to your project, you will have a number of services available for injection into your routes/controllers/services.

### Dependencies
This project is now using `ember-network/fetch` to enable fastboot compatibility.

### Installation
To consume this library in any ember application:
* `ember install ember-arcgis-server-services`

### Shared Methods
All the services expose a set of shared helper methods:

| Method |  Returns |Description |
| --- | --- | --- |
| `encodeForm` | `string` | This is used internally. Formats an object into a html form. In most cases, not necessary to call this.|
| `request (url, options)` | `promise` | This is used internally. Promisified xhr that does basic handling of Portal's 400-in-a-200 errors |
| `parseServiceUrl (url)` | | Parses up the url and returns a hash of useful information - the service url, type, layerId if present, orgId if hosted |
| `getServerInfo(url)` | promise | Returns the `f=json` metadata for the server |

### Vector Service
All functions supported by the Vector Service are all supported by Feature Service and Map Service

| Method |  Returns |Description |
| --- | --- | --- |
| `query(url, options)` | promise | Query the feature service |
| `getById(url, id)` | promise | Returns the record by Id |
| `getLayerInfo(url)` | promise | Returns the `f=json` for the service |
| `getLayersInfo(url)` | promise | Returns the `f=json` for all layers and tables in the service |

### Feature Service
All the services expose a set of shared helper methods:

| Method |  Returns |Description |
| --- | --- | --- |
| `updateFeature(url, feature, token)` | promise | Update a Feature |
| `updateFeatures(url, features, token)` | promise | Update a set of Features |
| `addFeature(url, feature, token)` | promise | Adds a Feature |
| `addFeatures(url, features, token)` | promise | Adds a set of Features |
| `deleteFeature(url, feature, token)` | promise | Delete a Feature |
| `deleteFeatures(url, features, token)` | promise | Deletes a set of Features |
| `applyEdits(url, adds, updated, deletes, token)` | promise | Applies a set of edits to the service |

### Handling Error Conditions
Barring a catastrophic network or server failure, the ArcGIS Server API will always return a 200, which may contain error information in json.

### Running

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## Resources

* [ArcGIS Hub](http://doc.arcgis.com/en/hub/)
* [ArcGIS for Developers](https://developers.arcgis.com/)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

### Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/Esri/contributing/blob/master/CONTRIBUTING.md).

### License

Copyright (c) 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.
