import React, { type FC } from 'react'
import styled from 'styled-components'

interface Props {
  width?: number
  height?: number
  grow?: boolean
}

const StyledSpace = styled.div<Props>`
  height: ${(p): string => `${p.height ?? 0}px`};
  width: ${(p): string => `${p.width ?? 0}px`};
  flex: ${(p) => ((p.grow != null && p.grow) ? 1 : 0)} 0 auto;
`

const Space: FC<Props> = ({
  width = 1,
  height = 1,
  grow = false,
  ...props
}) => <StyledSpace width={width} height={height} grow={grow} {...props} />

export default Space
