import VegaLiteSleepMain from '@/components/VegaLiteSleepMain';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SleepView() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require('@/assets/images/back-arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Weekly Report Component */}
        <View style={[styles.reportCard, { width: screenWidth - 24 }]}>
          <Text style={styles.reportTitle}>Weekly Trend</Text>
          
          <Text style={styles.previousAverageText}>
            On average this week you slept <Text style={{fontWeight: 'bold'}}>40 minutes more</Text> than the previous week
          </Text>
          
          <View style={styles.percentChangeContainer}>
            <Image 
              source={require('@/assets/images/GreenUpArrow.png')} 
              style={styles.arrowIcon} 
            />
            <Text style={styles.percentChangeText}>which is <Text style={{fontWeight: 'bold'}}>10.8% more</Text> compared to the previous week</Text>
          </View>
        </View>

        <View style={[styles.chartWrapper, { width: screenWidth - 24 }]}>
          <VegaLiteSleepMain />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    //paddingTop: 40,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  // Weekly Report styles
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: '#333',
    marginBottom: 12,
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentAverageLabel: {
    fontSize: 16,
    color: '#555',
  },
  currentAverageValue: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
    marginLeft: 4,
  },
  previousAverageText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  percentChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: '#4CAF50', // Green color for positive change
  },
  percentChangeText: {
    fontSize: 14,
    color: '#4CAF50', // Green color for positive change
  },
  chartWrapper: {
    //backgroundColor: '#fff',
    //borderRadius: 16,
    //padding: 12,
    //marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 10,
    padding: 5,
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    //width: 24,
    //height: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    width: '100%',
    marginTop: 15
  },
});
