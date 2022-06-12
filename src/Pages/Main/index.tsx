import React from 'react';
import TopBar from '../../Components/TopBar';
import User from '../../VO/User';
import Login from '../Login';
import './main.css';
interface State {
    user: User;
}

interface Props {

}

class Main extends React.Component <Props, State> {
    constructor (props: Props) {
        super(props);
        this.state = {
            user: new User(0, '', ''),
        }
    }
    render() {
        return (<>
        <TopBar/>
        <Login/>
        </>);
    }
}

export default Main;