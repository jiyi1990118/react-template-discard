import * as React from 'react'

import Hello from './hello'
import {hot} from 'react-hot-loader/root';

class App extends React.Component {
    constructor() {
        // @ts-ignore
        super();
        console.log("App");
    }

    render() {
        // @ts-ignore
        return (
            <div>
                <h1>
                    <Hello/>
                    Hello<br/>
                    <input type="text" name="" id=""/>
                </h1>
                <svg className="icon-svg" aria-hidden="true">
                    <use xlinkHref="#d-icon-gou-check"></use>
                </svg>
            </div>
        )
    }
}

export default hot(App);