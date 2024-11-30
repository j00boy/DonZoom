import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '@/constants/colors';
import KeyPad from '@/views/components/KeyPad';
import {fonts} from '@/constants/font';

const MakeNewMissionPayScreen = ({navigation, route}: any) => {
  const {text, selectedDate} = route.params;
  const [value, setValue] = useState<number>(0);
  const [alertText, setAlertText] = useState('');
  const valueString = value.toLocaleString(); // 천단위콤마로 화면에 표시

  // newvalue로 value 업데이트 함수
  const updateValue = useCallback((newValue: number) => {
    if (newValue >= 100000) {
      setValue(100000);
      setAlertText('※ 금액은 100,000원을 초과할 수 없습니다');
    } else if (newValue > 0) {
      setValue(newValue);
      setAlertText('');
    } else {
      setValue(0);
      setAlertText('');
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* paybox */}
      <View style={styles.paybox}>
        <Text style={styles.topText}>미션 금액을 설정해주세요!</Text>
        <Text style={styles.valueText}>
          {valueString} {''}
          <Text
            style={{
              fontFamily: fonts.BOLD,
              fontSize: 15,
              color: colors.BLUE_100,
            }}>
            원
          </Text>
        </Text>
      </View>
      {/* 버튼 */}
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateValue(value + 100);
          }}>
          <Text style={{color: colors.BLACK, fontWeight: '500'}}>+ 백원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateValue(value + 1000);
          }}>
          <Text style={{color: colors.BLACK, fontWeight: '500'}}>+ 천원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateValue(value + 10000);
          }}>
          <Text style={{color: colors.BLACK, fontWeight: '500'}}>+ 만원</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keypadBox}>
        {/* 주의 메세지 */}
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            fontSize: 13,
            color: colors.GRAY_100,
          }}>
          {alertText}
        </Text>
        <KeyPad onInput={updateValue} currentValue={value} />

        <TouchableOpacity
          style={styles.makeButton}
          onPress={() => {
            navigation.navigate('MakeNewMissionComplete', {
              text: text,
              selectedDate: selectedDate,
              pay: value,
            });
          }}>
          <Text
            style={{
              // marginVertical: 10,
              fontSize: 18,
              fontFamily: fonts.MEDIUM,
              color: colors.BLACK,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            미션 생성하기
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default MakeNewMissionPayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.YELLOW_25,
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  topText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
    color: colors.BLACK,
  },
  valueText: {
    marginTop: 20,
    fontFamily: fonts.BOLD,
    fontSize: 40,
    fontWeight: '700',
    color: colors.BLUE_100,
  },
  paybox: {
    width: 300,
    paddingVertical:20,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonBox: {
    flexDirection: 'row',
  },
  button: {
    width: 65,
    padding:10,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadBox:{
    alignItems:'center',
  },
  makeButton: {
    marginTop:15,
    padding:10,
    width: 300,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
});
