import InputField from 'components/forms/InputField.vue';
import SelectField from 'components/forms/SelectField.vue';
import OptionsActions from 'components/widgets/OptionsActions.vue';

export default {
  components: {
    InputField,
    SelectField,
    OptionsActions
  },

  props: {
    widgetOptions: {
      type: Object,
      required: true,
    }
  },

  methods: {
    onFormSubmit() {
      if (this.form.$valid) {
        this.$emit('widget:save-new-options', this.options);
      }
    },

    onFormCancel() {
      this.$emit('cancel');
    }
  },

  data() {
    return {
      form: {}
    };
  }
};
