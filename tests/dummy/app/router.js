import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('signin');
  this.route('sites', function () {
    this.route('site', {path: '/:id'}, function () {
      this.route('edit');
    });
    this.route('new');
  });
  this.route('portal');
  this.route('harness');
});

export default Router;
