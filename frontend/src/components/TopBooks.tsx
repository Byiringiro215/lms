import React from 'react'
import { TopBooksData } from '../placeholder_data/data'

const TopBooks = () => {
  return (
    <div className='flex flex-col gap-2 p-4 rounded-md shadow-sm w-1/2'>
      <div className='flex gap-2 text-xs font-bold'>
        <button className='text-white bg-green-500 rounded-full p-1 cursor-pointer hover:bg-green-600 transition-all duration-300'>Top Books</button>
        <button className='text-gray-500 border-2 border-gray-400 rounded-full p-1 cursor-pointer hover:bg-gray-100 transition-all duration-300'>New Arrivals</button>
      </div>
      {
        TopBooksData.map((book,index)=>(
          <div key={index} className='space-y-1 border-b border-gray-300 p-3 '>
            <p className='text-gray-900 font-semibold text-sm'>{book.Title}</p>
            <p className='text-gray-500 text-xs'>{book.Author}</p>
            <p className={`rounded-full  text-xs w-fit px-1 ${book.status === 'available' ? 'text-green-500 bg-green-100' : book.status === 'borrowed' ? 'text-yellow-500 bg-yellow-100' : 'text-red-500 bg-red-100'}`}>{book.status}</p>
          </div>
        ))
      }
    </div>
  )
}

export default TopBooks
