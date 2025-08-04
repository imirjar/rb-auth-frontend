<template>
    <div class="user-page">
        <UiNeumorphic :width="400" :height="450" :padding="24">
            <img 
            src="~/assets/img/poliglotim.svg" 
            width="400"
            height="450"
            alt="Logo"
            />
        </UiNeumorphic>
    </div>
</template>

<style scoped>

.logo {
  width: 100px;
  height: 100px;
}

.user-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


<script setup lang="ts">
// import type { UserData } from '~/types/auth';

const user = ref<any | null>(null);

onMounted(async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) return navigateTo('/login');

  try {
    user.value = await $fetch<any>('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    alert('Failed to fetch user data');
    navigateTo('/login');
  }
});
</script>