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
import { Control, useController, Validate } from "react-hook-form";
import { MdImage } from "react-icons/md";

interface FileUploadProps {
  name: string;
  placeholder?: string;
  acceptedFileTypes?: string;
  control: Control;
  label: string;
  isRequired?: boolean;
  validate: Validate<any> | Record<string, Validate<any>>;
}

const FileUpload = ({
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
    fieldState: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: isRequired, validate },
  });

  return (
    <FormControl isInvalid={invalid} isRequired>
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
      <FormErrorMessage>{invalid}</FormErrorMessage>
    </FormControl>
  );
};

export default FileUpload;
