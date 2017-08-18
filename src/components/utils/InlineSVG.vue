<template lang="html">
  <div v-html="src"></div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        required: true,
      }
    }
  };
</script>
