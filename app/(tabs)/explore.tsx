import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const models = [
  {
    name: 'BART Large CNN',
    description: 'Facebook\'s BART model fine-tuned on CNN/DailyMail dataset. Excellent for news article summarization.',
    strengths: ['News articles', 'Long documents', 'Factual content'],
    size: 'Large (~400MB)',
    speed: 'Medium',
  },
  {
    name: 'T5 Base',
    description: 'Google\'s Text-to-Text Transfer Transformer. Versatile model good for various text tasks including summarization.',
    strengths: ['General purpose', 'Versatile', 'Good balance'],
    size: 'Medium (~220MB)',
    speed: 'Fast',
  },
  {
    name: 'Pegasus XSum',
    description: 'Google\'s PEGASUS model trained on XSum dataset. Designed for abstractive summarization.',
    strengths: ['Abstract summaries', 'Creative rewording', 'Concise output'],
    size: 'Large (~560MB)',
    speed: 'Medium',
  }
];

export default function ExploreScreen() {
  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'Fast': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Slow': return '#F44336';
      default: return '#666';
    }
  };

  const getSizeColor = (size: string) => {
    if (size.includes('Small')) return '#4CAF50';
    if (size.includes('Medium')) return '#FF9800';
    if (size.includes('Large')) return '#F44336';
    return '#666';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Available Models</Text>
        <Text style={styles.subtitle}>
          Explore different AI models for text summarization. Each model has unique strengths and characteristics.
        </Text>
      </View>

      {models.map((model, index) => (
        <View key={index} style={styles.modelCard}>
          <Text style={styles.modelName}>🤖 {model.name}</Text>
          <Text style={styles.modelDescription}>{model.description}</Text>
          
          <View style={styles.modelStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Size</Text>
              <Text style={[styles.statValue, { color: getSizeColor(model.size) }]}>
                {model.size}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Speed</Text>
              <Text style={[styles.statValue, { color: getSpeedColor(model.speed) }]}>
                {model.speed}
              </Text>
            </View>
          </View>
          
          <View style={styles.strengthsContainer}>
            <Text style={styles.strengthsTitle}>✨ Best for:</Text>
            <View style={styles.strengthsList}>
              {model.strengths.map((strength, strengthIndex) => (
                <View key={strengthIndex} style={styles.strengthChip}>
                  <Text style={styles.strengthText}>{strength}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipText}>
            • BART Large CNN works best with news articles and factual content
          </Text>
          <Text style={styles.tipText}>
            • T5 Base is the most versatile for different text types
          </Text>
          <Text style={styles.tipText}>
            • Pegasus excels at creating creative, abstractive summaries
          </Text>
          <Text style={styles.tipText}>
            • Longer input text (200+ words) generally produces better summaries
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  modelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  modelDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  modelStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  strengthsContainer: {
    marginTop: 8,
  },
  strengthsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  strengthsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  strengthChip: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  strengthText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

