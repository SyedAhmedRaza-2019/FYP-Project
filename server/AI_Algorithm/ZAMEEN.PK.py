#!/usr/bin/env python
# coding: utf-8

# ## EXPLORATORY DATA ANALYSIS

# ### wrangling and visaulization

# In[1]:


##importing libaries

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
# %matplotlib inline
import warnings
warnings.filterwarnings('ignore')

# In[2]:


##reading dataframes

df = pd.read_csv("zameen_karachi_cleaned_data.csv")     ##cleaned data
raw_df = pd.read_csv("zameen-karachi-dataset.csv")      ##not cleaned data

df.head(3)

# In[3]:


df.info()

# In[ ]:




# In[4]:



##def F_Location(x):
##    if df["location"].value_counts()[x] < 1000:
##        df[df["location"] == x]["location"] = 'Others'  
    
##for x in df["location"]:
##    F_Location(x)
    

# ## handling outliers

# In[5]:


sns.scatterplot(df["area"],df["price"])

# In[6]:


plt.figure(figsize=(12, 8))
plt.subplot(2,2,1)      
sns.boxplot(df['price'])
plt.title('Subplot 1')
plt.subplot(2,2,2)    
sns.distplot(df["price"])
plt.title('Subplot 2')

# In[7]:


df = df[df["area"] < 500]  ##1500
df = df[df['price'] < 51000000]  ##51000000

# In[8]:


sns.scatterplot(df["area"],df["price"])

plt.title("after removing outliers")

# In[9]:


plt.figure(figsize=(12, 8))
plt.subplot(2,2,1)      
sns.boxplot(df['price'])
plt.title('Subplot 1')
plt.subplot(2,2,2)    
sns.distplot(df["price"])
plt.title('Subplot 2')


# In[10]:


print( raw_df.type.value_counts()  )

plt.figure(figsize=(12, 6))
sns.countplot(raw_df["type"])

# In[11]:


## making new column to analyze data more througly
df["price per sq yard"] =  df['price'] / df['area'] 
df["price per sq yard"].mean()

# In[12]:


plt.figure(figsize=(12, 8))
plt.subplot(2,2,1)      
sns.boxplot(df['price per sq yard'])
plt.title('Subplot 1')
plt.subplot(2,2,2)    
sns.distplot(df["price per sq yard"])
plt.title('Subplot 2')


# In[13]:



df = df[df['price per sq yard'] < 200000]  

df = df[df['price per sq yard'] > 40000]

df["price per sq yard"] = df["price per sq yard"].astype(float).astype(int)

# In[14]:


plt.figure(figsize=(12, 8))
plt.subplot(2,2,1)      
sns.boxplot(df['price per sq yard'])
plt.title('Subplot 1')
plt.subplot(2,2,2)    
sns.distplot(df["price per sq yard"])
plt.title('Subplot 2')


# In[15]:


df.shape

# In[16]:


df["built in year"].unique()

# In[17]:


df.drop(["built in year"],axis=1,inplace=True)
raw_df[raw_df['type'] == "Flat"]["price"].mean()    ####   {0 : "House", 1 : "Flat", 2 : "Upper Portion", 3: "Lower Portion", 4 : "Pent House", 5 :"Farm House", 6 : "Room"}

## A function that tell you Average saling price of that Type of property
## input type " {1 to 6}" 
## output mean of that type
def Price_byType(x=0):
    a = raw_df[raw_df['type'] == x]["price"].mean() 
    print("Average saling price of ",x, "Type is ",a)
    
Price_byType(1)

for x in raw_df["type"].unique():
    m= df[raw_df['type'] == x]["price"].mean()
    
    print(x , m)## A function that tell you Average saling price in certian location
## input Locaiton
## output mean of that location
def Price_byLocation(x=0):
    a = df[df['location'] == x]["price"].mean() 
    print("Average saling price in ",x, " is ",a)
    
Price_byLocation(0)

def Price_by_LocationAndType(typee=0,location=0):
    p = df[(df['type']==3) & (df['location']==3) ]["price"].mean()
    print("Average price of", typee ,"in", location,"is", p)

Price_by_LocationAndType()
# In[ ]:




# In[18]:


df.corr()

# In[19]:


df.corr()["price"][70:80]    ##nearby  ##other

# In[34]:



fig, ax = plt.subplots(figsize=(24, 18))

hm = sns.heatmap(df.corr(), cbar=True, vmin=-0.5, vmax=0.5,
                 fmt='.2f', annot_kws={'size': 3}, annot=True, 
                 square=True, cmap=plt.cm.Blues)

plt.tight_layout()
plt.savefig("corr_matrix_incl_anno_double.png", dpi=300)

# In[20]:


new_df = df[['area','baths','beds',"bathrooms",'dining room','distance from airport (kms)','drawing room',
             'electricity backup',"flooring","floors",'kids play area','kitchens','lounge or sitting room','study room','waste disposal','price per sq yard','price','Flat', 'House', 'Lower Portion',
       'Penthouse', 'Room', 'Upper Portion','Bahria Town Karachi', 'Cantt', 'Clifton', 'DHA Defence',
       'Federal B Area', 'Gadap Town', 'Gulistan-e-Jauhar',
       'Gulshan-e-Iqbal Town', 'Jamshed Town', 'Malir', 'North Nazimabad',
       'Others', 'Scheme 33']]

# In[21]:


new_df.head(2)

# In[33]:


sns.heatmap(new_df.corr())

# In[36]:



fig, ax = plt.subplots(figsize=(24, 18))

hm = sns.heatmap(new_df.corr(), cbar=True, vmin=-0.5, vmax=0.5,
                 fmt='.2f', annot_kws={'size': 3}, annot=True, 
                 square=True, cmap=plt.cm.Blues)

plt.tight_layout()
plt.savefig("TRAINING DATA CORRELATION.png", dpi=300)

# In[37]:


new_df.corr()['price']

# In[22]:


new_df.to_csv("zameen_karachi_training_data.csv", index=False)

# In[23]:


X = new_df.drop(['price'],axis=1)

y = new_df['price']

# ## DATA TRANSFORMATION

# In[24]:


from sklearn.decomposition import PCA
pca = PCA(n_components=7)
new = pca.fit_transform(X)

# In[25]:


X = pd.DataFrame(data = new
             , columns = ['pca1', 'pca2','pca3', 'pca4','pca5','pca6','pca7'])

# In[26]:


X.head(2)

# ## MODEL BUILDING AND EVALUATION

# ## linear regression

# In[27]:


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

from sklearn.linear_model import LinearRegression
lr = LinearRegression()
lr.fit(X_train,y_train)
pred = lr.predict(X_test)

from sklearn.metrics import mean_squared_error,r2_score
 
print( np.sqrt(   mean_squared_error(y_test,pred) )  )
r2_score( y_test,pred)

# In[28]:


from sklearn.linear_model import Ridge
ridge = Ridge()
ridge.fit(X_train,y_train)
ridge_pred = ridge.predict(X_test)

from sklearn.metrics import mean_squared_error,r2_score
 
print( np.sqrt(   mean_squared_error(y_test,ridge_pred) )  )
r2_score( y_test,ridge_pred)

# ### LASSO 

# In[29]:


from sklearn.linear_model import Lasso
lasso = Lasso()
lasso.fit(X_train,y_train)
lasso_pred = lasso.predict(X_test)

from sklearn.metrics import mean_squared_error,r2_score
 
print( np.sqrt(   mean_squared_error(y_test,lasso_pred) )  )
r2_score( y_test,lasso_pred)

# ### RIDGE

# In[30]:


from sklearn.neighbors import KNeighborsRegressor

knn = KNeighborsRegressor()
knn.fit(X_train,y_train)
knn_pred = knn.predict(X_test)

from sklearn.metrics import mean_squared_error,r2_score
 
print( np.sqrt(   mean_squared_error(y_test,knn_pred) )  )
r2_score( y_test,knn_pred)

# ### DECISION TREE REGRESSOR

# In[31]:


from sklearn.tree import DecisionTreeRegressor

DTR = DecisionTreeRegressor()
DTR.fit(X_train,y_train)
DTR_pred = DTR.predict(X_test)

from sklearn.metrics import mean_squared_error,r2_score
 
print( np.sqrt(   mean_squared_error(y_test,DTR_pred) )  )
r2_score( y_test,DTR_pred)

# ## DECISION TREE REGRESSOR PERFORMED BEST ON OUR DATA

# In[ ]:



