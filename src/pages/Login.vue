<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">
      <button
        :class="$style.button"
        :disabled="isLoginInProgress"
        @click="onLoginButtonClick"
      >
        <span
          :class="$style.buttonText"
        >
          Login
        </span>

        <div
          ref="loader"
          :class="$style.loader"
        ></div>
      </button>

      <transition name="fade" appear>
        <div
          v-if="loginErrorMessage"
          :class="$style.error"
        >
          {{loginErrorMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {pages} from 'router';
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      isLoginInProgress() {
        return this.$store.getters['session/isLoading'];
      },

      loginErrorMessage() {
        return this.$store.getters['session/errorMessage'];
      }
    },

    methods: {
      onLoginButtonClick() {
        this.$store.dispatch('session/login').then(() => {
          if (this.$store.getters['session/isAuthenticated']) {
            this.$router.push({
              name: pages.ADMIN,
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  @keyframes login-loader {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(100%);
    }
  }

  .container {
    @include flex();
    height: 100vh;
    background-color: var(--color-primary);
  }

  .wrapper {
    position: relative;
  }

  .button {
    padding: 20px 120px;
    background-color: var(--color-light);
    color: var(--color-primary);
    line-height: 160px;
    font-size: 130px;
    font-weight: 900;
    text-transform: uppercase;
    position: relative;

    transition: transform 300ms ease;

    &:disabled {
      .button-text {
        opacity: 0;
      }

      .loader {
        transform: scale(1);

        &::before {
          animation-name: login-loader;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-duration: 2s;
          animation-delay: 1s;
          opacity: 1;
        }
      }
    }

    &:hover {
      &:not(:disabled) {
        transform: scale(1.1);
      }
    }
  }

  .button-text {
    transition: opacity 700ms ease;
  }

  .loader {
    position: absolute;
    background-color: var(--color-primary);
    overflow: hidden;
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    transform: scale(0);
    transition: transform 1000ms ease;

    &::before {
      @include stretch();
      content: '';
      transform: translateX(-100%);
      background-color: var(--color-secondary);
      will-change: transform;
      opacity: 0;
      transition: opacity 300ms ease;
    }
  }

  .error {
    @include stretch(absolute, auto, 0, auto, 0);
    font-size: 18px;
    font-weight: bold;
    color: var(--color-primary);
    background-color: var(--color-secondary);
    transform: translateY(34px);
    padding: 16px;
    text-align: center;
  }
</style>
