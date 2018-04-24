import Service from '@ember/service';
import serviceMixin from '../mixins/ags-service-mixin';
import layerMixin from '../mixins/layers';

export default Service.extend(layerMixin, serviceMixin, {
});
