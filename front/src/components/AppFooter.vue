<script setup>
import { ref } from 'vue'
import { api } from '../api/client'

const newsForm = ref(null)
const newsEmail = ref(null)
const newsMessage = ref(null)

async function handleSubscribe(event) {
    event.preventDefault();

    const targetEmail = newsEmail.value.value;
    newsMessage.value.textContent = "";

    const submitButton = newsForm.value.querySelector("button");
    submitButton.disabled = true;
    newsMessage.value.textContent = "Отправка...";
    newsMessage.value.style.color = "#F7F5F0";

    try {
        await api('/api/newsletter', {
            method: "POST",
            body: { email: targetEmail }
        });

        newsMessage.value.textContent = "Спасибо за подписку!";
        newsMessage.value.style.color = "#D4F33A";
    } catch (err) {
        if (err.code === 'ALREADY_SUBSCRIBED') {
            newsMessage.value.textContent = "Этот email уже подписан.";
        } else if (err.code === 'VALIDATION_ERROR') {
            newsMessage.value.textContent = "Проверьте правильность email.";
        } else {
            newsMessage.value.textContent = "Произошла ошибка. Попробуйте позже.";
        }
        newsMessage.value.style.color = "#ff5252";
    } finally {
        submitButton.disabled = false;
        newsForm.value.reset();

        newsEmail.value.addEventListener("input", () => {
            newsMessage.value.textContent = "";
        });
    }
}
</script>

<template>
    <footer class="footer">
        <div class="footer-top">
            <div class="footer-logo">KEEP GOING.</div>
            
            <div class="footer-nav">
                <div class="nav">
                    <a href="#">HOME</a>
                    <a href="#">ABOUT</a>
                    <a href="#">TESTIMONIALS</a>
                </div>
                <div class="nav">
                    <a href="#">STORE</a>
                    <a href="#">BLOG</a>
                    <a href="#">CONTACT</a>
                </div>
            </div>

            <div class="footer-news">
                <h3>SIGN UP TO OUR NEWSLETTER</h3>
                <form ref="newsForm" @submit="handleSubscribe" class="subscribe-form">
                    <input 
                        ref="newsEmail"
                        type="email" 
                        placeholder="YOUR EMAIL" 
                        required
                    />
                    <button type="submit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4F33A" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </form>
                <p ref="newsMessage" class="subscribe-message"></p>
            </div>
        </div>

        <div class="footer-giant-logo">
            <svg viewBox="0 0 1287 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 268.828V2.42188H52.6758V109.136L77.5 2.42188H131.084L101.265 124.424L137.29 268.828H82.041L52.9785 139.863V268.828H0ZM140.323 268.828V2.42188H246.886V53.8867H194.513V105.806H244.767V155.908H194.513V216.909H250.367V268.828H140.323ZM261.877 268.828V2.42188H368.44V53.8867H316.067V105.806H366.321V155.908H316.067V216.909H371.921V268.828H261.877ZM383.431 268.828V2.42188H453.817C468.55 2.42188 480.205 5.7015 488.783 12.2607C497.461 18.82 503.667 28.1543 507.401 40.2637C511.135 52.373 513.002 66.8034 513.002 83.5547C513.002 99.7005 511.437 113.778 508.309 125.786C505.181 137.694 499.58 146.927 491.507 153.486C483.535 160.046 472.183 163.325 457.45 163.325H435.804V268.828H383.431ZM435.804 115.493H438.832C448.721 115.493 454.776 112.718 456.996 107.168C459.216 101.618 460.326 93.444 460.326 82.6465C460.326 72.5553 459.216 64.7852 456.996 59.3359C454.877 53.7858 449.781 51.0107 441.708 51.0107H435.804V115.493ZM645.157 271.25C607.114 271.25 588.092 244.004 588.092 189.512V74.624C588.092 24.8747 609.889 0 653.482 0C671.445 0 685.219 3.63281 694.806 10.8984C704.392 18.0632 711.002 28.5579 714.635 42.3828C718.268 56.2077 720.084 73.0599 720.084 92.9395H668.014V69.3262C668.014 63.5742 667.206 58.7809 665.592 54.9463C664.078 51.0107 660.849 49.043 655.904 49.043C649.749 49.043 645.662 51.1117 643.644 55.249C641.726 59.3864 640.768 63.9274 640.768 68.8721V197.988C640.768 205.153 641.676 211.006 643.492 215.547C645.409 219.987 649.093 222.207 654.542 222.207C660.193 222.207 663.927 219.987 665.743 215.547C667.66 211.006 668.619 205.052 668.619 197.686V159.692H654.391V113.677H719.479V268.828H698.136L689.054 246.426C679.77 262.975 665.138 271.25 645.157 271.25ZM798.044 271.25C776.752 271.25 760.455 264.842 749.153 252.026C737.951 239.11 732.351 220.492 732.351 196.172V69.6289C732.351 46.8229 737.901 29.5166 749.001 17.71C760.202 5.90332 776.55 0 798.044 0C819.538 0 835.835 5.90332 846.936 17.71C858.137 29.5166 863.737 46.8229 863.737 69.6289V196.172C863.737 220.492 858.086 239.11 846.784 252.026C835.583 264.842 819.336 271.25 798.044 271.25ZM798.498 222.207C806.571 222.207 810.608 214.386 810.608 198.745V68.7207C810.608 55.6022 806.672 49.043 798.801 49.043C789.921 49.043 785.481 55.7536 785.481 69.1748V199.048C785.481 207.323 786.49 213.276 788.508 216.909C790.526 220.441 793.856 222.207 798.498 222.207ZM876.61 268.828V2.42188H928.075V268.828H876.61ZM943.066 268.828V2.42188H997.861L1022.38 130.024V2.42188H1073.85V268.828H1021.78L995.136 135.625V268.828H943.066ZM1146.21 271.25C1108.16 271.25 1089.14 244.004 1089.14 189.512V74.624C1089.14 24.8747 1110.94 0 1154.53 0C1172.49 0 1186.27 3.63281 1195.86 10.8984C1205.44 18.0632 1212.05 28.5579 1215.68 42.3828C1219.32 56.2077 1221.13 73.0599 1221.13 92.9395H1169.06V69.3262C1169.06 63.5742 1168.26 58.7809 1166.64 54.9463C1165.13 51.0107 1161.9 49.043 1156.95 49.043C1150.8 49.043 1146.71 51.1117 1144.69 55.249C1142.78 59.3864 1141.82 63.9274 1141.82 68.8721V197.988C1141.82 205.153 1142.73 211.006 1144.54 215.547C1146.46 219.987 1150.14 222.207 1155.59 222.207C1161.24 222.207 1164.98 219.987 1166.79 215.547C1168.71 211.006 1169.67 205.052 1169.67 197.686V159.692H1155.44V113.677H1220.53V268.828H1199.19L1190.1 246.426C1180.82 262.975 1166.19 271.25 1146.21 271.25ZM1232.04 268.677V223.569H1286.23V268.677H1232.04Z" fill="currentColor"/>
            </svg>
        </div>

        <div class="footer-bottom">
            <span>© KEEP GOING / ALL RIGHTS RESERVED</span>
            <a href="#">PUBLIC OFFER</a>
            <a href="#">TELEGRAM</a>
            <a href="#">VK</a>
            <a href="#">SHIPPING & RETURNS</a>
        </div>
    </footer>
</template>

<style scoped>
.footer {
  background-color: #111111;
  color: #F7F5F0;
  padding: 60px 40px 20px;
  margin-top: 60px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 15px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-logo {
  font-weight: 900;
  font-size: 24px;
}

.footer-nav {
  display: flex;
  gap: 40px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav a {
  color: inherit;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.footer-news h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
}

.subscribe-form {
  display: flex;
  align-items: center;
  background-color: #D4F33A;
  border-radius: 50px;
  padding: 4px 6px 4px 16px;
  width: 300px;
}

.subscribe-form input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 700;
  color: #000;
}

.subscribe-form button {
  background-color: #111111;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.subscribe-message {
  margin-top: 8px;
  font-size: 12px;
}

.footer-giant-logo {
  width: 100%;
  margin-bottom: 40px;
  user-select: none;
}

.footer-giant-logo svg {
  width: 100%;
  height: auto;
  display: block;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #333;
  padding-top: 20px;
  font-size: 10px;
  text-transform: uppercase;
  color: #888;
}

.footer-bottom a {
  color: #888;
  text-decoration: none;
}

.footer-bottom a:hover {
  color: #F7F5F0;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 24px 24px;
    border-radius: 0;
  }

  .footer-top {
    flex-direction: column;
    gap: 40px;
  }

  .footer-logo {
    display: none; 
  }

  .footer-news {
    order: -1;
    width: 100%;
  }

  .subscribe-form {
    width: 100%;
    padding: 4px 6px 4px 20px;
    height: 52px;
  }

  .subscribe-form input {
    font-size: 14px;
  }

  .subscribe-form button {
    width: 38px;
    height: 38px;
  }

  .footer-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
  }

  .nav {
    gap: 12px;
  }

  .nav a {
    font-size: 14px;
  }

  .footer-giant-logo {
    margin-top: 40px;
    margin-bottom: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 11px;
  }
  
  .footer-bottom a {
    display: none;
  }
}
</style>