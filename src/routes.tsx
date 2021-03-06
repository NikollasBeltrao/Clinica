import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Atendente from './Pages/Atendente';
import Login from './Pages/Login';
import Medico from './Pages/Medico';
import Paciente from './Pages/Paciente/Paciente';


interface Props {
    location?: any,
    page: number,
    main: any,
}
const Page404: React.FC<Props> = (props) => {
    //window.location.href = 'https://emlacademico.com.br/api/erro/index.html';
    return (<></>)
}

const PrivateRoute = ({ component, ...rest }: any) => {
    let user: any = null;
    switch (rest.path) {
        case '/paciente': {
            let session = sessionStorage.getItem("userPA");
            user = (session ? JSON.parse(session) : null);
            break;
        }
        case '/medico': {
            let session = sessionStorage.getItem("userME");
            user = (session ? JSON.parse(session) : null);
            break;
        }
        case '/atendente': {
            let session = sessionStorage.getItem("userAT");
            user = (session ? JSON.parse(session) : null);
            break;
        }
    }
    const routeComponent = (props: any) => (
        user
            ? React.createElement(component, props)
            : <Redirect to={{ pathname: '/' }} />
    );
    return <Route {...rest} render={routeComponent} />;
};
const Routes = (propsr: Props) => { 
    return (
        <BrowserRouter>
            <Switch>
                <Route render={props => <Login main={propsr.main} />}exact path="/" />
                <Route render={props => <Medico {...props} page={propsr.page} />} path="/medico" />
                <Route render={props => <Atendente {...props} page={propsr.page} />} path="/atendente" />
                <Route render={props => <Paciente {...props} page={propsr.page} />} path="/paciente" />
               {/* <PrivateRoute component={DiretorPage} path="/diretor" />
                <Route render={props => <Imprimir {...props} aluno={JSON.parse(props.match.params.aluno)} />} path="/imprimir/:aluno" />*/}
                <Route component={Page404} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;