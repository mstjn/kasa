export interface User {
    id: number    
    name : string
    picture? : string
}


export interface Property {
    id : string
    slug : string
    title : string
    description : string
    cover : string
    price_per_night : number
    rating_count : number
    rating_avg : number
    location : string
    host : User[]
}