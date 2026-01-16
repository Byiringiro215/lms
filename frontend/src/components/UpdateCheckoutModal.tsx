"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckoutBookProps } from "@/src/types/interfaces";

interface UpdateCheckoutModalProps {
  checkout: CheckoutBookProps;
  onSubmit: (data: CheckoutBookProps) => void;
  onCancel: () => void;
}

const schema = yup.object().shape({
  Member: yup
    .string()
    .required("Member name is required")
    .min(2, "At least 2 characters"),
  Title: yup
    .string()
    .required("Book title is required")
    .min(2, "At least 2 characters"),
  Author: yup
    .string()
    .required("Author is required")
    .min(2, "At least 2 characters"),
  BorrowedDate: yup.string().required("Borrowed date is required"),
  ReturnedDate: yup.string().required("Returned date is required"),
  status: yup
    .string()
    .oneOf(["available", "borrowed", "renewed", "reserved"], "Invalid status")
    .required("Status is required"),
});

const UpdateCheckoutModal: React.FC<UpdateCheckoutModalProps> = ({
  checkout,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutBookProps>({
    resolver: yupResolver(schema) as any,
    defaultValues: checkout,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded shadow-lg bg-gray-100 max-w-md w-full mx-4 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-2">Update Checkout</h2>
        <div>
          <label
            htmlFor="member-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Member Name
          </label>
          <input
            id="member-name"
            type="text"
            placeholder="Member Name"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Member")}
          />
          {errors.Member && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Member.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="book-title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Book Title
          </label>
          <input
            id="book-title"
            type="text"
            placeholder="Book Title"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Title")}
          />
          {errors.Title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Title.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="Author"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Author")}
          />
          {errors.Author && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Author.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="borrowed-date"
            className="block text sm font-medium text-gray-700 mb-1"
          >
            Borrowed Date
          </label>
          <input
            id="borrowed-date"
            type="date"
            placeholder="Borrowed Date"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("BorrowedDate")}
          />
          {errors.BorrowedDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.BorrowedDate.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="returned-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Returned Date
          </label>
          <input
            id="returned-date"
            type="date"
            placeholder="Returned Date"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("ReturnedDate")}
          />
          {errors.ReturnedDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ReturnedDate.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("status")}
          >
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
            <option value="renewed">Renewed</option>
            <option value="reserved">Reserved</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">
              {errors.status.message as string}
            </p>
          )}
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
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCheckoutModal;
