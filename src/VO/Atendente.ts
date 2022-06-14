export default class AtendenteVO {
    email: string;
    tipo: string;
    nome_atendente: string;
    senha: string;
    id_atendente: number;
    id_usuario: number;
    constructor(
        email: string,
        tipo: string,
        nome_atendente: string,
        senha: string,
        id_atendente: number,
        id_usuario: number,
    ) {
        this.tipo = tipo;
        this.email = email;
        this.senha = senha;
        this.nome_atendente = nome_atendente;
        this.id_atendente = id_atendente;
        this.id_usuario = id_usuario; 
    }
}
