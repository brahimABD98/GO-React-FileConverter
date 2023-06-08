import NavBar from "@/components/NavBar";

import { Outlet } from "react-router-dom";


export default function DefaultLayout() {
  return (
    <>
      <div className=" h-screen w-screen">
        <div>
          <NavBar />
        </div>
        <Outlet />
      </div>
    </>
  );
}
