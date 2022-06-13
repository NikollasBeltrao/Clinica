import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Service/api';
import ConsultaVO from '../../VO/Consulta/Consulta';
import MedicoVO from '../../VO/Medico';
import "./Medico.css";

interface Props {
    page: number
}

const Medico: React.FC<Props> = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(new MedicoVO('', '', '', '', '', 0, 0));
    const [consultas, setConsultas] = useState(new Array<ConsultaVO>());
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


    useEffect(() => {
        let a = sessionStorage.getItem('login');
        if (a && JSON.parse(a).tipo === 'medico') {
            setUser(JSON.parse(a));
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
                            <th scope="col">Descrição</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((el, i) => {
                            return (<tr key={i}>
                                <th scope="row">{i+1}</th>
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
                    <form className="form border">
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" className="form-control" id="senha" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha2">Confirmar senha</label>
                            <input type="password" className="form-control" id="senha2" />
                        </div>
                        <button type="submit" className="btn btn-primary">Alterar</button>
                    </form>
                    : ''}
        </div>
    </>);
}

export default Medico;