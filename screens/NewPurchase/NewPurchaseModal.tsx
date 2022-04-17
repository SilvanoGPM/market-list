import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button, Headline, TextInput, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { usePurchases } from '../../contexts/PurchaseContext';
import { RootStackParamList } from '../../@types/routes.types';
import { Product } from '../../@types/general.types';

import styles from './styles';

interface NewPurchaseModalProps {
  products: Product[];
  visible: boolean;
  onSuccess: () => void;
  closeModal: () => void;
}

export function NewPurchaseModal({
  products,
  visible,
  onSuccess,
  closeModal,
}: NewPurchaseModalProps): JSX.Element {
  const { colors } = useTheme();

  const { addPurchase } = usePurchases();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const [name, setName] = useState<string>('');

  function newPurchase(): void {
    const title = name.trim();

    if (title) {
      addPurchase({ products, total: 0, title });
      closeModal();

      Toast.show({
        text1: 'Lista adicionada',
        position: 'bottom',
        type: 'success',
      });

      onSuccess();

      navigation.navigate('Home');
    } else {
      Toast.show({
        text1: 'Insira um nome para a lista',
        type: 'info',
        position: 'bottom',
      });
    }
  }

  function handleNameChange(value: string): void {
    setName(value);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
      </TouchableWithoutFeedback>

      <View
        style={[{ backgroundColor: colors.background }, styles.newPurchase]}
      >
        <Headline style={{ marginBottom: 8 }}>Criar Lista</Headline>

        <TextInput
          style={{ marginBottom: 16 }}
          value={name}
          onChangeText={handleNameChange}
          label="Nome da lista"
        />

        <Button
          style={{ marginBottom: 16 }}
          labelStyle={{ color: colors.icon }}
          mode="contained"
          icon="check"
          onPress={newPurchase}
        >
          Criar
        </Button>
      </View>
    </Modal>
  );
}
