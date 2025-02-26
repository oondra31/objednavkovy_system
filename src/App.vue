<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="header">
    <h1>Objednávkový systém</h1>
    <nav class="navbar">
      <RouterLink to="/" class="nav-link">Objednávky</RouterLink>
      <RouterLink to="/colleagues" class="nav-link">Kolegové</RouterLink>
    </nav>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
/* Základní styl pro hlavičku */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #007bff;
  color: white;
  border-bottom: 3px solid #0056b3;
}

/* Styl pro název aplikace */
.header h1 {
  font-size: 24px;
  font-weight: bold;
}

/* Styl pro navigaci */
.navbar {
  display: flex;
  justify-content: flex-start;
}

.nav-link {
  margin: 0 1rem;
  color: white;
  font-size: 18px;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #0056b3;
}

/* Aktivní stav odkazu */
.nav-link.router-link-active {
  font-weight: bold;
  background-color: #0056b3;
  color: white;
}

/* Styl pro hlavní obsah stránky */
.main-content {
  padding: 2rem;
}

/* Styly pro tlačítka */
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
