<template>
  <div class="container">
    <h2>Kolegové</h2>
    <div class="form-container">
      <form @submit.prevent="addColleague" class="add-colleague-form">
        <input class="input-field" v-model="newColleague" placeholder="Jméno a příjmení" required />
        <button class="btn submit-colleague" type="submit">Přidat kolegu</button>
      </form>
    </div>
    <ul class="colleague-list">
      <li v-for="(colleague, index) in colleagues" :key="colleague.id" class="colleague-item">
        {{ colleague.name }}
        <button class="btn remove-colleague" @click="removeColleague(index)">Odstranit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const colleagues = ref([]);
const newColleague = ref('');

onMounted(() => {
  const storedColleagues = JSON.parse(localStorage.getItem('colleagues')) || [];

  // Oprava špatně uložených dat (pokud existují)
  colleagues.value = storedColleagues.map(col => ({
    id: col.id.toString(),
    name: typeof col.name === 'string' ? col.name : col.name.name
  }));

  localStorage.setItem('colleagues', JSON.stringify(colleagues.value)); // Přepíše opravená data
});

const addColleague = () => {
  if (!newColleague.value.trim()) return; // Zabrání přidání prázdného jména

  const newEntry = {
    id: Date.now().toString(), // Unikátní ID
    name: newColleague.value   // Pouze textové jméno
  };

  colleagues.value.push(newEntry);
  localStorage.setItem('colleagues', JSON.stringify(colleagues.value));
  newColleague.value = ''; // Reset input field
};

const removeColleague = (index) => {
  colleagues.value.splice(index, 1);
  localStorage.setItem('colleagues', JSON.stringify(colleagues.value));
};
</script>

<style scoped>
/* Základní resetování stylů */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Kontejner pro celou stránku */
.container {
  width: 80%;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
}

/* Nadpis */
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Formulář pro přidání kolegy */
.form-container {
  margin-bottom: 20px;
}

.add-colleague-form {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.input-field {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 60%;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
}

/* Seznam kolegů */
.colleague-list {
  list-style-type: none;
  padding: 0;
}

.colleague-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.colleague-item:hover {
  background-color: #e2e6ea;
}

/* Tlačítka */
.btn {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.btn:hover {
  background-color: #0056b3;
}

.submit-colleague {
  width: 30%;
  background-color: #28a745;
}

.submit-colleague:hover {
  background-color: #218838;
}

.remove-colleague {
  width: auto;
  background-color: #dc3545;
}

.remove-colleague:hover {
  background-color: #c82333;
}
</style>
