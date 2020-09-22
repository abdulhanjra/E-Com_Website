import users from '../controllers/userController'

export default(app) => {
    app.route('/users')
        .post(users.register);
        
}

