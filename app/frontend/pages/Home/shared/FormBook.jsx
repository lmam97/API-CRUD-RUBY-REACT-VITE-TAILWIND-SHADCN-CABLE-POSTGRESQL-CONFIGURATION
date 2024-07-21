import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useInput, { checkInputs } from '@/hooks/useInput';
import { api_books_path } from '@/compiled/routes/routes.compiled';
import { Fetch } from '@/lib/fetch';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

const FormBook = ({
  isOpen,
  setIsOpen
}) => {
  const { toast } = useToast();

  const title = useInput(isOpen.title || "", [
    v => v.length > 0 || "Title is required",
  ]);
  const autor = useInput(isOpen.autor || "", [
    v => v.length > 0 || "Autor is required",
  ]);
  const price = useInput(isOpen.price || "", [
    v => v.length > 0 || "Price is required",
  ]);

  const handleOpenChange = (open) => {
    // setIsOpen(open);
    // if (!open) {
    //   title.setValue("");
    //   autor.setValue("");
    //   price.setValue("");
    // }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let hasError = checkInputs([
      title,
      autor,
      price
    ]);

    if (hasError) {
      return false;
    }

    if (isOpen.id) {
      Fetch.put(api_update_book(isOpen.id), {
        title: title.value,
        autor: autor.value,
        price: price.value
      })
        .then(({ data }) => {
          toast({
            variant: "successfully",
            description: data.message,
          });
          setIsOpen(false);
        })
        .catch(error => {
          console.log(error);
          toast({
            ...catchErrorToast,
            action: <ToastAction altText="Try again" onClick={ fetch }>Intentar de nuevo</ToastAction>,
          });
        });

    } else {
      Fetch.post(api_books_path(), {
        title: title.value,
        autor: autor.value,
        price: price.value
      })
        .then(({ data }) => {
          console.log(data.message);
          toast({
            variant: "successfully",
            description: data.message,
          });
          setIsOpen(false);
        })
        .catch(error => {
          console.log(error);
          toast({
            ...catchErrorToast,
            action: <ToastAction altText="Try again" onClick={ fetch }>Intentar de nuevo</ToastAction>,
          });
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 p-5">
          <div className="flex flex-row items-center space-x-4">
            <div className='w-10'>
            <Label htmlFor="title" className="flex justify-end text-end">
              Title
            </Label>
            </div>
            <div className='w-full'>
            <Input
              {...title.model}
            />
            </div>
            </div>
          <div className="flex flex-row items-center space-x-4">
            <div className='w-10'>
            <Label htmlFor="autor" className="text-right">
              Autor
            </Label>
            </div>
            <div className='w-full'>
            <Input
              {...autor.model}
            />
            </div>
            </div>
          <div className="flex flex-row items-center space-x-4">
            <div className='w-10'>
            <Label htmlFor="price" className="flex justify-end text-end">
              Price
            </Label>
            </div>
            <div className='w-full'>
            <Input
              type="number"
              {...price.model}
            />
            </div>
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={(e) => onSubmit(e)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormBook;
