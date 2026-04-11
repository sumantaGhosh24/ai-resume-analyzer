"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {ChessKingIcon, MenuIcon, XIcon} from "lucide-react";

import {guestLinks, userLinks} from "@/constants/landing";

import {usePrimaryColor} from "./primary-provider";
import {ModeToggle} from "./mode-toggle";
import PrimaryToggle from "./primary-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {Button} from "./ui/button";
import {Skeleton} from "./ui/skeleton";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const {primaryColor} = usePrimaryColor();

  const session = null;
  const isPending = false;

  const handleSignOut = async () => {
    console.log("handle sign out");
  };

  const isLoading = false;
  const hasActiveSubscription = false;

  const handleSubscribe = async () => {
    console.log("handle subscribe");
  };

  const handleSubscriptionPortal = async () => {
    console.log("handle subscription portal");
  };

  if (isPending || isLoading) {
    return <Skeleton className="w-full h-20" />;
  }

  return (
    <nav className="w-full border-b">
      <div className="mx-auto container items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              height={20}
              width={20}
              className="h-10 w-10 rounded"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 outline-none bg-black"
              onClick={() => setOpen(!open)}
            >
              {open ? <XIcon color="white" /> : <MenuIcon color="white" />}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-end pb-3 md:mt-0 md:block md:pb-0 ${
            open ? "block" : "hidden"
          }`}
        >
          <NavigationMenu className={open ? "mx-auto" : "ml-auto"}>
            <NavigationMenuList className="flex-col gap-2 md:flex-row">
              {session !== null ? (
                <>
                  {userLinks.map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={item.href}>{item.name}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  {hasActiveSubscription ? (
                    <Button
                      type="button"
                      className={navigationMenuTriggerStyle({
                        className: `bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`,
                      })}
                      onClick={handleSubscriptionPortal}
                    >
                      Subscriptions
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className={navigationMenuTriggerStyle({
                        className: `bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`,
                      })}
                      onClick={handleSubscribe}
                    >
                      <span className="flex items-center gap-1.5">
                        <ChessKingIcon /> Subscribe
                      </span>
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    className={navigationMenuTriggerStyle({
                      className: "bg-white dark:bg-black",
                    })}
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  {guestLinks.map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={item.href}>{item.name}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <Button
                    className={navigationMenuTriggerStyle({
                      className: `bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`,
                    })}
                  >
                    <Link href="/login">Get Started</Link>
                  </Button>
                </>
              )}
              <ModeToggle />
              <PrimaryToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
