"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AddBorrowerProps {
  onSubmit: (data: AddBorrowerFormData) => void;
  onCancel: () => void;
}

interface AddBorrowerFormData {
  member: string;
  title: string;
  author: string;
  borrowDate: string;
}

const schema = yup.object().shape({
  member: yup.string().required("Member name is required").min(2, "At least 2 characters"),
  title: yup.string().required("Book title is required").min(2, "At least 2 characters"),
  author: yup.string().required("Author is required").min(2, "At least 2 characters"),
  borrowDate: yup.string().required("Borrow date is required"),
});

const AddBorrower: React.FC<AddBorrowerProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBorrowerFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded shadow-lg bg-gray-100 max-w-md w-full mx-4 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-2">Add Borrower</h2>
        <div>
          <input
            type="text"
            placeholder="Member Name"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("member")}
          />
          {errors.member && <p className="text-red-500 text-xs mt-1">{errors.member.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Book Title"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("title")}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Author"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("author")}
          />
          {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
        </div>
        <div>
          <input
            type="date"
            placeholder="Borrow Date"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("borrowDate")}
          />
          {errors.borrowDate && <p className="text-red-500 text-xs mt-1">{errors.borrowDate.message}</p>}
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBorrower; 