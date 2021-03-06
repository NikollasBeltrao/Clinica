export default class MedicoVO {
    email: string;
    especialidade: string;    
    tipo: string;
    nome_medico: string;
    senha: string;
    id_medico: number;
    id_usuario: number;
    fk_especialidade: number;
    constructor(
        email: string,
        especialidade: string,
        tipo: string,
        nome_medico: string,
        senha: string,
        id_medico: number,
        id_usuario: number,
        fk_especialidade: number
    ) {
        this.tipo = tipo;
        this.email = email;
        this.senha = senha;
        this.especialidade = especialidade;
        this.nome_medico = nome_medico;
        this.id_medico = id_medico;
        this.id_usuario = id_usuario; 
        this.fk_especialidade =fk_especialidade;       
    }
}
