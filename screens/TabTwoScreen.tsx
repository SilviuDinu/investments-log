import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View as NativeView,
} from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import AssetSummary from '../components/AssetSummary';
import AssetTransactionHistory from '../components/AssetTransactionHistory';
import { Text, View } from '../components/Themed';
import { ICONS, iconsSizes } from '../constants/assetsIcons';
import ENDPOINTS from '../constants/endpoints';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [investments, setInvestments] = useState<any>({});
  const [expanded, setExpanded] = useState<any>({});

  const onRefresh = React.useCallback(() => {
    setInvestments({});
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleExpanded = (index: number, name: any) => {
    if (!expanded[name]) {
      expanded[name] = true;
    } else {
      expanded[name] = !expanded[name];
    }
    setExpanded({ ...expanded, [name]: expanded[name] });
  };

  useEffect(() => {
    if (!investments || !Object.keys(investments).length) {
      axios
        .get(ENDPOINTS.RECORDS_SUMMARY_URL)
        .then((response) => {
          const { data } = response;
          setInvestments(data);
          data.summary.forEach((item: any) => {
            Object.assign(expanded, { [item.asset]: false });
            setExpanded({ ...expanded });
          });
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
            <Pressable
              key={index}
              onPress={() => handleExpanded(index, item.asset)}>
              <AssetSummary item={item} expanded={expanded[item.asset]}>
                {investments?.records
                  ?.filter((e: any) => e.asset === item.asset)
                  .map((elem: any, idx: number) => (
                    <AssetTransactionHistory
                      key={idx}
                      elem={elem}
                      itemAsset={item.asset}
                    />
                  ))}
              </AssetSummary>
            </Pressable>
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
  cardSeparator: {
    marginVertical: 16,
    height: 1,
    width: '100%%',
  },
});
