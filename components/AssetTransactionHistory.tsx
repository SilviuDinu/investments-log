import React from 'react';
import { Text, View } from './Themed';
import { Image, StyleSheet, View as NativeView } from 'react-native';
import { Icon } from 'react-native-elements';
import { ICONS, iconsSizes } from '../constants/assetsIcons';
import moment from 'moment';

const AssetTransactionHistory = React.memo((props: any) => {
  const { elem, itemAsset } = props;
  return (
    <NativeView>
      <NativeView
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <NativeView
          style={{
            alignContent: 'center',
            alignItems: 'center',
            // justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <NativeView
            style={{
              alignContent: 'center',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            {iconsSizes.find((elem: any) => elem.name === itemAsset) ? (
              <Image
                source={(ICONS as any)[itemAsset.toLowerCase()]}
                style={{
                  width: iconsSizes.find((elem: any) => elem.name === itemAsset)
                    ?.iconWidth,
                  height: iconsSizes.find(
                    (elem: any) => elem.name === itemAsset
                  )?.iconHeight,
                  marginRight: 8,
                }}
              />
            ) : (
              <Icon
                name="money"
                type="material"
                color="#1DE9B6"
                iconStyle={{
                  width: 30,
                  height: 30,
                }}
              />
            )}
          </NativeView>
          <NativeView
            style={{
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text>{moment(elem.date).format('ll')}</Text>
            <Text>{moment(elem.date).format('HH:mm')}</Text>
          </NativeView>
        </NativeView>
        <NativeView style={{alignItems: 'flex-end', justifyContent: 'center'}}>
          {elem.spendingDetails.map((detail: any, i: number) => (
            <Text key={i}>{`-${detail.value} ${detail.currency}`}</Text>
          ))}
        </NativeView>
      </NativeView>
    </NativeView>
  );
});

const styles = StyleSheet.create({
  separator: {
    marginVertical: 24,
    height: 1,
    width: 320,
  },
  cardSeparator: {
    marginVertical: 24,
    height: 1,
    width: '100%%',
  },
});

export default AssetTransactionHistory;
