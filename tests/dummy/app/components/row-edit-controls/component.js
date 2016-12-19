import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['row-edit-controls'],
  canEdit: Ember.computed('model', function () {
    return (this.get('currentUser') === this.get('model.attributes.Creator'));
  }),

  actions: {
    delete (id) {
      Ember.debug('Delete got id ' + id);
      this.get('onDelete')(id);
    }
  }

});
