## importing bert model
import spacy

# All the installed dependencies
#! pip3 install spacy==(last version of spacy(3.2.4))
#! pip3 install spacy-transformers --quiet
#!python -m spacy download en_core_web_lg
#python -m spacy download en_core_web_sm
#!pip install -U pip setuptools wheel
#!pip install -U spacy[cuda110]
#!pip install spacy_universal_sentence_encoder

## importing wikipedia test data
import pandas as pd
from nltk import tokenize
import nltk
nltk.download('punkt')

## load BERT model
import spacy_transformers
nlp = spacy.load('en_core_web_lg')
#nlp_use = spacy_universal_sentence_encoder.load_model('en_use_lg')

## importing KMeans to cluster data
from nltk.cluster import KMeansClusterer
from sklearn.cluster import AgglomerativeClustering
import numpy as np

## importing tokenizer and noun-adjective extractor
import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from collections import Counter
from textblob import TextBlob
from gensim.parsing.preprocessing import remove_stopwords
import csv

nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
noun_adj = spacy.load('en_core_web_sm')

class N_gram_model:
  def __init__(self, dataset):
    self.dataset = dataset

  def clustering_question(self, data):

    sentences = data['text']

    X = np.array(data['emb'].tolist())

    assigned_clusters = AgglomerativeClustering().fit(X)

    data['cluster'] = pd.Series(assigned_clusters.labels_, index=data.index)

    return data, assigned_clusters.labels_

  def get_embeddings(self, text):
    return nlp(text).vector

  def clustered_data(self, data, NUM_CLUSTERS):
    cluster_data = []
    for x in range(NUM_CLUSTERS):
        cluster_data.append([])
    for index, row in data.iterrows():
      cluster_data[row['cluster']].append(row['text'])
    return cluster_data

  def most_common_nouns_and_adjectives(self, cluster_data):
    most_occur = []
    for each_cluster in cluster_data:

      #Verifying the length of each cluster
      if len(each_cluster)> 3:
        #Removing stopwords
        filtered_sentence1 = remove_stopwords(str(each_cluster))        
        paragraph_without_brackets = re.sub(r"[^\w]'",'',str(filtered_sentence1))
        #Obtaining tags for Noun adjective phrases
        tagged = noun_adj(paragraph_without_brackets)
        noun_adj_pairs = []
        #Filtering out only noun and adjective phrases
        for chunk in tagged.noun_chunks:
          noun = ""
          for tok in chunk:
            if tok.pos_ == "NOUN" or tok.pos_ == "ADJ":
              noun = f'{noun} {tok.text}'
          if len(noun) >2:
            noun_adj_pairs.append(noun) 

        #Obtaining counts of noun adjective phrases
        counter = Counter(noun_adj_pairs)
        counter_10 = counter.most_common(100)
        for tup in counter_10:
          #Verifying if the count is greater than 2
          if (int(tup[1]) >= 2) and (tup[0].lower() not in most_occur) and (tup[0] != 'it') and (tup[0] != 'he'):
            most_occur.append(tup[0].lower())
    return most_occur

  def execute(self, dataset):
    data = pd.DataFrame(dataset, columns = ['text'])
    # Generating sentence embedding from the text
    data['emb'] = data['text'].apply(self.get_embeddings)

    #clustering data
    data, assigned_clusters = self.clustering_question(data)

    #obtaining clustered data together for tokenizing
    cluster_data = self.clustered_data(data, len(np.unique(assigned_clusters)))
    most_occur = self.most_common_nouns_and_adjectives(cluster_data)

    return most_occur

def find_keywords_model(transcript):
    final_most_occur = []
    _lst = list(transcript.split("."))
    #removing empty strings  
    while("" in _lst):
      _lst.remove("")
    N_gram = N_gram_model(_lst)
    most_occur = N_gram.execute(_lst)

    #verifying most occured words
    for string in most_occur:
      temp_string = []
      if len(string)>5:
      #extracting words from each string
        res_string = re.findall(r'\w+', string) 
        #removing all the special characters
        for word in res_string:
          filter_word = re.sub('[^A-Za-z]+', '', word)
          temp_string.append(filter_word)
        final_most_occur.append(' '.join(temp_string))

    #removing empty strings  
    while("" in final_most_occur):
      final_most_occur.remove("")

    return final_most_occur
  
