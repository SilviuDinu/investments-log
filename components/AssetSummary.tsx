import React, { useState } from 'react';
import { Text, View } from './Themed';
import { Image, StyleSheet, View as NativeView } from 'react-native';
import { Icon } from 'react-native-elements';
import { ICONS, iconsSizes } from '../constants/assetsIcons';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';

const AssetSummary = React.memo((props: any) => {
  const { item, expanded } = props;
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
        <NativeView
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ marginRight: 8 }}>Total invested:</Text>
          <Tooltip
            containerStyle={{
              height: 100,
              width: 200,
              backgroundColor: 'lightgrey',
            }}
            overlayColor="transparent"
            popover={
              <Text style={{ color: '#000' }}>
                If there are more than 1 currency shown, they're all just
                conversions of each other. Do not sum them up!
              </Text>
            }>
            <Icon
              name="help"
              type="material"
              color="#1DE9B6"
              iconStyle={{
                width: 25,
              }}
            />
          </Tooltip>
        </NativeView>
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
      {expanded && (
        <>
          <View
            style={styles.cardSeparator}
            lightColor="lightgray"
            darkColor="lightgray"
          />
          {props.children}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
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

export default AssetSummary;
