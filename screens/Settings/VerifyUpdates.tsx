import React from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Title, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Updates from 'expo-updates';

import { useBoolean } from '../../hooks/useBoolean';

import styles from './styles';

export function VerifyUpdates(): JSX.Element {
  const { colors } = useTheme();

  const [showModal, openModal, closeModal] = useBoolean(false);
  const [verify, startVerify, endVerify] = useBoolean(false);
  const [updating, startUpdating, endUptading] = useBoolean(false);

  async function verifyUpdates(): Promise<void> {
    try {
      startVerify();

      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        openModal();
        return;
      }

      Toast.show({
        type: 'info',
        text1: 'Nenhuma atualização encontrada!',
      });
    } catch {
      Toast.show({
        text1: 'Aconteceu um erro ao tentar verificar atualizações!',
        type: 'error',
      });
    } finally {
      endVerify();
    }
  }

  async function updateApp(): Promise<void> {
    try {
      startUpdating();

      const { isNew } = await Updates.fetchUpdateAsync();

      closeModal();

      if (isNew) {
        await Updates.reloadAsync();
      }

      Toast.show({
        text1: 'Aplicativo foi atualizado com sucesso!',
        type: 'success',
      });
    } catch {
      Toast.show({
        text1: 'Não foi possível atualizar o aplicativo!',
        type: 'error',
      });
    } finally {
      endUptading();
    }
  }

  return (
    <View style={styles.updates}>
      <Button
        onPress={verifyUpdates}
        mode="contained"
        labelStyle={{ color: colors.icon }}
        loading={verify}
      >
        Verificar se há atualização
      </Button>

      <Portal>
        <Modal
          contentContainerStyle={{ padding: 16 }}
          visible={showModal}
          onDismiss={closeModal}
        >
          <View
            style={[
              { backgroundColor: colors.background },
              styles.hasUpdatesModal,
            ]}
          >
            <View style={{ alignItems: 'center' }}>
              <Icon name="update" size={60} color={colors.primary} />
            </View>

            <Title style={{ textAlign: 'center', marginTop: 20 }}>
              Atualização disponível!
            </Title>

            <Button
              onPress={updateApp}
              mode="contained"
              icon="update"
              style={{ marginTop: 20 }}
              labelStyle={{ color: colors.icon }}
              loading={updating}
            >
              Atualizar agora
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
