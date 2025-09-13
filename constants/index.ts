// API Configuration
export const API_CONFIG = {
  HUGGING_FACE_API_BASE: 'https://api-inference.huggingface.co/models',
  DEFAULT_MODEL: 'facebook/bart-large-cnn',
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

// Model configurations
export const AVAILABLE_MODELS = [
  {
    id: 'facebook/bart-large-cnn',
    name: 'BART Large CNN',
    description: 'Facebook\'s BART model fine-tuned on CNN/DailyMail dataset',
    maxLength: 1024,
    minLength: 30,
    maxSummaryLength: 150,
    strengths: ['News articles', 'Long documents', 'Factual content'],
    size: 'Large (~400MB)',
    speed: 'Medium',
  },
  {
    id: 't5-base',
    name: 'T5 Base',
    description: 'Google\'s Text-to-Text Transfer Transformer',
    maxLength: 512,
    minLength: 20,
    maxSummaryLength: 100,
    strengths: ['General purpose', 'Versatile', 'Good balance'],
    size: 'Medium (~220MB)',
    speed: 'Fast',
  },
  {
    id: 'google/pegasus-xsum',
    name: 'Pegasus XSum',
    description: 'Google\'s PEGASUS model trained on XSum dataset',
    maxLength: 512,
    minLength: 25,
    maxSummaryLength: 120,
    strengths: ['Abstract summaries', 'Creative rewording', 'Concise output'],
    size: 'Large (~560MB)',
    speed: 'Medium',
  },
];

// App limits and constraints
export const APP_LIMITS = {
  MAX_INPUT_LENGTH: 5000,
  MIN_INPUT_LENGTH: 50,
  MIN_WORD_COUNT: 10,
  MAX_CHUNK_SIZE: 1000,
};

// UI Constants
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  background: '#f8f9fa',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e9ecef',
  placeholder: '#999999',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 24,
};

// Error messages
export const ERROR_MESSAGES = {
  EMPTY_TEXT: 'Please enter some text to summarize',
  TEXT_TOO_SHORT: 'Text should be at least 50 characters for better summarization',
  TEXT_TOO_LONG: 'Text is too long. Please limit to 5000 characters.',
  INVALID_API_KEY: 'Invalid API token. Please check your Hugging Face API key.',
  MODEL_LOADING: 'Model is currently loading. Please try again in a moment.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  GENERIC_ERROR: 'Failed to summarize text. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  COPY_SUCCESS: 'Summary copied to clipboard!',
  SUMMARY_GENERATED: 'Summary generated successfully',
};

// Tips and help text
export const HELP_TEXT = {
  MODEL_SELECTION: 'Choose the AI model that best fits your content type',
  INPUT_GUIDELINES: 'For best results, use text with at least 100 words',
  SUMMARY_INFO: 'The AI will create a concise summary preserving key information',
  TIPS: [
    'BART Large CNN works best with news articles and factual content',
    'T5 Base is the most versatile for different text types',
    'Pegasus excels at creating creative, abstractive summaries',
    'Longer input text (200+ words) generally produces better summaries',
  ],
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 200,
  medium: 300,
  slow: 500,
};

// Storage keys
export const STORAGE_KEYS = {
  SELECTED_MODEL: '@ai_summarizer_selected_model',
  SUMMARY_HISTORY: '@ai_summarizer_history',
  USER_PREFERENCES: '@ai_summarizer_preferences',
};