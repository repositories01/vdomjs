import vdomjs, { render } from './vdomjs';


const App = () => {
    return (
        <h1>Vdom.js</h1>
    )
}


render(App(), document.querySelector('#root'))
