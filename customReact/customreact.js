function customReact(reactElement, container) {
    //     const domElement = document.createElement(reactElement.type);
    //     domElement.innerHTML = reactElement.children;
    //     domElement.setAttribute("href", reactElement.props.href);
    //     domElement.setAttribute("target", reactElement.props.target);
    //     container.append(domElement);    

    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    for (const prop in reactElement.props) {
        if (prop === "children") continue;  // there is no childern in props so we can ignore this line of code, this is only for safety point.
        domElement.setAttribute(prop, reactElement.props[prop]);
    }
    container.appendChild(domElement);
}

const reactElement = {
    type: "a",
    props: {
        href: "https://google.com",
        target: "_blank",
    },
    children: "Click me to visit Google",
}

const mainContainer = document.querySelector("#root");

customReact(reactElement, mainContainer);