import {IRecipe} from "./index"

export interface IUser {
    _id: string,
    username: string,
    email: string,
    image: string,
    recipes: [IRecipe]
}