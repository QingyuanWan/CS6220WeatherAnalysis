# CS6220 Final Project – NOAA Weather Analysis

## Table of Contents
1. [Overview](#overview)
2. [Data Description](#data-description)
3. [Challenges](#challenges)
4. [Objectives & Strategies](#objectives--strategies)
5. [Final Deliverables](#final-deliverables)
6. [Resources](#resources)
7. [Team Members](#team-members)
8. [Project Structure](#project-structure)
9. [Branching Strategy](#branching-strategy)
10. [Commit and Pull Request Guidelines](#commit-and-pull-request-guidelines)
11. [Collaboration Workflow](#collaboration-workflow)

---

## Overview
**Date:** February 27, 2025

For this final project in **CS6220 (Data Mining)**, we will analyze the 2017 NOAA weather dataset obtained from the National Oceanic and Atmospheric Administration (NOAA). The dataset contains meteorological records from multiple weather stations across the United States, including temperature (TMIN, TMAX, TAVG), wind speed (AWND, WSF5), precipitation (PRCP), snowfall (SNOW), and elevation.

Unlike traditional time-series datasets, this one does not have consistent daily records, making it unsuitable for typical time-series forecasting. Instead, we will focus on pattern discovery, classification, and regression-based prediction to gain insights into weather conditions across the U.S.

---

## Data Description
The dataset consists of **416,937 weather observations** from various locations in the U.S. throughout 2017. Key features include:

- **Geographic Information**  
  - `station`: Weather station ID  
  - `state`: U.S. State  
  - `latitude`: Latitude  
  - `longitude`: Longitude  
  - `elevation`: Elevation in meters

- **Temporal Information**  
  - `date`: Date of observation  

- **Weather Attributes**  
  - `TMIN`: Minimum temperature (°F)  
  - `TMAX`: Maximum temperature (°F)  
  - `TAVG`: Average temperature (°F)  
  - `AWND`: Average wind speed (m/s)  
  - `WSF5`: Fastest 5-second wind speed (m/s)  
  - `WDF5`: Direction of the fastest 5-second wind  
  - `SNOW`: Snowfall (mm)  
  - `SNWD`: Snow depth (mm)  
  - `PRCP`: Precipitation (mm)  

**Note:** TAVG, AWND, SNOW, and PRCP have significant missing data. Observations are also irregular (not daily), so time-series forecasting is not our primary approach.

---

## Challenges
1. **Missing Data**: Certain columns (e.g., TAVG, AWND, SNOW, PRCP) have significant missing values.  
2. **Irregular Time Intervals**: Records do not appear daily or uniformly, complicating typical time-series methods.

---

## Objectives & Strategies
Since the data is not suitable for classic time-series forecasting, we will focus on **pattern classification**, **clustering**, and **regression-based** predictions:

1. **Weather Pattern Classification (Clustering Analysis)**  
   - **Objective**: Identify distinct weather patterns (e.g., “Hot and Dry,” “Cold and Snowy,” “Windy”).  
   - **Method**: K-Means clustering, PCA (dimensionality reduction).

2. **Extreme Weather Event Detection (Classification Analysis)**  
   - **Objective**: Detect extreme conditions (e.g., heavy snow, storms, high winds).  
   - **Method**: Logistic Regression, Random Forest Classification.

3. **Predicting Maximum Temperature (Regression Analysis)**  
   - **Objective**: Predict TMAX using geographic and weather features.  
   - **Features**: latitude, longitude, elevation, TMIN, AWND, WSF5.  
   - **Models**: Random Forest Regression, XGBoost.  
   - **Metrics**: Mean Squared Error (MSE), R² Score.

4. **Regional Weather Comparisons**  
   - **Objective**: Compare weather conditions across different states and visualize climate differences.  
   - **Method**: PCA for dimensionality reduction, geospatial plots for region-to-region comparison.

---

## Final Deliverables
1. **Preprocessed Dataset**: Cleaned data with missing values addressed.  
2. **Exploratory Data Analysis (EDA)**: Including correlation heatmaps, scatter plots, and geospatial visualizations.  
3. **Machine Learning Models**:  
   - Classification models for identifying extreme weather events.  
   - Regression models to predict maximum temperature.  
   - Evaluation with appropriate metrics (accuracy, F1-score, MSE, etc.).  
4. **Final Report**:  
   - Methodology, results, findings.  
   - Future work or recommendations.

---

## Resources
- [NOAA (National Oceanic and Atmospheric Administration)- Data Resources](https://www.noaa.gov/tools-and-resources/weather-and-climate-resources#historic)  
- [2017 NOAA Dataset (Google Drive link)- Raw Weather Data](https://drive.google.com/file/d/1DUwwByuGdUM6nytw07rQt4wZD03Q6-TD/view?usp=sharing)
- [2017 NOAA Dataset (Google Drive link)- Pre-Processed Weather Data](https://drive.google.com/file/d/1OvQS9qZYTcEHge3dkNamkyewrgq1Em1K/view?usp=sharing)
---

## Team Members
- **Guoyi Zhang**  
- **Hanru Chen**  
- **Qingyaun Wan**  

---

## Project Structure


---

## Branching Strategy
We are using a **feature-branch workflow**, ensuring that `main` (or `master`) remains stable:

1. Create new branches for features or fixes (e.g., `readme_update`, `feature-clustering`, `fix-missing-data`).
2. Commit and push changes on that branch.
3. Open a Pull Request (PR) into `main`.
4. After review and checks, merge the PR.

---

## Commit and Pull Request Guidelines
1. **Small, Frequent Commits**: Commit after completing a logical chunk of work.
2. **Descriptive Commit Messages**: “Fix missing data handling in TMIN column” rather than “Fix stuff.”
3. **PR Reviews**:  
   - At least one teammate reviews before merging.  
   - Address comments promptly.  
4. **Conflict Resolution**: If merge conflicts appear, rebase or merge the latest `main` into your branch, always preferring to keep stable changes.

---

## Collaboration Workflow

### 1. Clone the Repository
```bash
git clone https://github.com/QingyuanWan/CS6220WeatherAnalysis.git
cd CS6220WeatherAnalysis
```

### 2. Create a Feature Branch
```bash
git checkout -b readme_update
```

### 3. Commit and Push Your Changes
```bash
git add .
git commit -m "Update README with new proposal info"
git push origin readme_update
```

### 4. Create a Pull Request (PR)
Go to your GitHub repo’s **Pull Requests** tab.  
Compare your `readme_update` branch to the `main` branch.  
Add a descriptive title and request reviews from teammates.

### 5. Merge Changes
Once the PR is approved and checks pass, merge the PR to `main`.

Pull the latest changes to your local `main`:
```bash
git checkout main
git pull origin main
```

---

## Constructive feedback for the project proposal from the TA Manikantan Srinivasan @Mar 13 at 12:14pm

Great work on putting together a well-structured and comprehensive project proposal! Your approach to analyzing the 2017 NOAA weather dataset using a variety of data mining techniques is impressive. The objectives you have outlined, including weather pattern classification, extreme weather event detection, temperature prediction, and regional comparisons, show a strong understanding of how to extract valuable insights from an irregular meteorological dataset. I really like how you are balancing both unsupervised and supervised learning approaches with K-Means and PCA for clustering, Logistic Regression and Random Forest for extreme weather classification, and Random Forest and XGBoost for regression tasks. It is also great to see that you are tackling missing data issues and using geospatial visualizations to compare regional weather trends. The deliverables are well-defined, making it clear how you plan to execute your analysis.

If you are looking to take the project even further, you could consider adding some feature engineering, like calculating temperature anomalies or wind chill factors, to enrich the dataset. Exploring ensemble methods or even deep learning models like LSTMs could also be interesting for temperature forecasting, though your current approach is already strong. Given the irregular time intervals, a sensitivity analysis on how different temporal aggregation methods, such as weekly or monthly summaries, affect results might provide additional insights. You could also do an ablation study to see which features contribute the most to model performance. But honestly, the project is already in great shape. Overall, fantastic job, this is a well-thought-out and promising analysis, and I am excited to see how it turns out!