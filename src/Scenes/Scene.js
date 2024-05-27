import React from 'react';
import useHash from './useURLHash';


export default function Scene({
  children,
  hash='',
  parent_hash = '',
  verbose = false,
}) {
  const {hash: currentHash, parse, stringify} = useHash();
  
  const fullHash = parent_hash ? `${parent_hash}/${hash}` : hash;
  
  const isLinked = (currentHash === fullHash) || currentHash.startsWith(fullHash);
  
  
  const link = (state, vars, overwrite=false)=>{
    // 'overwrite' indicates that the existing query is wiped prior to setting new values
    // by default the existing query is preserved and vars will add or modify them
    // passing a var with a null value will remove it from the query string
    let parm = overwrite? vars: parse()
    let target = (state || (state === ''))
      ? state
      : fullHash
    
    if (target.startsWith('...')) {
      target = fullHash + '/' + target.substring(3)
    }
    
    if (vars) {
      for (let key in vars) {
        parm[key] = vars[key]
        
        if (vars[key] === null) {
          delete parm[key]
        }
      }
    }
    
    return `#${target}${stringify(parm)}`
  }


  const clonedElement = (child,parm)=>{
    return React.cloneElement(child, {
      ...parm,
      hash: child.props.hash,
      link: link,
      parent_hash: fullHash,
    });
  }


  const renderChild = child=>{
    const childFullHash = `${fullHash}/${child.props.hash}`
    const isScene = child.type.name === 'Scene';
    
    if (isScene && !isLinked) return null;
    
    if (verbose) {
      const hasElement = child.props.element;
      console.log(`${isScene ? 'Scene' : 'Non-Scene'}$ ${child.props.hash} ${hasElement ? ' renders:' + child.type.name : ''}; current: ${currentHash}, full: ${fullHash}`);
    }
    
    const query = parse()
    
    if (isScene) {
      if (child.props.element && currentHash.startsWith(childFullHash)) {
        return clonedElement(child.props.element, query)
      } else {
        return clonedElement(child, query)
      }
    } else {
      return clonedElement(child, query)
    }
  }


  const nestedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return React.Children.map(child.props.children, renderChild);
      } else {
        return renderChild(child);
      }
    }
    return null;
  });


  return isLinked ? <>{nestedChildren}</> : null
}