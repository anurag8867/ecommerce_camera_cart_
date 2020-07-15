class AuthRepo {

    async findUser(email, User) {
        return await User.findOne({ where: { email, deleted_at: null } });
    }
    async saveUser(email, password, User) {
        return await User.create({ email, password });
    }
}

module.exports = new AuthRepo();