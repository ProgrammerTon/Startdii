import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loading from '../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import SourceCard from '../../components/E1_SourceCard';

export default function Test() {
  return (
    <SafeAreaView>
      <Text>Hellooo</Text>
      {/* <Loading/> */}
      <Text>Hellooo</Text>
      <View style={styles.container}>
        <SourceCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
  },
});
