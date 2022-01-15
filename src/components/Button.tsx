import React from 'react';

type propsType = {
  title: string
  callback: ()=>void
  className?: string
}

export const Button = (props: propsType) => {
  const onClickHandler = ()=> {
    props.callback()
  }
  return (
    <button onClick={onClickHandler} className={props.className}>{props.title}</button>
  )
}