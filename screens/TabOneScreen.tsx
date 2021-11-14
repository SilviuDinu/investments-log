import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
  const [showDatePicker, setShowDatePicker] = useState(true);

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
          <View>
            {/* <Button
          onPress={() => setShowDatePicker(!showDatePicker)}
          title="Show date picker!"
        /> */}
            <CustomTitle title="Pick a date" type="sectionTitle" />
            {showDatePicker && (
              <DatePicker date={date} setDate={onDateChange} />
            )}
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
    justifyContent: 'flex-start',
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
