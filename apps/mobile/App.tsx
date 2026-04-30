import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput } from 'react-native';

export default function App() {
  const [ticker, setTicker] = useState('NVDA');
  const [result, setResult] = useState('');
  const api = process.env.EXPO_PUBLIC_API_URL;
  return <SafeAreaView>
    <Text>ChatGPT Trade Mobile</Text>
    <TextInput value={ticker} onChangeText={setTicker} />
    <Button title="Analyze" onPress={async () => {
      const res = await fetch(`${api}/api/analyze`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ticker, trade_date:'2025-01-15'})});
      setResult(JSON.stringify(await res.json()));
    }} />
    <Text>{result}</Text>
  </SafeAreaView>;
}
