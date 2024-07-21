import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn (...inputs) {
  return twMerge(clsx(inputs));
}

export const catchErrorToast = {
  variant: "destructive",
  title: "!Uh oh! Algo salió mal.",
  description: "Hubo un problema con su solicitud.",
}