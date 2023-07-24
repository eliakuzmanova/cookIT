const userService = require("../services/userService");
const authService = require("../services/authService");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password)
        const user = await userService.getOne(email);
        user.token = token
        res.status(200).json(user).end()
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.register(username, email, password)
        res.status(200).send(user)
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}