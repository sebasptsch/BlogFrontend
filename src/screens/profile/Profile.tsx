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
import { Helmet } from "react-helmet";
import { useSWRConfig } from "swr";
import { deleteAccount } from "../../utils/requests";

export default function Me() {
  const { isLoading, isError, user } = useMe();
  const { mutate } = useSWRConfig();
  const alert = useAlert();
  return (
    <>
      {user ? (
        <>
          <Helmet>
            <title>Profile</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <Heading as="h1" textAlign={"center"}>
            My Account
          </Heading>
          <Divider my={5} />
          <Container maxW="md">
            <StatGroup>
              <Stat>
                <StatLabel>Account Created</StatLabel>
                <StatNumber>
                  {moment(user.createdAt).calendar(null, {
                    lastDay: "[Yesterday]",
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    lastWeek: "[last] dddd",
                    nextWeek: "dddd",
                    sameElse: "L",
                  })}
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Account Last Updated</StatLabel>
                <StatNumber>
                  {moment(user.updatedAt).calendar(null, {
                    lastDay: "[Yesterday]",
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    lastWeek: "[last] dddd",
                    nextWeek: "dddd",
                    sameElse: "L",
                  })}
                </StatNumber>
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
                <StatLabel>Role</StatLabel>
                <StatNumber>{user.role}</StatNumber>
              </Stat>
            </StatGroup>
            <StatGroup>
              <Stat>
                <StatLabel>Images</StatLabel>
                <StatNumber>{user._count.images}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Posts</StatLabel>
                <StatNumber>{user._count.posts}</StatNumber>
              </Stat>
            </StatGroup>
          </Container>

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
    </>
  );
}
