import React from 'react';
import TopBar from '../../Components/TopBar';
import Routes from '../../routes';
import './main.css';
interface State {
    user: any;
    page: number;
}

interface Props {
}

class Main extends React.Component <Props, State> {
    constructor (props: Props) {
        super(props);
        let session = sessionStorage.getItem('login');        
        this.state = {
            user: session? JSON.parse(session) : '',
            page: 0
        }        
            
    }
    sair = () => {
        sessionStorage.clear();
        window.location.href = window.location.origin;
    }
    mudarPagina = async (id: number) => {
        await this.setState({ page: id });
    }
    render() {
        return (<>
        <TopBar main={this}/>
        <Routes page={this.state.page} main={this}/>
        </>);
    }
}

export default Main;