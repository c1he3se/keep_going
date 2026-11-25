<script setup>
const props = defineProps({
  product: Object
})

const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽'

function goToProduct() {
    if (props.product.inStock) {
        window.location.href = `/product/${props.product.slug}`;
    }
}
</script>

<template>
  <div class="product-card" @click="goToProduct">
    <div class="image-box">
      <img :src="product.image" :alt="product.name" class="product-img" />
      
      <div v-if="product.isNew" class="badge badge-new">NEW</div>
      
      <div v-if="!product.inStock" class="stock">Нет в наличии</div>
    </div>

    <div class="info-row">
      <div class="text-info">
        <h3 class="title">{{ product.name }}</h3>
        
        <div class="prices">
          <span class="price">{{ formatPrice(product.price) }}</span>
          <span v-if="product.oldPrice" class="old-price">{{ formatPrice(product.oldPrice) }}</span>
        </div>
      </div>

      <button class="arrow-btn" @click.stop="goToProduct" :disabled="!product.inStock">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="7" x2="17" y2="17"></line>
          <polyline points="7 17 17 17 17 7"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.product-card:active {
  transform: scale(0.98);
}

.image-box {
  position: relative;
  background-color: #DEDBD4; 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.image-box:has(.stock) .product-img {
  opacity: 0.4;
  transform: none !important;
}

.badge-new {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #D4F33A;
  color: #111111;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  z-index: 2;
}

.stock {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  color: #111111;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
  white-space: nowrap;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.text-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.5px;
}

.prices {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 13px;
  font-weight: 500;
}

.old-price {
  text-decoration: line-through;
  color: #888;
  font-size: 12px;
}

.arrow-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #D4F33A; 
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease; 
  flex-shrink: 0;
}

.arrow-btn:active:not(:disabled) {
  transform: scale(0.85);
}

.arrow-btn:hover:not(:disabled) {
  background-color: #c2e02e;
}

.arrow-btn:disabled {
  background-color: #DEDBD4;
  cursor: not-allowed;
}

.arrow-btn:disabled svg {
  stroke: #888;
}
</style>