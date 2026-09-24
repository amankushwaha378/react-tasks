import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useHref,
  useMatch,
  useParams,
  useOutlet,
  NavLink,
} from "react-router-dom";
function Home() {
  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h1 className="mb-3 text-3xl font-bold text-gray-900"> Home </h1>
      <p className="text-gray-600"> Welcome to the Product Dashboard. </p>
    </div>
  );
}
function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/task-80/products");
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Headphones" },
  ];
  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h1 className="mb-3 text-3xl font-bold"> Products </h1>
      <p className="mb-2 text-gray-600">
        Current path:
        <span className="ml-2 font-medium"> {location.pathname} </span>
      </p>
      <p className="mb-6 text-sm text-gray-500">
        Does URL match /task-80/products?
        <span className="font-semibold"> {match ? "Yes" : "No"} </span>
      </p>
      <div className="mb-6 flex flex-wrap gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`${product.id}`}
            className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100"
          >
            {product.name}
          </Link>
        ))}
      </div>
      <button
        onClick={() => navigate("/task-80")}
        className="rounded-md bg-gray-800 px-5 py-2 text-white hover:bg-gray-900"
      >
        Go Home
      </button>
    </div>
  );
}
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold"> Product Details </h1>
      <div className="mb-6 space-y-2">
        <p className="text-gray-600">
          Product ID:
          <span className="ml-2 font-bold text-blue-600"> {id} </span>
        </p>
        <p className="text-gray-600">
          Current URL:
          <span className="ml-2 font-medium text-gray-900">
            {location.pathname}
          </span>
        </p>
      </div>
      <button
        onClick={() => navigate("/task-80/products")}
        className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
      >
        Back to Products
      </button>
    </div>
  );
}
function Dashboard() {
  const outlet = useOutlet();
  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold"> Dashboard </h1>
      <div className="mb-6 flex gap-3">
        <Link
          to="profile"
          className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Profile
        </Link>
        <Link
          to="settings"
          className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Settings
        </Link>
      </div>
      <div className="rounded-md bg-gray-50 p-6"> {outlet} </div>
    </div>
  );
}
function Profile() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold"> Profile </h2>
      <p className="text-gray-600"> Name: Aman </p>
    </div>
  );
}
function Settings() {
  const href = useHref("/task-80/dashboard/settings");
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold"> Settings </h2>
      <p className="mb-2 text-gray-600"> Generated href: </p>
      <code className="rounded bg-gray-100 px-3 py-2 text-sm text-blue-600">
        {href}
      </code>
    </div>
  );
}
function Navbar() {
  const location = useLocation();

  const productsMatch = useMatch("/task-80/products/*");

  return (
    <nav className="flex flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow">
      <NavLink
        to="/task-80"
        end
        className={({ isActive }) =>
          `rounded-md px-4 py-2 font-medium text-white ${
            isActive ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-600"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/task-80/products"
        className={({ isActive }) =>
          `rounded-md px-4 py-2 font-medium text-white ${
            isActive ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-600"
          }`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/task-80/dashboard"
        className={({ isActive }) =>
          `rounded-md px-4 py-2 font-medium text-white ${
            isActive ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-600"
          }`
        }
      >
        Dashboard
      </NavLink>

      <div className="ml-auto text-sm text-gray-600">
        Current URL:
        <span className="ml-1 font-semibold text-gray-900">
          {location.pathname}
        </span>
      </div>

      {productsMatch && (
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Products Active
        </span>
      )}
    </nav>
  );
}
function Task80() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar /> <hr className="my-6 border-gray-300" />
      <Routes>
        <Route index element={<Home />} />

        <Route path="products" element={<Products />} />

        <Route path="products/:id" element={<ProductDetails />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="old-dashboard"
          element={<Navigate to="../dashboard" replace />}
        />

        <Route
          path="*"
          element={
            <h1 className="text-3xl font-bold text-red-600">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </div>
  );
}
export default Task80;
