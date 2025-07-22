
import React from 'react'
import CounterUnRe from './un-re-counter'

export default function React30P() {
  return (
    <div className='h-screen w-full overflow-auto'>
      
      <div className='flex h-full w-full gap-80 flex-col items-center justify-center'>
        <div>
          <CounterUnRe/>
        </div>
        <div>
          close on outside click
        </div>
      </div>
    </div>
  )
}
