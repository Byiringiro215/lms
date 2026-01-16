"use client"
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { CheckoutBookData } from '@/src/placeholder_data/data'
import { FilePenLine } from 'lucide-react';
import { Delete } from 'lucide-react';
import clsx from 'clsx';
import DeleteItem from '@/src/components/DeleteItem';
import { CheckoutBookProps } from '@/src/types/interfaces';
import { UserPlus } from 'lucide-react';
import AddBorrower from '@/src/components/AddBorrower';
import UpdateCheckoutModal from '@/src/components/UpdateCheckoutModal';

const CHECKOUTS_PER_PAGE = 5;

const page = () => {
  const [itemToDelete, setItemToDelete] = useState<CheckoutBookProps | null>(null);
  const [showAddBorrower, setShowAddBorrower] = useState(false);
  const [checkoutToUpdate, setCheckoutToUpdate] = useState<CheckoutBookProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CheckoutBookData.length / CHECKOUTS_PER_PAGE);
  const startIdx = (currentPage - 1) * CHECKOUTS_PER_PAGE;
  const endIdx = startIdx + CHECKOUTS_PER_PAGE;
  const currentCheckouts = CheckoutBookData.slice(startIdx, endIdx);

  const handleAddBorrower = (data: any) => {
    // handle add borrower 
    setShowAddBorrower(false);
  };

  const handleUpdateCheckout = (updatedCheckout: CheckoutBookProps) => {
    // handle update 
    setCheckoutToUpdate(null);
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold px-3'>Checkout</h1>
        <div className='flex justify-between items-center py-3 px-3'>
          <h1 className='text-gray-500  text-sm'>To checkout a book</h1>
          <div className='flex gap-2 items-center '>
              <form action="" className="flex gap-2 items-center">
                  <div className='flex items-center gap-2 border border-gray-300 rounded-full'>
                  <input type="text" placeholder='Search member' className='p-1 text-sm text-gray-500 focus:outline-none' />
                      <Search className='text-gray-500 w-4 h-4 mr-1 cursor-pointer' />
                  </div>
              </form>
              <button type='button' className='flex items-center bg-green-600 text-white rounded-full text-xs p-2 cursor-pointer hover:bg-green-500 transition-all duration-300' onClick={() => setShowAddBorrower(true)}>
                  <UserPlus className='w-4 h-4' />
                      Add Borrow
              </button>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md m-3 p-3'>
          <div className='grid grid-cols-8 p-2 text-xs font-semibold text-gray-900 border-b border-gray-200'>
            <p>Member ID</p>
            <p>Member</p>
            <p>Title</p>
            <p>Author</p>
            <p>Borrowed Date</p>
            <p>Returned Date</p>
            <p>Status</p>
            <p>Actions</p>
          </div>
          {
            currentCheckouts.map((checkout,index)=>(
              <div key={index} className='grid grid-cols-8 p-2 text-xs font-semibold text-gray-500 border-b border-gray-200 hover:bg-gray-200 transition-all duration-300 hover:text-gray-800'>
                <p>{checkout.MemberID}</p>
                <p>{checkout.Member}</p>
                <p>{checkout.Title}</p>
                <p>{checkout.Author}</p>
                <p>{checkout.BorrowedDate}</p>
                <p>{checkout.ReturnedDate}</p>
                <p
                className={clsx(
                  'bg-gray-100 rounded-full py-1 px-2 text-xs w-fit',
                  checkout.status === 'returned' && ' text-green-600',
                  checkout.status === 'pending' && ' text-red-400',
                )}
                >{checkout.status}</p>
                <div className='flex gap-2 items-center'>
                    <FilePenLine  className='w-5 h-5 cursor-pointer text-green-600' onClick={() => setCheckoutToUpdate(checkout)} />
                    <Delete className='w-6 h-6 cursor-pointer text-red-600' onClick={() => setItemToDelete(checkout)} />
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
      {itemToDelete && (
        <DeleteItem
          title="Delete Checkout"
          itemName={itemToDelete?.Title}
          onDelete={() => {
            setItemToDelete(null);
          }}
          onCancel={() => setItemToDelete(null)}
        />
      )}
      {showAddBorrower && (
        <AddBorrower
          onSubmit={handleAddBorrower}
          onCancel={() => setShowAddBorrower(false)}
        />
      )}
      {checkoutToUpdate && (
        <UpdateCheckoutModal
          checkout={checkoutToUpdate}
          onSubmit={handleUpdateCheckout}
          onCancel={() => setCheckoutToUpdate(null)}
        />
      )}
    </>
  )
}

export default page
