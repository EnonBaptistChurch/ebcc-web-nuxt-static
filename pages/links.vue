<template>
  <div class="container">
    <h2>Local Church Links</h2>
    <p>We have links locally with other likeminded churches across Medway.</p>
    <p>We have joint  midweek meetings across the year to hear God's word and to prayer for the other churches.</p>

    <div class="church-grid">
      <section v-for="church in localChurches" :key="church.name" class="service">
        <h2><a :href="church.url" target="_blank" rel="noopener">{{ church.name }}</a></h2>
        <p class="church-description">{{ church.description }}</p>
        <p class="location" v-if="church.location"><strong>Meeting Location:</strong><br/> {{ church.location }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const localChurches = [
{
    name: 'Granary Evangelical Church',
    url: 'https://granarychurch.org.uk/',
    pastor: 'Danny Hawkes',
    description: 'A small, friendly, Evangelical church meeting to worship God in Rainham, Kent',
    meetings: 'Sundays at 10:30am',
    location: 'Rainham Community Centre, Granary Close, Rainham, Kent, ME8 7SG'
  },  
{
    name: 'Halling Baptist Church',
    url: 'https://hallingbaptist.org.uk/',
    pastor: 'Kevin Félix Hollington',
    description: 'A Grace Baptist Partnership Church in Halling.',
    meetings: 'Sundays at 10:30am',
    location: 'The Old Fire Station, Vicarage Road, Halling, Rochester, Kent ME2 1BE'
  },
  {
    name: 'Waterford House Evangelical Free Church',
    url: 'https://whefc.co.uk/',
    pastor: 'Timothy Wood',
    description: 'An Independent Evangelical Church in Strood.',
    location: '101 Rede Ct Rd, Rochester ME2 3TE'
  },
  {
    name: 'Wigmore Evangelical Free Church',
    url: 'https://www.wigmorefreechurch.org.uk/',
    pastor: 'Adrian Tribe',
    description: 'An FIEC church based in Wigmore, Gillingham.',
    location: 'Durham Road, Rainham, Kent, ME8 0JN'
  }
]
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0.5rem;
  font-family: Arial, sans-serif;
  text-align: center;
}
.church-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  align-items: stretch;
}
.service {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 10px;
  align-items: start;

  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
}
a {
    color: #2c3e50;
    text-decoration: none;
}

.church-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  align-items: stretch;
}

.service {
  display: grid;
  grid-template-rows: auto auto auto; /* name, description, location */
  gap: 10px;
  align-items: start;

  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.service h2 {
  font-size: 1.25rem;
  margin: 0;
}

.service p {
  font-size: 1.1rem;
  margin: 0;
}

.service p.church-description {
  font-style: italic;
  color: #555;
  font-size: 1rem; /* or whatever you want */
}

.service p.location {
  font-style: italic;
  color: #555;
  font-size: 0.85rem; /* or whatever you want */
}

</style>
