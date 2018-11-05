'use strict';



;define('dummy/add-token/util', ['exports', 'ember-arcgis-server-services/add-token/util'], function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _util.default;
    }
  });
});
;define('dummy/app', ['exports', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('dummy/application/route', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    session: Ember.inject.service('session'),

    beforeModel() {
      return this.get('session').fetch().then(() => {
        Ember.debug('User has been automatically logged in... ');
      }).catch(() => {
        Ember.debug('No cookie was found, user is anonymous... ');
      });
    },
    model() {
      // let token = this.get('session.token');
    },
    actions: {
      accessDenied: function () {
        this.transitionTo('signin');
      },
      signout: function () {
        // depending on the type of auth, we need to do different things
        if (_environment.default.torii.providers['arcgis-oauth-bearer'].display && _environment.default.torii.providers['arcgis-oauth-bearer'].display === 'iframe') {
          // redirect the window to the signout url
          window.location = this.get('session.signoutUrl');
        } else {
          this.get('session').close();
          // this.transitionTo('index');
        }
      }
    }
  });
});
;define("dummy/application/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cNrjkozB", "block": "{\"symbols\":[],\"statements\":[[7,\"nav\"],[11,\"class\",\"navbar navbar-default\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"navbar-header\"],[9],[0,\"\\n      \"],[7,\"button\"],[11,\"class\",\"navbar-toggle collapsed\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#navbar\"],[11,\"aria-expanded\",\"false\"],[11,\"aria-controls\",\"navbar\"],[11,\"type\",\"button\"],[9],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"sr-only\"],[9],[0,\"Toggle navigation\"],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"icon-bar\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"ember-arcgis-server-services\"]],\"parameters\":[]},null],[0,\"\\n\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"id\",\"navbar\"],[11,\"class\",\"navbar-collapse collapse\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav\"],[9],[0,\"\\n        \"],[4,\"active-link\",null,null,{\"statements\":[[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"active-link\",null,null,{\"statements\":[[4,\"link-to\",[\"sites\"],null,{\"statements\":[[0,\"Sites\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav navbar-right\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"          \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"signout\"]],[9],[0,\"Sign Out\"],[10],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[4,\"active-link\",null,null,{\"statements\":[[4,\"link-to\",[\"signin\"],null,{\"statements\":[[0,\"Sign In\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n        \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"https://github.com/Esri/ember-arcgis-server-services\"],[9],[0,\"Github\"],[10],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/application/template.hbs" } });
});
;define('dummy/blueprints/surge', ['exports', 'ember-cli-surge/blueprints/surge'], function (exports, _surge) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _surge.default;
    }
  });
});
;define('dummy/components/active-link', ['exports', 'ember-cli-active-link-wrapper/components/active-link'], function (exports, _activeLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _activeLink.default;
});
;define('dummy/components/row-edit-controls/component', ['exports', 'dummy/components/row-edit-controls/template'], function (exports, _template) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _template.default,
    tagName: 'ul',
    classNames: ['row-edit-controls'],
    canEdit: Ember.computed('model', function () {
      return this.get('currentUser') === this.get('model.attributes.Creator');
    }),

    actions: {
      delete(id) {
        Ember.debug('Delete got id ' + id);
        this.get('onDelete')(id);
      }
    }

  });
});
;define("dummy/components/row-edit-controls/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JWa3elGg", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"canEdit\"]]],null,{\"statements\":[[0,\"  \"],[7,\"li\"],[9],[4,\"link-to\",[\"sites.site.edit\",[23,[\"model\",\"attributes\",\"OBJECTID\"]]],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-pencil\"],[9],[10]],\"parameters\":[]},null],[10],[0,\"\\n  \"],[7,\"li\"],[9],[7,\"button\"],[11,\"class\",\"btn btn-danger\"],[3,\"action\",[[22,0,[]],\"delete\",[23,[\"model\",\"attributes\",\"OBJECTID\"]]]],[9],[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-trash\"],[9],[10],[10],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "dummy/components/row-edit-controls/template.hbs" } });
});
;define('dummy/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiIframePlaceholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _toriiIframePlaceholder.default;
});
;define('dummy/ember-arcgis-server-services/tests/addon.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | addon');

  QUnit.test('addon/mixins/ags-service-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/mixins/ags-service-mixin.js should pass ESLint\n\n');
  });

  QUnit.test('addon/mixins/layers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/mixins/layers.js should pass ESLint\n\n');
  });

  QUnit.test('addon/services/feature-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/services/feature-service.js should pass ESLint\n\n');
  });

  QUnit.test('addon/services/image-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/services/image-service.js should pass ESLint\n\n');
  });

  QUnit.test('addon/services/map-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/services/map-service.js should pass ESLint\n\n');
  });

  QUnit.test('addon/services/vector-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/services/vector-service.js should pass ESLint\n\n');
  });

  QUnit.test('addon/utils/add-token.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/utils/add-token.js should pass ESLint\n\n');
  });

  QUnit.test('addon/utils/encode-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/utils/encode-form.js should pass ESLint\n\n');
  });

  QUnit.test('addon/utils/parse-url.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/utils/parse-url.js should pass ESLint\n\n');
  });

  QUnit.test('addon/utils/request.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/utils/request.js should pass ESLint\n\n');
  });

  QUnit.test('addon/utils/should-add-token.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/utils/should-add-token.js should pass ESLint\n\n');
  });
});
;define('dummy/ember-arcgis-server-services/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app/add-token/util.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/add-token/util.js should pass ESLint\n\n');
  });

  QUnit.test('app/encode-form/util.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/encode-form/util.js should pass ESLint\n\n');
  });

  QUnit.test('app/parse-url/util.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/parse-url/util.js should pass ESLint\n\n');
  });

  QUnit.test('app/request/util.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/request/util.js should pass ESLint\n\n');
  });

  QUnit.test('app/services/feature-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/services/feature-service.js should pass ESLint\n\n');
  });

  QUnit.test('app/services/image-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/services/image-service.js should pass ESLint\n\n');
  });

  QUnit.test('app/services/map-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/services/map-service.js should pass ESLint\n\n');
  });

  QUnit.test('app/services/vector-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/services/vector-service.js should pass ESLint\n\n');
  });

  QUnit.test('app/should-add-token/util.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/should-add-token/util.js should pass ESLint\n\n');
  });
});
;define("dummy/ember-arcgis-server-services/tests/templates.template.lint-test", [], function () {
  "use strict";
});
;define('dummy/encode-form/util', ['exports', 'ember-arcgis-server-services/encode-form/util'], function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _util.default;
    }
  });
});
;define('dummy/ext/torii-provider-arcgis', ['torii/services/torii-session', 'torii-provider-arcgis/mixins/gatekeeper'], function (_toriiSession, _gatekeeper) {
  'use strict';

  /*
   * Copyright (c) 2016-2018 Esri
   * Apache-2.0
  */

  /**
   * ext/torii-provider-arcgis.js
   *
   * This file simply re-opens the Torii Session object,
   * using the GateKeeper mixin
   */
  _toriiSession.default.reopen(_gatekeeper.default);
});
;define('dummy/index/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define("dummy/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Jzs8zBaZ", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-12\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"jumbotron\"],[9],[0,\"\\n      \"],[7,\"h1\"],[9],[0,\"Ember ArcGIS Server Services\"],[10],[0,\"\\n      \"],[7,\"p\"],[9],[0,\"A set of Ember Services that abstract working with ArcGIS Server or Hosted Services.\"],[10],[0,\"\\n      \"],[7,\"p\"],[9],[7,\"strong\"],[9],[0,\"Note:\"],[10],[0,\" This addon is under development with feature priority defined by ArcGIS Open Data requirements. PR\\\"s accepted for additional functionality.\"],[10],[0,\"\\n      \"],[7,\"p\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"          \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"signout\"]],[9],[0,\"Sign Out\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[4,\"link-to\",[\"signin\"],[[\"class\"],[\"btn btn-primary\"]],{\"statements\":[[0,\"Sign In\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"alert alert-info\"],[11,\"role\",\"alert\"],[9],[0,\"\\n        Hello \"],[1,[23,[\"session\",\"currentUser\",\"username\"]],false],[0,\", you are currently authenticated.\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"alert alert-danger\"],[11,\"role\",\"alert\"],[9],[0,\"\\n        You are not currently authenticated.\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/index/template.hbs" } });
});
;define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('dummy/initializers/export-application-global', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('dummy/initializers/initialize-torii-callback', ['exports', 'dummy/config/environment', 'torii/redirect-handler'], function (exports, _environment, _redirectHandler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-callback',
    before: 'torii',
    initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      if (_environment.default.torii && _environment.default.torii.disableRedirectInitializer) {
        return;
      }
      application.deferReadiness();
      _redirectHandler.default.handle(window).catch(function () {
        application.advanceReadiness();
      });
    }
  };
});
;define('dummy/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _session, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-session',
    after: 'torii',

    initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      const configuration = (0, _configuration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _session.default)(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
;define('dummy/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'dummy/config/environment'], function (exports, _torii, _configuration, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var initializer = {
    name: 'torii',
    initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _configuration.configure)(_environment.default.torii || {});
      (0, _torii.default)(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports.default = initializer;
});
;define('dummy/initializers/torii-provider-arcgis', ['exports', 'dummy/ext/torii-provider-arcgis'], function (exports, _toriiProviderArcgis) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {}
  // do nothing here...


  // we need to export this stuff...
  /*
   * Copyright (c) 2016-2018 Esri
   * Apache-2.0
  */

  /**
   * initializers/torii-provider-arcgis.js
   *
   * This file is simply here so that it includes the extension file
   * which reopen's the Torii Session, and adds additional methods
   * to it which are useful for ArcGIS Online Sessions
   */
  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "ext" }] */
  exports.default = {
    name: 'torii-provider-arcgis',
    initialize: initialize
  };
});
;define('dummy/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/compat/get-router-instance', 'torii/compat/get-router-lib', 'torii/router-dsl-ext'], function (exports, _routing, _configuration, _getRouterInstance, _getRouterLib) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-setup-routes',
    initialize(applicationInstance /*, registry */) {
      const configuration = (0, _configuration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      let router = (0, _getRouterInstance.default)(applicationInstance);
      var setupRoutes = function () {
        let routerLib = (0, _getRouterLib.default)(router);
        var authenticatedRoutes = routerLib.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _routing.default)(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
;define('dummy/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _containerUtils, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-walk-providers',
    initialize(applicationInstance) {
      let configuration = (0, _configuration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _containerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
;define('dummy/mixins/active-link', ['exports', 'ember-cli-active-link-wrapper/mixins/active-link'], function (exports, _activeLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _activeLink.default;
});
;define('dummy/parse-url/util', ['exports', 'ember-arcgis-server-services/parse-url/util'], function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _util.default;
    }
  });
});
;define('dummy/request/util', ['exports', 'ember-arcgis-server-services/request/util'], function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _util.default;
    }
  });
});
;define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('dummy/router', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('signin');
    this.route('sites', function () {
      this.route('site', { path: '/:id' }, function () {
        this.route('edit');
      });
      this.route('new');
    });
  });

  exports.default = Router;
});
;define('dummy/services/feature-service', ['exports', 'ember-arcgis-server-services/services/feature-service'], function (exports, _featureService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _featureService.default;
    }
  });
});
;define('dummy/services/image-service', ['exports', 'ember-arcgis-server-services/services/image-service'], function (exports, _imageService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _imageService.default;
    }
  });
});
;define('dummy/services/map-service', ['exports', 'ember-arcgis-server-services/services/map-service'], function (exports, _mapService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapService.default;
    }
  });
});
;define('dummy/services/popup', ['exports', 'torii/services/popup'], function (exports, _popup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popup.default;
    }
  });
});
;define('dummy/services/torii-session', ['exports', 'torii/services/torii-session'], function (exports, _toriiSession) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toriiSession.default;
    }
  });
});
;define('dummy/services/torii', ['exports', 'torii/services/torii'], function (exports, _torii) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _torii.default;
    }
  });
});
;define('dummy/services/vector-service', ['exports', 'ember-arcgis-server-services/services/vector-service'], function (exports, _vectorService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _vectorService.default;
    }
  });
});
;define('dummy/should-add-token/util', ['exports', 'ember-arcgis-server-services/should-add-token/util'], function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _util.default;
    }
  });
});
;define('dummy/signin/route', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    deactivate: function () {
      // if you are using iframes, you will need to remove the
      // iframe from the DOM here so torii gets notified that the
      // auth attempt was cancelled.
      Ember.debug('route:signin:deactivate fired...');
    },

    actions: {
      signin: function () {
        this.get('session').open('arcgis-oauth-bearer').then(authorization => {
          Ember.debug('AUTH SUCCESS: ', authorization);
          // transition to some secured route or... so whatever is needed
          this.controller.transitionToRoute('secure');
        }).catch(err => {
          Ember.debug('AUTH ERROR: ', err);
        });
      },

      /**
       * In order to show the iframe when this route loads
       * we add a didTransition hook, and then schedule the
       * session.open to be called after it's rendered
       */
      didTransition: function () {
        // only do this if we are using iframe style
        if (_environment.default.torii.providers['arcgis-oauth-bearer'].display && _environment.default.torii.providers['arcgis-oauth-bearer'].display === 'iframe') {
          // --- USE THIS BLOCK IN YOUR APP --
          Ember.run.schedule('afterRender', this, function () {
            this.get('session').open('arcgis-oauth-bearer').then(authorization => {
              Ember.debug('AUTH SUCCESS: ', authorization);
              // transition to secured route
              this.controller.transitionToRoute('secure');
            }).catch(err => {
              Ember.debug('AUTH ERROR: ' + JSON.stringify(err));
            });
          });
          // -----------------------------------
        }
      }
    }
  });
});
;define("dummy/signin/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "70jSM6XO", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-6\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"usingIframe\"]]],null,{\"statements\":[[0,\"      \"],[7,\"h2\"],[9],[0,\"ArcGIS IFrame Authentication\"],[10],[0,\"\\n      \"],[7,\"p\"],[9],[0,\"\\n        This style of login only works for apps hosted on *.arcgis.com domains.\\n        This allows for the authentication to occur in an iframe instead of a full-page\\n        redirect or a pop-out window.\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[7,\"h2\"],[9],[0,\"ArcGIS Application Authentication\"],[10],[0,\"\\n      \"],[7,\"p\"],[9],[0,\"Press the button below to open the pop-up and sign-in.\"],[10],[0,\"\\n      \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"signin\"]],[9],[0,\"Show Sign In\"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-6\"],[9],[0,\"\\n    \"],[1,[21,\"torii-iframe-placeholder\"],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/signin/template.hbs" } });
});
;define('dummy/sites/index/controller', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    featureService: Ember.inject.service('feature-service'),
    queryParams: ['q'],
    start: 1,
    q: null,
    query: '*',
    num: 10,
    owner: null,
    tags: null,
    typeKeywords: null,
    type: null,

    totalCount: Ember.computed('model.features', function () {
      return this.get('model.features.length');
    }),

    queryChanged: Ember.observer('q', function () {
      this.set('query', this.get('q'));
    }),

    portalItemUrl: Ember.computed('session.portal', function () {
      let cbu = this.get('session.portal.customBaseUrl');
      let urlKey = this.get('session.portal.urlKey');
      return `https://${urlKey}.${cbu}/home/item.html?id=`;
    }),

    currentUser: Ember.computed.reads('session.currentUser.username'),

    actions: {
      filter() {
        this.set('q', this.get('query'));
        // reset the page
        this.set('start', 1);
        this.transitionToRoute('sites.index');
      },
      delete(objectId) {
        Ember.debug('Deleting Id: ' + objectId);
        let token = this.get('session.token');
        let url = _environment.default.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
        this.get('featureService').deleteFeature(url, objectId, token).then(() => /*result*/{
          // instead of refreshing the model for the list, just remove the entry
          let remaining = this.get('model.features').filter(item => {
            return item.attributes.OBJECTID !== objectId;
          });
          this.set('model.features', remaining);
        });
      }

    }
  });
});
;define('dummy/sites/index/route', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    featureService: Ember.inject.service('feature-service'),

    queryParams: {
      'q': { refreshModel: true }
    },

    model(params) {
      let url = _environment.default.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
      let options = {
        includeGeometry: false,
        outFields: '*'
      };
      // use the params to issue a search against this layer
      if (params.q && params.q !== '*') {
        options.where = encodeURI("domain='" + params.q + "'");
      } else {
        options.where = encodeURI('1=1');
      }

      return this.get('featureService').query(url, options);
    }
  });
});
;define("dummy/sites/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hzacVzEQ", "block": "{\"symbols\":[\"row\"],\"statements\":[[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-12\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"form\"],[11,\"class\",\"input-group\"],[3,\"action\",[[22,0,[]],\"filter\"],[[\"on\"],[\"submit\"]]],[9],[0,\"\\n\"],[0,\"        \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"query\"]],\"form-control\",\"Domain\"]]],false],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"input-group-btn\"],[9],[7,\"button\"],[11,\"class\",\"btn btn-default\"],[9],[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-search\"],[9],[10],[10],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[4,\"link-to\",[\"sites.new\"],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[0,\"New\"]],\"parameters\":[]},null],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-12\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"totalCount\"]]],null,{\"statements\":[[0,\"      \"],[7,\"table\"],[11,\"class\",\"table table-striped\"],[9],[0,\"\\n        \"],[7,\"thead\"],[9],[0,\"\\n          \"],[7,\"tr\"],[9],[0,\"\\n            \"],[7,\"td\"],[9],[0,\"Site\"],[10],[0,\"\\n            \"],[7,\"td\"],[9],[0,\"Domain\"],[10],[0,\"\\n            \"],[7,\"td\"],[9],[0,\"Site Id\"],[10],[0,\"\\n            \"],[7,\"td\"],[9],[0,\"Owner\"],[10],[0,\"\\n            \"],[7,\"td\"],[9],[0,\"Client Key\"],[10],[0,\"\\n            \"],[7,\"td\"],[9],[0,\"Actions\"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"tbody\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"features\"]]],null,{\"statements\":[[0,\"            \"],[7,\"tr\"],[9],[0,\"\\n              \"],[7,\"td\"],[9],[1,[22,1,[\"attributes\",\"siteTitle\"]],false],[10],[0,\"\\n              \"],[7,\"td\"],[9],[1,[22,1,[\"attributes\",\"domain\"]],false],[10],[0,\"\\n              \"],[7,\"td\"],[9],[1,[22,1,[\"attributes\",\"siteId\"]],false],[10],[0,\"\\n              \"],[7,\"td\"],[9],[1,[22,1,[\"attributes\",\"Creator\"]],false],[10],[0,\"\\n              \"],[7,\"td\"],[9],[1,[22,1,[\"attributes\",\"clientKey\"]],false],[10],[0,\"\\n              \"],[7,\"td\"],[9],[0,\"\\n                \"],[1,[27,\"row-edit-controls\",null,[[\"model\",\"currentUser\",\"onDelete\"],[[22,1,[]],[23,[\"currentUser\"]],[27,\"action\",[[22,0,[]],\"delete\"],null]]]],false],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"alert alert-info\"],[11,\"role\",\"alert\"],[9],[0,\"\\n        \"],[7,\"h4\"],[9],[0,\"No Results Found.\"],[10],[0,\"\\n        \"],[7,\"p\"],[9],[0,\"Please try another query.\"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\ncurrentUser: \"],[1,[21,\"currentUser\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/sites/index/template.hbs" } });
});
;define('dummy/sites/new/controller', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service('session'),
    featureService: Ember.inject.service('feature-service'),
    status: 'Unsaved.',

    domain: 'foobar.com',
    siteId: '3ef',
    siteName: 'Test Site Foobar.com',

    actions: {
      save() {
        if (!this.get('domain')) {
          this.set('status', 'Domain can not be empty');
          return;
        }
        if (!this.get('siteId')) {
          this.set('status', 'Site Id can not be empty');
          return;
        }
        // check if there is an entry for domain...
        let url = _environment.default.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
        let options = {
          includeGeometry: false,
          outFields: '*'
        };
        options.where = encodeURI("domain='" + this.get('domain') + "'");
        this.get('featureService').query(url, options).then(results => {
          if (results.features.length) {
            // entry already exists
            this.set('status', 'Entry for that domain exists.');
            throw new Error('Entry for that domain exists');
          } else {
            // construct the row and save it...
            let feature = {
              geometry: null,
              attributes: {
                domain: this.get('domain'),
                siteId: this.get('siteId'),
                siteTitle: this.get('siteName'),
                clientKey: this.get('clientKey')
              }
            };
            let token = this.get('session.token');

            return this.get('featureService').addFeature(url, feature, token);
          }
        }).then(addResponse => {
          if (addResponse.addResults.length === 1) {
            this.set('status', 'Saved.');
            this.transitionToRoute('sites');
          }
        }).catch(err => {
          this.set('status', err.message);
        });
      }
    }
  });
});
;define('dummy/sites/new/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define("dummy/sites/new/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oamByO5x", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-6\"],[9],[0,\"\\n    \"],[7,\"h3\"],[9],[0,\"New Entry\"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"DOMAIN\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"domain\"]],\"form-control\",\"Domain\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Site Id\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"siteId\"]],\"form-control\",\"Site Id\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Site Name\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"siteName\"]],\"form-control\",\"Site Name\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Client Key\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"clientKey\"]],\"form-control\",\"Site Name\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"save\"]],[9],[0,\"Save\"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-6\"],[9],[0,\"\\n    \"],[7,\"h3\"],[9],[0,\"Status\"],[10],[0,\"\\n    \"],[1,[21,\"status\"],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/sites/new/template.hbs" } });
});
;define('dummy/sites/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('dummy/sites/site/edit/controller', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service('session'),
    featureService: Ember.inject.service('feature-service'),
    status: 'Unsaved.',

    actions: {
      save() {
        if (!this.get('model.attributes.domain')) {
          this.set('status', 'Domain can not be empty');
          return;
        }
        if (!this.get('model.attributes.siteId')) {
          this.set('status', 'Site Id can not be empty');
          return;
        }
        // check if there is an entry for domain...
        let url = _environment.default.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
        let options = {
          includeGeometry: false,
          outFields: '*'
        };
        options.where = encodeURI("domain='" + this.get('domain') + "'");
        this.get('featureService').query(url, options).then(results => {
          if (results.features.length) {
            // entry already exists
            this.set('status', 'Entry for that domain exists.');
            throw new Error('Entry for that domain exists');
          } else {
            // construct the row and save it...
            let feature = this.get('model');
            let token = this.get('session.token');

            return this.get('featureService').updateFeature(url, feature, token);
          }
        }).then(addResponse => {
          if (addResponse.updateResults.length === 1) {
            this.set('status', 'Saved.');
            this.transitionToRoute('sites');
          }
        }).catch(err => {
          this.set('status', err.message);
        });
      }
    }
  });
});
;define('dummy/sites/site/edit/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.modelFor('sites.site');
    }
  });
});
;define("dummy/sites/site/edit/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bDl2cnaI", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-6\"],[9],[0,\"\\n    \"],[7,\"h3\"],[9],[0,\"Edit Entry\"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Domain\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"model\",\"attributes\",\"domain\"]],\"form-control\",\"Domain\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Site Id\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"model\",\"attributes\",\"siteId\"]],\"form-control\",\"Site Id\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Site Name\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"model\",\"attributes\",\"siteTitle\"]],\"form-control\",\"Site Name\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"\"],[9],[0,\"Client Key\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[23,[\"model\",\"attributes\",\"clientKey\"]],\"form-control\",\"Site Name\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"save\"]],[9],[0,\"Save\"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-6\"],[9],[0,\"\\n    \"],[7,\"h3\"],[9],[0,\"Status\"],[10],[0,\"\\n    \"],[1,[21,\"status\"],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/sites/site/edit/template.hbs" } });
});
;define('dummy/sites/site/route', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    featureService: Ember.inject.service('feature-service'),
    model(params) {
      let url = _environment.default.APP.domainServiceUrl;
      let options = {
        includeGeometry: false,
        outFields: '*'
      };
      if (params.id) {
        options.where = encodeURI('OBJECTID=' + params.id);
      }
      return this.get('featureService').query(url, options).then(results => {
        return results.features[0];
      });
    }
  });
});
;define("dummy/sites/site/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dTGSZVfd", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/sites/site/template.hbs" } });
});
;define("dummy/sites/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O5MCDi6y", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-sm-12\"],[9],[0,\"\\n      \"],[7,\"h2\"],[9],[0,\"Example App\"],[10],[0,\"\\n      \"],[7,\"p\"],[9],[0,\"This app demos working with a feature service. You can create new records, list records, search for records, and - if you own the record - update or delete a record\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/sites/template.hbs" } });
});
;define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FJRY0S8x", "block": "{\"symbols\":[],\"statements\":[[7,\"h2\"],[11,\"id\",\"title\"],[9],[0,\"Welcome to Ember\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
;define('dummy/torii-adapters/application', ['exports', 'dummy/torii-adapters/arcgis-oauth-bearer'], function (exports, _arcgisOauthBearer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _arcgisOauthBearer.default;
});
;define('dummy/torii-adapters/arcgis-oauth-bearer', ['exports', 'dummy/config/environment', 'fetch', '@esri/arcgis-rest-request', '@esri/arcgis-rest-auth', 'torii-provider-arcgis/utils/url-utils'], function (exports, _environment, _fetch, _arcgisRestRequest, _arcgisRestAuth, _urlUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Object.extend({

    authCookieName: 'esri_auth',

    portalBaseUrl: 'https://www.arcgis.com/',

    /**
     * Get the signout url
     */
    signoutUrl: Ember.computed('portalBaseUrl', function () {
      // baseURL is basically deprecated, in preference of rootURL.
      // So, we will use baseURL if present, but prefer rootURL
      let base = _environment.default.baseURL || _environment.default.rootURL;
      return this.get('portalBaseUrl') + '/sharing/rest/oauth2/signout?redirect_uri=' + window.location.protocol + '//' + window.location.host + base;
    }),

    /**
     * Friendlyer means to get provider settings
     */
    settings: Ember.computed('ENV.torii.providers', function () {
      return _environment.default.torii.providers['arcgis-oauth-bearer'];
    }),

    /**
     * Initialize the adapter
     * As it starts up we basically check for various configuration
     * options, and update the defaults
     */
    init() {
      this._super.init && this._super.init.apply(this, arguments);
      if (_environment.default.APP.authCookieName) {
        this.set('authCookieName', _environment.default.APP.authCookieName);
      }
      // Unless working against a portal instance, this can be left as the default
      if (this.get('settings').portalUrl) {
        this.set('portalBaseUrl', this.get('settings').portalUrl);
      } else {
        (true && Ember.warn('ENV.torii.providers[\'arcgis-oauth-bearer\'].portalUrl not defined. Defaulting to https://www.arcgis.com'));
      }
    },

    /**
     * This is called from the provider.open method, and it's job is to
     * fetch additional information from the Portal and populate the torii session service
     */
    open(authentication) {
      let debugPrefix = 'torii adapter.open:: ';
      // create the sessionInfo object that we return at the end of this
      // it is *close* to the object passed in, but it is different
      const sessionInfo = {
        authType: authentication.properties.authType || 'token',
        withCredentials: authentication.properties.withCredentials,
        token: authentication.properties.token
      };
      // instantiate an auth session from what's in the cookie/url hash
      if (!authentication.authMgr) {
        Ember.debug(`${debugPrefix} Creating an AuthMgr`);
        // create the arcgis-rest-js auth manager aka UserSession
        sessionInfo.authMgr = this._createAuthManager(authentication.properties);
      } else {
        Ember.debug(`${debugPrefix} Recieved an AuthMgr`);
        sessionInfo.authMgr = authentication.authMgr;
      }

      let portalSelfPromise;
      // check if authentication.hash contains a portalSelf object
      if (authentication.properties.portalSelf) {
        Ember.debug(`${debugPrefix} Recieved a portalSelf - not making xhr`);
        // webTier has likely occured, so we can side-step the portalSelf call..
        portalSelfPromise = Ember.RSVP.resolve(authentication.properties.portalSelf);
        // get rid of the property so it does not get used in other contexts..
        delete authentication.properties.portalSelf;
      } else {
        // we have to fetch portalSelf
        Ember.debug(`${debugPrefix} Did not recieved a portalSelf - making xhr via AGRjs::getSelf`);
        portalSelfPromise = (0, _arcgisRestRequest.getSelf)({ authentication: sessionInfo.authMgr, fetch: _fetch.default });
      }

      return portalSelfPromise.then(portal => {
        Ember.debug(`${debugPrefix} Recieved portal and user information`);
        sessionInfo.portal = portal;
        sessionInfo.currentUser = portal.user;
        // use the portal to assign the `.portal` to the authMgr
        // authMgr expects a protocol, possible ports and paths
        sessionInfo.authMgr.portal = (0, _urlUtils.getPortalRestUrl)(portal);
        // reomvoe the user prop from the portal
        delete sessionInfo.portal.user;
        // check if we should load the user's groups...
        if (this.get('settings.loadGroups')) {
          Ember.debug(`${debugPrefix} Fetching user groups`);
          return this._fetchUserGroups(sessionInfo.currentUser.username, sessionInfo.authMgr).then(userResponse => {
            // use this user object...
            sessionInfo.currentUser = userResponse;
            return sessionInfo;
          });
        } else {
          return sessionInfo;
        }
      }).then(sessionInfo => {
        // unless web-tier, store the information
        if (sessionInfo.authType !== 'web-tier') {
          sessionInfo.expires = sessionInfo.authMgr.tokenExpires.getTime();
          let sessionData = this._serializeSession(sessionInfo);
          this._store('torii-provider-arcgis', sessionData);
          sessionInfo.signoutUrl = this.get('signoutUrl');
        }
        /**
         * This is what is attached into the torii session service, which we access
         * in Ember apps as `session`
         */
        return sessionInfo;
      }).catch(ex => {
        // console.error(`${debugPrefix} exception occured ${ex}`);
        throw new Error(`${debugPrefix} exception occured ${ex}`);
      });
    },

    /**
     * Fetch the user's groups
     */
    _fetchUserGroups(username, authMgr) {
      // create the url
      const userUrl = (0, _arcgisRestRequest.getPortalUrl)({
        authentication: authMgr
      }) + `/community/users/${username}`;
      // fire off the request...
      return (0, _arcgisRestRequest.request)(userUrl, {
        authentication: authMgr,
        httpMethod: "GET",
        fetch: _fetch.default
      });
    },
    /**
     * Close a session (aka log out the user)
     */
    close() {
      return new Ember.RSVP.Promise((resolve /*, reject */) => {
        // always nuke the localStorage things
        if (window.localStorage) {
          window.localStorage.removeItem('torii-provider-arcgis');
        }
        // TODO find a cleaner means to handle this iframe jiggery pokery
        if (this.get('settings.display') && this.get('settings.display') === 'iframe') {
          throw new Error('To log out of ArcGIS Online, you should redirect the browser to ' + this.get('signoutUrl'));
        }
        resolve();
      });
    },

    /**
     * Rehydrate a session by looking for:
     * - the esri_auth cookie or
     * - localStorage::torii-provider-arcgis
     */
    fetch() {
      let debugPrefix = 'torii adapter.fetch:: ';
      // We want to prefer the cookie over localStorage. This is so that
      // a user can switch accounts / ENV's @ AGO, and the app should use
      // that set of creds, vs what may be in localStorage. If there is
      // no cookie, (which is the case for apps not hosted @ *.arcgis.com)
      // then we look in localStorage
      let savedSession = this._checkCookie(this.get('authCookieName'));
      // failing that look in localStorage
      if (!savedSession.valid) {
        savedSession = this._checkLocalStorage('torii-provider-arcgis');
      }

      // Did we get something from cookie or local storage?
      if (savedSession.valid) {
        Ember.debug(`${debugPrefix} Session is valid, rehydrating session...`);
        // normalize the authData hash...
        let authData = this._rehydrateSession(savedSession.properties);
        // degate to the open function to do the work...
        return this.open(authData);
      } else {
        // This is configurable so we don't even have this option for AGO
        if (this.get('settings.webTier')) {
          Ember.debug(`${debugPrefix} no local session information found. Attempting web-tier...`);
          let portalUrl = this.get('portalBaseUrl');
          return this.attemptWebTierPortalSelfCall(portalUrl).then(authData => {
            // try to open the session.
            return this.open(authData);
          }).catch(ex => {
            Ember.debug(`${debugPrefix} Web-tier failed. User is not logged in. ${ex}`);
            throw new Error(`WebTier Auth not successful.`);
          });
        } else {
          Ember.debug(`${debugPrefix} Web-tier not attempted. Web-tier not enabled for this application.`);
          throw new Error(`WebTier Auth not successful.`);
        }
      }
    },

    /**
     * Attempt to call porta/self sending same-origin credentials
     * If we get a response that has a user object and user.username
     * then we have successfully authenticated using web-tier auth.
     */
    attemptWebTierPortalSelfCall(portalUrl) {
      let debugPrefix = 'torii adapter.attemptWebTierPortalSelfCall:: ';
      // we make the portal/self call directly using fetch so we can control things
      return (0, _fetch.default)(`${portalUrl}/sharing/rest/portals/self?f=json`, { credentials: 'same-origin' }).then(response => {
        return response.json();
      }).then(portalSelf => {
        // many times the portal will return information w/o a token, so we
        // really want to check if we got the user back... if we did... THEN we
        // are pretty sure some web-tier auth has happened... we think.
        if (portalSelf.user && portalSelf.user.username) {
          Ember.debug(`${debugPrefix} Web-tier authentication succeeded.`);
          // in addition to returning the payload, the porta/self call should also
          // have set the esri_auth cookie... which we will now read...
          let result = this._checkCookie(this.get('authCookieName'));
          result.properties.portal = portalUrl;
          result.properties.withCredentials = true;
          let authData = this._rehydrateSession(result.properties);
          // We are sending along the portalSelf we already have so we can short circuit
          // and not make the same call again...
          authData.properties.portalSelf = portalSelf;
          return authData;
        } else {
          // we are not web-tier authenticated...
          Ember.debug(`${debugPrefix} Web-tier portal/self call succeeded but user was not returned. User is not logged in.`);
          throw new Error(`WebTier Auth not successful.`);
        }
      }).catch(ex => {
        Ember.debug(`${debugPrefix} Web-tier authentication failed. User is not logged in. ${ex}`);
        throw new Error(`WebTier Auth not successful.`);
      });
    },
    /**
     * Given a hash of authentication infomation
     * create a UserSession object, whic is an IAuthenticationManager
     * which is used by arcgis-rest::request
     */
    _createAuthManager(settings) {

      let debugPrefix = 'torii adapter._createAuthManager:: ';
      Ember.debug(`${debugPrefix} Creating AuthMgr`);

      // default to the portal as defined in the torii config
      let portalUrl = this.get('settings').portalUrl + '/sharing/rest';
      Ember.debug(`${debugPrefix} Torii Config PortalUrl: ${portalUrl}`);
      // --------------------------------------------------------------------
      // for AGO, the cookie will have urlKey and customBaseUrl,
      // but we can't use this because we may be authenticating against a
      // different environment - so we *must* use the portalUrl from the
      // configuration so that the portal/self call will reject using the
      // token from the rehydrated
      // if (settings.urlKey && settings.customBaseUrl) {
      //   portalUrl = `https://${settings.urlKey}.${settings.customBaseUrl}/sharing/rest`;
      // }
      // --------------------------------------------------------------------
      let options = {
        clientId: settings.clientId,
        // in an ArcGIS Online cookie, the username is tagged as an email.
        username: settings.username ? settings.username : settings.email,
        token: settings.token,
        tokenDuration: parseInt(settings.expires_in),
        portal: portalUrl
      };
      // but if we happen to pass it in, use that...
      if (settings.portal) {
        options.portal = settings.portal;
      }
      // set the tokenExpires date...
      options.tokenExpires = new Date();
      let now = Date.now();
      let expires = new Date(now + options.tokenDuration * 60 * 1000);
      options.tokenExpires = expires;
      Ember.debug(`${debugPrefix} got expiresIn value of ${options.tokenDuration} minutes which equates to ${options.tokenExpires}`);
      // create the arcgis-rest-js auth manager aka UserSession
      let sess = new _arcgisRestAuth.UserSession(options);
      return sess;
    },

    _rehydrateSession(sessionInfo) {
      let debugPrefix = 'torii adapter._rehydrateSession:: ';
      // debug(`${debugPrefix} Rehydrating session ${JSON.stringify(sessionInfo,null,2)}`);
      // create the authData object for open
      let session = {
        properties: sessionInfo
      };
      // calcuate expires_in based on current timestamp
      // web-tier auth cookie does not have the expires property
      // that is because the browser has user creds which never expire.
      // However, arcgis-rest-js's UserSession and request systems
      // expect an expiry so we will simply create one set to 8 hours
      let now = Date.now();
      let expiresIn = 8 * 60; // 8 hous
      if (sessionInfo.expires) {
        Ember.debug(`${debugPrefix} sessionInfo.expires ${sessionInfo.expires} ${new Date(sessionInfo.expires)}`);
        // that said, if the hash does have an expires value (which is a timestamp in ms)
        // then we should use that (converted to minutes from now)
        expiresIn = Math.floor((sessionInfo.expires - now) / 60000);
        Ember.debug(`${debugPrefix} which is ${expiresIn} minutes from now.`);
      }
      session.properties.expires_in = expiresIn;

      // if a poral prop is on the hash - in this case it's the portalUrl
      if (sessionInfo.portal) {
        session.properties.portal = sessionInfo.portal + '/sharing/rest';
      }
      // Previously we had serialized UserSession into localStorage
      // however, that led to issues with cross-env cookies (QA vs PROD vs DEV)
      // Using the hash we originally used pre- ArcGIS Rest JS, does not
      // have this issue.
      session.authMgr = this._createAuthManager(sessionInfo);
      // and return the object
      return session;
    },

    /**
     * Checks local storage for auth data
     */
    _checkLocalStorage(keyName) {
      let debugPrefix = 'torii adapter.checkLocalStorage:: ';

      let result = {
        valid: false
      };

      if (window.localStorage) {
        let stored = window.localStorage.getItem(keyName);
        if (stored) {
          result.properties = JSON.parse(stored);
          if (new Date(result.properties.expires) > new Date()) {
            Ember.debug(`${debugPrefix} Found session information in Local Storage.`);
            result.valid = true;
          } else {
            Ember.debug(`${debugPrefix} Found *expired* session information in Local Storage.`);
          }
        } else {
          Ember.debug(`${debugPrefix} No session information found in Local Storage.`);
        }
      }
      return result;
    },

    /**
     * Stores auth data in local storage
     */
    _store(keyName, object) {
      if (window.localStorage) {
        window.localStorage.setItem(keyName, JSON.stringify(object));
      }
    },

    /**
     * Helper to ensure consistent serialization
     */
    _serializeSession(sessionInfo) {
      let data = {
        accountId: sessionInfo.currentUser.orgId,
        authType: sessionInfo.authType,
        create: sessionInfo.currentUser.created,
        culture: sessionInfo.currentUser.culture,
        customBaseUrl: sessionInfo.portal.customBaseUrl,
        // to mimic the ArcGIS Online cookie, we tag the username as an email.
        email: sessionInfo.currentUser.username,
        expires: sessionInfo.expires,
        region: sessionInfo.currentUser.region,
        role: sessionInfo.currentUser.role,
        // serializing the session actually complicates other things
        //serializedSession: sessionInfo.authMgr.serialize(),
        token: sessionInfo.token,
        withCredentials: sessionInfo.withCredentials
      };
      return data;
    },

    /**
     * Check for and validate a cookie by name
     */
    _checkCookie(cookieName) {
      let debugPrefix = 'torii adapter.checkCookie:: ';
      let result = {
        valid: false,
        properties: {}
      };

      let cookieString = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null; // eslint-disable-line

      if (cookieString) {
        // Ember.debug('torii:adapter:arcgis-oauth-bearer:checkCookie: Found cookie...');
        // parse it
        let cookieData = JSON.parse(cookieString);
        // check if it has expired

        if (new Date(cookieData.expires) > new Date()) {
          // ok it's still valid... we still don't know if
          // it is valid for the env we are working with, but we will return it
          Ember.debug(`${debugPrefix} Cookie session has not expired yet`);
        } else {
          // There is an occasional bug where it seems that we can have valid tokens
          // with expires values in the past. Where this gets really odd is that
          // when we make a call to /authorize ahd this borked cookie is sent along
          // the cookie is not overwritten w/ an updated cookie.
          // Thus, we return the auth data in either case
          Ember.debug(`${debugPrefix} Cookie session has expired - but we are still going to try to use it`);
        }
        result.properties = cookieData;
        // check if we have the auth_tier prop in the cookie...
        // this is only present when web-tier auth is configured for Portal
        if (cookieData.auth_tier) {
          // ensure it's not present in the properties
          delete result.properties.auth_tier;
          // we have web-tier
          result.properties.withCredentials = true;
          result.properties.authType = 'web-tier';
        }
        result.valid = true;
      } else {
        Ember.debug(`${debugPrefix} No session information found in Cookie.`);
      }
      return result;
    }

  });
});
;define('dummy/torii-providers/arcgis-oauth-bearer', ['exports', 'torii/providers/oauth2-bearer', 'torii/configuration', 'dummy/torii-providers/query-string', 'dummy/config/environment'], function (exports, _oauth2Bearer, _configuration, _queryString, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var ArcGISOAuth = _oauth2Bearer.default.extend({

    name: 'arcgis-oauth-bearer',

    // Allow the portalUrl to be passed in, but default to ago
    portalUrl: (0, _configuration.configurable)('portalUrl', 'https://www.arcgis.com'),

    path: '/sharing/oauth2/authorize',

    // construct the authorize end-point url based on the portalUrl
    baseUrl: (0, _configuration.configurable)('baseUrl', function () {
      return `${this.get('portalUrl')}${this.get('path')}`;
    }),

    showSocialLogins: (0, _configuration.configurable)('showSocialLogins', false),

    display: (0, _configuration.configurable)('display', 'default'),

    expiration: (0, _configuration.configurable)('expiration', 20160),

    locale: (0, _configuration.configurable)('locale', 'en-us'),
    // -----------------------------------------------------------------------
    // Note: I tried a number of things to get rid of these eslint errors,
    // and every thing I did caused things to #FAIL. Apparently torii relies
    // on this is some way. :-(
    // -----------------------------------------------------------------------
    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    requiredUrlParams: ['response_type', 'showSocialLogins', 'display', 'expiration', 'locale'],
    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    optionalUrlParams: ['client', 'parent', 'autoAccountCreateForSocial', 'socialLoginProviderName'],
    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    responseParams: ['token', 'state', 'expires_in', 'username'],

    customRedirectUri: (0, _configuration.configurable)('customRedirectUri', ''),

    _currentBaseUrl: function () {
      return [window.location.protocol, '//', window.location.host].join('');
    },

    buildQueryString: function (options) {
      const requiredParams = this.get('requiredUrlParams'); // ['response_type', 'showSocialLogins', 'display', 'expiration', 'locale']; // this.get('requiredUrlParams');
      const optionalParams = this.get('optionalUrlParams');

      const qs = _queryString.default.create({
        provider: this,
        requiredParams: requiredParams,
        optionalParams: optionalParams,
        options
      });

      return qs.toString();
    },

    buildUrl: function (options) {
      let base = this.get('baseUrl');
      if (options.portalUrl || options.path) {
        base = options.portalUrl || this.get('portalUrl');
        const path = options.path || this.get('path');
        base = `${base}${path}`;
      }
      delete options.portalUrl;
      delete options.path;

      const qs = this.buildQueryString(options);

      return [base, qs].join('?');
    },

    /**
    * shows the pop-up/iframe - we override the base implementation so
    * we can merge the passed in options into the object before we show
    * the login
    */
    open: function (options) {
      let debugPrefix = 'torii provider.open:: ';
      options = options || {};

      if (options.remoteServiceName) {
        // torii uses this to determine whether a popout or an iframe is used
        // we need to be able to pass this option in at runtime
        this.set('configuredRemoteServiceName', options.remoteServiceName);
        delete options.remoteServiceName;
      }

      const display = options.display || this.get('display');
      if (display === 'iframe') {
        // the display parameter is sent on the url querystring
        // if we are using an iframe, we need to set the parent to the current domain
        options.parent = this._currentBaseUrl(); // window.location.protocol + '//' + window.location.hostname;
      }

      let uri = '';
      // Check for a customized redirect uri. This can be useful if your app
      // is hosted by rails or some other server-side rendering system, or
      // if you have multiple apps fronted by nginx and you want to centralize
      // the redirects.
      if (this.get('customRedirectUri')) {
        uri = this.get('customRedirectUri');
      } else {
        // Set the redirectUri to the redirect.html that's in the addon's public
        // folder and exposed at /<addon-name>/redirect.html
        // By default torii redirects to the whole ember app, which can be really slow
        // given that it's just 10 lines of js that's needed
        if (_environment.default.baseURL || _environment.default.rootURL) {
          let path = _environment.default.baseURL || _environment.default.rootURL;
          uri = this._currentBaseUrl() + path + 'torii-provider-arcgis/redirect.html';
        } else {
          uri = this._currentBaseUrl() + '/' + 'torii-provider-arcgis/redirect.html';
        }
      }

      this.set('redirectUri', uri);

      let name = this.get('name');
      let url = this.buildUrl(options);
      let responseParams = this.get('responseParams');
      // hopefully someone can explain to me the whole camelize() thing someday
      let clientId = this.get('clientId');
      let portalUrl = this.get('portalUrl') + '/sharing/rest';
      let redirectUri = this.get('redirectUri') + `?clientId=${clientId}`;

      // open the popup/iframe and start polling localStorage for the auth info...
      return this.get('popup').open(url, responseParams, options).then(function (authData) {
        // hey look! Auth info! Let's check if we're missing anything we need...
        var missingResponseParams = [];
        responseParams.forEach(function (param) {
          if (authData[param] === undefined) {
            missingResponseParams.push(param);
          }
        });
        // if so, throw w an error. This would only happen if AGO/Portal changed it's response structure
        if (missingResponseParams.length) {
          throw new Error(`${debugPrefix} The response from the provider is missing these required response params: ${missingResponseParams.join(', ')}`);
        }
        // attach in more info that arcgisRest wants
        authData.clientId = clientId;
        authData.portal = portalUrl;
        // if we went through a sign-in process, then we're not dealing w/ web-tier auth...
        // thus we never have to send the IWA user credentials
        authData.withCredentials = false;
        authData.authType = 'token';
        Ember.debug(`${debugPrefix} is returning with data...`);
        // this hash it passed over to the adapter.open method
        return {
          properties: authData,
          provider: name,
          redirectUri: redirectUri
        };
      });
    }

  }); /*
       * Copyright (c) 2016-2018 Esri
       * Apache-2.0
      */

  /**
   * arcgis-oauth.js
   *
   * torii provider that works with ArcGIS.com oauth
   */
  exports.default = ArcGISOAuth;
});
;define('dummy/torii-providers/query-string', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*
   * Copyright (c) 2016-2018 Esri
   * Apache-2.0
  */

  function isValue(value) {
    return value || value === false;
  }

  function getParamValue(obj, paramName, optional) {
    var camelizedName = Ember.String.camelize(paramName),
        value = Ember.get(obj, camelizedName);

    if (!optional) {
      if (!isValue(value) && isValue(Ember.get(obj, paramName))) {
        throw new Error('Use camelized versions of url params. (Did not find ' + '"' + camelizedName + '" property but did find ' + '"' + paramName + '".');
      }

      if (!isValue(value)) {
        throw new Error('Missing url param: "' + paramName + '". (Looked for: property named "' + camelizedName + '".');
      }
    }

    return isValue(value) ? encodeURIComponent(value) : undefined;
  }

  function getOptionalParamValue(obj, paramName) {
    return getParamValue(obj, paramName, true);
  }

  exports.default = Ember.Object.extend({
    init: function () {
      this.obj = this.provider;
      this.urlParams = Ember.A(Ember.copy(this.requiredParams)).uniq();
      this.optionalUrlParams = Ember.A(Ember.copy(this.optionalParams || [])).uniq();

      this.optionalUrlParams.forEach(function (param) {
        if (this.urlParams.indexOf(param) > -1) {
          throw new Error("Required parameters cannot also be optional: '" + param + "'");
        }
      }, this);
    },

    toString: function () {
      const urlParams = this.urlParams;
      const optionalUrlParams = this.optionalUrlParams;
      const obj = this.obj;
      const keyValuePairs = Ember.A([]);

      const options = this.get('options');
      const optionsKeys = Object.keys(options);

      urlParams.forEach(paramName => {
        if (!optionsKeys.includes(paramName)) {
          var paramValue = getParamValue(obj, paramName);
          keyValuePairs.push([paramName, paramValue]);
        }
      });

      optionalUrlParams.forEach(paramName => {
        if (!optionsKeys.includes(paramName)) {
          var paramValue = getOptionalParamValue(obj, paramName);
          if (isValue(paramValue)) {
            keyValuePairs.push([paramName, paramValue]);
          }
        }
      });

      optionsKeys.forEach(paramName => {
        keyValuePairs.push([paramName, encodeURIComponent(options[paramName])]);
      });

      return keyValuePairs.map(function (pair) {
        return pair.join('=');
      }).join('&');
    }
  });
});
;define('dummy/utils/url-utils', ['exports', 'torii-provider-arcgis/utils/url-utils'], function (exports, _urlUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'getPortalHostname', {
    enumerable: true,
    get: function () {
      return _urlUtils.getPortalHostname;
    }
  });
  Object.defineProperty(exports, 'splitUrl', {
    enumerable: true,
    get: function () {
      return _urlUtils.splitUrl;
    }
  });
  Object.defineProperty(exports, 'getPortalUrl', {
    enumerable: true,
    get: function () {
      return _urlUtils.getPortalUrl;
    }
  });
});
;

;define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("dummy/app")["default"].create({"domainServiceUrl":"https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/sitedomains/FeatureServer/0"});
          }
        
//# sourceMappingURL=dummy.map
