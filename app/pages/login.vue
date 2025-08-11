<script setup lang="ts">
const user = ref({
  login: '',
  password: '',
});

const formError = ref('');
const isLoading = ref(false);

const validate = () => {
  formError.value = '';
  
  if (!user.value.login.trim()) {
    formError.value = 'Введите имя пользователя';
    return false;
  }

  if (!user.value.password) {
    formError.value = 'Введите пароль';
    return false;
  }

  return true;
};

const login = async () => {
  if (!validate()) return;

  isLoading.value = true;
  formError.value = '';

  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: user.value,
    });

    // Или если в другом поле (подставьте правильное):
    // authToken.value = response.access_token;
    
    await navigateTo('/');
  } catch (error: any) {
    formError.value = error.data?.message || error.message || 'Ошибка при входе';
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="wrapper">
    <form class="form-container" @submit.prevent="login">
      <div class="neumorphic-card">
        <div class="header">
          <img src="~/assets/img/poliglotim.svg" alt="Logo" class="logo"/>
        </div>

        <div class="form-fields">
          <TextField
            label="Имя пользователя"
            v-model="user.login"
            :disabled="isLoading"
          />

          <TextField
            label="Пароль"
            v-model="user.password"
            :obscureText="true"
            :disabled="isLoading"
          />
        </div>

        <div class="button-container">
          <CircleButton 
            icon="material-symbols:keyboard-arrow-up-rounded"
            type="submit"
            :loading="isLoading"
          />
        </div>

        <div v-if="formError" class="form-error">
          {{ formError }}
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
}

.form-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
}

.neumorphic-card {
  width: 100%;
  padding: 40px 30px;
  background: #f1f1f1;
  border-radius: 20px;
  box-shadow: 
    8px 8px 16px rgba(0, 0, 0, 0.1),
    -8px -8px 16px rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.header {
  height: fit-content;
  padding: 2.4rem 0;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.logo {
  width: 250px;
  height: auto;
  object-fit: contain;
}

.form-fields {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.form-error {
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  min-height: 20px;
}

/* Адаптивность */
@media (max-width: 480px) {
  .neumorphic-card {
    padding: 30px 20px;
  }
  
  .logo {
    width: 200px;
  }
}
</style>