import React from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Title, useTheme } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Updates from 'expo-updates';

import { useBoolean } from '../../hooks/useBoolean';

import styles from './styles';

export function VerifyUpdates(): JSX.Element {
  const { colors } = useTheme();

  const toaster = useToast();

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

      toaster.show({
        type: 'info',
        message: 'Nenhuma atualização encontrada!',
      });
    } catch {
      toaster.show({
        type: 'warning',
        message: 'Aconteceu um erro ao tentar verificar atualizações!',
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

      toaster.show({
        type: 'success',
        message: 'Aplicativo foi atualizado com sucesso!',
      });
    } catch {
      toaster.show({
        type: 'warning',
        message: 'Não foi possível atualizar o aplicativo!',
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
