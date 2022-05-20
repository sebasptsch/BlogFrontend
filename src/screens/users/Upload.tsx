import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { api } from "../../utils";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

type FormValues = {
  file_: FileList;
};

export default function Upload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //   const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const onSubmit = (data: any) =>
    new Promise((resolve, reject) => {
      const file = data.file_[0];
      // console.log(data);
      api
        .post(
          "/images",
          { file },
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          // console.log(response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 1;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.file_} isRequired>
          <FormLabel>{"File input"}</FormLabel>

          <FileUpload
            accept={"image/*"}
            multiple
            register={register("file_", { validate: validateFiles })}
          >
            <Button leftIcon={<ChevronUpIcon />}>Upload</Button>
          </FileUpload>

          <FormErrorMessage>
            {errors.file_ && errors?.file_.message}
          </FormErrorMessage>
        </FormControl>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
