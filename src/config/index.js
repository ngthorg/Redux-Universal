
module.exports = {
  development: {
    API_URL: "http://tocu-api-dev-tranduchieu.c9.io",
  },
  production: {
    API_URL: "http://tocu-api-dev-tranduchieu.c9.io",
  }
}[process.env.NODE_ENV || 'development'];
