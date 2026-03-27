"use client";
import React, { useActionState, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Tag,
  IndianRupee,
  Layers,
  PlusCircle,
  CrossIcon,
  CircleXIcon,
} from "lucide-react";
import {
  Card,
  CardAction,
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
import { createPost } from "@/app/actions/productActions";
import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Form from "next/form";
import CreateCategory from "./CreateCategory";

const CreateProductForm = ({
  categories,
  setOpen,
}: {
  categories: any[];
  setOpen: (open: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [specifications, setSpecifications] = useState<
    { name: string; value: string }[]
  >([]);
  const [images, setImages] = useState<string[]>([]);

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

  const actionWithData = createPost.bind(null, {
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
    }

    if (state.status === "error") {
      toast.error(state.message, { position: "top-center" });
    }

    if (categories.status === "error") {
      toast.error(categories.message, {
        position: "top-center",
      });
    }
  }, [state, categories]);

  return (
    <div>
      <Form action={dispatchAction}>
        <Card className=" ">
          <CardHeader>
            <CardTitle>Create A Product</CardTitle>
            <CardDescription>
              Enter your product details below to create a new product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="my-4">
              {state.status === "error" && (
                <Alert variant="destructive" className="max-w-md">
                  <AlertCircleIcon />
                  <AlertTitle>Product Creation Faild</AlertTitle>
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
                />
              </div>
              <div className="flex justify-between">
                <div className="flex  gap-5">
                  <div className="grid gap-2">
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
                  <div className="grid gap-2">
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
                <Select name="category">
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                {/* <Button className=" cursor-pointer">
                  <PlusCircle />
                </Button> */}
                <CreateCategory />
              </div>
            </div>
            <div className="my-5">
              <Separator />
            </div>
            <div className="flex gap-5 items-center">
              <div className="grid gap-2">
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
              <div className="grid gap-2">
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
              <div className="mt-5">
                <Button
                  onClick={addSpecifications}
                  type="button"
                  className="cursor-pointer"
                >
                  <PlusCircle />
                </Button>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap mt-5">
              {specifications.map((s, i) => (
                <Card key={i} className="min-w-[150px] max-w-[250px] relative">
                  <CardContent className="flex gap-3 items-center px-4">
                    <div>{s.name}:</div>
                    <div>{s.value}</div>
                    <Button
                      type="button"
                      className="rounded-full h-8 w-8 p-0"
                      variant={"destructive"}
                      onClick={() => removeSpecifications(i)}
                    >
                      <CircleXIcon className="h-4 w-4" />
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
                      className="relative w-32 h-32 border rounded-md overflow-hidden bg-muted"
                    >
                      <img
                        src={imgUrl}
                        alt={`Product ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full shadow hover:scale-105 transition-transForm"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <CircleXIcon className="h-3 w-3" />
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
                        className="cursor-pointer w-full max-w-sm"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload an Image
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Product"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default CreateProductForm;
