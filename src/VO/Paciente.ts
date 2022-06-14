export default class PacienteVO {
    email: string;
    tipo: string;
    nome_paciente: string;
    senha: string;
    rg: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
    id_paciente: number;
    id_usuario: number;
    constructor(
        email: string,
        tipo: string,
        nome_paciente: string,
        senha: string,
        rg: string,
        cpf: string,
        telefone: string,
        data_nascimento: string,
        id_paciente: number,
        id_usuario: number,
    ) {
        this.tipo = tipo;
        this.email = email;
        this.senha = senha;
        this.rg = rg;
        this.cpf = cpf;
        this.telefone = telefone;
        this.data_nascimento = data_nascimento;
        this.nome_paciente = nome_paciente;
        this.id_paciente = id_paciente;
        this.id_usuario = id_usuario;
    }
}
