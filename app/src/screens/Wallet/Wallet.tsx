import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Input, Text, useTheme } from "@ui-kitten/components";
import { Screen } from "../../shared/layout/Screen";
import { Spacer, SPACING } from "../../atoms/layout/Spacer";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers, providers } from "ethers";
import Icon from "react-native-vector-icons/MaterialIcons";
import { env } from "../../env";

export const constants = {
  crypto: "DATA",
};

export const Wallet = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [recipientWallet, setRecipientWallet] = useState("");
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    const provider = new providers.AlchemyProvider("matic");
    const baseWallet = ethers.Wallet.fromMnemonic(env.passphrase);
    const providerWallet = baseWallet.connect(provider);
    setWallet(providerWallet);
  }, []);

  return (
    <Screen
      edges={["top"]}
      style={{ paddingTop: 10, paddingHorizontal: SPACING.M, flex: 1 }}>
      <Text category="h1">Wallet</Text>

      <Spacer vertical={"L"} />
      <Text category="h5">This wallet will hold your received rewards:</Text>
      <Spacer vertical={"L"} />

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Spacer horizontal="XS" />
        <Text category="p1">
          {wallet?.address.slice(0, 10)}...
          {wallet?.address.slice(wallet?.address.length - 10)}
        </Text>
        <Spacer horizontal="XS" />

        <Icon name="content-copy" size={17} color={"white"} />
      </View>

      <Spacer vertical="XL" />

      <Text category="h5">💰 Balance</Text>

      <Spacer vertical="S" />
      <View
        style={{
          padding: 15,
          borderWidth: 1,
          borderColor: theme["color-success-300"],
          borderRadius: 4,
        }}>
        <Text category="p1">200.00 DATA</Text>
      </View>

      <Spacer vertical="XXL" />

      <Text category="h5">💸 Withdraw</Text>
      <Spacer vertical="M" />
      <Text category="h6">Amount</Text>
      <Spacer vertical="S" />
      <Input
        value={withdrawAmount}
        size="large"
        placeholder={`Amount of ${constants.crypto} to withdraw`}
        onChangeText={nextValue => setWithdrawAmount(nextValue)}
      />

      <Spacer vertical="M" />

      <Text category="h6">Recipient wallet</Text>
      <Spacer vertical="S" />
      <Input
        value={recipientWallet}
        size="large"
        placeholder={`Wallet where you send your ${constants.crypto}`}
        onChangeText={nextValue => setRecipientWallet(nextValue)}
      />
    </Screen>
  );
};
