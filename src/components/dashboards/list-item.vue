<template>
  <div class="">
    {{dashboard.id}}
  </div>
</template>

<script>
  export default {
    props: {
      dashboard: {
        type: Object,
        required: true
      }
    }
  }
</script>
