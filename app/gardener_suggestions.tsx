// GardenerSuggestions.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GardenerSuggestions() {
  const navigation = useNavigation();
  
  // Format current date for the "Refreshed today" text
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('@/assets/images/back-arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gardener's Suggestions</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.greenBubble}>
          <Text style={styles.bubbleText}>
            You're doing great! 🌿{'\n'}
            Your step count has been consistent, which is fantastic for your energy levels. However, your sleep has been a bit irregular lately—perhaps a relaxing bedtime routine could help? Also, I've noticed a slight increase in screen time. How about swapping a few minutes of scrolling for some mindful breathing or reading? Keep nurturing your well-being, and your garden will flourish! 🌱💤🍅
          </Text>
        </View>
        
        <Text style={styles.refreshedText}>Refreshed today {formattedTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    //width: 24,
    //height: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 44, // To center the title accounting for back button width
  },
  contentContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  greenBubble: {
    backgroundColor: '#B6FFDA',
    borderRadius: 50,
    padding: 30,
    width: '90%',
    marginBottom: 20,
  },
  bubbleText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  refreshedText: {
    //marginTop: 20,
    textAlign: 'right',
    fontSize: 16,
    color: '#4D4D4D',
  },
});
