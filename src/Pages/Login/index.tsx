import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../Service/api';
import Medico from '../../VO/Medico';
import User from '../../VO/User';
import './login.css';

const Login: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState(new User(0, '', ''));
    const [err, setErr] = useState('');

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (user.email != '' && user.senha != '') {
            var form_data = new FormData();
            let object = await JSON.parse(JSON.stringify(user));
            await Object.keys(object).forEach(key => form_data.append(key, object[key]));
            form_data.append("auth", "auth");
            await api.post("login/login.php", form_data)
                .then(res => {
                    if (res.data) {
                        sessionStorage.clear();
                        sessionStorage.setItem('login', JSON.stringify(res.data));
                        console.log(res.data)
                        history.push(res.data.tipo);
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

        setErr(erro);
    }

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        let aux = JSON.parse(JSON.stringify(user));
        aux[event.target.name] = event.target.value;
        setUser({ ...aux });
    }
    return (<>
        <div className='login-container border'>
            <h2>Login</h2>
            <form onSubmit={submitForm}>
                <div className="col-md-12">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" className="form-control "
                        onChange={changeInput} value={user.email}
                        name="email" placeholder="Digite seu e-mail" required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form-control "
                        onChange={changeInput} value={user.senha}
                        name="senha" placeholder="Digite sua senha" required />
                </div>
                <small className="err"></small>
                <button type='submit' className="btn btn-primary">Entrar</button>
            </form>
        </div>
    </>);
}

export default Login;