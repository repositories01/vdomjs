
export default function (nodeName, attributes, ...children) {
  return { nodeName, attributes, children }
}

export const renderNode = vnode => {
  let el

  const { nodeName, attributes, children } = vnode

  if (vnode.split) return document.createTextNode(vnode)

  if (typeof nodeName === 'string') {
    el = document.createElement(nodeName)

    for (let key in attributes) {
      el.setAttribute(key, attributes[key])
    }
  } else if (typeof nodeName === 'function') { 
    const component = new nodeName(attributes)
    el = renderNode(
      component.render(component.props, component.state)
    )
    component.base = el
  }
  (children || []).forEach(child => el.appendChild(renderNode(child)))

  return el
}

export const renderComponent = (component, parent) => {
  let rendered = component.render(component.props, component.state)
  component.base = diff(component.base, rendered)
}

export const diff = (dom, vnode, parent) => {
  if (dom) {
    if (typeof vnode === 'string') {
      dom.nodeValue = vnode

      return dom
    } 
    if (typeof vnode.nodeName === 'function') {
      const component = new vnode.nodeName(vnode.attributes)
      const rendered = component.render(component.props, component.state)

      diff(dom, rendered)
      return dom
    }

    if (vnode.children.length !== dom.childNodes.length) {
      dom.appendChild(
        renderNode(vnode.children[vnode.children.length - 1])
      )
    }

    dom.childNodes.forEach((child, i) => diff(child, vnode.children[i]))

    return dom
  } else {
    const newDom = renderNode(vnode)
    parent.appendChild(newDom)
    return newDom
  }
}

export const render = (vnode, parent) => {
  diff(undefined, vnode, parent)
}