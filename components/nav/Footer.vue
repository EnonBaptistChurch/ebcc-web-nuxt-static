<template>
  <footer class="footer">
    <div class="footer-container">
      <div>
      
      <div>
      Enon Baptist Church
      </div>
      </div>
      
      <div class="footer-columns">
        
        <!-- About Us Column -->
        <FooterColumn 
          :title="aboutSection.title" 
          :link="aboutSection.link"
          :items="aboutSection.submenu"
        />

        <!-- What's On Column -->
        <FooterColumn 
          :title="whatsonSection.title" 
          :link="whatsonSection.link"
          :items="whatsonSection.submenu"
        />

        <!-- What Is A Christian Column -->
        <FooterColumn 
          :title="whatsaChristianSection.title" 
          :link="whatsaChristianSection.link"
          :items="whatsaChristianSection.submenu"
        />

        <!-- Testimonies & Other Links Column -->
        <div class="footer-column">

          <ul class="column-list additional-links">
            <li><NuxtLink :href="sermonSection.link">{{ sermonSection.title }}</NuxtLink></li>
            <li><NuxtLink :href="findUsSection.link">{{ findUsSection.title }}</NuxtLink></li>
            <li><NuxtLink :href="contactSection.link">{{ contactSection.title }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact & Newsletter Column -->
        <div class="footer-column">
          <div class="contact-section">
            <h4 class="column-title">Lord's Day Services</h4>
            <p>Sunday at 11:15am and 6:30pm</p>
            
            <h4 class="column-title">Location</h4>
            <p>Skinner Street, Chatham, ME4 5RF</p>

            <h4 class="column-title">Follow Us</h4>
            <a 
              href="https://open.spotify.com/show/18dBkVZvm1lsJAwhdJAOY1" 
              target="_blank"
              rel="noopener noreferrer"
              class="spotify-link"
            >
              <svg class="spotify-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ currentYear }} Enon Baptist Church. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import FooterColumn from './FooterColumn.vue';

const aboutSection = {
  title: "About Us",
  link: "/about",
  submenu: [
    { link: "/about/what-we-believe/", title: "What We Believe" },
    { link: "/about/church-history/", title: "Church History" },
    { link: "/about/pastors-message/", title: "Pastor's Message" },
  ]
};

const whatsonSection = {
  title: "What's on",
  submenu: [
    { link: "/whats-on/sunday-services/", title: "Sunday Services" },
    { link: "/whats-on/bible-study/", title: "Bible Study" },
    { link: "/whats-on/womens-meetings/", title: "Women's Meetings" },
    { link: "/whats-on/online-prayer-meeting/", title: "Online Prayer Meeting" },
    { link: "/whats-on/mens-meetings/", title: "Men's Meetings" },
    { link: "/whats-on/youth/", title: "Discoverers" },
    { link: "/whats-on/children/", title: "Children" },
    { link: "/whats-on/first-steps/", title: "First Steps" },
  ],
  link: "/whats-on"
};

const whatsaChristianSection = {
  title: "What Is A Christian?",
  submenu: [
    { link: "/what-is-a-christian/becoming-a-christian/", title: "Becoming a Christian" },
    { link: "/what-is-a-christian/stop-trying-and-start-trusting/", title: "Stop Trying and Start Trusting" }
  ],
  link: "/what-is-a-christian/becoming-a-christian/"
};

const testimonySection = {
  title: "Testimonies",
  submenu: [{ link: "/testimonies/", title: "Graham Trice" }],
  link: "/testimonies/"
};

const sermonSection = { title: "Sermons", link: "/sermons/" };
const findUsSection = { title: "Find Us", link: "/find-us/" };
const contactSection = { title: "Contact Us", link: "/contact-us/" };

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.lines {
  border: 1px solid #000
}
.footer {
  --nav-bar-bg-color: #84c4f4;
  background-color: var(--nav-bar-bg-color);
  color: var(--body-text-color);
  margin-top: 1rem;
  padding: 0rem 0.5rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 0;
}

.column-title a {
  color: inherit;
  text-decoration: none;
}

.column-title a:hover {
  opacity: 0.8;
}

.column-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.column-list li {
  margin-bottom: 0.5rem;
}

.column-list a {
  color: inherit;
  text-decoration: none;
  font-size: 0.875rem;
}

.column-list a:hover {
  opacity: 0.8;
}

.additional-links {
  margin-top: 1.5rem;
}

.contact-section p {
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
}

.contact-section h4 {
  margin-top: 1.5rem;
}

.contact-section h4:first-child {
  margin-top: 0;
}

.spotify-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
  font-size: 0.875rem;
}

.spotify-link:hover {
  color: #1DB954;
}

.spotify-icon {
  width: 24px;
  height: 24px;
}

.newsletter-section {
  margin-top: 2rem;
}

.newsletter-description {
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-input {
  padding: 0.625rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: rgba(255, 255, 255, 0.9);
}

.newsletter-input:focus {
  outline: none;
  border-color: rgba(0, 0, 0, 0.4);
}

.newsletter-button {
  padding: 0.625rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.newsletter-button:hover {
  background-color: #1d4ed8;
}

.footer-bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.875rem;
}

/* Tablet layout */
@media (min-width: 768px) {
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop layout */
@media (min-width: 1024px) {
  .footer {
    padding: 0.5rem 2rem;
  }

  .footer-columns {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>