import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Service/api';
import AtendenteVO from '../../VO/Atendente';
import ConsultaVO from '../../VO/Consulta';
import EspecialidadeVO from '../../VO/Especialidade';
import MedicoVO from '../../VO/Medico';
import PacienteVO from '../../VO/Paciente';
import StatusVO from '../../VO/Status';
//import "./Medico.css";

interface Props {
    page: number
}

const Atendente: React.FC<Props> = (props) => {
    let date = new Date();
    const history = useHistory();
    const [lucro, setLucro] = useState(0);
    const [user, setUser] = useState(new AtendenteVO('', '', '', '', 0, 0));
    const [userC, setUserC] = useState(new AtendenteVO('', '', '', '', 0, 0));
    const [medico, setMedico] = useState(new MedicoVO('', '', '', '', '', 0, 0, 0));
    const [paciente, setPaciente] = useState(new PacienteVO('', '', '', '', '', '', '', '', 0, 0));
    const [consulta, setConsulta] = useState(new ConsultaVO(0, 0, 0, 0, 0,
        date.getFullYear() + '-' + ("00" + (date.getMonth() + 1)).slice(-2) + '-' + ("00" + date.getDate()).slice(-2)
        , '', '', '', ''));
    const [consultas, setConsultas] = useState(new Array<ConsultaVO>());
    const [medicos, setMedicos] = useState(new Array<MedicoVO>());
    const [pacientes, setPacientes] = useState(new Array<PacienteVO>());
    const [status, setStatus] = useState(new Array<StatusVO>());
    const [especialidades, setEspecialidades] = useState(new Array<EspecialidadeVO>());
    async function listarConsultas() {
        await api.get("atendente/atendente.php?listarConsultas=listarConsultas")
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
    async function listarMedicos() {
        await api.get("medico/medico.php?listarMedicos=listarMedicos")
            .then(res => {
                if (res.data) {
                    setMedicos(res.data);
                }
                else {
                    console.log(1);

                }

            }).catch(res => {
                console.log(res);
            })
    }
    async function listarPacientes() {
        await api.get("paciente/paciente.php?listarPacientes=listarPacientes")
            .then(res => {
                if (res.data) {
                    setPacientes(res.data);
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
    async function listarStatus() {
        await api.get("paciente/paciente.php?listarStatus=listarStatus")
            .then(res => {
                if (res.data) {
                    setStatus(res.data);
                }
                else {
                    console.log(1);

                }

            }).catch(res => {
                console.log(res);
            })
    }
    async function getLucro() {
        await api.get("atendente/atendente.php?getLucro=getLucro")
            .then(res => {
                if (res.data) {
                    setLucro(res.data);
                }
                else {
                    console.log(1);

                }

            }).catch(res => {
                console.log(res);
            })
    }
    function select(event: ChangeEvent<HTMLSelectElement>) {
        let aux = JSON.parse(JSON.stringify(consulta));
        aux[event.target.name] = event.target.value;
        setConsulta(aux);
    }

    function selectM(event: ChangeEvent<HTMLSelectElement>) {
        let aux = JSON.parse(JSON.stringify(medico));
        aux[event.target.name] = event.target.value;
        setMedico(aux);
    }

    function input(event: ChangeEvent<HTMLInputElement>) {
        let aux = JSON.parse(JSON.stringify(userC));
        aux[event.target.name] = event.target.value;
        setUserC(aux);
    }

    function inputM(event: ChangeEvent<HTMLInputElement>) {
        let aux = JSON.parse(JSON.stringify(medico));
        aux[event.target.name] = event.target.value;
        setMedico(aux);
    }

    function inputP(event: ChangeEvent<HTMLInputElement>) {
        let aux = JSON.parse(JSON.stringify(paciente));
        aux[event.target.name] = event.target.value;
        setPaciente(aux);
    }

    function inputC(event: ChangeEvent<HTMLInputElement>) {
        let aux = JSON.parse(JSON.stringify(consulta));
        aux[event.target.name] = event.target.value;
        console.log(event.target.value)
        setConsulta(aux);
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (userC.email != '' && userC.nome_atendente != '') {
            var form_data = new FormData();
            let object = await JSON.parse(JSON.stringify(userC));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("editarAtendente", "editarAtendente");
            await api.post("atendente/atendente.php", form_data)
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

    async function submitFormConsulta(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (true) {
            var form_data = new FormData();
            console.log(consulta)
            let object = await JSON.parse(JSON.stringify(consulta));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("cadastrarConsulta", "cadastrarConsulta");
            await api.post("atendente/atendente.php", form_data)
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        console.log(0)
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
    async function submitFormMedico(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (true) {
            var form_data = new FormData();
            let object = await JSON.parse(JSON.stringify(medico));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("cadastrarMedico", "cadastrarMedico");
            await api.post("medico/medico.php", form_data)
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        console.log(0)
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
    async function submitFormPaciente(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (true) {
            var form_data = new FormData();
            let object = await JSON.parse(JSON.stringify(paciente));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("cadastrarPaciente", "cadastrarPaciente");
            await api.post("paciente/paciente.php", form_data)
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        console.log(0)
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
        listarMedicos();
        listarPacientes();
        listarStatus();
        listarEspecialidades();
        getLucro();
        let a = sessionStorage.getItem('login');
        if (a && JSON.parse(a).tipo === 'atendente') {
            setUser(JSON.parse(a));
            setUserC({ ...JSON.parse(a), senha: '' });
            listarConsultas();
        }
        else {
            // history.push('/')
        }

    }, []);
    return (<>
        <div className="home-medico">

            {props.page === 0 ?
                <table className="table table-bordered border">
                    <caption>Lucro total: {lucro}</caption>
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
                            <input type="text" className="form-control" id="nome" name="nome_atendente"
                                onChange={input} value={userC.nome_atendente} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email"
                                name="email" onChange={input} value={userC.email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">Nova senha</label>
                            <input type="password" className="form-control"
                                name="senha" onChange={input} value={userC.senha} />
                        </div>
                        <button type="submit" className="btn btn-primary">Alterar</button>
                    </form>
                    : props.page === 2 ?
                        <form className="form border" onSubmit={submitFormConsulta}>
                            <div className="form-group ">
                                <label>Paciente</label>
                                <select name="fk_paciente" onChange={select} value={consulta.fk_paciente} className="form-control">
                                    <option value={0}>...</option>
                                    {pacientes?.map((el) => {
                                        return (<option key={el.id_paciente} value={el.id_paciente}>{el.nome_paciente}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="form-group ">
                                <label>Médico</label>
                                <select name="fk_medico" onChange={select} value={consulta.fk_medico} className="form-control">
                                    <option value={0}>...</option>
                                    {medicos?.map((el) => {
                                        return (<option key={el.id_medico} value={el.id_medico}>{el.nome_medico}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nome">Data</label>
                                <input type="date" className="form-control" id="data" name="data"
                                    onChange={inputC} value={consulta.data.toString()} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" className="form-control" id="descricao" name="descricao"
                                    onChange={inputC} value={consulta.descricao} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="valor">Valor</label>
                                <input type="number" className="form-control" id="valor" name="valor"
                                    onChange={inputC} value={consulta.valor} />
                            </div>

                            <div className="form-group ">
                                <label>Status</label>
                                <select name="fk_status" onChange={select} value={consulta.fk_status} className="form-control">
                                    <option value={0}>...</option>
                                    {status?.map((el) => {
                                        return (<option key={el.id_status} value={el.id_status}>{el.status}</option>)
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </form>
                        : props.page === 3 ? <>
                            <table className="table table-bordered border">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Especialidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicos.map((el, i) => {
                                        return (<tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{el.nome_medico}</td>
                                            <td>{el.email}</td>
                                            <td>{el.especialidade}</td>
                                        </tr>)
                                    })}

                                </tbody>
                            </table>
                            <form className="form border" onSubmit={submitFormMedico}>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome</label>
                                    <input type="text" className="form-control" id="nome" name="nome_medico"
                                        onChange={inputM} value={medico.nome_medico} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email"
                                        name="email" onChange={inputM} value={medico.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input type="password" className="form-control"
                                        name="senha" onChange={inputM} value={medico.senha} />
                                </div>
                                <div className="form-group ">
                                    <label>Status</label>
                                    <select name="fk_especialidade" onChange={selectM} value={medico.fk_especialidade} className="form-control">
                                        <option value={0}>...</option>
                                        {especialidades?.map((el) => {
                                            return (<option key={el.id_especialidade} value={el.id_especialidade}>{el.especialidade}</option>)
                                        })}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </form>

                        </>
                            : props.page === 4 ? <>
                                <table className="table table-bordered border">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">RG</th>
                                            <th scope="col">CPF</th>
                                            <th scope="col">Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pacientes.map((el, i) => {
                                            return (<tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{el.nome_paciente}</td>
                                                <td>{el.email}</td>
                                                <td>{el.rg}</td>
                                                <td>{el.cpf}</td>
                                                <td>{el.telefone}</td>
                                            </tr>)
                                        })}

                                    </tbody>
                                </table>
                                <form className="form border" onSubmit={submitFormPaciente}>
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text" className="form-control" id="nome" name="nome_paciente"
                                            onChange={inputP} value={paciente.nome_paciente} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email"
                                            name="email" onChange={inputP} value={paciente.email} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Data Nascimento</label>
                                        <input type="date" className="form-control" id="data" name="data_nascimento"
                                            onChange={inputP} value={paciente.data_nascimento.toString()} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rg">RG</label>
                                        <input type="text" className="form-control" id="rg"
                                            name="rg" onChange={inputP} value={paciente.rg} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpf">CPF</label>
                                        <input type="text" className="form-control" id="cpf"
                                            name="cpf" onChange={inputP} value={paciente.cpf} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telefone">Telefone</label>
                                        <input type="text" className="form-control" id="telefone"
                                            name="telefone" onChange={inputP} value={paciente.telefone} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="senha">Senha</label>
                                        <input type="password" className="form-control"
                                            name="senha" onChange={inputP} value={paciente.senha} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                                </form>
                            </> :
                                ''}
        </div>
    </>);
}

export default Atendente;