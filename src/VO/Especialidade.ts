export default class EspecialidadeVO {
    id_especialidade: number;
    especialidade: string;
    constructor(id_especialidade: number, especialidade: string){
        this.id_especialidade = id_especialidade;
        this.especialidade = especialidade;
    }
}