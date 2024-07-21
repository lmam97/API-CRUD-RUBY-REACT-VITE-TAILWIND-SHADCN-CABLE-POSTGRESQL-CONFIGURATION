import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fragment, useEffect, useState } from "react";
import FormBook from "./shared/FormBook";
import { useToast } from "@/components/ui/use-toast";
import PaginationIndex from "@/components/common/Pagination";
import { Fetch } from "@/lib/fetch";
import { api_books_list_books_path, api_books_path, api_delete_book_path } from "@/compiled/routes/routes.compiled";
import { catchErrorToast } from "@/lib/utils";
import { ToastAction } from "@radix-ui/react-toast";
import useInput from "@/hooks/useInput";
import { MdDelete, MdEdit } from "react-icons/md";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";

const HomeIndex = () => {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const searchInput = useInput("");

  const fetch = (page = 1) => {
    Fetch.get(api_books_list_books_path({
      page: page,
      query: searchInput.value
    }))
      .then(({ data }) => {
        setCurrentPage(data.pagination.current_page);
        setNextPage(data.pagination.next_page);
        setPrevPage(data.pagination.prev_page);
        setRows(data.rows);
      })
      .catch(error => {
        console.log(error);
        toast({
          ...catchErrorToast,
          action: <ToastAction altText="Try again" onClick={ fetch }>Intentar de nuevo</ToastAction>,
        });
      });
  };

  const onDelete = (id) => {
    Fetch.delete(api_delete_book_path(id))
      .then(({ data }) => {
        toast({
          variant: "successfully",
          description: data.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        console.log(error);
        toast({
          ...catchErrorToast,
          action: <ToastAction altText="Try again" onClick={ fetch }>Intentar de nuevo</ToastAction>,
        });
      });
  };

  useEffect(() => {
    fetch();
  }, [searchInput.value])

  useEffect(() => {
    const handle = ({ detail: cable_data }) => {
      const { data } = cable_data;
      const newAction = data.action;
      const temp = [...rows].map((x) => {
        if (x.id === newAction.id) {
          const newAction = data.action;
          return {
            ...x,
            title: newAction.title,
            autor: newAction.autor,
            price: newAction.price,
          };
        } else {
          return x;
        }
      });
      const found = temp.some((x) => x.id === newAction.id);
      if (!found) {
        temp.unshift(newAction);
        if (temp.length > 4) {
          temp.pop();
        }
      }
      setRows(temp);
    };

    document.addEventListener("BOOKS_LOAD_CABLE", handle);
    return () => document.removeEventListener("BOOKS_LOAD_CABLE", handle);
  }, [
      rows,
      currentPage,
      nextPage,
      prevPage
    ]);

  return (
    <div className="py-5 space-y-6">
      <h1 className="text-center text-xl">CRUD</h1>
      <div className="flex flex-row justify-between">
        <div className="w-1/2">
          <Input placeholder="Search Id, title, Autor ..."
            {...searchInput.model}
          />
        </div>
        <FormBook
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 && rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell>{row.autor}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell className="text-right !w-28 space-x-4">
                  <Button variant="ghost" className="p-0 m-0" onClick={() => setIsOpen(row)}>
                    <MdEdit className="w-5 mx-1 h-5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <MdDelete className="w-5 mx-1 h-5 fill-red-500" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(row.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationIndex
          handlePageChange={fetch}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default HomeIndex;


