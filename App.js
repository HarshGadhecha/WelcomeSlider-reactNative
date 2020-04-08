import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, Image, TouchableOpacity, Animated, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
const { width, height } = Dimensions.get('window');
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [
        {
          imageUrl: require('./img/1.jpg'),
          titleName: 'Page 1',
          header: 'Header conent 1',
        },
        {
          imageUrl: require('./img/2.jpg'),
          titleName: 'Page 2',
          header: 'Header conent 2',
        },
        {
          imageUrl: require('./img/3.jpg'),
          titleName: 'Page 3',
          header: 'Header conent 3',
        }
      ]
    }

  }
  scrollX = new Animated.Value(0);
  render() {
    let position = Animated.divide(this.scrollX, width);
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={{}}>

            <FlatList
              pagingEnabled
              horizontal
              data={this.state.content}
              style={{ width: width, height: height }}
              keyExtractor={(item, index) => index.toString()}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: this.scrollX } } }
              ])}
              renderItem={({ item, index }) => (
                <View style={{ height: '75%', width: width, justifyContent: "center", alignItems: "center", marginTop: '25%' }}>
                  <Image source={item.imageUrl} resizeMode="contain" style={{ height: 300, width: width, aspectRatio: 1, marginBottom: 50 }} />
                  <View style={{ marginBottom: 40, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: '#fff', margin: 5 }}>{item.titleName}</Text>
                    <Text style={{ fontSize: 18, color: '#fff' }}>{item.header}</Text>
                  </View>
                </View>
              )}
            />

            <View style={{ flexDirection: "row", height: '10%', width: width, justifyContent: "center", alignItems: "center" }}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, width: 150, }}>
                {this.state.content.map((_, i) => {
                  let opacity = position.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [0.3, 3, 0.3],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View key={i}
                      style={[{ height: 10, width: 10, borderRadius: 4, margin: 4, backgroundColor: "#ffcb52", opacity }]} />
                  )
                }
                )}
              </View>

            </View>
            <View style={{justifyContent: "center", alignItems: "center", height: '15%', width: width}}>
              <Button title='Get started' />
            </View>
          </View>
        </SafeAreaView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#104e5a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
