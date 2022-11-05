## importing bert model
import spacy

#! pip3 install spacy==(last version of spacy(3.2.4))
#! pip3 install spacy-transformers --quiet
#!python -m spacy download en_core_web_lg
#python -m spacy download en_core_web_sm
#!pip install -U pip setuptools wheel
#!pip install -U spacy[cuda110]
#!pip install wikipedia
#!pip install spacy_universal_sentence_encoder

## importing wikipedia test data
import pandas as pd
import wikipedia
from nltk import tokenize
import nltk
nltk.download('punkt')

## load BERT model
import spacy_transformers
nlp = spacy.load('en_core_web_lg')
#nlp_use = spacy_universal_sentence_encoder.load_model('en_use_lg')

## importing KMeans to cluster data
from nltk.cluster import KMeansClusterer
import numpy as np

## importing tokenizer and none-adjective extractor
import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from collections import Counter
from textblob import TextBlob
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
noun_adj = spacy.load('en_core_web_sm')

class N_gram_model:
  def __init__(self, dataset, NUM_CLUSTERS):
    self.dataset = dataset
    self.NUM_CLUSTERS = NUM_CLUSTERS

  def clustering_question(self, data, NUM_CLUSTERS):

    sentences = data['text']

    X = np.array(data['emb'].tolist())

    kclusterer = KMeansClusterer(
        NUM_CLUSTERS, distance=nltk.cluster.util.cosine_distance,
        repeats=25,avoid_empty_clusters=True)

    assigned_clusters = kclusterer.cluster(X, assign_clusters=True)

    data['cluster'] = pd.Series(assigned_clusters, index=data.index)
    data['centroid'] = data['cluster'].apply(lambda x: kclusterer.means()[x])

    return data, assigned_clusters

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
      if len(each_cluster)> 5:
        stopWords = set(stopwords.words('english'))
        paragraph_without_brackets = re.sub(r"[^\w]'",'',str(each_cluster))
        tagged = noun_adj(paragraph_without_brackets)
        noun_adj_pairs = []
        for chunk in tagged.noun_chunks:
            noun_adj_pairs.append(str(chunk).lower())
        
        #words = str(paragraph_without_brackets).split()
        #tagged = nltk.pos_tag(words)
        #wordsFiltered = []      
        #for (word, tag) in tagged:
        #  if (word not in stopWords) and (tag == 'NN', 'NNP', 'NNS', 'NNPS', 'JJ', 'JJR', 'JJS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'):
        #      wordsFiltered.append(word)

        #print(noun_adj_pairs)
        counter = Counter(noun_adj_pairs)
        counter_10 = counter.most_common(100)
        for tup in counter_10:
          if (int(tup[1]) > 2) and (tup[0].lower() not in most_occur) and (tup[0] != 'it') and (tup[0] != 'he'):
            most_occur.append(tup[0].lower())
    return most_occur

  def execute(self, dataset, NUM_CLUSTERS):
    data = pd.DataFrame (dataset, columns = ['text'])
    #nlp = spacy.load('en_use_lg')
    #nlp_use = spacy_universal_sentence_encoder.load_model('en_use_lg')
    # Generating sentence embedding from the text
    data['emb'] = data['text'].apply(self.get_embeddings)

    #clustering data
    data, assigned_clusters = self.clustering_question(data, NUM_CLUSTERS)

    #obtaining clustered data together for tokenizing
    cluster_data = self.clustered_data(data, NUM_CLUSTERS)
    most_occur = self.most_common_nouns_and_adjectives(cluster_data)

    return most_occur

def find_keywords_model():
    wiki_lst = []
    wiki_lst = tokenize.sent_tokenize(wikipedia.page('Data Science','Artificial intelligence','Machine ;earning','European Central Bank','Bank').content)
    N_gram = N_gram_model(wiki_lst, 7)
    most_occur = N_gram.execute(wiki_lst, 7)
    return most_occur
  
