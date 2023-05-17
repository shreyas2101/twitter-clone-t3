import {
  forwardRef,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
  type LegacyRef,
} from "react";

interface ITextArea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
}
function TextArea(
  { className = "", ...props }: ITextArea,
  ref: LegacyRef<HTMLTextAreaElement> | undefined
) {
  return <textarea ref={ref} className={`${className}`} {...props} />;
}

export default forwardRef(TextArea);
