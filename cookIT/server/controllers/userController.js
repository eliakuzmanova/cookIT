const userService = require("../services/userService");
const recipeService = require("../services/recipeService");

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
       console.log("hello");
        let imagePath;

        imagePath = req.file?.path
        console.log(req.body);
        const { userId, username, email } = req.body
        
     
        if(!imagePath){
            const {image} = req.body
            imagePath = image
        }

        await userService.updateUserById(userId, { username, email, image: imagePath });

        res.status(200).end();

    } catch (err) {
        res.status(403).send(err);
    }

}

// exports.getOneByUsernameWithRel = async (req, res) => {

//     try {
//         const { username } = req.body

//         const user = await userService.getOneByUsernameWithRetentions(username);

//         res.status(200).send(user);

//     } catch (err) {
//         res.status(400).send(err);
//     }

// }

// exports.getOneWithNonFollow = async (req, res) => {

//     try {
 
//         const { id } = req.body
  
//         const nonFollow = []
//         const user = await userService.getOneWithNonFollow(id);
//         const follows = user.follow

//         const allUsers = await userService.getAll()

//         for (const user of allUsers) {
//             let isNonFollow = [];
            
//            follows.map((follow) => {
            
//             (follow._id.toString() !== user._id.toString()) && (user._id.toString() !== id)
//             ? isNonFollow.push(true)
//             : isNonFollow.push(false)
          
//            })
//            if(!follows.length && (user._id.toString() !== id)) {
//             isNonFollow.push(true)
//            }
      
          
//            if(!isNonFollow.includes(false) && isNonFollow.length) {
           
//             nonFollow.push(user);
            
//         }
//          }
    
//         const users = nonFollow.reverse().slice(0,3);
   
//         res.status(200).send(users);

//     } catch (err) {
//         res.status(400).send(err);
//     }

// }



// exports.addFollower = async (req, res) => {

//     try {

//         const { email, userId } = req.body

//         const user = await userService.getOne(email)
//         user.followers.push(userId)
//         await userService.updateUserById(user._id, user)
//         const updatedUser = await userService.getOneByUsernameWithRetentions(user.username);

//         const follower = await userService.getOneById(userId);
//         follower.follow.push(user._id)
//         await userService.updateUserById(userId, follower)


//         res.status(200).send(updatedUser);

//     } catch (err) {
//         res.status(403).send(err);
//     }

// }

// exports.removeFollower = async (req, res) => {

//     try {

//         const { email, userId } = req.body
//         const user = await userService.getOne(email)

//         const filteredFollowers = user.followers.filter(f => f._id.toString() !== userId)

//         await userService.updateUserById(user._id, { ...user, followers: filteredFollowers })
//         const updatedUser = await userService.getOneByUsernameWithRetentions(user.username);

//         const follower = await userService.getOneById(userId);

//         const filteredFollow = follower.follow.filter(f => f._id.toString() !== user._id.toString())

//         await userService.updateUserById(userId, { ...follower, follow: filteredFollow })

//         res.status(200).send(updatedUser);

//     } catch (err) {
//         res.status(403).send(err);
//     }

// }

// exports.deleteUser = async (req, res) => {

//     try {

//         const { userId } = req.body

//         await userService.delete(userId);

//         res.status(200).end();

//     } catch (err) {
//         res.status(403).send(err);
//     }

// }

// exports.getUserWithFollow = async (req, res) => {

//     try {

//         const recipes = []
//         const { userId } = req.body

//         const user = await userService.getOneById(userId)
     
//         const allRecipes = await recipeService.getAll()
       
//         const follows = user.follow

//         for (const recipe of allRecipes) {
   
//             for (const foll of follows) {
                
//                 if (foll.toString() == recipe.owner._id.toString()) {
//                     recipes.push(recipe);
//                 }
//             }

//             if(userId == recipe.owner._id.toString()) {
//                 recipes.push(recipe);
//             }
//         }

//         const reversedRecipes = recipes.reverse();

//         res.status(200).send(reversedRecipes);

//     } catch (err) {
//         res.status(403).send(err);
//     }

// }
