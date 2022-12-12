import React, { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext)
  return (
    <div className='d-flex justify-content-center align-items-center d-none d-md-flex'>
      <i className='bi-arrow-left-circle-fill' onClick={() => scrollPrev()}></i>
    </div>
  )
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext)
  return (
    <div className='d-flex justify-content-center align-items-center d-none d-md-flex'>
      <i
        className='bi-arrow-right-circle-fill'
        onClick={() => scrollNext()}
      ></i>
    </div>
  )
}

export default function ScrollingMenu({ children }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: 'hidden', margin:'0 auto' }}
    >
      {children}
    </ScrollMenu>
  )
}
