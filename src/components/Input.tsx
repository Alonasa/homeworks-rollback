import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsType = {
  value: string
  callback?: (e: ChangeEvent<HTMLInputElement>) => void
  keyCallback?: (e: KeyboardEvent<HTMLInputElement>) => void
  type?: string
  className?: string | undefined
}

export const Input = (props: propsType) => {
  return (
	<input value={props.value} onChange={props.callback}
		   onKeyPress={props.keyCallback} type={props.type} className={props.className}/>
  )
}