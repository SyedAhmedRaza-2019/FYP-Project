from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
# our home page view


@api_view(['GET'])
def home(request):
    if request.method == 'GET':
        return JsonResponse("Hello World!", safe=False)


# custom method for generating predictions
def getPredictions(toPass):
    import pickle
    model = pickle.load(open("model2.sav", "rb"))
    scaled = pickle.load(open("scaler2.sav", "rb"))

    # example = [55, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 81163,
    #            1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    # print(toPass)

    prediction = model.predict(scaled.transform(
        [toPass]))
    return prediction[0]


@api_view(['POST'])
def result(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        toPass = [int(data["area"]), int(data["baths"]), int(data["beds"]), int(data["bathrooms"]), int(data["diningRoom"]), int(data["distanceFromAirport"]), int(data["drawingRoom"]), int(data["electricityBackup"]), int(data["flooring"]), int(data["floors"]), int(data["kidsPlayArea"]), int(data["kitchens"]), int(data["loungeOrSittingRoom"]), int(data["studyRoom"]), int(data["wasteDisposal"]), int(data["pricePerSqYard"]), int(data["flat"]), int(
            data["house"]), int(data["lowerPortion"]), int(data["penthouse"]), int(data["room"]), int(data["upperPortion"]), int(data["bahriaTownKarachi"]), int(data["cantt"]), int(data["clifton"]), int(data["dhaDefence"]), int(data["federalBArea"]), int(data["gadapTown"]), int(data["gulistanEJauhar"]), int(data["gulshanEIqbalTown"]), int(data["jamshedTown"]), int(data["malir"]), int(data["northNazimabad"]), int(data["others"]), int(data["scheme33"])]
        result = getPredictions(toPass)
        return JsonResponse({'result': result}, safe=False)
