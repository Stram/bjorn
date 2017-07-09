<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import WidgetModel from 'apps/dashboard/models/Widget';

  @Component({
    props: {
      widget: {
        type: WidgetModel,
        required: true,
      }
    }
  })
  export default class Widget extends Vue {

  }
</script>