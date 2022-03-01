import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Repository {
  static async save<T>(
    key: string,
    value: Record<string, unknown> | object[] | T
  ): Promise<void> {
    const valueString = JSON.stringify(value);

    try {
      await AsyncStorage.setItem(key, valueString);
    } catch (err) {
      console.error(err);
    }
  }

  static async get<T>(key: string): Promise<T | null | undefined> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (err) {
      console.error(err);
    }

    return null;
  }
}
