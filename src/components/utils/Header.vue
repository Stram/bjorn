<template>
  <header :class="$style.container">
    <div :class="$style.left">
      <router-link
        :class="$style.link"
        :to="{name: pages.DASHBOARD}"
      >
        Open
      </router-link>
    </div>
    <div :class="$style.center"></div>
    <div :class="$style.right">
      <div
        :class="$style.avatar"
        :style="{backgroundImage: `url('${user.photoURL}')`}"
      />
      <div :class="$style.name">
        {{user.name}}
      </div>
      <button
        :class="$style.logout"
        @click="onLogout"
      >
        <inline-svg :src="logoutIcon" />
      </button>
    </div>
  </header>
</template>

<script>
  import InlineSVG from 'components/utils/InlineSVG.vue';

  import {pages} from 'router';

  import * as logoutIcon from 'images/sign-out.svg';

  export default {
    components: {
      'inline-svg': InlineSVG,
    },

    props: {
      user: {
        type: Object,
        required: true,
      }
    },

    methods: {
      onLogout() {
        this.$emit('logout');
      }
    },

    data() {
      return {
        logoutIcon,
        pages
      };
    }
  };
</script>

<style lang="scss" module>
  .container {
    width: 100%;
    background-color: var(--color-primary);
    height: 60px;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .link {
    height: 100%;
    background-color: var(--color-secondary);
    text-transform: uppercase;
    color: var(--color-light);
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
  }

  .name {
    font-size: 24px;
    font-weight: bold;
    color: var(--color-light);
    padding: 0 16px;
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

  .logout {
    background-color: var(--color-secondary);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
  }
</style>
