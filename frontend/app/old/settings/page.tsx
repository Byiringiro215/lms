"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "At least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  userId: yup.string().required("ID is required"),
  role: yup.string().oneOf(["student", "librarian"], "Invalid role").required(),
  notifications: yup.object().shape({
    dueDate: yup.boolean(),
    overdue: yup.boolean(),
    reservation: yup.boolean(),
    newsletter: yup.boolean(),
  }),
  privacy: yup.object().shape({
    historyPrivate: yup.boolean(),
    deleteAccount: yup.boolean(),
  }),
  preferences: yup.object().shape({
    darkMode: yup.boolean(),
    language: yup.string().required(),
  }),
});

const defaultValues = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "",
  userId: "S1234567",
  role: "student",
  profilePic: "/profilePic.jpg",
  notifications: {
    dueDate: true,
    overdue: true,
    reservation: true,
    newsletter: false,
  },
  privacy: {
    historyPrivate: false,
    deleteAccount: false,
  },
  preferences: {
    darkMode: false,
    language: "en",
  },
};

type SettingsForm = typeof defaultValues;

const SettingsPage = () => {
  const [profilePic, setProfilePic] = useState(defaultValues.profilePic);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SettingsForm>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  const role = watch("role");
  const deleteAccount = watch("privacy.deleteAccount");

  const onSubmit = (data: any) => {
    alert("Settings saved! (This is a placeholder)");
    reset(data);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfilePic(url);
      setValue("profilePic", url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Profile Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200">
                  <Image
                    src={profilePic}
                    alt="Profile Pic"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-xs"
                  onChange={handleProfilePicChange}
                />
              </div>
              <div className="flex-1 w-full flex flex-col gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {role === "student" ? "Student ID" : "Staff ID"}
                  </label>
                  <input
                    id="userId"
                    type="text"
                    className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
                    {...register("userId")}
                  />
                  {errors.userId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.userId.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
                    {...register("role")}
                  >
                    <option value="student">Student</option>
                    <option value="librarian">Librarian</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.role.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Notification Preferences
            </h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("notifications.dueDate")}
                  className="accent-green-600"
                />
                Due Date Reminders
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("notifications.overdue")}
                  className="accent-green-600"
                />
                Overdue Book Alerts
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("notifications.reservation")}
                  className="accent-green-600"
                />
                Reservation Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("notifications.newsletter")}
                  className="accent-green-600"
                />
                New Arrivals / Newsletter
              </label>
            </div>
          </div>
          {/* Privacy */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Privacy</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("privacy.historyPrivate")}
                  className="accent-green-600"
                />
                Make my borrowing history private
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("privacy.deleteAccount")}
                  className="accent-red-600"
                />
                Delete my account
              </label>
              {deleteAccount && (
                <p className="text-red-500 text-xs mt-1">
                  Warning: This will permanently delete your account!
                </p>
              )}
            </div>
          </div>
          {/* Preferences */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Preferences</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("preferences.darkMode")}
                  className="accent-green-600"
                />
                Dark Mode
              </label>
              <label className="flex items-center gap-2">
                <span>Language</span>
                <select
                  {...register("preferences.language")}
                  className="border border-gray-300 rounded p-2 text-sm focus:border-gray-500 bg-white"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </label>
            </div>
          </div>
          {/* Librarian Only Section (Demo) */}
          {role === "librarian" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Librarian Tools</h2>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded w-fit cursor-not-allowed"
                  disabled
                >
                  Manage Library Branches (Demo)
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded w-fit cursor-not-allowed"
                  disabled
                >
                  Manage User Permissions (Demo)
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded w-fit cursor-not-allowed"
                  disabled
                >
                  View System Logs (Demo)
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
