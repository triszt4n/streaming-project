import { RemarkUIRenderer } from "@/utils/remark-ui-renderer";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import ReactMarkdown from "react-markdown";

type Props = {
  formDetails: {
    id: string;
    promptText: string;
    minChar?: number;
    maxChar: number;
  };
  defaultValue?: string;
  textAreaHeight?: string | number;
  previewHeight?: string | number;
};

const getStatusString = (text: string = "", maxChar: number): string =>
  `${text.length} / ${maxChar}`;

export const RemarkEditor = ({
  textAreaHeight = "22rem",
  previewHeight = "26rem",
  defaultValue,
  formDetails,
}: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Edit</Tab>
        <Tab>Preview</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl isInvalid={!!errors[formDetails.id]}>
            <FormLabel htmlFor={formDetails.id}>
              {`${formDetails.promptText} `}
              <Link href="https://www.markdownguide.org/cheat-sheet/">
                See guide here.
              </Link>
            </FormLabel>
            <Textarea
              id={formDetails.id}
              placeholder="Enter your markdown formatted text here..."
              height={textAreaHeight}
              defaultValue={defaultValue}
              {...register(formDetails.id, {
                minLength: formDetails.minChar
                  ? {
                      value: formDetails.minChar,
                      message: "Text cannot be blank!",
                    }
                  : undefined,
                maxLength: {
                  value: formDetails.maxChar,
                  message: "Text entered is too long!",
                },
              })}
              isInvalid={!!errors[formDetails.id]}
            />
            <Flex justifyContent="flex-end">
              {errors?.[formDetails.id] ? (
                <FormErrorMessage>
                  {errors[formDetails.id]?.message +
                    " " +
                    getStatusString(watch(formDetails.id), formDetails.maxChar)}
                </FormErrorMessage>
              ) : (
                <FormHelperText>
                  {getStatusString(watch(formDetails.id), formDetails.maxChar)}
                </FormHelperText>
              )}
            </Flex>
          </FormControl>
        </TabPanel>
        <TabPanel>
          <Box maxHeight={previewHeight} overflowY="scroll">
            <ReactMarkdown
              components={RemarkUIRenderer()}
              children={watch(formDetails.id)}
              skipHtml
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
