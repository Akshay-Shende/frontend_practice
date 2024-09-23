import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
const UserTable = ({users}) => {
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
          <TableHead>City</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Date of Birth</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 &&
          users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                {user.name.first} {user.name.last}
              </TableCell>
              <TableCell>{user.location.city}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.cell}</TableCell>
              <TableCell>{formatDate(user.dob.date)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
  )
}

export default UserTable
