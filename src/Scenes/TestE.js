import React from 'react'
import Scene from './Scene'


export default function TestE({
  hash, parent_hash
}) {
  return <>
    Test E State
    <br />
    hash = {hash}
    <br />
    parent_hash = {parent_hash}
  </>
}
