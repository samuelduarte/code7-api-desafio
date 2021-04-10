const { Router } = require('express');

const DividaController = require('./app/Controllers/DividaController');
const routes = new Router();


routes.get("/api/dividas", DividaController.index);
routes.get('/api/divida/:id_divida', DividaController.showDetails);
routes.get('/api/divida/user/:user_id', DividaController.search);
routes.post("/api/divida", DividaController.store);
routes.put("/api/divida/:id_divida", DividaController.update);
routes.delete("/api/divida/:id_divida", DividaController.destroy);

module.exports = routes;