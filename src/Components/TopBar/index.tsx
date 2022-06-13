import React from 'react';
import './topBar.css';

interface Props {
    main: any;
}

const TopBar: React.FC<Props> = (props) => {
    return (<>
        <nav>
            {props.main.state.user != '' ?
                <ul>
                    {props.main.state.user.tipo === 'medico' ? <>
                        <li onClick={() => props.main.mudarPagina(0)}>Início</li>
                        <li onClick={() => props.main.mudarPagina(1)}>Perfil</li></> :
                        'noop'}
                    <li onClick={() => props.main.sair()}>Sair</li>
                </ul> : ''}
        </nav>
    </>);
}

export default TopBar;