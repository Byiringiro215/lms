'use client'
import React,{useState} from 'react'
import { BookOpenText } from 'lucide-react';
import { Search } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { Bell } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';


const TopBar = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const filterOptions = ["ISBN","Title","Author","Member"];
    const [filter, setFilter] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterToggle = (option: string) => {
      setSelectedFilters(prev => 
        prev.includes(option) 
          ? prev.filter(f => f !== option)
          : [...prev, option]
      );
    };

    const removeFilter = (filterToRemove: string) => {
      setSelectedFilters(prev => prev.filter(f => f !== filterToRemove));
    };

    return (
      <div className='z-50 fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white'>
        <div className='flex items-center gap-2'>
        <BookOpenText />
          <h1 className='text-2xl font-extrabold '>RCA LMS</h1>
        </div>
        <div className='relative flex items-center border border-gray-300 rounded-full py-1 px-5'>
         <div className='flex items-center mt-1 mr-2'>
         <Search className='w-4 h-4 cursor-pointer text-gray-500' />
         {showSearchDropdown ?
        <ChevronUp 
        className='text-gray-500 w-4 h-4 cursor-pointer' 
        onClick={() => setShowSearchDropdown(!showSearchDropdown)}
        />
        :
        <ChevronDown 
        className='text-gray-500 w-4 h-4 cursor-pointer'
        onClick={() => setShowSearchDropdown(!showSearchDropdown)}
        />
      }
         </div>
          <div className='flex flex-wrap items-center gap-2 w-full max-w-[300px]'>
            {selectedFilters.map((selectedFilter) => (
              <div key={selectedFilter} className='flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 text-xs flex-shrink-0'>
                <span className='text-gray-700'>{selectedFilter}</span>
                <button 
                  onClick={() => removeFilter(selectedFilter)}
                  className='text-gray-500 hover:text-gray-700 text-xs'
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type='text'
              placeholder={filter ? '' : (selectedFilters.length > 0 ? ` ${selectedFilters.join(', ')}` : 'SearchEx.ISBN,Title,Author,Member,etc')}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='flex-1 min-w-0 rounded-md focus:outline-none text-gray-500 text-sm placeholder:text-[12px]'
            />
          </div>
       {showSearchDropdown &&(
           <div className='absolute rounded-md bg-white z-30  p2-1 shadow-lg translate-y-14 w-32 text-sm'>
           {filterOptions.map((option,index)=>(
             <div key={index} className='flex items-center gap-2'>
               <p 
               className={clsx(
                 'cursor-pointer px-1 hover:bg-gray-100  w-full',
                 selectedFilters.includes(option) && 'bg-gray-200'
               )}
               onClick={() => handleFilterToggle(option)}
               >{option}</p>
             </div>
           ))}
         </div>
       )}
        </div>

        <div className='flex  items-center gap-3   p-2 text-xs'>
          <div className='flex px-2 py-1 border border-gray-300 rounded-full items-center gap-1 cursor-pointer'>
          <CalendarDays className='text-gray-500 w-4 h-4'/>
        <form action="">
          <select name="" id="" className=' text-semibold text-gray-700 rounded outline-none cursor-pointer'>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last60days">Last 60 days</option>
              <option value="last90days">Last 90 days</option>
              <option value="last180days">Last 180 days</option>
              <option value="last365days">Last 365 days</option>
              <option value="last730days">Last 730 days</option>
          </select>
        </form>
          </div>
        <div>
        <Bell className='relative text-gray-500 w-5 h-5 cursor-pointer'/>
        <div className='absolute -mt-5 ml-3 w-2 h-2 rounded-full bg-red-500'></div>
        </div>
      
        <div className='relative flex gap-1 items-center'>
          <Image src="/profilePic.jpg" alt="profile" width={30} height={30} className='rounded-full h-7 w-7' />
          <p className='text-gray-600 text-sm font-semibold'>Accountant</p>
        {showDropDown ?
        <ChevronUp 
        className='text-gray-500 w-4 h-4 cursor-pointer' 
        onClick={() => setShowDropDown(!showDropDown)}
        />
        :
        <ChevronDown 
        className='text-gray-500 w-4 h-4 cursor-pointer'
        onClick={() => setShowDropDown(!showDropDown)}
        />
      }
        {showDropDown &&(
            <div className='absolute py-5  rounded-md bg-white z-10 flex flex-col gap-2 shadow-lg w-32 text-start font-semibold translate-y-24 '>
            <Link href="/profile" className='hover:bg-gray-100 py-2 px-3'>Profile</Link>
            <Link href="/settings" className='hover:bg-gray-100 py-2 px-3'>Settings</Link>
            <Link href="/logout" className='text-red-500 hover:bg-gray-100 py-2 px-3'>Logout</Link>
          </div>
        )}
        </div>
        </div>


      </div>
    )
  }

  export default TopBar
