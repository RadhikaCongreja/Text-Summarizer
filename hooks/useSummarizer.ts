// You'll need to install: npm install @huggingface/inference

const HF_API_TOKEN = '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'; // Replace with your actual token

// Hugging Face Inference API endpoint
const HF_API_BASE = 'https://api-inference.huggingface.co/models';

export interface SummaryResponse {
  summary_text: string;
}

/**
 * Summarize text using Hugging Face models
 * @param text - The text to summarize
 * @param model - The model to use (default: facebook/bart-large-cnn)
 * @returns Promise<string> - The summarized text
 */
export async function summarizeText(
  text: string, 
  model: string = 'facebook/bart-large-cnn'
): Promise<string> {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  // Prepare the input based on model type
  let input = text;
  if (model === 't5-base') {
    input = `summarize: ${text}`;
  }

  try {
    const response = await fetch(`${HF_API_BASE}/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: input,
        parameters: {
          max_length: 150,
          min_length: 30,
          do_sample: false,
          early_stopping: true,
          num_beams: 4,
          temperature: 1.0,
          repetition_penalty: 1.0,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid API token. Please check your Hugging Face API key.');
      } else if (response.status === 503) {
        throw new Error('Model is currently loading. Please try again in a moment.');
      } else {
        throw new Error(`API request failed: ${response.status}`);
      }
    }

    const result = await response.json();
    
    // Handle different response formats
    if (Array.isArray(result) && result.length > 0) {
      return result[0].summary_text || result[0].generated_text || 'Summary generation failed';
    } else if (result.summary_text) {
      return result.summary_text;
    } else if (result.generated_text) {
      return result.generated_text;
    } else {
      console.error('Unexpected response format:', result);
      throw new Error('Unexpected response format from API');
    }
  } catch (error) {
    console.error('Summarization error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to summarize text. Please try again.');
  }
}

/**
 * Alternative implementation using local processing (for offline use)
 * This is a simple extractive summarizer that picks the most important sentences
 */
export function extractiveSummary(text: string, maxSentences: number = 3): string {
  // Split text into sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  
  if (sentences.length <= maxSentences) {
    return text;
  }

  // Simple scoring based on sentence length and word frequency
  const wordFreq: Record<string, number> = {};
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Calculate word frequencies
  words.forEach(word => {
    if (word.length > 3) { // Ignore short words
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Score sentences
  const sentenceScores = sentences.map((sentence, index) => {
    const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    const score = sentenceWords.reduce((sum, word) => {
      return sum + (wordFreq[word] || 0);
    }, 0);
    
    return {
      sentence: sentence.trim(),
      score,
      index,
    };
  });

  // Sort by score and take top sentences
  const topSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index) // Maintain original order
    .map(s => s.sentence);

  return topSentences.join('. ') + '.';
}

/**
 * Get model information
 */
export function getModelInfo(modelId: string) {
  const models: Record<string, any> = {
    'facebook/bart-large-cnn': {
      name: 'BART Large CNN',
      description: 'Fine-tuned for summarization on CNN/DailyMail dataset',
      maxLength: 1024,
      bestFor: ['news articles', 'long documents'],
    },
    't5-base': {
      name: 'T5 Base',
      description: 'Text-to-text transformer, versatile for many tasks',
      maxLength: 512,
      bestFor: ['general text', 'short to medium documents'],
    },
    'google/pegasus-xsum': {
      name: 'Pegasus XSum',
      description: 'Pre-trained for abstractive summarization',
      maxLength: 512,
      bestFor: ['creative summaries', 'news articles'],
    },
  };

  return models[modelId] || null;
}

/**
 * Check if text is suitable for summarization
 */
export function validateText(text: string): { valid: boolean; message?: string } {
  if (!text || text.trim().length === 0) {
    return { valid: false, message: 'Text cannot be empty' };
  }

  if (text.length < 50) {
    return { valid: false, message: 'Text is too short for meaningful summarization' };
  }

  if (text.length > 5000) {
    return { valid: false, message: 'Text is too long. Please limit to 5000 characters.' };
  }

  const wordCount = text.split(/\s+/).length;
  if (wordCount < 10) {
    return { valid: false, message: 'Text should contain at least 10 words' };
  }

  return { valid: true };
}

/**
 * Chunk text if it's too long for the model
 */
export function chunkText(text: string, maxChunkSize: number = 1000): string[] {
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  const sentences = text.split(/[.!?]+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxChunkSize) {
      currentChunk += sentence + '. ';
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence + '. ';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}