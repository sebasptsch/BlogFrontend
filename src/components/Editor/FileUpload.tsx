import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Control, FieldValues, useController, Validate } from "react-hook-form";
import { MdImage } from "react-icons/md";

interface FileUploadProps {
  name: string;
  placeholder?: string;
  acceptedFileTypes?: string;
  control: Control<any, any>;
  label: string;
  isRequired?: boolean;
  validate: Validate<any> | Record<string, Validate<any>>;
}

export const FileUpload = <T extends FieldValues>({
  name,
  placeholder,
  acceptedFileTypes,
  control,
  label,
  isRequired = false,
  validate,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>();

  const {
    field: { ref, value, onChange, ...inputProps },
    fieldState: { isTouched, isDirty, error },
  } = useController<any, any>({
    name,
    rules: { required: isRequired, validate },
  });

  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={MdImage} />}
        />
        <input
          type="file"
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          onChange={(e) => {
            onChange(e.target.files[0]);
          }}
          {...inputProps}
          // inputRef={ref}
          style={{ display: "none" }}
        />
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current.click()}
          value={value?.name}
          readOnly
        />
      </InputGroup>
      <FormErrorMessage>{error.message}</FormErrorMessage>
    </FormControl>
  );
};
