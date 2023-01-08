module.exports = {
  apps: [{
    name: "actualizar-loteria-app",
    script: "./app2.js",
    watch: true,
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}