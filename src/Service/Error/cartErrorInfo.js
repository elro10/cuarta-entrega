export const generateCartErrorInfo = (desId, quantity) =>{
    return `
    Alguno de los campos para crear el usuario no es valido
    Lista de campos requeridos:
    code: debe ser un campo de tipo code, pero se recibio ${desId},
    Title: debe ser un campo de tipo number, pero se recibio ${quantity},
    
`
}