<template>
  <div :class="$style.container">
    <slot name="header" />
      <admin-header
        :user="currentUser"
        @logout="onLogout"
      />
    </slot>

    <slot />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { AdminHeader } from 'app/components';

@Component({
  components: {
    AdminHeader,
  }
})
export default class AdminLayout extends Vue {

  get currentUser() {
    return this.$store.getters['session/currentUser'];
  }

  onLogout() {
    this.$store.dispatch('session/logout');
  }
}
</script>

<style lang="scss" module>
  .container {
    background-color: var(--color-light);
    min-height: 100vh;
  }
</style>
