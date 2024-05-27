import React from 'react';
import useHash from './useURLHash';


export default function Scene({
  children,
  hash='',
  parent_hash = '',
  verbose = false,
}) {
  const {hash: currentHash, link, parse} = useHash();
  
  const fullHash = parent_hash ? `${parent_hash}/${hash}` : hash;
  
  const isLinked = (currentHash === fullHash) || currentHash.startsWith(fullHash);
  
  
  const nestedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
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
          return React.cloneElement(child.props.element, {
            hash: child.props.hash,
            link: link,
            parent_hash: fullHash,
            query: query,
          });
        } else {
          return React.cloneElement(child, {
            link: link,
            parent_hash: fullHash,
            query: query,
          });
        }
      } else {
        return React.cloneElement(child, {
          hash: child.props.hash,
          link: link,
          parent_hash: fullHash,
          query: query,
        });
      }
    }
    return null;
  });


  return isLinked ? <>{nestedChildren}</> : null
}