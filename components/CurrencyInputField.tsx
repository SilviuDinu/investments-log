import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, TextInput } from './Themed';
import type { PickerItem } from 'react-native-woodpicker';
import { Picker } from 'react-native-woodpicker';

export default React.memo(function CurrencyInputField(props: any) {
  const { value, onChangeValue } = props || {};
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(!!value);
  const [pickedData, setPickedData] = useState<PickerItem>();

  const data: Array<PickerItem> = [
    { label: 'DataCat', value: 1 },
    { label: 'DataDog', value: 2 },
    { label: 'DataSnake', value: 3 },
    { label: 'DataPlatypus', value: 4 },
    { label: 'DataWhale', value: 5 },
  ];

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  const handleInputChange = useCallback((text: any) => {
    onChangeValue(text);
    setIsFilled(!!value);
  }, []);

  return (
    <View
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
      style={styles.bordered}>
      <TextInput
        style={styles.invested}
        isFocused={isFocused}
        value={value}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        keyboardType="numeric"
        {...props}></TextInput>
  
    </View>
  );
});

const styles = StyleSheet.create({
  invested: {
    width: '60%',
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  bordered: {
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'space-between',
  },
  currency: {
    width: '30%',
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});
