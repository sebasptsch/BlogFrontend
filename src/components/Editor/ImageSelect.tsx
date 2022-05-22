import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import isUrl from "is-url";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useImages } from "../../hooks/images.hook";
import { uploadImage } from "../../utils/requests";
import FileUpload from "./FileUpload";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  callback: (url: string) => void;
}

export const selectImage = () =>
  new Promise<string>((resolve, reject) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
      onOpen();
    }, []);
    const callback: Props["callback"] = (imageUrl) => {
      resolve(imageUrl);
      onClose();
    };
    return (
      <ImageSelect
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        callback={callback}
      />
    );
  });

const ChooseUploadedImage = ({ callback }: { callback: Props["callback"] }) => {
  const { images, isLoading } = useImages();

  const {
    setValue,
    register,
    formState,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: { existingFile: string }) =>
    new Promise<any>((resolve, reject) => {
      reset();
      callback(`/api/images/${data.existingFile}`);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="selectForm">
      <FormControl isInvalid={errors.existingFile} isRequired>
        <FormLabel>{"Select an existing image"}</FormLabel>
        <Controller
          rules={{ required: "Please select an image" }}
          control={control}
          name="existingFile"
          render={({ field: { value } }) => {
            return (
              <SimpleGrid
                gridTemplateRows="masonry"
                columns={[1, 2, 3]}
                gap={2}
                my={2}
              >
                {isLoading ? (
                  <Skeleton />
                ) : (
                  images?.map((image) => (
                    <ImageBox
                      key={image.id}
                      image={{ id: image.id }}
                      selected={value === image.id}
                      onClick={() => setValue("existingFile", image.id)}
                    />
                  ))
                )}
              </SimpleGrid>
            );
          }}
        />
        <FormErrorMessage>{errors.existingFile?.message}</FormErrorMessage>
      </FormControl>
      <br />
      <Button type="submit" form="selectForm">
        Submit
      </Button>
    </form>
  );
};

const UploadImage = ({ callback }: { callback: Props["callback"] }) => {
  const {
    setValue,
    register,
    formState,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { file: File; name: string }) =>
    new Promise<void>((resolve, reject) => {
      // callback(data.image);
      uploadImage(data.file, data.name).then((response: { id: number }) => {
        // callback(response.id);
        reset();
        callback(`/api/images/${response.id}`);
        resolve();
      });
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="uploadForm">
      <FormControl isInvalid={errors.name} isRequired>
        <FormLabel htmlFor="uploadName">{"Provide a nickname"}</FormLabel>
        <Input id="uploadName" {...register("name", { required: true })} />
        <FormErrorMessage> </FormErrorMessage>
      </FormControl>
      <FileUpload
        placeholder={undefined}
        acceptedFileTypes={"image/*"}
        control={control}
        label={"Choose a file to upload"}
        name={"file"}
        validate={(value: File) => {
          if (!value) {
            return "Files is required";
          }
          const fsMb = value.size / (1024 * 1024);
          const MAX_FILE_SIZE = 1;
          if (fsMb > MAX_FILE_SIZE) {
            return "Max file size 10mb";
          }
          return true;
        }}

        // {...register("file")}
      />
      {/* {JSON.stringify(watch("file"))} */}
      <Button type="submit" form="uploadForm">
        Submit
      </Button>
    </form>
  );
};

const EnterUrl = ({ callback }: { callback: Props["callback"] }) => {
  const {
    setValue,
    register,
    formState,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    new Promise<void>((resolve, reject) => {
      // callback(data.url);
      // axios
      //   .get(data.url, { responseType: "blob" })
      //   .then((response) => {
      //     // TODO: verify image type
      //     uploadImage(response.data, data.name)
      //       .then((response: { id: number }) => {
      //         // callback(response.id);
      //         callback(`/api/images/${response.id}`);
      //         resolve();
      //       })
      //       .catch(reject);
      //   })
      //   .catch(reject);
      reset();
      callback(data.url);
    });

  return (
    <form id="urlForm" onSubmit={handleSubmit(onSubmit)}>
      {/* <FormControl isInvalid={errors.name} isRequired>
        <FormLabel htmlFor="uploadName">{"Provide a nickname"}</FormLabel>
        <Input id="uploadName" {...register("name", { required: true })} />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl> */}
      <FormControl isRequired isInvalid={errors.url}>
        <FormLabel htmlFor="url">{"Provide a url"}</FormLabel>
        <Input
          id="url"
          {...register("url", {
            required: "Please provide a url",
            validate: {
              isUrl: (value) => isUrl(value) ?? "Invalid url",
              // isImageUrl: (value) =>
              //   imageExtensions.includes(
              //     new URL(value).pathname.split(".").pop()
              //   ) ?? "Not an image url",
            },
          })}
        />
        <FormErrorMessage>{errors?.url?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" form="urlForm">
        Submit
      </Button>
    </form>
  );
};

export function ImageSelect({
  isOpen,
  onOpen,
  onClose,
  callback: selectCallback,
}: Props) {
  const callback = (imageUrl: string) => {
    selectCallback(imageUrl);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose an Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted>
            <TabList>
              <Tab>URL</Tab>
              <Tab>Upload</Tab>
              <Tab>Existing</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <EnterUrl callback={callback} />
              </TabPanel>
              <TabPanel>
                <UploadImage callback={callback} />
              </TabPanel>
              <TabPanel>
                <ChooseUploadedImage callback={callback} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

interface ImageBoxProps {
  image: {
    id: number;
  };
  onClick: (id: number) => void;
  selected: boolean;
}

const ImageBox = (props: ImageBoxProps) => {
  return (
    <Box
      borderWidth={"3px"}
      borderColor={"green.500"}
      borderStyle={props.selected ? "solid" : "hidden"}
      borderRadius="lg"
      overflow={"hidden"}
    >
      <Image
        key={props.image.id}
        onClick={() => props.onClick(props.image.id)}
        // borderRadius="lg"
        src={`/api/images/${props.image.id}`}
      />
    </Box>
  );
};
