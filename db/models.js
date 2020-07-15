class Models {
    constructor(sequelize, Sequelize) {
        let user = sequelize.define('user', {
            email: Sequelize.STRING,
            password: Sequelize.STRING
        });
    }

}
module.exports = function (sequelize, Sequelize) {
    new Models(sequelize, Sequelize);
}