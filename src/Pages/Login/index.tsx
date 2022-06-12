import React, { ChangeEvent, FormEvent, useState } from 'react';
import User from '../../VO/User';
import './login.css';

const Login: React.FC = () => {
    const [user, setUser] = useState(new User(0, '', ''));
    const [err, setErr] = useState('');

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let erro = '';
        if (user.email != '' && user.senha != '') {

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
                <button type='submit'>Entrar</button>
            </form>
        </div>
    </>);
}

export default Login;