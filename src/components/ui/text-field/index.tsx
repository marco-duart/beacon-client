import { forwardRef, useId, type ComponentProps } from 'react';
import { ErrorText, Field, Input, Label } from './index.styles';

export type TextFieldProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
      <Field>
        <Label htmlFor={fieldId}>{label}</Label>
        <Input ref={ref} id={fieldId} hasError={Boolean(error)} {...props} />
        {error ? <ErrorText role="alert">{error}</ErrorText> : null}
      </Field>
    );
  },
);

TextField.displayName = 'TextField';
