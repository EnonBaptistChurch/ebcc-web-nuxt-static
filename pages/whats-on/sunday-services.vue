<script setup lang="ts">
import SundayMorning from '../../components/sundays/SundayMorning.vue';
import SundayEvening from '../../components/sundays/SundayEvening.vue';
useHead({
  title: 'Sunday Services - Enon Baptist Church',
  meta: [
    {
      name: 'description',
      content: 'Enon Baptist Church, Chatham welcomes you to Sunday Services with Bible preaching, gospel-centered worship, and fellowship.'
    }
  ]
})
</script>

<template>
    <div>
    <div class="text-content">
        <h1>Sunday Services</h1>
        <p>Everyone is given a warm welcome at Enon. Our worship is God-focused and traditional in style. We sing hymns, read the Bible, pray and listen to God speak through the preaching of his Word.</p>
        <p>Questions are very welcome after each service and light refreshments are available. </p>
        <p>If you are new, we generally recommend you come to the morning service. </p>
    
        
    </div>
    <div>
        <SundayMorning class="morning-left" />
        <SundayEvening class="evening-right" />
    </div>
    </div>
</template>

<style scoped>

</style>