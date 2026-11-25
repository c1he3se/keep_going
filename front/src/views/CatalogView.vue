<script setup>
import { ref, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])
const categories = ref([])
const activeCategory = ref('all')
const searchQuery = ref('')
const total = ref(0)
const loading = ref(true)
const error = ref(null)

const page = ref(1)
const totalPages = ref(1)
const limit = 8 

const loadProducts = async (append = false) => {
  loading.value = true
  error.value = null
  try {
    const params = { page: page.value, limit: limit }
    if (activeCategory.value !== 'all') params.category = activeCategory.value
    if (searchQuery.value) params.search = searchQuery.value

    const queryString = new URLSearchParams(params).toString()
    const res = await fetch(`http://localhost:3000/api/products?${queryString}`)
    if (!res.ok) throw new Error('Ошибка сервера')
    
    const data = await res.json()
    
    if (append) {
      products.value = [...products.value, ...data.items]
    } else {
      products.value = data.items
    }
    
    total.value = data.total
    totalPages.value = data.pages
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const loadCategories = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/categories')
    const data = await res.json()
    categories.value = data.items
    total.value = data.total
  } catch (err) {
    console.error('Ошибка категорий', err)
  }
}

const loadMore = () => {
  if (page.value < totalPages.value) {
    page.value++
    loadProducts(true)
  }
}

watch(activeCategory, () => {
  page.value = 1
  loadProducts(false)
})

let searchTimer = null
watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    loadProducts(false)
  }, 300)
})

onMounted(async () => {
  await loadCategories()
  await loadProducts(false)
})
</script>

<template>
  <div class="catalog">
    <div class="catalog-header">
      <h1>ALL</h1>
      <div class="total-circle">{{ total }}</div>
    </div>

    <div class="filters-bar">
      <div class="chips">
        <button 
          class="chip" 
          :class="{ active: activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          All ({{ total }})
        </button>
        
        <button 
          v-for="cat in categories" 
          :key="cat.slug"
          class="chip"
          :class="{ active: activeCategory === cat.slug }"
          @click="activeCategory = cat.slug"
        >
          {{ cat.name }} ({{ cat.productsCount }})
        </button>
      </div>

      <div class="search-box">
        <input type="text" placeholder="Search" v-model="searchQuery" />
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>

    <div v-if="loading && products.length === 0" class="products-grid">
      <div v-for="n in limit" :key="n" class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <div v-else-if="error" class="state-msg error">
      <p>Ошибка: {{ error }}</p>
      <p>Проверьте, запущен ли сервер.</p>
    </div>

    <div v-else-if="products.length === 0" class="state-msg">
      <p>Ничего не нашлось по запросу "{{ searchQuery }}"</p>
    </div>

    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="card-wrapper">
        <ProductCard :product="product" />
      </div>
    </div>

    <div class="load-more-wrapper" v-if="page < totalPages && !loading">
      <button class="load-more-btn" @click="loadMore">
        SHOW MORE ({{ total - products.length }})
      </button>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  padding: 40px;
}

.catalog-header {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

h1 {
  font-size: 84px;
  font-weight: 900;
  margin: 0;
}

.total-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 2px solid #000;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  margin-top: 30px;
  background-color: #F7F5F0;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 16px;
  border-radius: 50px;
  border: 2px solid #000;
  color: #000;
  font-size: 13px;
  font-weight: 600;
  background-color: #F7F5F0;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.chip:active {
  transform: scale(0.95);
}

.chip.active {
  background-color: #000;
  color: #fff;
}

.search-box {
  position: relative;
  background-color: #F7F5F0;
  display: flex;
  align-items: center;
  border: 2px solid #000;
  border-radius: 50px;
  padding: 8px 16px;
  width: 250px;
}

.search-box input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  padding-right: 20px;
  background-color: transparent;
}

.search-icon {
  position: absolute;
  right: 16px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px 16px;
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 100%;
}

.load-more-btn {
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 40px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  width: 100%;
  max-width: 400px;
}

.load-more-btn:hover {
  background-color: #EBE9E4;
}

.load-more-btn:active {
  transform: scale(0.98);
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-img {
  background-color: #E2E0DC;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-line {
  height: 16px;
  background-color: #E2E0DC;
  border-radius: 4px;
  width: 100%;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-line.short {
  width: 50%;
}

.state-msg {
  padding: 60px 20px;
  text-align: center;
  font-size: 18px;
  color: #666;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.state-msg.error {
  color: #d32f2f;
  border-color: #d32f2f;
  background-color: #ffebee;
}

/* --- АДАПТИВ --- */
@media (max-width: 768px) {
  .catalog {
    padding: 20px;
  }

  .catalog-header {
    margin-bottom: 24px;
    align-items: center;
  }

  h1 {
    font-size: 60px;
  }

  .total-circle {
    width: 30px;
    height: 30px;
    font-size: 12px;
    margin-top: 0;
  }

  .filters-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 24px;
  }

  .chips {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .chip {
    width: 100%;
    text-align: left;
    padding: 14px 20px;
    font-size: 14px;
    border-radius: 30px;
  }

  .search-box {
    width: 100%;
    padding: 12px 16px;
    border-radius: 30px;
  }


  .products-grid {
    grid-template-columns: 1fr; 
    gap: 24px; 
  }

  .load-more-wrapper {
    margin-top: 30px;
  }
}
</style>