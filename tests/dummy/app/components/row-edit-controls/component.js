import { debug } from '@ember/debug';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['row-edit-controls'],
  canEdit: computed('model', function () {
    return (this.get('currentUser') === this.get('model.attributes.Creator'));
  }),

  actions: {
    delete (id) {
      debug('Delete got id ' + id);
      this.get('onDelete')(id);
    }
  }

});
