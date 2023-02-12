import React, { useEffect } from 'react'
import './Intro.scss'
const Intro = () => {
    useEffect(()=>{
        const logoItems= document.querySelectorAll('.logo')
        const introBgCover= document.querySelector('.intro-bg-cover')
        logoItems.forEach((item, idx)=>{
            setTimeout(()=>{
                item.classList.add('fade-in')
            }, (idx+1)*400)
        })
        setTimeout(()=>{
            logoItems.forEach((item, idx)=>{
                setTimeout(()=>{
                    item.classList.remove('fade-in')
                    item.classList.add('fade-out')
                }, (idx+1)*300)
            })
        }, 2000)
        setTimeout(()=>{
            introBgCover.classList.add('hide')
        }, 3000)
    }, [])
  return (
    <div className='intro-bg-cover fixed top-0 left-0 w-full text-white'>
        <div className='intro-content'>
            <span className="logo">A product created by </span>
            <span className="logo ml-2">VuongAL.</span>
        </div>
    </div>
  )
}

export default Intro