import heroImage from "../assets/heroImage.jpg";
import logo from "../assets/logo.svg";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] text-center">
        <div className="min-h-screen">
          <div className="relative grid place-items-center gap-8 px-8 pt-8 lg:grid-cols-12">
            {/* left half of hero */}
            <div className="col-span-7">
              <div className="flex w-fit flex-col items-end justify-center gap-2">
                <NavLink to="/" end>
                  <img src={logo} alt="CatCall Logo" className="" />
                </NavLink>
                <h2 className="text-3xl font-extrabold">
                  Your <span className="text-accent">purrrr</span>fect cat is
                  just a <span className="text-secondary">like</span> away
                </h2>
                <NavLink to="/auth" end>
                  <Button className={"primary"} defaults={true}>
                    Sign In
                  </Button>
                </NavLink>
              </div>
            </div>
            {/* right half of hero */}
            <div className="col-span-5 hidden lg:block">
              <img
                src={heroImage}
                alt="Picture of a very handsome cat"
                className="border-accent rounded-4xl border-16"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mitten-white absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:28px_28px]"></div>
    </>
  );
}
