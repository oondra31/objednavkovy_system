<template>
  <div class="container">
    <h2>Objednávky</h2>
    <button class="btn add-order" @click="addOrder">Nová objednávka</button>
    <div class="filters">
      <input class="filter-input" v-model="filters.date" type="date" />
      <input class="filter-input" v-model="filters.item" placeholder="Filtr podle položky" />
      <select class="filter-input" v-model="filters.colleague">
        <option value="">Všichni kolegové</option>
        <option v-for="colleague in colleagues" :key="colleague" :value="colleague">{{ colleague.name }}</option>
      </select>
    </div>
    <table class="order-table">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Položky</th>
          <th>Kolegové</th>
          <th>Celková cena</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in filteredOrders" :key="index">
          <td>{{ formatDate(order.date) }}</td>
          <td>
            <ul>
              <li v-for="item in order.items" :key="item.name">{{ item.name }} - {{ item.price }} Kč</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="colleagueId in order.colleagues" :key="colleagueId">
                {{ getColleagueName(colleagueId) }}
              </li>
            </ul>
          </td>
          <td>{{ order.total }}</td>
          <td>
            <button class="btn delete-order" @click="deleteOrder(index)">Odstranit</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Celková částka</td>
          <td>{{ totalAmount }} Kč</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const orders = ref([]);
const filters = ref({
  date: '',
  item: '',
  colleague: ''
});
const colleagues = ref([]);

const router = useRouter();

// Formátování data
const formatDate = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("cs-CZ", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

// Funkce pro získání jména kolegy podle ID
const getColleagueName = (colleagueId) => {
  const colleague = colleagues.value.find(col => col.id === colleagueId);
  return colleague ? colleague.name : 'Neznámý kolega';
};

// Načítání kolegů a objednávek z localStorage
onMounted(() => {
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

  orders.value = storedOrders.map(order => ({
    ...order,
    colleagues: Array.isArray(order.colleagues) ? order.colleagues : [order.colleague].filter(Boolean)
    // Pokud je order.colleagues už pole, necháme ho, jinak ho převedeme na pole
  }));

  colleagues.value = JSON.parse(localStorage.getItem('colleagues')) || [];
});

// Filtruje objednávky podle data, položky a kolegy
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    // Zkontrolujte, jestli máme nějaký filtr kolegy
    const colleagueFilter = filters.value.colleague ? filters.value.colleague.id : '';  // Předpokládáme, že kolega je objekt a hledáme jeho id
    return (
      (filters.value.date ? order.date === filters.value.date : true) &&
      (filters.value.item ? order.items.some(item => item.name.toLowerCase().includes(filters.value.item.toLowerCase())) : true) &&
      (colleagueFilter ? order.colleagues.includes(colleagueFilter) : true)  // Porovnání ID kolegy
    );
  });
});

// Suma celkové částky
const totalAmount = computed(() => {
  return filteredOrders.value.reduce((sum, order) => sum + order.total, 0);
});

const addOrder = () => {
  router.push('/order/new'); // Přesměrování na stránku pro novou objednávku
};

const deleteOrder = (index) => {
  orders.value.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders.value));
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

/* Styly pro nadpis */
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
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
  margin: 10px;
}

.btn:hover {
  background-color: #0056b3;
}

.add-order {
  margin-bottom: 20px;
}

.delete-order {
  background-color: #dc3545;
}

.delete-order:hover {
  background-color: #c82333;
}

/* Filtry */
.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 30%;
}

.filter-input:focus {
  outline: none;
  border-color: #007bff;
}

/* Tabulka */
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-table th,
.order-table td {
  padding: 12px 15px;
  text-align: left;
}

.order-table th {
  background-color: #007bff;
  color: white;
}

.order-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.order-table tr:hover {
  background-color: #f1f1f1;
}

/* Zápatí */
tfoot td {
  font-weight: bold;
  background-color: #f1f1f1;
}
</style>
