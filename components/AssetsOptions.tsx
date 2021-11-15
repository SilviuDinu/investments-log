import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import ICONS from '../constants/assetsIcons';
import { View } from './Themed';

const AssetsOptions = React.memo((props: any) => {
  const { selectedAsset } = props;

  return (
    <View style={styles.flex}>
      {props.assets.map((asset: any, index: number) => (
        <Button
          key={index}
          type="solid"
          buttonStyle={{
            backgroundColor:
              selectedAsset?.name === asset?.name ? '#1DE9B6' : '#24a0ed',
          }}
          style={styles.button}
          icon={
            asset.icon ? (
              <Image
                source={(ICONS as any)[asset.icon]}
                style={{
                  width: asset.iconWidth || 30,
                  height: asset.iconHeight || 30,
                  marginRight: 8,
                }}
              />
            ) : (
              {
                name: 'money',
                size: 30,
                color: '#eee',
              }
            )
          }
          onPress={() => props.onAssetSelect(asset)}
          title={asset.name}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 320,
  },
  button: {
    width: 150,
    height: 50,
    marginTop: 24,
  },
  // selected: {
  //   backgroundColor: '#1DE9B6',
  // },
});

export default AssetsOptions;
