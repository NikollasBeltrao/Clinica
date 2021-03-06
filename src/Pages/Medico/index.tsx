import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Service/api';
import ConsultaVO from '../../VO/Consulta';
import EspecialidadeVO from '../../VO/Especialidade';
import MedicoVO from '../../VO/Medico';
import "./Medico.css";

interface Props {
    page: number
}

const Medico: React.FC<Props> = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(new MedicoVO('', '', '', '', '', 0, 0, 0));
    const [userC, setUserC] = useState(new MedicoVO('', '', '', '', '', 0, 0, 0));
    const [consultas, setConsultas] = useState(new Array<ConsultaVO>());
    const [especialidades, setEspecialidades] = useState(new Array<EspecialidadeVO>());
    async function listarConsultas(id_medico: number) {
        await api.get("medico/medico.php?listarConsultas=listarConsultas&id_medico=" + id_medico)
            .then(res => {
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
    async function listarEspecialidades() {
        await api.get("medico/medico.php?listar_especialidades=listar_especialidades")
            .then(res => {
                if (res.data) {
                    setEspecialidades(res.data);
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
        if (userC.email != '' && userC.nome_medico != '') {
            var form_data = new FormData();
            let object = await JSON.parse(JSON.stringify(userC));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("editarMedico", "editarMedico");
            await api.post("medico/medico.php", form_data)
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
        listarEspecialidades();
        let a = sessionStorage.getItem('login');
        if (a && JSON.parse(a).tipo === 'medico') {
            setUser(JSON.parse(a));
            setUserC({ ...JSON.parse(a), senha: '' });
            listarConsultas(JSON.parse(a).id_medico);
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
                            <th scope="col">Paciente</th>
                            <th scope="col">Data</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Descri????o</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((el, i) => {
                            return (<tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{el.nome_paciente}</td>
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
                            <input type="text" className="form-control" id="nome" name="nome_medico"
                                onChange={input} value={userC.nome_medico} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email"
                                name="email" onChange={input} value={userC.email} />
                        </div>

                        <div className="form-group ">
                            <label>Especialidade</label>
                            <select name="fk_especialidade" onChange={select} value={userC.fk_especialidade} className="form-control">
                                {especialidades?.map((el) => {
                                    return (<option key={el.id_especialidade} value={el.id_especialidade}>{el.especialidade}</option>)
                                })}
                            </select>
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

export default Medico;