import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    console.log("HELLO")
    activateBrowserWallet();
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="teal.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(5)} BNB
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="teal.600"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "teal.500",
          backgroundColor: "teal.500"
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="#F58634"
      color="black"
      borderRadius="25px"
      border="1px solid transparent"
    >
      Connect to a wallet
    </Button>
  );
}
