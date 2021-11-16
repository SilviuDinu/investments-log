import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import AssetSummary from '../components/AssetSummary';
import CustomTitle from '../components/CustomTitle';
import { Text, View } from '../components/Themed';
import ENDPOINTS from '../constants/endpoints';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [investments, setInvestments] = useState<any>({});
  const [assets, setAssets] = useState<string[]>([]);

  const onRefresh = React.useCallback(() => {
    setInvestments({});
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!investments || !Object.keys(investments).length) {
      axios
        .get(ENDPOINTS.RECORDS_SUMMARY_URL)
        .then((response) => {
          const { data } = response;
          setInvestments(data);
        })
        .catch((error) => {
          console.error('Summary error', error);
        });
    }
  }, [investments]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.title}>Your investments</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          {investments?.summary?.map((item: any, index: number) => (
            <AssetSummary key={index} item={item} />
          ))}
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
    justifyContent: 'flex-start',
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
