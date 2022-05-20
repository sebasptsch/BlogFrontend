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
} from "@chakra-ui/react";
import React from "react";
import { useAlert } from "react-alert";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSWRConfig } from "swr";
import { RichTextBlock } from "../../components/RichTextBlog";
import { usePostId } from "../../hooks/post.hook";
import { api } from "../../utils";

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
  };
  //   console.log(post.status);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, touchedFields, isDirty },
  } = useForm({ defaultValues });
  const { mutate } = useSWRConfig();
  const alert = useAlert();
  const onSubmit = (data) =>
    new Promise((resolve, reject) => {
      api
        .patch(`/posts/${post.id}`, {
          ...data,
          content: { content: data.content },
        })
        .then(({ data }) => {
          const { title, summary, content, status, slug } = data;
          reset({ title, summary, content, status, slug });
          resolve(data);
        })
        .catch((reason) => {
          alert.error(reason?.response?.data?.message);
          reject(reason);
        });
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="newPostDrawer">
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
        <FormHelperText>Enter a quick summary of the post here</FormHelperText>
        <FormErrorMessage>{errors.summary?.message}</FormErrorMessage>
      </FormControl>
      <Controller
        render={({ field: { value, onChange } }) => (
          <RichTextBlock value={value} onChange={onChange} />
        )}
        control={control}
        name="content"
      />
      <br />
      <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
        Save
      </Button>
    </form>
  );
};

export default InitialPost;
