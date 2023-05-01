import React from 'react'
import { InputText, type InputTextProps } from 'primereact/inputtext'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { classNames } from 'primereact/utils'

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
`

const ErrorLabel = styled.label`
  color: red;
  font-size: 12px;
`

const InputLabel = styled.label`
  margin-bottom: 4px;
`

type InputProps = InputTextProps & { error?: string, label?: string }
const Input: React.FC<InputProps> = (props) => {
  const { error, label, ...rest } = props
  const hasError = error != null
  return (
    <StyledInput>
      {label != null && <InputLabel htmlFor={rest.id ?? rest.name}>{label}</InputLabel>}
      <InputText {...rest} className={classNames({ 'p-error': hasError })}></InputText>
      { !!hasError && <ErrorLabel htmlFor={rest.id ?? rest.name}>{error}</ErrorLabel> }
    </StyledInput >
  )
}

export default observer(Input)
