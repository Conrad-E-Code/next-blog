import React from 'react'

const ToolbarIconButton = ({icon, onClick, title}) => {
  return (
    <div title={title} onCLick={onClick}>{icon}</div>
  )
}

export default ToolbarIconButton
