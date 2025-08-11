<template>
  <div class="wrapper">
    <form class="form-container">
      <div class="neumorphic-card">
        <div class="header">
          <img src="~/assets/img/poliglotim.svg" alt="Logo" class="logo"/>
        </div>
         <p
         v-for="val in user"
           
          >{{ val }}</p>
           <input
            v-model="user.password"
          />
        <div v-if="error" class="form-error">
          {{ error }}
        </div>
      </div>
    </form>
  </div>
</template>



<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    middleware: ['auth'],
  })

  const user = ref({
    login: '', 
    password: '',
  });
  // const token = useCookie('auth_token');
  var error = ref('')



  // onMounted(async () => {
  //   try {
  //     user.value = await $fetch('/api/user', {
  //       // method: 'POST',
  //       body: token.value,
  //     });

  //   } catch (error) {
  //     error = String(error)
  //   }
  // })
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