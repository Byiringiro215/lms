'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
type DeleteDialogProps = {
  title: string;
  itemName: string;
  onDelete: () => void;
  onCancel?: () => void;
};

const DeleteItem: React.FC<DeleteDialogProps> = ({ title, itemName, onDelete, onCancel }) => {
    const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[1px]">
      <div className="p-6 border rounded shadow bg-white max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">Are you sure you want to delete <strong>{itemName}</strong>?</p>
        <div className="flex justify-end space-x-3">
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
