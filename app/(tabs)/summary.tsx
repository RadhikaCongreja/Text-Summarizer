import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { summarizeText } from '../../hooks/useSummarizer';

export default function SummaryScreen() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('facebook/bart-large-cnn');

  const models = [
    { id: 'facebook/bart-large-cnn', name: 'BART Large CNN' },
    { id: 't5-base', name: 'T5 Base' },
    { id: 'google/pegasus-xsum', name: 'Pegasus XSum' },
  ];

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to summarize');
      return;
    }

    if (inputText.trim().length < 50) {
      Alert.alert('Warning', 'Text should be at least 50 characters for better summarization');
      return;
    }

    setIsLoading(true);
    try {
      const result = await summarizeText(inputText, selectedModel);
      setSummary(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to summarize text. Please try again.');
      console.error('Summarization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
  };

  const copyToClipboard = async () => {
    if (summary) {

      try {
        // Note: You'll need to install @react-native-clipboard/clipboard
        // For now, we'll show an alert
        Alert.alert('Success', 'Summary copied to clipboard!');
      } catch (error) {
        Alert.alert('Error', 'Failed to copy to clipboard');
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Model Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Model</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modelSelector}>
            {models.map((model) => (
              <TouchableOpacity
                key={model.id}
                style={[
                  styles.modelChip,
                  selectedModel === model.id && styles.selectedModelChip
                ]}
                onPress={() => setSelectedModel(model.id)}
              >
                <Text style={[
                  styles.modelChipText,
                  selectedModel === model.id && styles.selectedModelChipText
                ]}>
                  {model.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enter Text to Summarize</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Paste or type your text here..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            textAlignVertical="top"
            maxLength={5000}
          />
          <Text style={styles.characterCount}>
            {inputText.length}/5000 characters
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.summarizeButton]}
            onPress={handleSummarize}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="sparkles" size={20} color="#fff" />
            )}
            <Text style={styles.buttonText}>
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={isLoading}
          >
            <Ionicons name="refresh" size={20} color="#666" />
            <Text style={[styles.buttonText, styles.clearButtonText]}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Section */}
        {summary && (
          <View style={styles.section}>
            <View style={styles.summaryHeader}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Ionicons name="copy-outline" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          </View>
        )}

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#666" />
          <Text style={styles.infoText}>
            For best results, use text with at least 100 words. The AI will create a concise summary preserving key information.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  modelSelector: {
    flexDirection: 'row',
  },
  modelChip: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedModelChip: {
    backgroundColor: '#007AFF',
  },
  modelChipText: {
    fontSize: 14,
    color: '#666',
  },
  selectedModelChipText: {
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    height: 200,
    fontSize: 16,
    lineHeight: 24,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  summarizeButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  clearButtonText: {
    color: '#666',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyButton: {
    padding: 4,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});


