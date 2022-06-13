export default class ConsultaVO {
    valor: number;
    id_consulta: number;
    data: Date;
    descricao: string;
    nome_medico: string;
    nome_paciente: string;
    status: string;
    constructor(
        valor: number,
        id_consulta: number,
        data: Date,
        descricao: string,
        nome_medico: string,
        nome_paciente: string,
        status: string
    ) {
        this.valor = valor;
        this.id_consulta = id_consulta;
        this.data = data;
        this.descricao = descricao;
        this.nome_medico = nome_medico;
        this.nome_paciente = nome_paciente;
        this.status = status;
    }
}
