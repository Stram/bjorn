<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import WidgetModel from 'app/models/Widget';

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