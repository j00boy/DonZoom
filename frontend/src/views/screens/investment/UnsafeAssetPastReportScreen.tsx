import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import useStock from '@/hooks/queries/useStock';
import {ResponseReports} from '@/api/stock';

const UnsafeAssetPastReportScreen = ({route}: any) => {
  const stockId = route.params.stockId;
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState(true);
  const {useGetReports} = useStock();
  const {
    data: reportData = [] as ResponseReports,
    isLoading,
    error,
  } = useGetReports(stockId);

  const sortedReports = useMemo(() => {
    if (reportData.length >= 1)
      return sortedByCreatedAt ? [...reportData] : [...reportData].reverse();
  }, [reportData, sortedByCreatedAt]);

  const switchSortOrder = () => {
    setSortedByCreatedAt(prev => !prev);
  };

  // 날짜 형식 바꾸기
  // date를 YYYY.MM.DD로 포맷팅
  const formatDate = (dateStr: Date) => {
    return new Date(dateStr).toISOString().slice(0, 10).replaceAll('-', '.');
  };
  // 스톡아이디 없는경우
  if (!stockId) {
    return (
      <View style={styles.container}>
        <Text>종목을 선택해주세요</Text>
      </View>
    );
  }
  if (reportData.length < 1) {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 30, textAlign: 'center'}}>
          리포트가 없습니다
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={switchSortOrder}>
        {sortedByCreatedAt ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.buttonText}>최신순 </Text>
            <Icon name="chevron-down" size={25} />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.buttonText}>시간순 </Text>
            <Icon name="chevron-up" size={25} />
          </View>
        )}
      </TouchableOpacity>
      <ScrollView>
        {reportData.length >= 1 &&
          sortedReports?.map(report => (
            <TouchableOpacity key={report.Id} style={styles.reportContainer}>
              <View style={{flex: 0.8, marginRight: 15}}>
                <Text style={styles.headText}>{report.title}</Text>
                <Text style={styles.sourceText}>
                  {formatDate(report.createdAt)} {report.source}
                </Text>
              </View>
              <Image
                style={styles.image}
                source={require('@/assets/report.png')}></Image>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default UnsafeAssetPastReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.BOLD,
  },
  reportContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 0.5,
  },
  headText: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 16,
  },
  sourceText: {
    fontFamily: fonts.LIGHT,
    fontSize: 12,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
});