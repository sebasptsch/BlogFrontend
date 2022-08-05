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
import { DateTime } from "luxon";
import { useAlert } from "react-alert";
import { Helmet } from "react-helmet";
import { useSWRConfig } from "swr";
import { deleteAccount } from "../../utils/requests";

const Me: React.FC = () => {
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
                  {DateTime.fromISO(user.createdAt).toRelativeCalendar()}
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Account Last Updated</StatLabel>
                <StatNumber>
                  {DateTime.fromISO(user.updatedAt).toRelativeCalendar()}
                </StatNumber>
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
};
export default Me;
