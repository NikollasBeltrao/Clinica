import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Service/api';
import ConsultaVO from '../../VO/Consulta';
import PacienteVO from '../../VO/Paciente';

interface Props {
    page: number
}

const Paciente: React.FC<Props> = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(new PacienteVO('', '', '', '', '', '', '', '', 0, 0));
    const [userC, setUserC] = useState(new PacienteVO('', '', '', '', '', '', '', '', 0, 0));
    const [consultas, setConsultas] = useState(new Array<ConsultaVO>());
    async function listarConsultas(id_paciente: number) {
        await api.get("paciente/paciente.php?listarConsultas=listarConsultas&id_paciente=" + id_paciente)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    setConsultas(res.data);
                }
                else {
                    console.log(1);

                }

            }).catch(res => {
                console.log(res);
            })
    }

    function select(event: ChangeEvent<HTMLSelectElement>) {
        let aux = JSON.parse(JSON.stringify(userC));
        aux[event.target.name] = event.target.value;
        setUserC(aux);
    }

    function input(event: ChangeEvent<HTMLInputElement>) {
        let aux = JSON.parse(JSON.stringify(userC));
        aux[event.target.name] = event.target.value;
        setUserC(aux);
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (userC.email != '' && userC.nome_paciente != '') {
            var form_data = new FormData();
            let object = await JSON.parse(JSON.stringify(userC));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("editarPaciente", "editarPaciente");
            await api.post("paciente/paciente.php", form_data)
                .then(res => {
                    if (res.data) {
                        sessionStorage.clear();
                        sessionStorage.setItem('login', JSON.stringify(res.data));
                    }
                    else {
                        console.log(1);

                    }

                }).catch(res => {
                    console.log(res);
                })
        }
        else {
            erro = 'Preencha todos os campos!';
        }
    }

    useEffect(() => {
        let a = sessionStorage.getItem('login');
        if (a && JSON.parse(a).tipo === 'paciente') {
            setUser(JSON.parse(a));
            setUserC({ ...JSON.parse(a), senha: '' });
            listarConsultas(JSON.parse(a).id_paciente);
        }
        else {
            // history.push('/')
        }

    }, []);
    return (<>
        <div className="home-medico">

            {props.page === 0 ?
                <table className="table table-bordered border">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Data</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((el, i) => {
                            return (<tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{el.nome_medico}</td>
                                <td>{el.data.toString()}</td>
                                <td>{el.valor}</td>
                                <td>{el.descricao}</td>
                                <td>{el.status.toLocaleUpperCase()}</td>
                            </tr>)
                        })}

                    </tbody>
                </table> :
                props.page === 1 ?
                    <form className="form border" onSubmit={submitForm}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome_paciente"
                                onChange={input} value={userC.nome_paciente} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email"
                                name="email" onChange={input} value={userC.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Data Nascimento</label>
                            <input type="date" className="form-control" id="data" name="data_nascimento"
                                onChange={input} value={userC.data_nascimento.toString()} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rg">RG</label>
                            <input type="text" className="form-control" id="rg"
                                name="rg" onChange={input} value={userC.rg} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" className="form-control" id="cpf"
                                name="cpf" onChange={input} value={userC.cpf} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="text" className="form-control" id="telefone"
                                name="telefone" onChange={input} value={userC.telefone} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Nova senha</label>
                            <input type="password" className="form-control"
                                name="senha" onChange={input} value={userC.senha} />
                        </div>
                        <button type="submit" className="btn btn-primary">Alterar</button>
                    </form>
                    : ''}
        </div>
    </>);
}

export default Paciente;