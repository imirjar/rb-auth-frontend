docker build -t nuxt-app .
docker run -p 3000:3000 -e API_BASE_URL=https://new-api.example.com nuxt-app