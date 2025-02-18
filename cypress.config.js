const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app/",
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    env: {
      user: {
        username: "pushingit",
        password: "123456!"
      },
      base_url_api: "https://pushing-it-3.onrender.com/api",
      token: null
    }
  }
})

