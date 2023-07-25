export class CustomError {
    static createError({name="Error", cause,message,code}){
        const error = new Error(message,{cause});
        error.name=error;
        error.code=code;
        console.log("error", error.cause);
        throw error;
    }
}