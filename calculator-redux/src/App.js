import React from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';


class App extends React.Component{
    render(){
        return(
            <div>
                <Display/>
                <Keypad/>
            </div>

        )
    }
}

export default App;

