import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, TextInput, Text } from './Themed';
import { Picker } from 'react-native-woodpicker';
import useColorScheme from '../hooks/useColorScheme';
import IMAGES from '../constants/flags';

export default React.memo(function CurrencyInputField(props: any) {
  const { value, onChangeValue, onChangeCurrency, pickerData, pickedItem } =
    props || {};
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(!!value);
  // const amountInputRef = useRef<any>();
  const theme = useColorScheme();

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    console.log('focused');
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
    // const formattedValue = formatter.current.format(value);
    // onChangeValue(formattedValue);
  }, [value]);

  const handleInputChange = useCallback((text: any) => {
    onChangeValue(text);
    setIsFilled(!!value);
  }, []);

  return (
    <View
      style={{
        width: '100%',
        maxWidth: 320,
        overflow: 'hidden',
        marginTop: 16,
      }}>
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
            onChangeText={onChangeValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            keyboardType="numeric"
            maxLength={10}
            {...props}></TextInput>
        </View>
        <View
          style={{
            ...styles.currency,
            ...styles.bordered,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)">
          {pickerData.length > 0 && (
            <Picker
              style={{
                ...styles.inputField,
                borderColor: '#fff',
                // paddingRight: 8,
                flex: 1,
              }}
              item={pickedItem}
              items={pickerData}
              textInputStyle={textStyleInput[theme]}
              // containerStyle={{ paddingRight: 8 }}
              onItemChange={onChangeCurrency}
              title="Pick a currency"
              mode="dropdown"
            />
          )}

          {pickedItem && (
            <View style={{ zIndex: -3, flex: 0 }}>
              <Image
                source={(IMAGES as any)[pickedItem.label]}
                style={{ width: 30, height: 20 }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

const pickerStyles = {
  textStyleInput: {
    light: {
      color: '#000',
    },
    dark: {
      color: '#fff',
    },
  },
  containerStyle: {
    light: {
      // width: '100%',
      // padding: 30,
      // paddingHorizontal: 8,
      backgroundColor: '#fff',
      color: '#000',
    },
    dark: {
      //  width: '100%',
      // padding: 30,
      // paddingHorizontal: 8,
      backgroundColor: '#000',
      color: '#fff',
    },
  },
};

const textStyleInput = StyleSheet.create({
  ...pickerStyles.textStyleInput,
});

const containerStyle = StyleSheet.create({
  ...pickerStyles.containerStyle,
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
    width: '100%',
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
