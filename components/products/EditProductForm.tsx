"use client";
import React, { useActionState, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, CircleXIcon, AlertCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { editProduct } from "@/app/actions/productActions";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Form from "next/form";
import CreateCategory from "./CreateCategory";

const EditProductForm = ({
  data,
  categories,
  setOpen,
}: {
  data: any;
  categories: any;
  setOpen: (open: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [price, setPrice] = useState(data?.price ? data.price.toString() : "");
  const [stock, setStock] = useState(data?.stock ? data.stock.toString() : "");

  const [specifications, setSpecifications] = useState<
    { name: string; value: string; id?: string }[]
  >(data?.specifications || []);
  const [images, setImages] = useState<string[]>(data?.images || []);

  const addSpecifications = () => {
    if (title && value) {
      setSpecifications((prev) => [...prev, { name: title, value }]);
      setTitle("");
      setValue("");
    }
  };

  const removeSpecifications = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  const actionWithData = editProduct.bind(null, {
    id: data.id,
    images,
    specifications,
  });

  const [state, dispatchAction, isPending] = useActionState(actionWithData, {
    status: "",
    message: "",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message, { position: "top-center" });
      setOpen(false);
    }

    if (state.status === "error") {
      toast.error(state.message, { position: "top-center" });
    }

    if (categories?.status === "error") {
      toast.error(categories.message, {
        position: "top-center",
      });
    }
  }, [state, categories, setOpen]);

  return (
    <div>
      <Form action={dispatchAction}>
        <Card className="border-0 shadow-none p-5">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Edit Product: {data?.name}</CardTitle>
            <CardDescription>
              Update your product details below
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="my-4">
              {state.status === "error" && (
                <Alert variant="destructive" className="max-w-md">
                  <AlertCircleIcon />
                  <AlertTitle>Product Update Failed</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Product description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col sm:flex-row gap-5 w-full">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Product price"
                      name="price"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Product stock"
                      name="stock"
                      value={stock}
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5">
              <Separator />
            </div>
            <div className="flex gap-2 items-center justify-left">
              <div>
                <Select name="category" defaultValue={data?.categoryId}>
                  <SelectTrigger className="w-full min-w-[200px] max-w-xs">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories?.categories?.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <CreateCategory />
              </div>
            </div>
            <div className="my-5">
              <Separator />
            </div>
            <div className="flex gap-4 items-end">
              <div className="grid gap-2 flex-1">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2 flex-1">
                <Label>Value</Label>
                <Input
                  type="text"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
              <div className="mb-0">
                <Button
                  onClick={addSpecifications}
                  type="button"
                  className="cursor-pointer"
                >
                  <PlusCircle className="mr-2 h-4 w-4 hidden sm:block"/> Add
                </Button>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap mt-5">
              {specifications.map((s, i) => (
                <Card key={i} className="min-w-[150px] relative">
                  <CardContent className="flex gap-3 items-center p-3 text-sm">
                    <div className="font-semibold">{s.name}:</div>
                    <div className="text-muted-foreground mr-6">{s.value}</div>
                    <Button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-6 w-6 p-0"
                      variant={"ghost"}
                      onClick={() => removeSpecifications(i)}
                    >
                      <CircleXIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              <Label>Product Images</Label>
              {images.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {images.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="relative w-28 h-28 border rounded-md overflow-hidden bg-muted"
                    >
                      <img
                        src={imgUrl}
                        alt={`Product ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full shadow hover:scale-105 transition-transform"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <CircleXIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="z-50">
                <CldUploadWidget
                  uploadPreset="netlab"
                  onSuccess={(result: any, { widget }) => {
                    if (result.info?.secure_url) {
                      setImages((prev) => [...prev, result.info.secure_url]);
                    }
                  }}
                >
                  {({ open }) => {
                    return (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          open();
                        }}
                        className="cursor-pointer w-full max-w-xs"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload Details Image
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-3 px-0 pb-0 mt-6">
            <Button type="submit" className="w-full sm:flex-1" disabled={isPending}>
              {isPending ? "Updating..." : "Update Product"}
            </Button>
            <Button variant="outline" type="button" onClick={() => setOpen(false)} className="w-full sm:flex-1">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default EditProductForm;
