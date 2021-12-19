<template>
  <q-page class="flex flex-center">
   <h3> tag Searcher Demo </h3>
    <searcher
      class="justify-center"
    >
    </searcher>
 </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
   components: {
    searcher: require("src/components/tagSearcher.vue").default,    
   }
})
</script>
