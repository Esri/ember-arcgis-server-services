import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default Controller.extend({
  featureService: service('feature-service'),
  // serverUrl: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NapervilleShelters/MapServer',
  serverUrl: 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/tlgdb_2018_a_01_al_gdb/FeatureServer',
  servers: null,
  outputs: null,
  buttonText: computed('state', function () {
    const state = this.get('state');
    if (state === 'working') {
      return 'Running...';
    } else {
      return 'Run';
    }
  }),
  init () {
    this._super(...arguments);
    this.set('outputs', []);
    this.set('servers', [
      {
        url: 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/tlgdb_2018_a_01_al_gdb/FeatureServer',
        desc: 'QA: Private : Hosted FS : Federated : owned by DC Dev'
      },
      {
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NapervilleShelters/MapServer',
        desc: 'QA: Public : Hosted : Not Federated : owned by Sample Server'
      },
      {
        url: 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/Hub%20Events/FeatureServer',
        desc: 'QA: Private : Hosted FS : Federated : Attachments : owned by DC Dev'
      }

    ]);
  },

  async runTests (url) {
    const fs = this.get('featureService');
    this.set('outputs', []);
    this.set('state', 'working');
    const outputs = [];
    // server info...
    try {
      const serverInfo = await fs.getServerInfo(url);
      outputs.push({
        name: 'serverInfo',
        state: 'success',
        json: JSON.stringify(serverInfo, null, 2)
      });
    } catch (err) {
      outputs.push({
        name: 'serverInfo',
        state: 'error',
        json: JSON.stringify(err, null, 2)
      });
    }


    // Auth Info
    try {
      const authInfo = await fs.getAuthInfo(url);
      outputs.push({
        name: 'authInfo',
        state: 'success',
        json: JSON.stringify(authInfo, null, 2)
      });
    } catch (err) {
      outputs.push({
        name: 'authInfo',
        state: 'error',
        json: JSON.stringify(err, null, 2)
      });
    }

    let layerInfo = {};
    try {
      layerInfo = await fs.getLayerInfo(url);
      outputs.push({
        name: 'getLayerInfo',
        state: 'success',
        json: JSON.stringify(layerInfo, null, 2)
      });
    } catch (err) {
      outputs.push({
        name: 'getLayerInfo',
        state: 'error',
        json: JSON.stringify(err, null, 2)
      });
    }

    let layersInfo
    try {
      layersInfo = await fs.getLayersInfo(url);
      outputs.push({
        name: 'getLayersInfo',
        state: 'success',
        json: JSON.stringify(layersInfo, null, 2)
      });
    } catch (err) {
      outputs.push({
        name: 'getLayersInfo',
        state: 'error',
        json: JSON.stringify(err, null, 2)
      });
    }

    // do some layer queryies...
    if (layersInfo.length) {
      const layerUrl = `${url}/0`;
      let allFeatures = {};
      try {
        allFeatures = await fs.query(layerUrl, {where: '1=1', resultRecordCount:2});
        outputs.push({
          name: 'query',
          state: 'success',
          json: JSON.stringify(allFeatures, null, 2)
        });
      } catch (err) {
        outputs.push({
          name: 'query',
          state: 'error',
          json: JSON.stringify(err, null, 2)
        });
      }
      if (allFeatures.features) {
        const attrs = allFeatures.features[0].attributes;
        const id = attrs.objectid || attrs.objectId || attrs.OBJECTID || 0;
        try {
          const byId = await fs.getById(layerUrl, id);
          outputs.push({
            name: 'getById',
            state: 'success',
            json: JSON.stringify(byId, null, 2)
          });
        } catch (err) {
          outputs.push({
            name: 'getById',
            state: 'error',
            json: JSON.stringify(err, null, 2)
          });
        }
        if (layersInfo[0].hasAttachments) {
          try {
            const attachementById = await fs.getAttachmentsById(layerUrl, id);
            outputs.push({
              name: 'getAttachmentsById',
              state: 'success',
              json: JSON.stringify(attachementById, null, 2)
            });
          } catch(err) {
            outputs.push({
              name: 'getAttachmentsById',
              state: 'error',
              json: JSON.stringify(err, null, 2)
            });
          }
        }
      }
    }
    // const allFeaturesFirstLayer = await fs.query(url)



    this.set('outputs', outputs);
    this.set('state', 'done');
  },
  actions: {
    runTests () {
      const url = this.get('serverUrl');
      return this.runTests(url);
    },
    setServerUrl (url) {
      this.set('serverUrl', url);
    }
  }
});
