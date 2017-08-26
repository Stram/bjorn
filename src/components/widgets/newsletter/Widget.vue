<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">Newsletter</div>
    <div :class="$style.spacer"></div>
    <div :class="$style.text">
      <span :class="$style.textBold">{{subscribersNumber}}</span> {{subscribersLabel}}
    </div>
    <div
      v-if="nextIssueDateIsInFuture"
      :class="$style.text"
    >
      next issue in <span :class="$style.textBold">{{timeToNextIssue}}</span>
    </div>
    <div :class="$style.spacer"></div>
    <div :class="$style.featuredTitle">Featured:</div>
    <div :class="$style.featuredArticle">{{featuredArticle}}</div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      widget: {
        type: Object,
        required: true,
      }
    },

    computed: {
      subscribersNumber() {
        return this.widget.options.subscribersNumber;
      },

      subscribersLabel() {
        return this.subscribersNumber === '1' ? 'subscriber' : 'subscribers';
      },

      timeToNextIssue() {
        // TODO: refresh rate
        const noonNextIssueDate = moment(this.widget.options.nextIssueDate).add({hours: 12});
        return moment().to(noonNextIssueDate, true);
      },

      featuredArticle() {
        return this.widget.options.featuredArticleTitle;
      },

      nextIssueDateIsInFuture() {
        // TODO: after now
        return moment(this.widget.options.nextIssueDate).isAfter();
      }
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .wrapper {
    border: 10px solid var(--color-secondary);
    padding: 24px 32px;
    color: var(--color-secondary);
    background-color: var(--color-light);
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }

  .title {
    text-transform: uppercase;
    font-size: 36px;
    font-weight: bold;
  }

  .text {
    font-size: 24px;
  }

  .text-bold {
    font-size: 36px;
    font-weight: bold;
  }

  .spacer {
    flex: 1;
  }

  .featured-title {
    text-transform: uppercase;
    font-size: 24px;
  }

  .featured-article {
    @include ellipsis;
    font-size: 32px;
    font-weight: bold;
  }
</style>
