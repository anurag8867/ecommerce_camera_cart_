let config = require('config');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let authRepo = require('../repositories/auth');
// let authRepo = new AuthRepo();

class AuthService {

    async login(email, password, User) {
        let user = await authRepo.findUser(email, User);
        if (user) {
            try {
                await bcrypt.compare(
                    String(password),
                    String(user.password)
                );
            } catch {
                throw {
                    message: "Email password mismatch",
                    status: 401
                }
            }
            let token = await this.generateJwt(email, user.id);
            return {
                message: "Logged In Successfully, this token can be utilized for the further calls for this user",
                token,
            };
        }
        throw {
            message: "No User Found with the given email, We would like to request you to signup first",
            status: 404
        };
    }

    async signup(email, password, User) {
        let user = await authRepo.findUser(email, User);
        if (!user) {
            let encryptedPassword = await bcrypt.hash(password, config.get('salt_rounds'));
            let user = await authRepo.saveUser(email, encryptedPassword, User);
            return {
                message: "User Registered successfully, Please login with the same email",
                user,
                status: 201
            };
        }
        throw {
            message: "A user with same email id found. Please login with the same email",
            status: 409
        };
    }

    async generateJwt(email, id) {
        return await jwt.sign({ data: { email, id } },
            config.get('secretKey'),
            {
                expiresIn: config.get('tokenExpireTime')
            }
        );
    }
}

module.exports = new AuthService();