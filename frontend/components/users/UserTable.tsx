import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";
import { MoreHorizontal, Edit } from "lucide-react";
import { UserDialog } from "./UserDialog";
import { Role } from "@/types/roles";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
}

export const UserTable = ({
  users,
  onEdit,
}: UserTableProps) => {
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setEditUser(user);
  };

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return <Badge variant="default">Admin</Badge>;
      case Role.TEACHER:
        return <Badge variant="secondary">Teacher</Badge>;
      case Role.STUDENT:
        return <Badge variant="outline">Student</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditClick(user)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editUser && (
        <UserDialog
          user={editUser}
          open={!!editUser}
          onOpenChange={() => setEditUser(null)}
          onSave={(updatedUser) => {
            onEdit && onEdit(updatedUser);
            setEditUser(null);
          }}
        />
      )}
    </>
  );
};
