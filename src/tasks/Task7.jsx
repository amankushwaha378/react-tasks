import React, { useState } from "react";
import Datatable from "../components/Datatable";
import Badge from "../components/Badge";
import users from "../data/users";




export default function Task7() {
  const columns = [
    {
      key: "name",
      label: "Name",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={value === "Active" ? "success" : "danger"}>
          {value}
        </Badge>
      ),
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  
 
  return (
    <Datatable
      columns={columns}
      data={users}
      searchable
      searchPlaceHolder="Search users..."
      sortable
      pagination
      pageSize={10}
      pageSizeOptions={[10, 20, 50]}
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      loading={false}
      emptyMessage="No users found"
      className="p-4"
    />
  );
}
