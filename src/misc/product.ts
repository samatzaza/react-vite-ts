export interface Product {
    id: number
    name: string
    price: number
    stock: number
}

export interface ProductType {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
}