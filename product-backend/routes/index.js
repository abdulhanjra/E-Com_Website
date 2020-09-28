import products from '../controllers/productController';
import orders from '../controllers/productController';
import users from '../controllers/userController';
export default(app) => {
    app.route('/products')
        .get(products.getAll)
        .post(products.post);

    app.route('/products/:id')
        .get(products.get)
        .put(products.update)
        .delete(products.delete);

    app.route('/orders')
        .get(orders.getOrders)
        .post(orders.createOrder)

    app.route('/orders/:id')
        .get(orders.getByID)

    // app.post("/authenticate", users.authenticate);
    // app.post("/register", users.register);
    // app.get("/", users.getAll);
    // app.get("/current", users.getCurrent);
    // app.get("/:id", users.getById);
    // app.put("/:id", users.update);
    // app.delete("/:id", users.delete);


    app.route('/users/register').post(users.register);

    app.route('/users/authenticate').post(users.authenticate);

    app.route('/users/getAll').get(users.getAll);

    app.route('/users/getCurrent').get(users.getCurrent);

    app.route('/users/getById/:id').get(users.getCurrent);

    app.route('/users/:id')
        .put(users.update)
        .delete(users.delete);
        
};
