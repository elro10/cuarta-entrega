export const generateUserErrorInfo = (first_name,last_name,email)=>{
    return `
        Alguno de los campos para crear el usuario no es valido
        Lista de campos requeridos:
        first_name: debe ser un campo de tipo String, pero se recibio ${first_name},
        last_name: debe ser un campo de tipo String, pero se recibio ${last_name},
        email:debe ser un campo de tipo String, pero se recibio ${email},
    `
}