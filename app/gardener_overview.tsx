import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from 'react-native-paper';

export default function GardenerOverview() {
  const navigation = useNavigation();
  
  // Format current date for the "Refreshed today" text
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  const navigateToSteps = () => {
    navigation.navigate('steps_overview'); // If this is the registered name
  };
  
  const navigateToSleep = () => {
    navigation.navigate('sleep_overview');
  };

  const navigateToScreenTime = () => {
    navigation.navigate('screen_time_overview');
  };

  return (
    <View style={styles.container}>
      {/* Refreshed today text */}
      <Text style={styles.refreshedText}>Refreshed today {formattedTime}</Text>
      
      <View style={styles.imageWrapper}>
        <View style={styles.greenBubble}>
          <Text style={styles.bubbleText}>
            You're doing amazing! 🌼 {'\n'}A little more screen-free {'\n'}time tonight will {'\n'}help Sprouty bloom {'\n'}even brighter!
          </Text>
        </View>
        
        <Image 
          source={require('@/assets/images/gardener.png')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.tipsSection}>
        <Text style={styles.tipsText}>Gardener's comments</Text>
        
        <ScrollView 
          style={styles.accordionScrollView}
          contentContainerStyle={styles.accordionContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={navigateToSteps}
          >
            <View style={styles.navButtonContent}>
              <Image
                source={require('@/assets/images/StepsImage.png')}
                style={styles.navButtonIcon}
              />
              <Text style={styles.navButtonText}>Steps</Text>
            </View>
            <Image
              source={require('@/assets/images/arrowRightIcon.png')}
              ///Users/tmsgbl/Documents/DTU/2 Sem/Personal Data/tmsgbl-first-project/assets/images/arrowRightIcon.png
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButton} 
            onPress={navigateToSleep}
          >
            <View style={styles.navButtonContent}>
              <Image
                source={require('@/assets/images/SleepImage.png')}
                style={styles.navButtonIcon}
              />
              <Text style={styles.navButtonText}>Sleep</Text>
            </View>
            <Image
              source={require('@/assets/images/arrowRightIcon.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButton} 
            onPress={navigateToScreenTime}
          >
            <View style={styles.navButtonContent}>
              <Image
                source={require('@/assets/images/ScreenTimeImage.png')}
                style={styles.navButtonIcon}
              />
              <Text style={styles.navButtonText}>Screen Time</Text>
            </View>
            <Image
              source={require('@/assets/images/arrowRightIcon.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    refreshedText: {
      textAlign: 'center',
      marginTop: 70,
      fontSize: 14,
      color: '#4D4D4D',
    },
    imageWrapper: {
      position: 'relative',
      height: 350,
      zIndex: 2,
    },
    greenBubble: {
      position: 'absolute',
      right: 20,
      top: 10,
      backgroundColor: '#B6FFDA',
      borderRadius: 40,
      padding: 20,
      width: '85%',
      height: 220,
      zIndex: 1,
    },
    bubbleText: {
      marginTop: 10,
      marginRight: 5,
      fontSize: 19,
      color: '#333333',
      lineHeight: 25,
      textAlign: 'right',
    },
    image: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: 350,
      width: 200,
      zIndex: 1,
    },
    tipsSection: {
      paddingHorizontal: 20,
      flex: 1,
    },
    tipsText: {
      fontSize: 22,
      color: '#4D4D4D',
      marginBottom: 15,
      fontWeight: '500',
    },
    accordionScrollView: {
      flex: 1,
    },
    accordionContentContainer: {
      paddingBottom: 80,
    },
    navButton: {
      //backgroundColor: '#E3F4EE',
      borderRadius: 12,
      borderColor: '#C3C3C3',
      borderWidth: 1,
      marginBottom: 15,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
    },
    navButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    navButtonIcon: {
      marginLeft: 5,
      marginRight: 15,
    },
    navButtonText: {
      color: '#16A150',
      fontSize: 18,
      fontWeight: '500',
    },
    chevronIcon: {
      //width: 24,
      //height: 24,
    }
});
