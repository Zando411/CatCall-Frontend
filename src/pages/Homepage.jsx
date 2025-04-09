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
                  <img
                    src={logo}
                    alt="CatCall Logo"
                    width={780}
                    height={230}
                    className="h-auto w-full max-w-[780px]"
                  />
                </NavLink>
                <h2 className="text-3xl font-extrabold">
                  Your <span className="text-accent">purrrr</span>fect cat is
                  just a <span className="text-secondary">like</span> away
                </h2>
                <div className="flex flex-row gap-2">
                  <NavLink to="/auth?form=login" end>
                    <Button
                      className="hover:bg-secondary bg-gray-200"
                      defaults={true}
                    >
                      Sign in
                    </Button>
                  </NavLink>
                  <NavLink to="/auth?form=signup" end>
                    <Button className={"primary"} defaults={true}>
                      Join Now
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
            {/* right half of hero */}
            <div className="col-span-5 hidden lg:block">
              <div className="aspect-[550/700] w-full">
                <img
                  src={heroImage}
                  width={550}
                  height={700}
                  alt="Picture of a very handsome cat"
                  className="border-accent h-full w-full rounded-4xl border-16 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mitten-white absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:28px_28px]"></div>
    </>
  );
}
