import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['row-edit-controls'],
  session: Ember.inject.service('session'),
  userName: Ember.computed('session.currentUser', function () {
    return this.get('session.currentUser.username');
  }),
  canEdit: Ember.computed('model', function () {
    return (this.get('userName') === this.get('model.attributes.Creator'));
  }),

  actions: {
    delete (id) {
      Ember.debug('Delete got id ' + id);
      this.get('onDelete')(id);
    }
  }

});
