import sys
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.linear_model import Ridge
from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import OneHotEncoder

# Read the training data
training_data = pd.read_csv("zameen_karachi_training_data.csv")

# Separate features (X) and target variable (y)
X = training_data.drop(['price'], axis=1)
y = training_data['price']

# Perform one-hot encoding for categorical variables
categorical_cols = ['flooring']
X_encoded = pd.get_dummies(X, columns=categorical_cols)

# Apply PCA for dimensionality reduction
pca = PCA(n_components=7)
X_pca = pca.fit_transform(X_encoded)

# Get feature names after one-hot encoding
feature_names = list(X_encoded.columns)

# Rest of the code remains the same...

# Function to predict price using the trained models
def predict_price(area, baths, beds, bathrooms, dining_room, distance_from_airport, drawing_room, electricity_backup,
                  flooring, floors, kids_play_area, kitchens, lounge_or_sitting_room, study_room, waste_disposal,
                  price_per_sq_yard, flat, house, lower_portion, penthouse, room, upper_portion, bahria_town_karachi,
                  cantt, clifton, dha_defence, federal_b_area, gadap_town, gulistan_e_jauhar, gulshan_e_iqbal_town,
                  jamshed_town, malir, north_nazimabad, others, scheme_33):
    input_data = pd.DataFrame([[area, baths, beds, bathrooms, dining_room, distance_from_airport, drawing_room,
                                electricity_backup, flooring, floors, kids_play_area, kitchens,
                                lounge_or_sitting_room, study_room, waste_disposal, price_per_sq_yard, flat, house,
                                lower_portion, penthouse, room, upper_portion, bahria_town_karachi, cantt, clifton,
                                dha_defence, federal_b_area, gadap_town, gulistan_e_jauhar, gulshan_e_iqbal_town,
                                jamshed_town, malir, north_nazimabad, others, scheme_33]],
                              columns=feature_names)
    input_pca = pca.transform(input_data)
    ridge_pred = ridge.predict(input_pca)
    knn_pred = knn.predict(input_pca)
    dtr_pred = dtr.predict(input_pca)
    return ridge_pred[0], knn_pred[0], dtr_pred[0]
# Get input values from command-line arguments
# area = float(sys.argv[1])
# baths = float(sys.argv[2])
# beds = float(sys.argv[3])
# bathrooms = float(sys.argv[4])
# dining_room = float(sys.argv[5])
# distance_from_airport = float(sys.argv[6])
# drawing_room = float(sys.argv[7])
# electricity_backup = float(sys.argv[8])
# flooring = sys.argv[9]
# floors = float(sys.argv[10])
# kids_play_area = float(sys.argv[11])
# kitchens = float(sys.argv[12])
# lounge_or_sitting_room = float(sys.argv[13])
# study_room = float(sys.argv[14])
# waste_disposal = float(sys.argv[15])
# price_per_sq_yard = float(sys.argv[16])
# flat = float(sys.argv[17])
# house = float(sys.argv[18])
# lower_portion = float(sys.argv[19])
# penthouse = float(sys.argv[20])
# room = float(sys.argv[21])
# upper_portion = float(sys.argv[22])
# bahria_town_karachi = float(sys.argv[23])
# cantt = float(sys.argv[24])
# clifton = float(sys.argv[25])
# dha_defence = float(sys.argv[26])
# federal_b_area = float(sys.argv[27])
# gadap_town = float(sys.argv[28])
# gulistan_e_jauhar = float(sys.argv[29])
# gulshan_e_iqbal_town = float(sys.argv[30])
# jamshed_town = float(sys.argv[31])
# malir = float(sys.argv[32])
# north_nazimabad = float(sys.argv[33])
# others = float(sys.argv[34])
# scheme_33 = float(sys.argv[35])

# # Call the predict_price function with the input values
# ridge_pred, knn_pred, dtr_pred = predict_price(area, baths, beds, bathrooms, dining_room, distance_from_airport,
#                                               drawing_room, electricity_backup, flooring, floors, kids_play_area,
#                                               kitchens, lounge_or_sitting_room, study_room, waste_disposal,
#                                               price_per_sq_yard, flat, house, lower_portion, penthouse, room,
#                                               upper_portion, bahria_town_karachi, cantt, clifton, dha_defence,
#                                               federal_b_area, gadap_town, gulistan_e_jauhar, gulshan_e_iqbal_town,
#                                               jamshed_town, malir, north_nazimabad, others, scheme_33)

# # Print the predicted prices
# print(ridge_pred)
# print(knn_pred)
# print(dtr_pred)



# Define dummy input values
area = 1200
baths = 2
beds = 3
bathrooms = 2
dining_room = 1
distance_from_airport = 10
drawing_room = 1
electricity_backup = 1
flooring = 'marble'
floors = 2
kids_play_area = 0
kitchens = 1
lounge_or_sitting_room = 1
study_room = 0
waste_disposal = 1
price_per_sq_yard = 50000
flat = 1
house = 0
lower_portion = 0
penthouse = 0
room = 0
upper_portion = 0
bahria_town_karachi = 1
cantt = 0
clifton = 0
dha_defence = 0
federal_b_area = 0
gadap_town = 0
gulistan_e_jauhar = 0
gulshan_e_iqbal_town = 0
jamshed_town = 0
malir = 0
north_nazimabad = 0
others = 0
scheme_33 = 0

# Call the predict_price function with the dummy input values
ridge_pred, knn_pred, dtr_pred = predict_price(area, baths, beds, bathrooms, dining_room, distance_from_airport,
                                              drawing_room, electricity_backup, flooring, floors, kids_play_area,
                                              kitchens, lounge_or_sitting_room, study_room, waste_disposal,
                                              price_per_sq_yard, flat, house, lower_portion, penthouse, room,
                                              upper_portion, bahria_town_karachi, cantt, clifton, dha_defence,
                                              federal_b_area, gadap_town, gulistan_e_jauhar, gulshan_e_iqbal_town,
                                              jamshed_town, malir, north_nazimabad, others, scheme_33)

# Print the predicted prices
print(ridge_pred)
print(knn_pred)
print(dtr_pred)
