import React from 'react'
import TopBar from '~/src/components/topBar'
import Sidebar from '~/src/components/Sidebar'



const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
          <TopBar />
          <div className=" flex">
            <Sidebar />
            <div className="flex-1 bg-gray-50 pt-[5rem]  ml-[5rem] md:ml-[13rem]">
              {children}
            </div>
          </div>
        </div>
      )
}

export default layout
