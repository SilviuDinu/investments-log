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

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [date, setDate] = useState<any>(new Date());
  const [budgetAmount, setBudgetAmount] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (date: Date) => {
    setDate(date);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
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
                flexDirection: 'row'
              }}>
              <View style={{marginHorizontal: 8}}>
                <Text style={{ fontSize: 20 }}>{date.getDate()}</Text>
              </View>
              <View style={{marginHorizontal: 8}}>
                <Text style={{ fontSize: 20 }}>/</Text>
              </View>
              <View style={{marginHorizontal: 8}}>
                <Text style={{ fontSize: 20 }}>{date.getMonth()}</Text>
              </View>
              <View style={{marginHorizontal: 8}}>
                <Text style={{ fontSize: 20 }}>/</Text>
              </View>
              <View style={{marginHorizontal: 8}}>
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
                      size: 35,
                      color: '#24a0ed',
                    }
                  : {
                      name: 'edit',
                      size: 30,
                      color: '#24a0ed',
                    }
              }
              onPress={() => setShowDatePicker(!showDatePicker)}
              // title={showDatePicker ? 'Done' : 'Pick another date'}
            />
          </View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View>
            <CustomTitle title="How much did you invest?" type="sectionTitle" />
            <CurrencyInputField
              value={budgetAmount}
              onChangeValue={setBudgetAmount}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
