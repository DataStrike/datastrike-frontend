import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="m-4">
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </div>
  );
}
