import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

function Home() {
  return (
    
    <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <Content/>
            </div>
        </div>
  )
}

export default Home