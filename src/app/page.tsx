"use client";

import {ModeToggle} from "@/components/mode-toggle";
import {usePrimaryColor} from "@/components/primary-provider";
import PrimaryToggle from "@/components/primary-toggle";

const Home = () => {
  const {primaryColor} = usePrimaryColor();

  return (
    <div>
      <h1 className={`text-3xl font-bold text-${primaryColor}-500`}>Home</h1>
      <ModeToggle />
      <PrimaryToggle />
    </div>
  );
};

export default Home;
