import React from "react"
import { awrapper } from "../../dummydata"

const Awrapper = () => {
  return (
    <>
      <section className='awrapper'>
        <div className='container grid'>
          {awrapper.map((val) => {
            return (
              <div className='box flex'>
                <div className='img'>
                  <img src={val.cover} alt='' style={{width:"100px",height:"100px"}}/>
                </div>
                <div className='text'>
                  <h1>{val.title}</h1>
                  <h3>{val.data}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Awrapper
