import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, TextInput, Text } from './Themed';
import type { PickerItem } from 'react-native-woodpicker';
import { Picker } from 'react-native-woodpicker';

export default React.memo(function CurrencyInputField(props: any) {
  const { value, onChangeValue } = props || {};
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(!!value);
  // const amountInputRef = useRef<any>();

  const [pickedData, setPickedData] = useState<PickerItem>();

  const data: Array<PickerItem> = [
    { label: 'EUR', value: 1 },
    { label: 'RON', value: 2 },
    { label: 'USD', value: 3 }
  ];

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    console.log('focused');
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
    <View style={{ width: '80%', maxWidth: 320, overflow: 'hidden' }}>
      <View style={styles.flex}>
        <View
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
          style={{ ...styles.invested, ...styles.bordered }}>
          <TextInput
            // ref={amountInputRef}
            style={styles.inputField}
            isFocused={isFocused}
            value={value}
            placeholder="1,234.00"
            onChangeText={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            keyboardType="numeric"
            maxLength={10}
            {...props}></TextInput>
        </View>
        <View
          style={{ ...styles.currency, ...styles.bordered }}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)">
          <Picker
            style={styles.inputField}
            item={pickedData}
            items={data}
            onItemChange={setPickedData}
            title="Data Picker"
            placeholder="Select Data"
            isNullable={false}
            mode="dropdown"
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  invested: {
    width: '65%',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 10,
    fontSize: 20,
  },
  inputField: {
    height: 40,
    // paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: 'center',
  },
  bordered: {
    borderRadius: 4,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  currency: {
    width: '30%',
    height: 40,
    textAlign: 'center',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
