<template>
  <div class="container">
    <h2>Nová objednávka</h2>
    <form @submit.prevent="saveOrder" class="order-form">
      <table>
        <thead>
          <tr>
            <th>Datum objednávky</th>
            <th>Vyber kolegu</th>
            <th>Položka</th>
            <th>Cena</th>
            <th>Poplatky za doručení</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in newOrder.items" :key="index">
            <td><input v-model="newOrder.date" type="date" required /></td>
            <td>
              <select v-model="newOrder.colleague" required>
                <option v-for="colleague in colleagues" :key="colleague.id" :value="colleague.id">
                  {{ colleague.name }}
                </option>
              </select>
            </td>
            <td>
              <input v-model="item.name" placeholder="Název položky" required />
            </td>
            <td>
              <input v-model.number="item.price" type="number" placeholder="Cena položky" required />
            </td>
            <td>
              <input v-model.number="newOrder.deliveryFee" type="number" placeholder="Poplatky za doručení" required />
            </td>
            <td>
              <button type="button" @click="removeItem(index)" class="btn remove-item-btn">Odstranit</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="add-item-btn-container">
        <button type="button" @click="addItem" class="btn add-item-btn">Přidat položku</button>
      </div>
      <button type="submit" class="btn submit-order-btn">Uložit objednávku</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const colleagues = ref([]);
const newOrder = ref({
  id: Date.now().toString(),
  date: '',
  colleague: '', // Vybraný kolega se uloží jako ID
  items: [{ name: '', price: 0 }], // Automaticky první položka
  deliveryFee: 0,
  total: 0
});

onMounted(() => {
  colleagues.value = JSON.parse(localStorage.getItem('colleagues')) || [];
  // Přidáme jednu položku automaticky po načtení stránky
  addItem();
});

const saveOrder = () => {
  const newOrderWithTotal = { ...newOrder.value };

  // Přepočítání celkové ceny
  newOrderWithTotal.total = newOrderWithTotal.items.reduce((acc, item) => acc + (item.price || 0), 0) + (newOrderWithTotal.deliveryFee || 0);

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(newOrderWithTotal);
  localStorage.setItem('orders', JSON.stringify(orders));

  router.push('/');
};

const addItem = () => {
  newOrder.value.items.push({ name: '', price: 0 });
};

const removeItem = (index) => {
  if (newOrder.value.items.length > 1) {
    newOrder.value.items.splice(index, 1);
  }
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

/* Tabulka pro objednávku */
.order-form table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-form th, .order-form td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.order-form th {
  background-color: #f8f9fa;
}

.order-form input, .order-form select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.order-form input:focus, .order-form select:focus {
  outline: none;
  border-color: #007bff;
}

/* Tlačítko pro přidání položky */
.add-item-btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.add-item-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-item-btn:hover {
  background-color: #218838;
}

/* Tlačítko pro odstranění položky */
.remove-item-btn {
  padding: 5px 15px;
  background-color: #dc3545;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-item-btn:hover {
  background-color: #c82333;
}

/* Tlačítko pro odeslání objednávky */
.submit-order-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  width: 100%;
}

.submit-order-btn:hover {
  background-color: #0056b3;
}
</style>
