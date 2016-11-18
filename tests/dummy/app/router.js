import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
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
});

export default Router;
