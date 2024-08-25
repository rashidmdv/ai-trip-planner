import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-5 md:mx-20 gap-9">
      <h1 className="font-bold text-[27px] sm:text-[40px] md:text-[40px] lg:text-[50px] text-center mt-10 sm:mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        <br /> Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"} className="text-center">
        <Button>Get started, It is free</Button>
      </Link>
    </div>
  );
};

export default Hero;
