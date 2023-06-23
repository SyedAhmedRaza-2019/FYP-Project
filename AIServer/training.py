import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
import pickle
import os

# Load the data from the CSV file
data = pd.read_csv("K:/property rent system/AIServer/trainingData.csv")


# Split the data into features and target variable
X = data.drop(columns=["price"])
y = data["price"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Evaluate the model
train_score = model.score(X_train_scaled, y_train)
test_score = model.score(X_test_scaled, y_test)
print("Training score:", train_score)
print("Testing score:", test_score)

# Specify the directory path
directory = "K:/property rent system/AIServer/"

# Specify the file paths for saving the files
model_path = os.path.join(directory, "model2.sav")
scaler_path = os.path.join(directory, "scaler2.sav")

# Save the trained model and scaler
pickle.dump(model, open(model_path, "wb"))
pickle.dump(scaler, open(scaler_path, "wb"))
