<template>
  <div class="container">
    <h1>Christmas Services</h1>

    <section class="service">
      <h2>Carol Service</h2>
      <p>Sunday 14th December at 5:00pm</p>
    </section>

    <section class="service">
      <h2>Family Service</h2>
      <p>Sunday 21st December at 11:15am</p>
    </section>

    <section class="service">
      <h2>Christmas Day Service</h2>
      <p>10:00am</p>
    </section>
  </div>
</template>

<script setup>
// No script logic needed for this static page
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.service {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.service h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.service p {
  font-size: 1.1rem;
}
</style>
