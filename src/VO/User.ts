import { timeStamp } from "console";

export default class User {
    tipo: number;
    email: string;
    senha: string;
    constructor (
        tipo: number,
        email: string,
        senha: string
        ) {
        this.tipo = tipo;
        this.email = email;
        this.senha = senha;
    }
}