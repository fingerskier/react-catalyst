const config = [{
  default: true,
  name: "IDLE",
  start: () => console.log('Entering IDLE'),
  end: () => console.log('Exiting IDLE'),
  transitions: ['LOADING'],
},{
  name: "LOADING",
  start: () => console.log('Entering LOADING'),
  end: () => console.log('Exiting LOADING'),
  transitions: ['LOADING', 'ERROR', 'SUCCESS' ],
},{
  name: "SUCCESS",
  start: () => console.log('Entering SUCCESS'),
  end: () => console.log('Exiting SUCCESS'),
  transitions: ['IDLE'],
},{
  name: "ERROR",
  start: () => console.log('Entering ERROR'),
  end: () => console.log('Exiting ERROR'),
  transitions: ['LOADING', 'IDLE'],
}]

export default config