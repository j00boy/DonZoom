import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '@/api/axios';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useMission from '@/hooks/queries/useMission';
import useMissionStore from '@/stores/useMissionStore';

interface Mission {
  missionId: number;
  contents: string;
  dueDate: string;
  reward: number;
}

const MissionPastScreen = ({route}: any) => {
  const childId = useMissionStore(state => state.getChildId());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMissionBox, setSelectedMissionBox] = useState<number | null>(
    null,
  );
  const {useGetMissions, useDeleteMission, useModifyMission} = useMission();
  const {data: missionPastData, refetch} = useGetMissions(
    childId || -1,
    'ACCEPTED',
  );
  const {mutate: deleteMission} = useDeleteMission();

  // 화면 포커스 시 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleMissionPress = useCallback((missionId: number) => {
    setSelectedMissionBox(missionId === selectedMissionBox ? null : missionId);
  }, []);

  const handleMissionDelete = useCallback(async (missionId: number) => {
    try {
      deleteMission(missionId, {
        onSuccess: () => console.log('미션삭제'),
      });
    } catch (error) {
      console.log(error);
    }
  }, [deleteMission,refetch]);

  const formatDate = (dateStr: Date | undefined) => {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().slice(0, 10).replaceAll('-', '.');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={styles.container}>
        {missionPastData && missionPastData?.missions?.length < 1 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}> 지난 미션이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView>
            {missionPastData?.missions.map(mission => (
              <View key={mission.missionId}>
                <TouchableOpacity
                  onPress={() => handleMissionPress(mission.missionId)}
                  style={[
                    styles.boxContainer,
                    selectedMissionBox === mission.missionId &&
                      styles.boxContainerActive,
                  ]}>
                  {selectedMissionBox === mission.missionId && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleMissionDelete(mission.missionId)}>
                      <Text style={{fontFamily: fonts.MEDIUM, fontSize: 18}}>
                        삭제
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={{position: 'absolute', right: 25}}>
                    <Text
                      style={[
                        styles.largetext,
                        selectedMissionBox === mission.missionId && {
                          color: colors.GRAY_100,
                        },
                      ]}>
                      {mission.contents}
                    </Text>
                    <Text
                      style={[
                        styles.largetext,
                        selectedMissionBox === mission.missionId && {
                          color: colors.GRAY_100,
                        },
                      ]}>
                      {mission.reward.toLocaleString()}원
                    </Text>
                    <Text style={styles.smalltext}>
                      {formatDate(mission.dueDate)}까지
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.GRAY_50,
  },
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
  },
  boxContainer: {
    width: 350,
    height: 130,
    padding: 20,
    borderColor: colors.BLACK,
    backgroundColor: colors.YELLOW_50,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    justifyContent: 'center',
    marginLeft: 25,
  },
  boxContainerActive: {
    backgroundColor: colors.YELLOW_25,
  },
  largetext: {
    fontSize: 20,
    margin: 3,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    textAlign: 'right',
    fontWeight: '700',
  },
  smalltext: {
    fontSize: 15,
    margin: 3,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    textAlign: 'right',
    fontWeight: '400',
  },
});

export default MissionPastScreen;
