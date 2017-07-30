<template>
  <header :class="$style.container">
    <div :class="$style.left"></div>
    <div :class="$style.center"></div>
    <div :class="$style.right">
      <div
        :class="$style.avatar"
        :style="{backgroundImage: `url('${user.photoURL}')`}"
      />
      <div :class="$style.name">
        {{user.name}}
      </div>
      <button :class="$style.logout">
        <inline-svg :src="logoutIcon" />
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { InlineSVG } from 'app/components';

import * as logoutIcon from 'images/sign-out.svg';

@Component({
  components: {
    'inline-svg': InlineSVG,
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
})
export default class AdminHeader extends Vue {
  logoutIcon = logoutIcon
}
</script>

<style lang="scss" module>
  .container {
    width: 100%;
    background-color: var(--color-primary);
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .center {
    // flex: 1;
  }

  .right {
    display: flex;
    align-items: center;
  }

  .avatar {
    $avatar-size: 40px;
    width: $avatar-size;
    height: $avatar-size;
    border-radius: $avatar-size / 2;
    border: 3px solid var(--color-secondary);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
