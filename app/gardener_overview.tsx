import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Text } from 'react-native-paper';

export default function GardenerOverview() {
  const [expandedSteps, setExpandedSteps] = useState(false);
  const [expandedSleep, setExpandedSleep] = useState(false);
  const [expandedScreenTime, setExpandedScreenTime] = useState(false);

  const handlePressSteps = () => setExpandedSteps(!expandedSteps);
  const handlePressSleep = () => setExpandedSleep(!expandedSleep);
  const handlePressScreenTime = () => setExpandedScreenTime(!expandedScreenTime);

  // Format current date for the "Refreshed today" text
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return (
    <View style={styles.container}>
      {/* Refreshed today text */}
      <Text style={styles.refreshedText}>Refreshed today {formattedTime}</Text>
      
      <View style={styles.imageWrapper}>
        <View style={styles.greenBubble}>
          <Text style={styles.bubbleText}>
            You're staying active—{'\n'}great job! 🌿 Just be{'\n'}mindful of your sleep{'\n'}and screen time; a{'\n'}relaxing bedtime{'\n'}routine could help your{'\n'}well-being and keep{'\n'}your garden thriving!{'\n'}💤
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMoreText}>Read more</Text>
          </TouchableOpacity>
        </View>
        
        <Image 
          source={require('@/assets/images/gardener.png')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.tipsSection}>
        <Text style={styles.tipsText}>Tips for improving your:</Text>
        
        <ScrollView 
          style={styles.accordionScrollView}
          contentContainerStyle={styles.accordionContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <List.Accordion
            title="Steps"
            expanded={expandedSteps}
            onPress={handlePressSteps}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={props => (
                <Image
                  source={require('@/assets/images/StepsImage.png')}
                  style={styles.accordionIcon}
                />
              )}
            >
            <List.Item title="slay queens" style={styles.accordionItem} />
          </List.Accordion>
          <List.Accordion
            title="Sleep"
            expanded={expandedSleep}
            onPress={handlePressSleep}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={props => (
                <Image
                  source={require('@/assets/images/SleepImage.png')}
                  style={styles.accordionIcon}
                />
              )}
            >
            <List.Item title="slay queens" style={styles.accordionItem} />
          </List.Accordion>
          <List.Accordion
            title="Screen Time"
            expanded={expandedScreenTime}
            onPress={handlePressScreenTime}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={props => (
                <Image
                  source={require('@/assets/images/ScreenTimeImage.png')}
                  style={styles.accordionIcon}
                />
              )}
            >
            <List.Item title="slay queens" style={styles.accordionItem} />
          </List.Accordion>
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
      //marginTop: 10,
      position: 'relative',
      //width: '100%',
      height: 350,
      //alignItems: 'center',
      zIndex: 2, // Add this line
    },
    greenBubble: {
      position: 'absolute',
      right: 20,
      top: 10,
      backgroundColor: '#B6FFDA',
      borderRadius: 40,
      padding: 20,
      width: '85%',
      zIndex: 1,
    },
    bubbleText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 22,
        textAlign: 'right', // Add this line to align text to the right
      },
    readMoreText: {
      color: '#16A150',
      textDecorationLine: 'underline',
      alignSelf: 'flex-end',
      marginTop: 5,
      fontSize: 16,
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
      paddingBottom: 80, // Extra padding for bottom navigation
    },
    accordion: {
      backgroundColor: '#E3F4EE',
      borderRadius: 12,
      marginBottom: 15,
      overflow: 'hidden',
    },
    accordionIcon: {
      marginLeft: 12,
      marginTop:5,
      //marginRight: 0,
      //width: 24,
      //height: 24,
    },
    accordionTitle: {
      color: '#16A150',
      fontSize: 18,
      fontWeight: '500',
    },
    accordionItem: {
      backgroundColor: '#fff',
      marginBottom: 5,
    }
});
