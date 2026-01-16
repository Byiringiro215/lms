import React from 'react'
import { CheckoutData } from '../placeholder_data/data'
const RecentCheckOuts = () => {
  return (
    <div className='bg-white p-3 flex flex-col gap-4 rounded-md shadow-sm'>
<div className='flex justify-between p-2 items-center'>
<h6 className='font-bold text-md'>Recent Checkouts</h6>
<button className=' text-green-500 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300'>View All</button>
</div>
    <div className='grid grid-cols-7 border-b border-gray-200 font-semibold text-sm pb-1'>
      <p>ID</p>
      <p>ISBN</p>
      <p>Title</p>
      <p>Author</p>
      <p>Member</p>
      <p>Issued Date</p>
      <p>Return Date</p>
    </div>
    {CheckoutData.map((item,index)=>(
      <div key={index} className='grid grid-cols-7 border-b border-gray-200 text-xs font-semibold text-gray-500 p-1  odd:bg-gray-100'>
        <p>{item.ID}</p>
        <p>{item.ISBN}</p>
        <p>{item.Title}</p>
        <p>{item.Author}</p>
        <p>{item.Member}</p>
        <p>{item.IssuedDate}</p>
        <p>{item.ReturnDate}</p>
      </div>
    ))}
  </div>
  )
}

export default RecentCheckOuts
