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
  import refreshableMixin from 'mixins/refreshable';

  export default {
    mixins: [refreshableMixin],

    props: {
      widget: {
        type: Object,
        required: true,
      }
    },

    computed: {
      subscribersNumber() {
        return parseInt(this.widget.options.subscribersNumber, 10);
      },

      subscribersLabel() {
        return this.subscribersNumber === 1 ? 'subscriber' : 'subscribers';
      },

      timeToNextIssue() {
        const noonNextIssueDate = moment(this.widget.options.nextIssueDate).add({hours: 12});
        return this.now.to(noonNextIssueDate, true);
      },

      featuredArticle() {
        return this.widget.options.featuredArticleTitle;
      },

      nextIssueDateIsInFuture() {
        return moment(this.widget.options.nextIssueDate).isAfter(this.now);
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
