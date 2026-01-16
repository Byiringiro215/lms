"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BookProps } from "@/src/types/interfaces";

interface UpdateBookModalProps {
  book: BookProps;
  onSubmit: (data: BookProps) => void;
  onCancel: () => void;
}

const schema = yup.object().shape({
  Name: yup
    .string()
    .required("Book name is required")
    .min(2, "At least 2 characters"),
  ISBN: yup
    .string()
    .required("ISBN is required")
    .min(2, "At least 2 characters"),
  Category: yup
    .string()
    .required("Category is required")
    .min(2, "At least 2 characters"),
  Language: yup
    .string()
    .required("Language is required")
    .min(2, "At least 2 characters"),
  Status: yup
    .string()
    .oneOf(["available", "borrowed", "lost"], "Invalid status")
    .required("Status is required"),
});

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({
  book,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookProps>({
    resolver: yupResolver(schema) as any,
    defaultValues: book,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded shadow-lg bg-gray-100 max-w-md w-full mx-4 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-2">Update Book</h2>
        <div>
          <label
            htmlFor="book-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Book Name
          </label>
          <input
            id="book-name"
            type="text"
            placeholder="Book Name"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Name")}
          />
          {errors.Name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Name.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ISBN
          </label>
          <input
            id="isbn"
            type="text"
            placeholder="ISBN"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("ISBN")}
          />
          {errors.ISBN && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ISBN.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <input
            id="category"
            type="text"
            placeholder="Category"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Category")}
          />
          {errors.Category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Category.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language
          </label>
          <input
            id="language"
            type="text"
            placeholder="Language"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Language")}
          />
          {errors.Language && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Language.message as string}
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
            {...register("Status")}
          >
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
            <option value="lost">Lost</option>
          </select>
          {errors.Status && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Status.message as string}
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

export default UpdateBookModal;
