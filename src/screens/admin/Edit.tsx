import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { usePostId } from "@hooks";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import React from "react";
import { useAlert } from "react-alert";
import { Helmet } from "react-helmet";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSWRConfig } from "swr";
import { api } from "../../api";
import { RichTextBlog } from "../../components";
import { EditPostDto } from "../../generated";

const InitialPost: React.FC = () => {
  let { id } = useParams();
  const { post, isError, isLoading } = usePostId(parseInt(id));
  if (isLoading) {
    return <Spinner />;
  } else {
    return <EditPost post={post} />;
  }
};

interface Props {
  post: any;
}

const EditPost: React.FC<Props> = ({ post }: Props) => {
  const defaultValues = {
    title: post.title,
    summary: post.summary,
    content: post.content.content,
    status: post.status,
    slug: post.slug,
    publishedAt: post.publishedAt,
  };
  //   console.log(post.status);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, touchedFields, isDirty },
  } = useForm<EditPostDto>({ defaultValues });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useSWRConfig();
  const alert = useAlert();
  const onSubmit: SubmitHandler<EditPostDto> = (data) =>
    new Promise((resolve, reject) => {
      api.posts
        .editPostById(post.id, {
          ...data,
          content: { content: data.content },
        })

        .then(({ title, summary, content, status, slug, publishedAt }) => {
          // const {  } = data;
          reset({
            title,
            summary,
            content: content.content,
            status,
            slug,
            publishedAt,
          });
          mutate(`/posts/${post.id}`);
          mutate(`/posts/slug/${post.slug}`);
          mutate(`/posts/me`);
          resolve(data);
        })
        .catch((reason) => {
          // alert.error(reason?.response?.data?.message);
          reject(reason);
        });
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="newPostDrawer">
      <Helmet>
        <title>{post.title} | Edit</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Stack spacing={3}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl as="fieldset">
              <FormLabel as="legend">Status</FormLabel>
              <RadioGroup {...field} defaultValue={field.value}>
                <HStack spacing="24px">
                  <Radio value="PUBLISHED">Published</Radio>
                  <Radio value="DRAFT">Draft</Radio>
                </HStack>
              </RadioGroup>
              {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
            </FormControl>
          )}
        />

        <FormControl isRequired isInvalid={errors.title && touchedFields.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            type="text"
            {...register("title", { required: true })}
          />
          <FormHelperText>Enter a title here</FormHelperText>
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.slug && touchedFields.slug}>
          <FormLabel htmlFor="slug">Slug</FormLabel>
          <Input
            id="slug"
            type="text"
            {...register("slug", { required: true })}
          />
          <FormHelperText>Edit the slug here</FormHelperText>
          <FormErrorMessage>{errors.slug?.message}</FormErrorMessage>
        </FormControl>
        <Controller
          name="publishedAt"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <FormControl
              isRequired
              isInvalid={errors.publishedAt && touchedFields.publishedAt}
            >
              <FormLabel htmlFor="publishedAt">Published At</FormLabel>

              <SingleDatepicker
                onDateChange={(date) => onChange(date.toISOString())}
                date={new Date(value)}
                id="publishedAt"
              />
              <FormHelperText>Enter a Publish Date here</FormHelperText>
              <FormErrorMessage>{errors.publishedAt?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
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
            <RichTextBlog value={value} onChange={onChange} />
          )}
          control={control}
          name="content"
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isDirty}
          form="newPostDrawer"
        >
          Save
        </Button>
        {/* <ImageSelect
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          callback={(string) => {
            console.log(string);
          }}
        />
        <Button onClick={onOpen}>Open Dialog</Button> */}
      </Stack>
    </form>
  );
};

export default InitialPost;
