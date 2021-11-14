import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker(props: any) {
  const { date, setDate } = props || {};

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <DateTimePicker
      style={{ width: 320 }}
      testID="dateTimePicker"
      value={date}
      mode="date"
      display="spinner"
      onChange={onChange}
    />
  );
}
