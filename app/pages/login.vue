<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="neumorphic-card">
        <div class="header">
          <img src="~/assets/img/poliglotim.svg" alt="Logo" class="logo"/>
        </div>

        <div class="form-fields">
          <UiTextField
            label="Имя пользователя"
            v-model="user.username"
          />

          <UiTextField
            label="Пароль"
            v-model="user.password"
            :obscureText="true"
          />
        </div>

        <div class="button-container">
          <UiCircleButton 
            icon="material-symbols:keyboard-arrow-up-rounded"
            @click="handleSubmit"
          />
        </div>

        <div v-if="formError" class="form-error">
          {{ formError }}
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const user = ref({
  username: '', 
  password: '',
});
const formError = ref('')

const validate = () => {

  if (!username.value) {
    errors.value.username = 'Введите имя пользователя'
    valid = false
  }

  if (!password.value) {
    errors.value.password = 'Введите пароль'
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validate()) {
    formError = "alsdfhlasdf"
    return
  }

  const {token} = await useFetch('/api/login'); // call authenticateUser and pass the user object
  console.log(token)

  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
}
</script>

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