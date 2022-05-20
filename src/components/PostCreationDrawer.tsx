import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useAlert } from "react-alert";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import { api } from "../utils";
import { RichTextBlock } from "./RichTextBlog";

export default function PostCreationDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm();
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const alert = useAlert();
  const onSubmit = (data) =>
    new Promise((resolve, reject) => {
      api
        .post("/posts", { ...data, content: { content: data.content } })
        .then((result) => {
          mutate("/posts/me");
          navigate(`/admin/edit/${result.data.id}`);
          //   mutate('/posts')
          resolve(result);
        })
        .catch((reason) => {
          alert.error(reason?.response?.data?.message);
          reject(reason);
        });
    });

  return (
    <>
      <Button onClick={onOpen} m={4}>{`Open Drawer`}</Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new post</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} id="newPostDrawer">
              <FormControl
                isRequired
                isInvalid={errors.title && touchedFields.title}
              >
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                />
                <FormHelperText>Enter a title here</FormHelperText>
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={errors.summary && touchedFields.summary}
              >
                <FormLabel htmlFor="summary">Summary</FormLabel>
                <Input
                  id="summary"
                  type="text"
                  {...register("summary", { required: true })}
                />
                <FormHelperText>
                  Enter a quick summary of the post here
                </FormHelperText>
                <FormErrorMessage>{errors.summary?.message}</FormErrorMessage>
              </FormControl>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <RichTextBlock value={value} onChange={onChange} />
                )}
                defaultValue={initialValue}
                control={control}
                name="content"
              />
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" isLoading={isSubmitting} form="newPostDrawer">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
