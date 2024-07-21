import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const Input = React.forwardRef(({
  id,
  className,
  type,
  description,
  error,
  label,
  ...props
}, ref) => {

  const uniqId = id || React.useId();

  return (
    <div className="w-full relative">
      {label && label.length > 0 && (
        <Label
          htmlFor={ uniqId }
          className="mb-2 inline-block text-base text-[#2f3640]"
        >{ label }</Label>
      )}
      <input
        id={ uniqId }
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", className
        )}
        ref={ref}
        {...props}
      />
      { error && error.length > 0 && (
        <p className="absolute text-xs mt-1 font-medium text-red-500">{error}</p>
      ) }
      { !error && description && description.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) }
    </div>
  );
});
Input.displayName = "Input";

export { Input };
