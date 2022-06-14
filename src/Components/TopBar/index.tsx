import React, { useEffect } from 'react';
import './topBar.css';

interface Props {
    main: any;
}

const TopBar: React.FC<Props> = (props) => {
    console.log(props.main.state.user)
    return (<>
        <nav>
            {props.main.state.user != '' ?
                <ul>
                    {props.main.state.user.tipo === 'medico' ? <>
                        <li onClick={() => props.main.mudarPagina(0)} className={props.main.state.page === 0 ? 'active' : ''}>Início</li>
                        <li onClick={() => props.main.mudarPagina(1)} className={props.main.state.page === 1 ? 'active' : ''}>Perfil</li></> :
                        props.main.state.user.tipo === 'atendente' ? <>
                            <li onClick={() => props.main.mudarPagina(0)} className={props.main.state.page === 0 ? 'active' : ''}>Início</li>
                            <li onClick={() => props.main.mudarPagina(2)} className={props.main.state.page === 2 ? 'active' : ''}>Cadastrar Consulta</li>
                            <li onClick={() => props.main.mudarPagina(3)} className={props.main.state.page === 3 ? 'active' : ''}>Médico</li>
                            <li onClick={() => props.main.mudarPagina(4)} className={props.main.state.page === 4 ? 'active' : ''}>Paciente</li>
                            <li onClick={() => props.main.mudarPagina(1)} className={props.main.state.page === 1 ? 'active' : ''}>Perfil</li>
                        </> :
                            props.main.state.user.tipo === 'paciente' ? <>
                                <li onClick={() => props.main.mudarPagina(0)} className={props.main.state.page === 0 ? 'active' : ''}>Início</li>
                                <li onClick={() => props.main.mudarPagina(1)} className={props.main.state.page === 1 ? 'active' : ''}>Perfil</li>
                        </> : ''}
            <li onClick={() => props.main.sair()}>Sair</li>
        </ul> : ''}
    </nav>
    </>);
}

export default TopBar;