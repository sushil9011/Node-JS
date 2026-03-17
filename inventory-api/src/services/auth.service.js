const User = require('../models/User'); 

class AuthService {
    async registerUser(data) {
        return await User.create(data);
    }

    async fetchSingleUser(query, isLean = true) {
        if (isLean) return await User.findOne(query).lean();
        return await User.findOne(query);
    }
}

module.exports = AuthService;