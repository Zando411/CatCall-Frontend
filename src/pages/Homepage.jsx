import heroImage from "../assets/heroImage.jpg";
import logo from "../assets/logo.svg";
import Button from "../components/Button";

export default function Homepage() {
  return (
    <>
      <div className="relative mx-8 flex w-full items-start justify-around gap-8">
        <Button className="absolute -top-20 right-0" defaults={true}>
          Sign In
        </Button>
        {/* left half of hero */}
        <div className="mt-20 w-full basis-3/5">
          <div className="flex w-fit flex-col items-end justify-center gap-2">
            <img src={logo} alt="CatCall Logo" className="" />
            <h2 className="text-3xl font-extrabold">
              Your <span className="text-accent">purrrr</span>fect cat is just a{" "}
              <span className="text-secondary">swipe</span> away
            </h2>
            <Button className={"primary"} defaults={true}>
              Join Now
            </Button>
          </div>
        </div>
        {/* right half of hero */}
        <div className="w-full basis-2/5">
          <img
            src={heroImage}
            alt="Picture of a very handsome cat"
            className="border-accent rounded-4xl border-16"
          />
        </div>
      </div>
    </>
  );
}
