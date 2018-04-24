import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from '../config/environment';
export default Route.extend({
  session: service('session'),

  beforeModel () {
    return this.get('session').fetch()
      .then(() => {
        debug('User has been automatically logged in... ');
      })
      .catch(() => {
        debug('No cookie was found, user is anonymous... ');
      });
  },
  model () {
    // let token = this.get('session.token');
  },
  actions: {
    accessDenied: function () {
      this.transitionTo('signin');
    },
    signout: function () {
      // depending on the type of auth, we need to do different things
      if (ENV.torii.providers['arcgis-oauth-bearer'].display && ENV.torii.providers['arcgis-oauth-bearer'].display === 'iframe') {
        // redirect the window to the signout url
        window.location = this.get('session.signoutUrl');
      } else {
        this.get('session').close();
        // this.transitionTo('index');
      }
    }
  }
});
