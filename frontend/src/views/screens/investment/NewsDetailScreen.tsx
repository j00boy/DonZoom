import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

const NewDetailScreen = ({route}: any) => {
  const news = route.params.news;
  return (
    <SafeAreaView style={{flex:1,backgroundColor: colors.WHITE}}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.titleText}>
                {news.title} 
                </Text> */}
        <Text style={styles.contentsText}>{news.contents}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NewDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold', 
    marginBottom: 15,
  },
  contentsText: {
    // 가독성 문제로 fontFamily 사용x
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 15,
    textAlign: 'justify', 
  },
});
