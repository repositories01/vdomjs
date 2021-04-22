import vdomjs from './vdomjs';


const App = () => {
    return (
        <h1>Vdom.js</h1>
    )
}


vdomjs.render(App(), document.querySelector('#root'))
