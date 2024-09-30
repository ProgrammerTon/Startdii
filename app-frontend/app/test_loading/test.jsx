import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loading from '../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecheckBox from '../../components/RecheckBox';

export default function Test() {
  return (
    <SafeAreaView>
      <Text>Hellooo</Text>
      {/* <Loading/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
