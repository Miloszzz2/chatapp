import { Button, Center } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";

function Invalid() {
  const { state } = useLocation();

  return (
    <Center h="100vh">
      {state ? <h1>{state.er}</h1> : ""}
      <Button colorScheme="blue">
        <Link to="/">Homepage</Link>
      </Button>
    </Center>
  );
}

export default Invalid;
