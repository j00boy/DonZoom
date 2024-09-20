import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import CustomButton from '@/views/components/CustomButton';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';

function CheckFamilyScreen() {
  const [selected, setSelected] = useState('아이');

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('@/assets/image/pig.png')}
          style={styles.pig}></Image>
      </View>
      <View>
        <Text style={styles.signupText}>돈 줌(Zoom) 회원가입</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.option, selected === '아이' && styles.selectedOption]}
          onPress={() => setSelected('아이')}>
          <View
            style={[
              styles.radioOuter,
              selected === '아이' && styles.selectedRadio,
            ]}>
            {selected === '아이' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.childOptionText}>아이 </Text>
          <Text style={styles.optionText}>입니다.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === '부모' && styles.selectedOption]}
          onPress={() => setSelected('부모')}>
          <View
            style={[
              styles.radioOuter,
              selected === '부모' && styles.selectedRadio,
            ]}>
            {selected === '부모' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.parentOptionText}>부모 </Text>
          <Text style={styles.optionText}>입니다.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonContainer}>
        <CustomButton label="다음으로" variant="auth"></CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pig: {
    width: 152,
    height: 152,
    marginTop: 34,
    justifyContent: 'center',
  },
  signupText: {
    marginTop: 13,
    fontSize: 18,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
    textAlign: 'center',
  },
  nextButtonContainer: {
    marginTop: 35,
  },
  option: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_50,
    borderRadius: 5,
    width: '100%',
    height: 40,
  },
  selectedOption: {
    borderColor: colors.BLUE_100,
  },
  radio: {
    position: 'absolute',
    top: 12,
    left: 12,
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_50,
    marginRight: 10,
  },
  radioOuter: {
    position: 'absolute',
    top: 12,
    left: 12,
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: colors.BLUE_100,
  },
  selectedRadio: {
    borderColor: colors.BLUE_100,
  },
  optionText: {
    fontSize: 14,
    fontFamily: fonts.LIGHT,
    color: colors.BLACK,
  },
  childOptionText: {
    fontSize: 14,
    fontFamily: fonts.BOLD,
    color: colors.YELLOW_100,
  },
  parentOptionText: {
    fontSize: 14,
    fontFamily: fonts.BOLD,
    color: colors.BLUE_100,
  },
  optionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 37,
    width: 250,
    gap: 13,
  },
});

export default CheckFamilyScreen;