
import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const myRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const [type, setType] = useState('Change Counter');

  function toggle(){
    if(type === 'Reverse Counter'){
    let ref = myRef.current.value
    setSeconds(ref)
    }
    setActive(!active);
  }

  function reset() {
    setSeconds(0);
    setActive(false);
    if(type === 'Reverse Counter') myRef.current.value = 0;
  }
  function addseconds() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    setSeconds(ref)
}

  function cambiotype() {
    if(type === 'Reverse Counter') setType('Change Counter')
    if(type === 'Change Counter') setType('Reverse Counter')
}

useEffect(() => {
  let intervalo = null;
  if (active && type === 'Change Counter') {
    intervalo = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
  }
  if (active && type === 'Reverse Counter') {
    intervalo = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
  }
  if (!active && seconds !== 0 && type === 'Change Counter') {
    clearInterval(intervalo);
  }
  if (seconds === 0 && active === 'Reverse Counter') {
    reset();
    clearInterval(intervalo);
  }

  return () => clearInterval(intervalo);
}, [active, seconds, type]);


  return (
    <div className="app">
      <div className="conteins">
        <div className="time">
          {seconds}s
        </div>
        <div className="row">
          <button className={`button button-primary button-primary-${active ? 'active' : 'inactive'}`} onClick={toggle}>
            {active ? 'Pause' : 'Start'}
          </button>
          <button className="button" onClick={reset}>
            Reset
          </button>
        </div>
        <button className="button" onClick={cambiotype}>
            {type}
        </button>
        {type === 'Reverse Counter' && <input type="number" ref={myRef} onChange={addseconds} placeholder="Default is 0" autoComplete="off"/>}
      </div>
    </div>
  );
};

export default Timer;