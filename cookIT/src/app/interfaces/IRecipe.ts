import {IUser} from "./index"

export interface IRecipe {
    _id: string,
    image: string,
    title: string,
    prepTime: number,
    cookingTime: number,
    totalTime: number,
    ingredients: [],
    directions: [],
    author: IUser
}