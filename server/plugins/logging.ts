export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    console.log(`[${new Date().toISOString()}] ${event.method} ${event.path}`);
  });

  nitroApp.hooks.hook('afterResponse', (event) => {
    console.log(`[${new Date().toISOString()}] Response: ${event.node.res.statusCode}`);
  });
});