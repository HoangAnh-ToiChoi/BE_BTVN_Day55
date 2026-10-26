const authService = require("../services/auth.service");

class authController {
    async login(req, res) {
        const data = await authService.login(req.body);
        res.sussces(data);
    }

    async register(req, res) {
        const data = await authService.register(req.body);
        res.sussces(data, 201);
    }

    async refreshToken(req, res) {
        const data = await authService.refreshToken(req.body);
        res.sussces(data, 201);
    }

    async logout(req, res) {
        const data = await authService.logout(req.user.accessToken);

        res.sussces(data, 201);
    }
}

module.exports = new authController();
