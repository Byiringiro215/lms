"use client"
import React, { useState } from 'react'
import clsx from 'clsx';
import { Delete } from 'lucide-react';
import { FilePenLine } from 'lucide-react';
import { Search } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import { BookData } from '~/src/placeholder_data/data';
import { Eye } from 'lucide-react';
import DeleteItem from '~/src/components/DeleteItem';
import { BookProps } from '~/src/types/interfaces';
import UpdateBookModal from '@/src/components/UpdateBookModal';
import AddBook from '@/src/components/AddBook';

const BOOKS_PER_PAGE = 5;

const page = () => {
  const [memberToDelete, setMemberToDelete] = useState<BookProps | null>(null);
  const [bookToUpdate, setBookToUpdate] = useState<BookProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddBook, setShowAddBook] = useState(false);

  const totalPages = Math.ceil(BookData.length / BOOKS_PER_PAGE);
  const startIdx = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIdx = startIdx + BOOKS_PER_PAGE;
  const currentBooks = BookData.slice(startIdx, endIdx);

  const handleUpdateBook = (updatedBook: BookProps) => {
    // handle update 
    setBookToUpdate(null);
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      <div className='p-3'>
        <h1 className='text-2xl font-bold'>Books</h1>
        <div className='flex justify-between items-center py-3'>
          <h1 className='text-gray-500  text-sm'>To create a book and view book details</h1>
          <div className='flex gap-2 items-center '>
              <form action="" className="flex gap-2 items-center">
                  <div className='flex items-center gap-2 border border-gray-300 rounded-full'>
                  <input type="text" placeholder='Search member' className='p-1 text-sm text-gray-500 focus:outline-none' />
                      <Search className='text-gray-500 w-4 h-4 mr-1 cursor-pointer' />
                  </div>
              </form>
              <button type='button' className='flex items-center bg-green-600 text-white rounded-full text-xs p-2 cursor-pointer hover:bg-green-500 transition-all duration-300' onClick={() => setShowAddBook(true)}>
                <UserPlus className='w-4 h-4' />
                Add Book
              </button>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md m-3 p-3'>
        <div className='grid grid-cols-7 p-2 text-xs font-semibold text-gray-900 border-b border-gray-200'>
        <p>ID</p>
        <p>ISBN</p>
        <p className='-ml-13'>Name</p>
        <p>Category</p>
        <p>Language</p>
        <p>Status</p>
        <p>Action</p>
        </div>
        {
          currentBooks.map((book,index)=>(
            <div key={book.ID} className='grid grid-cols-7 p-2 text-xs font-semibold text-gray-500 border-b border-gray-200 hover:bg-gray-200 transition-all duration-300 hover:text-gray-800'>
              <p>{book.ID}</p>
              <p>{book.ISBN}</p>
              <p className='-ml-13'>{book.Name}</p>
              <p>{book.Category}</p>
              <p>{book.Language}</p>
              <p
                className={clsx(
                    ' rounded-full   text-xs w-18 pt-1 text-center capitalize font-light',
                    book.Status === 'available' && ' bg-green-100 text-green-600',
                    book.Status === 'borrowed' && ' bg-red-100 text-red-600',
                    book.Status === 'lost' && ' bg-gray-100 text-gray-500',
                  )}
              >{book.Status}</p>
              <div className='flex gap-2 items-center'>
                <Eye className='w-5 h-5 cursor-pointer text-gray-500' />
                <FilePenLine  className='w-5 h-5 cursor-pointer text-green-600' onClick={() => setBookToUpdate(book)} />
                <Delete 
                  className='w-6 h-6 cursor-pointer text-red-600' 
                  onClick={() => setMemberToDelete(book)}
                />
              </div>
            </div>
          ))
        }
       
        <div className='flex justify-center items-center gap-2 mt-4'>
          <button
            className='px-3 py-1 rounded border text-xs disabled:opacity-50'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded border text-xs ${currentPage === i + 1 ? 'bg-green-600 text-white' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className='px-3 py-1 rounded border text-xs disabled:opacity-50'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        </div>
      </div>
      {memberToDelete && (
        <DeleteItem
          title="Delete Book"
          itemName={memberToDelete?.Name}
          onDelete={() => {
            setMemberToDelete(null);
          }}
          onCancel={() => setMemberToDelete(null)}
        />
      )}
      {bookToUpdate && (
        <UpdateBookModal
          book={bookToUpdate}
          onSubmit={handleUpdateBook}
          onCancel={() => setBookToUpdate(null)}
        />
      )}
      {showAddBook && (
        <AddBook
          onSubmit={(data) => {
            // handle add book logic here
            setShowAddBook(false);
            console.log('Book added:', data);
          }}
          onCancel={() => setShowAddBook(false)}
        />
      )}
    </>
  )
}

export default page
