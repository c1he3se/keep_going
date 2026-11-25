<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    let cartId = localStorage.getItem("cartId");
    const cartCountElement = document.getElementById("cart-count");

    if (cartId) {
        fetch(`http://localhost:3000/api/cart/${cartId}`)
            .then(response => {
                if (response.status === 404) {
                    localStorage.removeItem("cartId");
                    location.reload();
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    cartCountElement.textContent = data.totalQuantity;
                }
            });
    } else {
        fetch("http://localhost:3000/api/cart", {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("cartId", data.id);
                cartCountElement.textContent = data.totalQuantity;
            });
    }
});
</script>

<template>
  <header class="header">
    <a href="/" class="logo">KG</a>

    <div class="header-right">
      <nav class="nav-menu">
        <a href="#" class="nav-link">HOME</a>
        <a href="#" class="nav-link">ABOUT</a>
        <a href="#" class="nav-link">TESTIMONIALS</a>
        <a href="#" class="nav-link">BLOG</a>
        <a href="#" class="nav-link">CONTACT</a>
      </nav>

      <button class="mobile-menu-btn">MENU</button>

      <a href="/cart" class="cart-btn">
        <span class="store-text">STORE</span>
        <div class="cart-info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-text">CART (<span id="cart-count">0</span>)</span>
        </div>
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 900;
  color: #111111;
  text-decoration: none;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-menu {
  display: flex;
  gap: 32px;
  background-color: #DEDBD4; 
  padding: 14px 24px;
  border-radius: 6px;
}

.nav-link {
  font-size: 12px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
}

.mobile-menu-btn {
  display: none;
  background-color: #DEDBD4;
  border: none;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: #DEDBD4;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  color: #000;
  font-size: 12px;
  font-weight: 600;
}

.cart-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .header {
    padding-top: 16px;
    padding-right: 16px;
    padding-left: 16px;
  }

  .logo {
    font-size: 32px;
  }

  .nav-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
    padding: 14px 18px;
    font-size: 12px;
    border-radius: 8px;
  }

  .cart-btn {
    padding: 14px 16px;
    gap: 0;
    border-radius: 8px;
  }

  .store-text {
    display: none;
  }

  .cart-text {
    display: none;
  }

  .cart-info {
    gap: 0;
  }

  .cart-info svg {
    width: 22px;
    height: 22px;
  }

  #cart-count {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 6px;
    right: 78px;
    background-color: #111111;
    color: #D4F33A;
    font-size: 10px;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
}
</style>