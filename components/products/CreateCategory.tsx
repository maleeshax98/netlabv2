import React, { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CheckCircleIcon, PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import slugify from "slugify";
import { createCategory } from "@/app/actions/productActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState(
    slugify(name, {
      lower: true, // convert to lower case
      strict: true, // strip special characters
      locale: "en", // language code
      replacement: "-", // replace spaces with a hyphen
    }),
  );

  const [state, dispatchAction, isPending] = useActionState(createCategory, {
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
  }, [state]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <PlusCircle />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A Category</DialogTitle>
            <DialogDescription>
              <div className="mb-4">
                Enter your category details below to create a new category
              </div>
              {state.status === "error" && (
                <Alert variant="destructive" className="max-w-md">
                  <AlertCircleIcon />
                  <AlertTitle>Category Creation Faild</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}

              {state.status === "success" && (
                <Alert variant="default" className="max-w-md">
                  <CheckCircleIcon />
                  <AlertTitle>Category Creation Success</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </DialogDescription>
          </DialogHeader>
          <form action={dispatchAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(
                      slugify(e.target.value, {
                        lower: true, // convert to lower case
                        strict: true, // strip special characters
                        locale: "en", // language code
                        replacement: "-", // replace spaces with a hyphen
                      }),
                    );
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Slug - {slug}</Label>
              </div>
              <div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
