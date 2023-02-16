/** @format */

// dùng react native function component viết cho tôi 1 màn hình có hiệu ứng nhiều trái banh tự động di chuyển tự do khắp nơi trên màn hình, những trái banh có nhiều màu sắc khác nhau

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

const DonutScreen = () => {
  const [donuts, setDonuts] = useState([]);

  useEffect(() => {
    // Generate random donuts with random colors and positions on the screen.
    let donutArray = [];

    for (let i = 0; i < 10; i++) {
      let colorIndex = Math.floor(Math.random() * colors.length);

      let xPos = Math.floor(Math.random() * 100);
      let yPos = Math.floor(Math.random() * 100);

      donutArray.push({ x: xPos, y: yPos, color: colors[colorIndex] });
    }

    setDonuts(donutArray);
  }, []);

  // Animate the donuts on the screen by randomly changing their position over time.
  useEffect(() => {
    const animationInterval = setInterval(() => {
      let updatedDonuts = [...donuts];

      for (let i = 0; i < updatedDonuts.length; i++) {
        let xPos = Math.floor(Math.random() * 100);
        let yPos = Math.floor(Math.random() * 100);

        updatedDonuts[i].x = xPos;
        updatedDonuts[i].y = yPos;
      }

      setDonuts([...updatedDonuts]);
    }, 1000); // Update every second (1000ms).

    return () => clearInterval(animationInterval); // Clean up interval when component unmounts to avoid memory leaks/performance issues.
  }, [donuts]); // Only run this effect when the donut array changes (when it is initially generated).

  return (
    <View style={styles.container}>
      {donuts &&
        donuts.map((donut, index) => (
          <Animated key={index} style={{ left: donut.x + '%', top: donut.y + '%', backgroundColor: donut.color }} />
        ))}
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } });
export default DonutScreen;
