"use client"
import React, { useState } from 'react'
import { UserPlus } from 'lucide-react';
import { Search } from 'lucide-react';
import { MemberData } from '@/src/placeholder_data/data';
import { Delete } from 'lucide-react';
import { FilePenLine } from 'lucide-react';
import DeleteItem from '@/src/components/DeleteItem';
import { MemberProps } from '@/src/types/interfaces';
import UpdateMemberModal from '@/src/components/UpdateMemberModal';

const MEMBERS_PER_PAGE = 5;

const page = () => {
  const [memberToDelete, setMemberToDelete] = useState<MemberProps | null>(null);
  const [memberToUpdate, setMemberToUpdate] = useState<MemberProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MemberData.length / MEMBERS_PER_PAGE);
  const startIdx = (currentPage - 1) * MEMBERS_PER_PAGE;
  const endIdx = startIdx + MEMBERS_PER_PAGE;
  const currentMembers = MemberData.slice(startIdx, endIdx);

  const handleUpdateMember = (updatedMember: MemberProps) => {
    // handle update  
    setMemberToUpdate(null);
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      <div className='p-3'>
        <h1 className='text-2xl font-bold'>Members</h1>
        <div className='flex justify-between items-center py-3'>
          <h1 className='text-gray-500  text-sm'>To create a member and view member report</h1>
          <div className='flex gap-2 items-center '>
              <form action="" className="flex gap-2 items-center">
                  <div className='flex items-center gap-2 border border-gray-300 rounded-full'>
                  <input type="text" placeholder='Search member' className='p-1 text-sm text-gray-500 focus:outline-none' />
                      <Search className='text-gray-500 w-4 h-4 mr-1 cursor-pointer' />
                  </div>
                
              </form>
              {/* <button type='submit' className='flex items-center bg-green-600 text-white rounded-full text-xs p-2 cursor-pointer hover:bg-green-500 transition-all duration-300'>
                  <UserPlus className='w-4 h-4' />
                      Add Member
                      </button> */}
              <button className='text-gray-500 text-xs border-2 border-gray-300 rounded-full py-2 px-4 flex gap-1 cursor-pointer hover:bg-gray-200 transition-all duration-300'>
                  import
              </button>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md m-3 p-3'>
        <div className='grid grid-cols-5 p-2 text-xs font-semibold text-gray-900 border-b border-gray-200'>
          <p>Member ID</p>
          <p>Register ID</p>
          <p>Member</p>
          <p>Email</p>
          <p>Action</p>
        </div>
        {
          currentMembers.map((member,index)=>(
            <div key={index} className='grid grid-cols-5 p-2 text-xs font-semibold text-gray-500 border-b border-gray-200 hover:bg-gray-200 transition-all duration-300 hover:text-gray-800'>
              <p>{member.MemberID}</p>
              <p>{member.RegisterID}</p>
              <p>{member.Member}</p>
              <p>{member.Email}</p>
              <div className='flex gap-2 items-center'>
                <FilePenLine  className='w-5 h-5 cursor-pointer text-green-600' onClick={() => setMemberToUpdate(member)} />
                <Delete 
                  className='w-6 h-6 cursor-pointer text-red-600' 
                  onClick={() => setMemberToDelete(member)}
                />
              </div>
            </div>
          ))
        }
        {/* Pagination Controls */}
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
          title="Delete Member"
          itemName={memberToDelete?.Member}
          onDelete={() => {
            setMemberToDelete(null);
          }}
          onCancel={() => setMemberToDelete(null)}
        />
      )}
      {memberToUpdate && (
        <UpdateMemberModal
          member={memberToUpdate}
          onSubmit={handleUpdateMember}
          onCancel={() => setMemberToUpdate(null)}
        />
      )}
    </>
  )
}

export default page
