# ember-arcgis-server-services Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
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
