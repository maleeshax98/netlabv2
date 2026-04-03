"use client";
import { CalendarIcon, Percent, Tag, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import DiscountProductsDialog from "@/components/admin/DiscountProductsDialog";
import Form from "next/form";
import { addPVDiscount } from "@/app/actions/discountActions";

export default function DiscountFormUI() {
  const [appliedProducts, setAppliedProducts] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  console.log(appliedProducts);
  const handleAddDiscount = addPVDiscount.bind(null, appliedProducts);

  return (
    <Form action={handleAddDiscount}>
      <Card className="mx-auto w-full max-w-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Discount Campaign</CardTitle>
          <CardDescription>
            Configure the pricing rules and duration for this discount.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Tag className="h-4 w-4" /> Name
              </Label>
              <Input id="name" name="name" placeholder="Summer Seasonal Sale" />
            </div>

            {/* <div className="grid gap-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Description
              </Label>
              <Textarea
                id="description"
                placeholder="Appears on the checkout page and receipts..."
                className="min-h-[100px] resize-none"
                name="description"
              />
            </div> */}
          </div>

          <br />
          <Separator />

          <br />

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="percentage" className="flex items-center gap-2">
                <Percent className="h-4 w-4" /> Discount Value
              </Label>
              <div className="relative">
                <Input
                  id="percentage"
                  type="number"
                  placeholder="0.00"
                  className="pl-9"
                  name="Discount Value"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground">
                  %
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="datetime-local"
                className="block"
                name="start-date"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">End Date</Label>
              <Input
                id="end"
                type="datetime-local"
                className="block"
                name="end-date"
              />
            </div>
          </div>
          <br />
          <div>
            <h1 className="text-lg">Select Products</h1>
            <p className="text-sm text-gray-600 mb-3">
              Select products to apply the discount to
            </p>
            <DiscountProductsDialog
              appliedProducts={appliedProducts}
              setAppliedProducts={setAppliedProducts}
            />
          </div>

          {/* <div>
            <div className="my-2">
              <Select
                defaultValue="percentage"
                onValueChange={(value) => setDiscountType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Discount Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="percentage">Product vise</SelectItem>
                    <SelectItem value="fixed">Campaigne Vise</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {discountType === "percentage" ? (
              <div>
                <h1 className="text-lg">Select Products</h1>
                <p className="text-sm text-gray-600 mb-3">
                  Select products to apply the discount to
                </p>
                <DiscountProductsDialog
                  appliedProducts={appliedProducts}
                  setAppliedProducts={setAppliedProducts}
                />
              </div>
            ) : (
              <div>hukapan</div>
            )}
          </div> */}
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
          <Button variant="ghost">Discard</Button>
          <Button className="px-8" type="submit">
            Save Discount
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
