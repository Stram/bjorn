<template>
  <validate
    tag="label"
    :state="state"
    :class="$style.field"
  >
    <span :class="$style.label">{{label}}:</span>

    <select
      v-model="modelValue"
      required
      :name="fieldName"
      :class="$style.select"
    >
      <option
        disabled
        value=""
      >
        Select
      </option>

      <option
        v-for="option in options"
        :value="option.value"
      >
        {{option.label}}
      </option>
    </select>

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
        required: true
      },

      value: {
        required: true
      },

      state: {
        type: Object,
        required: true
      },

      options: {
        type: Array,
        required: true
      }
    },

    computed: {
      errorMessages() {
        const fieldName = capitalize(spaceCase(this.fieldName));

        return {
          required: `${fieldName} is a required field`
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

  .label {
    margin-right: 8px;
    font-size: 24px;
    color: var(--color-light);
  }

  .select {
    font-size: 24px;
    color: var(--color-light);
    border: 3px solid var(--color-light);
    padding: 4px 8px;
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
