"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const UserTable = ({ users }) => {


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Formats to MM/DD/YYYY by default
  };
  return (
    <div className="ms-10 px-10">
      
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Phone Verify</TableHead>
            <TableHead>Email Verify</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length > 0 &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.phoneVerification?<FaCheck />:<RxCross2 style={{ color: "red" }} />}</TableCell>
                <TableCell>{user.emailVerification?<FaCheck />:<RxCross2 style={{ color: "red" }} />}</TableCell>
                <TableCell>{user.prefs.Role}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
