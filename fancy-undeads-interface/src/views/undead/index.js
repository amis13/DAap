import {
    Stack,
    Heading,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Button,
    Tag,
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-access";
  import PunkCard from "../../components/punk-card";
  import { useUndeadsData } from "../../hooks/useUndeadsData";
  import { useParams } from "react-router-dom";
  import Loading from "../../components/loading";
  
  const Punk = () => {
    const { active, account } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, undead } = useUndeadsData(tokenId);
  
    if (!active) return <RequestAccess />;
  
    if (loading) return <Loading />;
  
    return (
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack>
          <PunkCard
            mx={{
              base: "auto",
              md: 0,
            }}
            name={undead.name}
            image={undead.image}
          />
          <Button disabled={account !== undead.owner} colorScheme="green">
            {account !== undead.owner ? "No eres el dueño" : "Transferir"}
          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{undead.name}</Heading>
          <Text fontSize="xl">{undead.description}</Text>
          <Text fontWeight={600}>
            DNA:
            <Tag ml={2} colorScheme="green">
              {undead.dna}
            </Tag>
          </Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="green">
              {undead.owner}
            </Tag>
          </Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Atributo</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(undead.attributes).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>
                    <Tag>{value}</Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    );
  };
  
  export default Undead;