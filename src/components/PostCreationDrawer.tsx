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
import kebabCase from "lodash/kebabCase";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import { PostsService } from "../generated";
import { RichTextBlock } from "./Editor/RichTextBlog";

export default function PostCreationDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  interface FormData {
    title: string;
    summary: string;
    content: any;
    slug: string;
    publishedAt: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormData>();
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const alert = useAlert();
  const onSubmit: SubmitHandler<FormData> = (data) =>
    new Promise((resolve, reject) => {
      PostsService.createPost({
        ...data,
        content: { content: data.content },
      })

        .then((result) => {
          mutate("/posts/me");
          navigate(`/admin/edit/${result.id}`);
          //   mutate('/posts')
          resolve(result);
        })
        .catch((reason) => {
          // alert.error(reason?.response?.data?.message);
          reject(reason);
        });
    });
  const title = watch("title");
  useEffect(() => {
    if (!touchedFields.slug) {
      setValue("slug", kebabCase(title));
    }
  }, [title]);

  return (
    <>
      <Button onClick={onOpen} m={4}>
        New Post
      </Button>

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
                isInvalid={errors.slug && touchedFields.slug}
              >
                <FormLabel htmlFor="slug">Slug</FormLabel>
                <Input
                  id="slug"
                  type="text"
                  {...register("slug", {
                    required: true,
                    validate: (v) =>
                      !!v.match(/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/) ??
                      "Needs to be a valid slug.",
                  })}
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
