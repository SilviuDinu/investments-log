import * as React from 'react';
import { Modal, StyleSheet, Text } from 'react-native';
import { View } from './Themed';
import { Button } from 'react-native-elements/dist/buttons/Button';
import IMAGES from '../constants/flags';
import { Icon } from 'react-native-elements';

export default function PopUp(props: any) {
  const { status, onSubmit, text, buttonText } = props;
  return (
    <View>
      <Modal animationType="slide" transparent visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Image
              source={(IMAGES as any)[status]}
              style={{ width: 60, height: 60, marginBottom: 8 }}
            /> */}
            {status === 'success' ? (
              <Icon
                reverse
                name="verified"
                type="material"
                color="#1DE9B6"
                iconStyle={{
                  width: 75,
                  padding: 8,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              />
            ) : (
              <Icon
                reverse
                name="error"
                type="material"
                color="red"
                iconStyle={{
                  width: 75,
                  padding: 8,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              />
            )}

            <Text
              style={[
                styles.modalText,
                { marginTop: 24, fontSize: 18, textAlign: 'center' },
              ]}>
              {text}
            </Text>
            <Button
              style={[
                styles.button,
                styles.buttonClose,
                { marginTop: 24, width: 150 },
              ]}
              title={buttonText}
              onPress={onSubmit}></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 320,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
