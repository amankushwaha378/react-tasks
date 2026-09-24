import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

const data = [
  {
    id: 1,
    firstName: "Aman",
    lastName: "Kushwaha",
    age: 21,
    salary: 50000,
  },
  {
    id: 2,
    firstName: "Rahul",
    lastName: "Sharma",
    age: 22,
    salary: 60000,
  },
  {
    id: 3,
    firstName: "Priya",
    lastName: "Patel",
    age: 20,
    salary: 55000,
  },
  {
    id: 4,
    firstName: "Neha",
    lastName: "Mehta",
    age: 23,
    salary: 70000,
  },
];

const columnHelper = createColumnHelper();

const columns = columnHelper.columns([
 
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),

  columnHelper.accessor("lastName", {
    header: "Last Name",
  }),


  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "fullName",
    header: "Full Name",
  }),

  // Normal property + custom cell
  columnHelper.accessor("age", {
    header: "Age",
    cell: ({ getValue }) => {
      return `${getValue()} years`;
    },
  }),

  // Custom formatting
  columnHelper.accessor("salary", {
    header: () => "💰 Salary",
    cell: ({ getValue }) => {
      return `₹${getValue().toLocaleString()}`;
    },
  }),
]);
const features = tableFeatures({});


function BasicTable() {
  const table = useTable({
    data,
    columns,
    features,
  });


  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <table.FlexRender header={header} />
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BasicTable;
