import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { useState } from 'react';
import DatePicker from '../components/DatePicker';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import CurrencyInputField from '../components/CurrencyInputField';
import CustomTitle from '../components/CustomTitle';
import { PickerItem } from 'react-native-woodpicker';
import AssetsOptions from '../components/AssetsOptions';
import axios from 'axios';
import moment from 'moment';

let newRecordUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEW_RECORD_URL || 'http://localhost:3000/newRecord'
    : 'http://192.168.1.210:3000/newRecord';

const pickerData: Array<PickerItem> = [
  { label: 'EUR', value: 1, icon: 'europe.svg' },
  { label: 'RON', value: 2, icon: 'romania.svg' },
  { label: 'USD', value: 3, icon: 'usa.svg' },
];

const assets: Array<{
  icon?: string;
  name: string;
  type?: string;
  iconWidth?: number;
  iconHeight?: number;
}> = [
  {
    icon: 'bitcoin',
    name: 'Bitcoin',
    iconWidth: 30,
    iconHeight: 30,
  },
  {
    icon: 'eth',
    name: 'Ethereum',
    iconWidth: 15,
    iconHeight: 30,
  },
  {
    name: 'SPX500',
  },
];

interface RequestBody {
  date: Date;
  formattedDate: string;
  spendingDetails: { value: string; currency: string }[];
  asset: string;
  assetDetails: {
    icon?: string;
    name: string;
    type?: string;
    iconWidth?: number;
    iconHeight?: number;
  };
}

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [date, setDate] = useState<any>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [inputFields, setInputFields] = useState<any>([
    { value: '', currency: pickerData[0].label, item: pickerData[0] },
  ]);
  // const isSubmitDisabled = React.useRef(false);

  const onDateChange = (date: Date) => {
    setDate(date);
  };

  const addNewField = () => {
    setInputFields((inputFields: any) => [
      ...inputFields,
      { value: '', item: pickerData[0], currency: pickerData[0].label },
    ]);
  };

  const onValueChange = (value: any, index: any) => {
    inputFields[index].value = value;
    setInputFields([...inputFields]);
  };

  const onCurrencyChange = (currency: any, index: any) => {
    inputFields[index].item = currency;
    inputFields[index].currency = currency.label;
    setInputFields([...inputFields]);
  };

  const getIsButtonDisabled = () => {
    if (!date) {
      return true;
    }
    if (!selectedAsset) {
      return true;
    }
    return !!inputFields.find((field: any) => !field.value);
  };

  const submitNewRecord = () => {
    const body: RequestBody = {
      date: date,
      formattedDate: moment(date).format('LL'),
      spendingDetails: inputFields.map((detail: any) => ({
        value: detail.value,
        currency: detail.currency,
      })),
      asset: selectedAsset.name,
      assetDetails: selectedAsset,
    };
    axios
      .post(newRecordUrl, { ...body })
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        Promise.reject(error);
      });
  };

  React.useEffect(() => {
    // const isDisabled = getIsButtonDisabled();
    // console.log(isDisabled);
  }, [inputFields, date, selectedAsset]);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ width: '100%' }}>
        <View style={styles.container}>
          <Text style={styles.title}>New investment</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View style={{ alignItems: 'center' }}>
            <CustomTitle title="Pick a date" type="sectionTitle" />
            <View
              style={{
                marginBottom: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 20 }}>{date.getDate()}</Text>
              </View>
              <View style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 20 }}>/</Text>
              </View>
              <View style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 20 }}>{date.getMonth() + 1}</Text>
              </View>
              <View style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 20 }}>/</Text>
              </View>
              <View style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 20 }}>{date.getFullYear()}</Text>
              </View>
            </View>
            {showDatePicker && (
              <DatePicker date={date} setDate={onDateChange} />
            )}
            <Button
              style={{ width: 100 }}
              type="clear"
              icon={
                showDatePicker
                  ? {
                      name: 'done',
                      size: 25,
                      color: '#24a0ed',
                    }
                  : {
                      name: 'edit',
                      size: 25,
                      color: '#24a0ed',
                    }
              }
              onPress={() => setShowDatePicker(!showDatePicker)}
              iconPosition="right"
              titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
              title={showDatePicker ? 'Done' : 'Edit'}
            />
          </View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View style={{ alignItems: 'center' }}>
            <CustomTitle title="How much did you invest?" type="sectionTitle" />
            {inputFields.map((inputField: any, index: any) => (
              <CurrencyInputField
                key={index}
                value={inputField.value}
                onChangeValue={(value: string) => onValueChange(value, index)}
                onChangeCurrency={(curency: string) =>
                  onCurrencyChange(curency, index)
                }
                pickerData={pickerData}
                pickedItem={inputField.item}
                keyboardType={'numeric'}
              />
            ))}
            {inputFields.length <= 2 ? (
              <Button
                style={{ width: 150, marginTop: 16 }}
                type="clear"
                disabled={inputFields.length >= 3}
                icon={{
                  name: 'add',
                  size: 25,
                  color: '#24a0ed',
                }}
                iconPosition="right"
                titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
                onPress={addNewField}
                title={'Add info'}
              />
            ) : null}
          </View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View style={{ alignItems: 'center' }}>
            <CustomTitle title="Pick an asset" type="sectionTitle" />
            <AssetsOptions
              assets={assets}
              onAssetSelect={(asset: any) => setSelectedAsset(asset)}
              selectedAsset={selectedAsset}
            />
          </View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Button
              style={{ width: 320, flex: 1 }}
              title="Submit"
              disabled={getIsButtonDisabled()}
              onPress={submitNewRecord}></Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
    minHeight: '100%',
  },
  title: {
    fontSize: 20,
    marginTop: 24,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: 320,
  },
});
