"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, Cpu, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems, productCategories } from "@/constants/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../ModeToggle";
import ShoppingCart from "../ShoppingCart";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CustomUserButton from "../auth/CustomUserButton";
export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false); // Mobile sheet state

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile sheet on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left: Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Cpu className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block text-xl font-bold tracking-tight">
              Netlab
            </span>
          </Link>

          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.title === "Categories" ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {productCategories.map((category) => (
                            <ListItem
                              key={category.title}
                              title={category.title}
                              href={category.href}
                            >
                              {category.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent",
                          pathname === item.href &&
                            "text-primary font-semibold",
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <div className="flex items-center gap-1 md:gap-2">
            <div>
              <Button className="p-5 cursor-pointer">
                Netlab Studio <ArrowRight />
              </Button>
            </div>
            <ModeToggle />

            <div>
              <header className="flex justify-end items-center p-4 gap-4 h-16">
                <Show when="signed-out">
                  <SignInButton oauthFlow="popup">
                    <Button variant="ghost" size="icon" className="">
                      <User className="h-5 w-5" />
                    </Button>
                  </SignInButton>
                  {/* <SignUpButton /> */}
                </Show>
                <Show when="signed-in">
                  {/* <UserButton /> */}
                  <CustomUserButton />
                </Show>
              </header>
            </div>
            <div>
              <ShoppingCart />
            </div>

            {/* Mobile/Tablet Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col w-[85vw] max-w-[400px] p-0"
              >
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="flex items-center space-x-2">
                    <Cpu className="h-6 w-6 text-primary" />
                    <span>Netlab</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 pt-2">
                  <div className="relative my-4 md:hidden">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-10" />
                  </div>

                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent text-muted-foreground",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Categories
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {productCategories.map((category) => (
                          <Link
                            key={category.title}
                            href={category.href}
                            className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <br />
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
