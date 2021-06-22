<template>
  <HelloWorld />
</template>

<script>
import "../node_modules/normalize.css/normalize.css"
import "../node_modules/@cds/core/global.min.css"
import "../node_modules/@cds/core/styles/module.shims.min.css"
import "../node_modules/@cds/city/css/bundles/default.min.css"

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>