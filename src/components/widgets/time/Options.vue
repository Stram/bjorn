<template lang="html">
  <vue-form
    :state="timeWidgetForm"
    @submit.prevent="onFormSubmit"
  >
    <validate
      tag="label"
      :class="$style.field"
    >
      <span :class="$style.label">
        Location:
      </span>
      <input
        v-model="options.location"
        required
        name="location"
        :class="$style.input"
      />

      <field-messages
        name="location"
        show="$touched || $submitted"
        :class="$style.messages"
      >
        <transition
          slot="required"
          name="error-label"
          :appear="true"
        >
          <div
            :class="$style.error"
          >
            Location is a required field
          </div>
        </transition>
      </field-messages>
    </validate>

    <div :class="$style.actions">
      <util-button
        :theme="buttonThemes.OUTLINE"
        :class="$style.action"
        @click="onFormCancel"
      >
        Cancel
      </util-button>

      <util-button
        type="submit"
        :theme="buttonThemes.SECONDARY"
        :class="$style.action"
      >
        Save
      </util-button>
    </div>
  </vue-form>
</template>

<script>
  import FormInput from 'components/forms/FormInput.vue';
  import UtilButton from 'components/utils/Button.vue';
  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      FormInput,
      UtilButton
    },

    props: {
      widgetOptions: {
        type: Object,
        required: true,
      }
    },

    computed: {

    },

    methods: {
      onFormSubmit() {
        this.$emit('widget:saveNewOptions', this.options);
      },

      onFormCancel() {
        this.$emit('cancel');
      }
    },

    data() {
      return {
        timeWidgetForm: {},
        options: {
          location: ''
        },
        buttonThemes
      };
    }
  };
</script>

<style lang="scss" module>
  .label {
    font-size: 24px;
    color: var(--color-light);
    margin-right: 8px;
  }

  .input {
    border-bottom: 3px solid var(--color-light);
    font-size: 24px;
    color: var(--color-light);
    width: 200px;
  }

  .messages {
    overflow: hidden;
    margin-top: 10px;
  }

  .error {
    text-transform: uppercase;
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    font-weight: bold;
    padding: 5px 10px;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .action {
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
</style>
