<template>
  <validate
    tag="label"
    :state="state"
    :class="$style.field"
  >
    <span :class="$style.label">{{label}}:</span>

    <input
      v-model="modelValue"
      v-if="type === 'number'"
      type="number"
      :required="required"
      :name="fieldName"
      :class="$style.input"
    />

    <input
      v-model="modelValue"
      v-else
      type="text"
      :required="required"
      :name="fieldName"
      :class="$style.input"
    />

    <span :class="$style.sufix">{{sufix}}</span>

    <field-messages
      show="$touched || $submitted"
      :state="state"
      :name="fieldName"
      :class="$style.messages"
    >
      <transition
        v-for="(message, errorType) in errorMessages"
        name="error-label"
        :key="errorType"
        :slot="errorType"
        :appear="true"
      >
        <div :class="$style.error">{{message}}</div>
      </transition>
    </field-messages>
  </validate>
</template>

<script>
  import {capitalize, spaceCase} from 'utils/string';

  export default {
    props: {
      label: {
        type: String,
        required: true
      },

      fieldName: {
        type: String,
        required: true,
      },

      required: {
        type: Boolean,
        default: false
      },

      value: {
        required: true,
      },

      state: {
        type: Object,
        required: true
      },

      type: {
        type: String,
        defaults: 'text'
      },

      sufix: {
        type: String,
        default: ''
      }
    },

    computed: {
      errorMessages() {
        const fieldName = capitalize(spaceCase(this.fieldName));

        return {
          required: `${fieldName} is a required field`,
          number: `${fieldName} must be a number`
        };
      },

      modelValue: {
        get() {
          return this.value;
        },

        set(payload) {
          this.$emit('input', payload);
        }
      }
    }
  };
</script>

<style lang="scss" module>
  .field {
    display: block;
    padding: 10px 0;
  }

  .label,
  .sufix {
    font-size: 24px;
    color: var(--color-light);
  }

  .label {
    margin-right: 8px;
  }

  .sufix {
    margin-left: 8px;
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
</style>
