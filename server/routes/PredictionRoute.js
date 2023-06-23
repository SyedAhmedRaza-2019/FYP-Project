import express from "express";
import { execSync } from "child_process";
import { exec } from "child_process";
import path from "path";

const router = express.Router();

// POST route for receiving input data

// Hardcoded input values for testing
const inputValues = {
  area: 1200,
  baths: 2,
  beds: 3,
  bathrooms: 2,
  dining_room: 1,
  distance_from_airport: 10,
  drawing_room: 1,
  electricity_backup: 1,
  flooring: "marble",
  floors: 2,
  kids_play_area: 0,
  kitchens: 1,
  lounge_or_sitting_room: 1,
  study_room: 0,
  waste_disposal: 1,
  price_per_sq_yard: 50000,
  flat: 1,
  house: 0,
  lower_portion: 0,
  penthouse: 0,
  room: 0,
  upper_portion: 0,
  bahria_town_karachi: 1,
  cantt: 0,
  clifton: 0,
  dha_defence: 0,
  federal_b_area: 0,
  gadap_town: 0,
  gulistan_e_jauhar: 0,
  gulshan_e_iqbal_town: 0,
  jamshed_town: 0,
  malir: 0,
  north_nazimabad: 0,
  others: 0,
  scheme_33: 0,
};

router.post("/predict-price", (req, res) => {
  // Extract input data from the request body
  const inputData = inputValues;
  //   const inputData = req.body;

  // Convert input values to an argument string
  const args = Object.entries(inputData).map(
    ([key, value]) => `--${key}=${value}`
  );

  const pythonScript = "K:/property rent system/server/AI_Algorithm/script.py"; // Update the script path with the correct absolute path

  console.log(pythonScript); // Print the script path for debugging purposes
  //   const result = execSync(`python ${pythonScript}`).toString();

  // Configure Python script path

  // Construct the command to execute the Python script
  const command = `python "K:/property rent system/server/AI_Algorithm/script.py" ${args.join(
    " "
  )}`;
  //   const command = `python ${pythonScript} ${args.join(" ")}`;

  // Call the Python script and handle the predicted prices
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const [ridgePred, knnPred, dtrPred] = stdout.split("\n");

      // Prepare the predicted prices response
      const predictedPrices = {
        ridge_regression: parseFloat(ridgePred),
        k_nearest_neighbors: parseFloat(knnPred),
        decision_tree: parseFloat(dtrPred),
      };

      // Send the predicted prices as a JSON response
      res.json(predictedPrices);
    }
  });
});

export default router;
