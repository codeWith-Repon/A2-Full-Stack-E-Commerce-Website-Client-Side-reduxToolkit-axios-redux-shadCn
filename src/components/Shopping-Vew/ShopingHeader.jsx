import { HousePlug, Menu, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { ShoppingViewHeaderMenuIems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {ShoppingViewHeaderMenuIems.map((menuItem) => (
        <Link
          className="text-sm font-medium"
          key={menuItem.id}
          to={menuItem.path}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black rounded-full">
            <AvatarFallback className="bg-black text-white font-extrabold rounded-full p-2">
              SM
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShopingHeader = () => {
  const { isAuthenticated,user } = useSelector((state) => state.auth);
  console.log("user", user)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 ">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {isAuthenticated ? <div>
          <HeaderRightContent/>
        </div> : null}
      </div>
    </header>
  );
};

export default ShopingHeader;
