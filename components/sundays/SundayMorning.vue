<template>
<div class="text-content">
    <h1>Sunday Morning Service - 11:15AM</h1>
    <div class="morning-image">
    <img src="/images/building/from_the_front.jpg" class="morning-worship-image" alt="">
    </div>
    <p>Join us for our Sunday morning service, where we gather to worship, pray, and hear from God's Word.</p>
    
    <p>Parents with little ones are welcome too! There’s a crèche available in the room just behind the pastor, where you can take your children if needed.</p>
    <p>For older children, we provide sermon worksheets partway through the service to help them engage with what’s being taught.</p>
</div>
</template>

<style scoped>
.morning-image {
  padding: 0 1rem 0 1rem;
}

.morning-worship-image {
  max-height: 450px;
  max-width: 1920px;
  height: auto;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center 30%;
}

@media (min-width: 800px) and (max-width: 1200px) {
  .morning-worship-image {
    max-height: 300px;
  }
}

@media (min-width: 601px) and (max-width: 800px) {
  .morning-worship-image {
    max-height: 200px;
  }
}

@media (max-width: 600px) {
  .morning-worship-image {
    max-height: 100px;
  }
}

</style>