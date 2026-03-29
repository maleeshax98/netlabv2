import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import React from "react";

const CustomUserButton = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Orders"
          labelIcon={<ShoppingBag className="h-4 w-4" />}
          href="/orders"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default CustomUserButton;
