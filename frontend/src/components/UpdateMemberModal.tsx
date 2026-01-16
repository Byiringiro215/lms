"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MemberProps } from "@/src/types/interfaces";

interface UpdateMemberModalProps {
  member: MemberProps;
  onSubmit: (data: MemberProps) => void;
  onCancel: () => void;
}

const schema = yup.object().shape({
  Member: yup.string().required("Member name is required").min(2, "At least 2 characters"),
  Email: yup.string().email("Invalid email").required("Email is required"),
  RegisterID: yup.string().required("Register ID is required"),
  MemberID: yup.string().required("Member ID is required"),
});

const UpdateMemberModal: React.FC<UpdateMemberModalProps> = ({ member, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberProps>({
    resolver: yupResolver(schema),
    defaultValues: member,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded shadow-lg bg-gray-100 max-w-md w-full mx-4 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-2">Update Member</h2>
        <div>
          <label htmlFor="member-name" className="block text-sm font-medium text-gray-700 mb-1">Member Name</label>
          <input
            id="member-name"
            type="text"
            placeholder="Member Name"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Member")}
          />
          {errors.Member && <p className="text-red-500 text-xs mt-1">{errors.Member.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("Email")}
          />
          {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
        </div>
        <div>
          <label htmlFor="register-id" className="block text-sm font-medium text-gray-700 mb-1">Register ID</label>
          <input
            id="register-id"
            type="text"
            placeholder="Register ID"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("RegisterID")}
          />
          {errors.RegisterID && <p className="text-red-500 text-xs mt-1">{errors.RegisterID.message}</p>}
        </div>
        <div>
          <label htmlFor="member-id" className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
          <input
            id="member-id"
            type="text"
            placeholder="Member ID"
            className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
            {...register("MemberID")}
          />
          {errors.MemberID && <p className="text-red-500 text-xs mt-1">{errors.MemberID.message}</p>}
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

export default UpdateMemberModal; 