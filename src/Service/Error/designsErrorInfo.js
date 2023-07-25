export const generateDesignsErrorInfo = (code,title,price, stock, shops)=>{
    return `
        Alguno de los campos para crear el usuario no es valido
        Lista de campos requeridos:
        code: debe ser un campo de tipo Number, pero se recibio ${code},
        Title: debe ser un campo de tipo String, pero se recibio ${title},
        price:debe ser un campo de tipo Number, pero se recibio ${price},
        stock:debe ser un campo de tipo Number, pero se recibio ${stock},
        shops: debe ser un array pero se recibio ${shops}
    `
}