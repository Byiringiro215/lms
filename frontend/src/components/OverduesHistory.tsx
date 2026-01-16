import React from 'react'
import { OverduesHistoryData } from '~/src/placeholder_data/data'
const OverduesHistory = () => {
  return (
    <div className='bg-white p-3 flex flex-col gap-4 rounded-md shadow-sm'>
      <h6 className='font-bold text-md'>Overdues History</h6>
      <div className='grid grid-cols-5 border-b border-gray-200 font-semibold text-sm pb-1'>
        <p>Member ID</p>
        <p>Title</p>
        <p>ISBN</p>
        <p>Due Date</p>
        <p>Fine</p>
      </div>
      {OverduesHistoryData.map((item,index)=>(
        <div key={index} className='grid grid-cols-5 border-b border-gray-200 text-xs font-semibold text-gray-500 pb-1'>
          <p>{item.memberId}</p>
          <p>{item.title}</p>
          <p>{item.isbn}</p>
          <p>{item.dueDate}</p>
          <p>{item.fine}</p>
        </div>
      ))}
    </div>
  )
}

export default OverduesHistory
