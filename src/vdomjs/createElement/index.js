function createElement(type, props, ...children) {

    const createTextElement = (text) => {
        return {
            type: "TEXT_ELEMENT",
            props: {
                nodeValue: text,
                children: []
            }
        }
    }

    
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object" ? child : createTextElement(child)
            )
        }
    };
}