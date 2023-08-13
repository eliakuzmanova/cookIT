const userService = require("../services/userService");

exports.getOne = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userService.getOne(email);
        res.status(200).send(user);

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getOneById = async (req, res) => {

    try {
        const {id} = req.params
        const user = await userService.getOneById(id);
        res.status(200).send(user);

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.editProfile = async (req, res) => {

    try {
   
        let imagePath;

        imagePath = req.file?.path
        const { userId, username, email } = req.body
        
        if(!imagePath){
            const {image} = req.body
            imagePath = image
        }

        const updatedUser = await userService.updateUserById(userId, { username, email, image: imagePath });

        res.status(200).send(updatedUser);

    } catch (err) {
        res.status(403).send(err);
    }
}
