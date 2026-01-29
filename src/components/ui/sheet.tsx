"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

function Sheet({ open, onOpenChange, children }: SheetProps) {
  const value = React.useMemo(
    () => ({ open, onOpenChange }),
    [open, onOpenChange],
  );
  return (
    <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
  );
}

type SheetContentProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
};

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  (
    { side = "right", showCloseButton = true, className, children, ...props },
    ref,
  ) => {
    const ctx = React.useContext(SheetContext);
    if (!ctx) return null;
    const { open, onOpenChange } = ctx;
    const [mounted, setMounted] = React.useState(false);
    const [exiting, setExiting] = React.useState(false);

    const close = React.useCallback(() => {
      if (exiting) return;
      setExiting(true);
    }, [exiting]);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      if (!exiting) return;
      const t = setTimeout(() => {
        onOpenChange(false);
        setExiting(false);
      }, 300);
      return () => clearTimeout(t);
    }, [exiting, onOpenChange]);

    const visible = open || exiting;

    /* Kapalı veya henüz mount olmamışsa hiçbir şey render etme → hydration uyumu */
    if (!visible || !mounted || typeof document === "undefined") return null;

    const sideClasses = {
      top: "inset-x-0 top-0 border-b",
      right: "inset-y-0 right-0 h-full w-full max-w-sm border-l sm:max-w-md",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-full w-full max-w-sm border-r sm:max-w-md",
    };

    const panelEnterClass = {
      top: "sheet-panel-enter-top",
      right: "sheet-panel-enter-right",
      bottom: "sheet-panel-enter-bottom",
      left: "sheet-panel-enter-left",
    };
    const panelExitClass = {
      top: "sheet-panel-exit-top",
      right: "sheet-panel-exit-right",
      bottom: "sheet-panel-exit-bottom",
      left: "sheet-panel-exit-left",
    };

    const node = (
      <>
        <div
          role="presentation"
          aria-hidden
          onClick={close}
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            exiting
              ? "sheet-overlay-exit pointer-events-none"
              : "sheet-overlay-enter",
          )}
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal
          className={cn(
            "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-xl",
            sideClasses[side],
            exiting ? panelExitClass[side] : panelEnterClass[side],
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <button
              type="button"
              onClick={close}
              disabled={exiting}
              className="sheet-close absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </>
    );

    return createPortal(node, document.body);
  },
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

const SheetTrigger = "button";
const SheetClose = "button";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
