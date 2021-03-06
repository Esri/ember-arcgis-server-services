# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

### [Unreleased][HEAD]

## [2.0.0]

### Fixed
- authenticated sessions are now passed through consistently, with appropriate behavior for both secure federated and public non-federated services

### Changed
- ArcGIS REST JS v2.x is now used under the hood
- ember-auto-import is now used to load ArcGIS REST JS

## [1.7.3] - January 14th, 2019
### Fixed
- tokens are no longer appended to [non-federated](http://enterprise.arcgis.com/en/portal/latest/administer/linux/federate-an-arcgis-server-site-with-your-portal.htm) ArcGIS Server calls.

## [1.7.2]
### Fixed
- Authentication is only passed by getLayer and getLayersInfo when an anonymous request triggers an error

## [1.7.1]
### Fixed
- getById, getAttachmentsById were not passing the session auth to ArcGIS REST JS

## 1.7.0
### Fixed
- update token logic to handle cases where services have UPCASED server names, but portalHostname is lowercase.

## 1.6.0
### Changed
- fixed deploy script by installing ember-cli-github-pages
- upgrade torii-provider-arcgis to 2.2 (ember 3.5)

## 1.5.0
### Changed
- configure eslint to prohibit use of jQuery
- configure eslint to prohibit use of global fetch
- bump ember to 3.5

## 1.4.1
### Changed
- bump to torii-provider-arcgis 2.0

## 1.4.0
### Added
- feature-service methods for working with attachments

## 1.3.1
### Fixed
- shouldAddToken appends token if server, portal, and owning system are same host
- fixed lint error so that we can run tests in travis
- copy travis/testem config from ember-arcgis-portal-services

## 1.3.0
### Changed
- upgraded many dependencies, as well as Ember 2.18.0. External API's are the same
- unit tests now passing

## 1.2.2
### Changed
- replace ember-network w/ ember-fetch

## 1.2.1
### Changed
- Set `isDevelopingAddon` to `false` so addon is not linted in comsuming projects.

## 1.2.0
### Changed
- ags-service-mixin::shouldAddToken returns false without caching if portalInfo is not provided

## 1.1.0
### Changed
- `parseServiceUrl` and `parseServerUrl` now return the passed in url, stripped of any query string, if matches not found

## 1.0.1
### Fixed
- Cannot read property 'portalHostname' of undefined error if session.portal is undefined

## 1.0.0
### Added
- `ags-service-mixin::shouldAddToken` method
- deprecated `ags-service-mixin::getServiceInfo` method in favor of `getLayerInfo`
- `ags-service-mixin::getAuthInfo` method
### Changed
- utils/shouldAddToken now takes `url, serverInfo, portalInfo`

## 0.4.9
### Fixed
* Use Portal Host instead of current domain to determine whether token should fly

## 0.4.8
### Fixed
* Catch exception in token logic

## 0.4.7
### Changed
* Pass token along when current domain matches server domain

## 0.4.6
### Changed
* Add token on ArcGIS premium content servers

## 0.4.5
- `getLayerInfo()` signature changed to require `options`. This caused regressions in down-stream applications. Made `options` default to `{}`.
- added sanity tests to `feature-service`

## 0.4.4
### Fixed
- `getLayerInfo()` signature changed to require `options`. This caused regressions in down-stream applications. Made `options` default to null.

## 0.4.3
### Fixed
* add token even if portal id is mixed case

## 0.4.2

## 0.4.1
### Fixed
* Correct reference to `encodeForm`

## 0.4.0
### Added
* Export utlity for adding token

## 0.3.0
### Added
* Add token if available for hosted services that belong to the user's organization
* Add token if available for services using the secure server proxy

## 0.2.0
### Added
* Map Service supports getLayerInfo, getLayersInfo, getServerInfo
* New "Vector Service" supports common features between map and feature service

## 0.1.4
### Changed
- remove ember-ajax and related code

## 0.1.3
### Fixed
- fix watch error caused by missing folder
- added `surge` and `github` environment settings
- updated `npm run deploy` to use the `github` environment

## 0.1.2
### Changed
- updated form encoding to use `encodeURIComponent`

## 0.1.1
### Added
- feature-service::getById
- updated readme

## 0.1.0
### Added
- feature-service - getServiceInfo,query,add,delete,update,getLayerInfo
- map-service - getServiceInfo, getLayerInfo

[HEAD]: https://github.com/Esri/ember-arcgis-server-services/compare/v2.0.0...HEAD "Unreleased Changes"
[2.0.0]: https://github.com/Esri/ember-arcgis-server-services/compare/v1.7.3...v2.0.0 "v2.0.0"
[1.7.3]: https://github.com/Esri/ember-arcgis-server-services/compare/v1.7.2...v1.7.3 "v1.7.3"
[1.7.2]: https://github.com/Esri/ember-arcgis-server-services/compare/v1.7.1...v1.7.2 "v1.7.2"
[1.7.1]: https://github.com/Esri/ember-arcgis-server-services/compare/v1.7.0...v1.7.1 "v1.7.1"
