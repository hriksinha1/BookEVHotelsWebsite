import { createElement, forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type HeadingLevel = 1 | 2 | 3 | 4;

export function Heading({
  level = 2,
  className = "",
  children,
}: {
  level?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
}) {
  return createElement(`h${level}`, { className }, children);
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", type = "button", ...props }, ref) =>
    createElement("button", { ...props, className, ref, type }),
);
Button.displayName = "Button";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => createElement("input", { ...props, className, ref }),
);
Input.displayName = "Input";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = "", ...props }, ref) => createElement("select", { ...props, className, ref }),
);
Select.displayName = "Select";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => createElement("textarea", { ...props, className, ref }),
);
Textarea.displayName = "Textarea";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = "", ...props }, ref) => createElement("label", { ...props, className, ref }),
);
Label.displayName = "Label";
