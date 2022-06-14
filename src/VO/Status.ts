export default class StatusVO {
    id_status: number;
    status: string;
    constructor(
        id_status: number,
        status: string
    ) {
        this.id_status = id_status;
        this.status = status;
    }
}