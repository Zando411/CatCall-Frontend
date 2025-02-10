import logo from "../assets/logo.svg";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import Nav from "../components/Nav";

export default function Dashboard() {
  return (
    <>
      <Nav></Nav>
      <div className="mx-auto max-w-[1440px] px-8 text-center">
        <body className="m-0 flex min-h-screen min-w-[320px] items-center justify-center">
          <div className="relative mx-8 flex w-full items-start justify-around gap-8">
            <div className="mt-20 w-full">
              <p className="text-center">aaa</p>
            </div>
          </div>
        </body>
      </div>
    </>
  );
}
