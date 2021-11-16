import React, { useState } from 'react';
import { Text, View } from './Themed';
import { Image, View as NativeView } from 'react-native';
import { Icon } from 'react-native-elements';
import { ICONS, iconsSizes } from '../constants/assetsIcons';

const AssetSummary = (props: any) => {
  const { item } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <View
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
      style={{
        marginBottom: 24,
        width: 320,
        padding: 16,
        minHeight: 120,
        justifyContent: 'space-evenly',
        borderRadius: 10,
      }}>
      <NativeView
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 4,
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 8 }}>
          {item.asset}
        </Text>
        {iconsSizes.find((elem: any) => elem.name === item.asset) ? (
          <Image
            source={(ICONS as any)[item.asset.toLowerCase()]}
            style={{
              width: iconsSizes.find((elem: any) => elem.name === item.asset)
                ?.iconWidth,
              height: iconsSizes.find((elem: any) => elem.name === item.asset)
                ?.iconHeight,
              marginRight: 8,
            }}
          />
        ) : (
          <Icon
            name="money"
            type="material"
            color="#1DE9B6"
            iconStyle={{
              width: 25,
            }}
          />
        )}
      </NativeView>
      <NativeView
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 8,
        }}>
        <Text>Last updated: </Text>
        <Text style={{ fontWeight: '500' }}>{item.lastInvested}</Text>
      </NativeView>
      <NativeView
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: 16,
        }}>
        <Text>Total invested: </Text>
        <NativeView
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            paddingVertical: 8,
            marginTop: 8,
          }}>
          {Object.entries(item.expenses).map(([key, value], index) => (
            <Text
              key={index}
              style={{ fontWeight: '500' }}>{`${value} ${key}`}</Text>
          ))}
        </NativeView>
      </NativeView>
    </View>
  );
};

export default AssetSummary;
