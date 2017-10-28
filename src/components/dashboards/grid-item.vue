<template>
  <div class="">
    {{dashboard.id}} - {{dashboard.name}}
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
