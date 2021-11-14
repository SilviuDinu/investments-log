import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

const CustomTitle = React.memo((props?: any) => {
  const { type, title } = props;
  return (
    <Text
      style={{
        ...((styles as any)[type as any] || styles['sectionTitle']),
        marginBottom: 16,
      }}
      lightColor="rgba(0,0,0,0.8)"
      darkColor="rgba(255,255,255,0.8)">
      {title}
    </Text>
  );
});

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CustomTitle;
