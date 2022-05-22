import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  Spinner,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useMe } from "@hooks";
import moment from "moment";
import { useAlert } from "react-alert";
import { useSWRConfig } from "swr";
import { deleteAccount } from "../../utils/requests";

export default function Me() {
  const { isLoading, isError, user } = useMe();
  const { mutate } = useSWRConfig();
  const alert = useAlert();
  return (
    <Container size="md">
      {user ? (
        <>
          <Heading as="h1" textAlign={"center"}>
            Hello {user.name}!
          </Heading>
          <Divider my={5} />
          <StatGroup>
            <Stat>
              <StatLabel>Account Created</StatLabel>
              <StatNumber>{moment(user.createdAt).fromNow()}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Account Last Updated</StatLabel>
              <StatNumber>{moment(user.updatedAt).fromNow()}</StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup>
            <Stat>
              <StatLabel>
                {user.accounts.length === 1 ? "Provider" : "Providers"}
              </StatLabel>
              <StatNumber>
                {user.accounts.map((account) => account.provider).join()}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Posts</StatLabel>
              <StatNumber>{user._count.posts}</StatNumber>
            </Stat>
          </StatGroup>
          <ButtonGroup>
            <Button
              colorScheme="red"
              onClick={() => deleteAccount(mutate, alert)}
            >
              Delete Account
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Spinner />
      )}

      {/* <Images /> */}
    </Container>
  );
}
