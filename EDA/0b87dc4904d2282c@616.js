import define1 from "./26670360aa6f343b@226.js";
import define2 from "./a2166040e5fb39a6@229.js";

function _1(md){return(
md`## **CS 6220 Data Mining Techniques — Final Project**

Part: Exploratory Data Analysis (EDA): Including correlation heatmaps, scatter plots, and geospatial visualizations.`
)}

function _4(md){return(
md`### **Introduction and Dataset Selection**

For the **Final Project**, we selected a dataset from the **NOAA Daily Global Historical Climatology Network**, which contains daily U.S. weather measurements for the year **2017**. The dataset has been pre-processed to remove weather stations with sparse data. Each column represents different meteorological variables, with descriptions provided in the accompanying data file.

Through this exploration, I aim to answer compelling questions about **temperature trends, extreme weather events, and relationships between different meteorological variables**—all while deepening our understanding of the climate in places that have shaped my experiences.`
)}

function _5(md){return(
md`### Analysis Questions
#### 1. How does temperature, precipitation, wind speed, snowfall vary across all states over time in 2017? Are there any seasonal patterns or unexpected anomalies?`
)}

function _6(md){return(
md`We pre-processed the dataset using Pandas to ensure data consistency and quality before conducting our analysis. The preprocessing involved handling missing values, converting date formats, and filtering out incomplete or duplicate records.

  - Removed missing values in critical fields such as date, geographic information (state, latitude, longitude, elevation), and key weather metrics (TMIN, TMAX, TAVG, AWND, WSF5, PRCP).
  - Converted dates from YYYYMMDD format to YYYY-MM-DD to facilitate time-based analysis.
  - Eliminated duplicate records based on station and date to ensure data integrity.
  - Filtered out stations with sparse measurements, retaining only those with sufficient data coverage for meaningful insights.
    
The pre-processed data located in https://github.com/QingyuanWan/CS6220WeatherAnalysis/blob/main/data_pre_processing.ipynb
`
)}

function _weather(FileAttachment){return(
FileAttachment("cleaned_weather@4.csv").csv()
)}

function _8(printTable,weather){return(
printTable(weather.slice(0, 10))
)}

function _weatherForPlotMonth(weather){return(
weather.map(d => ({
  ...d,
  month: d.date.slice(0, 7)
}))
)}

function _10(md){return(
md`Before answering my core research questions, I begin with an exploratory analysis of the dataset. The goal of this step is to roughly identify patterns, trends, and anomalies in the weather data for states over the course of 2017.`
)}

function _11(md){return(
md`We visualized all relevant weather variable to capture the relationships between different climate factors, and plotted a scatter matrix where each variable (temperature, precipitation, wind speed, snowfall, etc.) is compared against others. This could helps identify potential correlations, outliers, and state-specific trends.`
)}

function _12(vl,weather)
{
  const brush = vl.selectInterval()
    .resolve('global'); // resolve all selections to a single global instance
  
  const legend = vl.selectPoint()
    .fields('Cylinders')
    .bind('legend'); // bind to interactions with the color legend
  
  const brushAndLegend = vl.and(brush, legend);

  const chart = vl.markCircle()
    .data(weather)
    .params(brush, legend)
    .encode(
      vl.x().fieldQ(vl.repeat("column")),
      vl.y().fieldQ(vl.repeat("row")),
      vl.color().if(brushAndLegend, vl.fieldN('state')).value('grey'),
      vl.opacity().if(brush, vl.value(0.8)).value(0.1),
      vl.tooltip(["state", "TAVG", "SNOW", "WSF5", "PRCP", "AWND"])
    )
    .width(140)
    .height(140)
    .repeat({
      column: ["TAVG", "SNOW", "WSF5", "PRCP", "AWND"],
      row: ["AWND", "PRCP", "WSF5", "SNOW", "TAVG"]
    })
  const finalChart = chart.title('Climate Correlations Across all States in the US: Temperature, Precipitation, Wind, and Snowfall Patterns').render()
  return finalChart
}


function _13(md){return(
md`#### Time Series (Line Charts by Month)`
)}

function _14(md){return(
md`I aggregated data by month and state to track trends over 2017:

Monthly Temperature (mean, max, min)

Findings:
  - All states warm up from winter to summer, peaking around July/August.
  - AK sees significant temperature drops in winter, down to 15°F or below.
  - The average temperature in GU remains high year-round.
`
)}

function _15(vl,weatherForPlotMonth)
{
const tempType = vl.param("tempType")
  .value("TAVG")
  .bind(vl.menu(["TAVG", "TMAX", "TMIN"]));

return vl
  .layer(
    vl.markLine(),
    vl.markCircle({ size: 50 })
  )
  .data(weatherForPlotMonth)
  .params(tempType)
  .transform(
    vl.calculate("parseFloat(datum.TAVG)").as("TAVG"),
    vl.calculate("parseFloat(datum.TMAX)").as("TMAX"),
    vl.calculate("parseFloat(datum.TMIN)").as("TMIN"),
    vl.aggregate([
      { op: "mean", field: "TAVG", as: "mean_TAVG" },
      { op: "mean", field: "TMAX", as: "mean_TMAX" },
      { op: "mean", field: "TMIN", as: "mean_TMIN" },
    ]).groupby(["month", "state"]),
    vl.fold(["mean_TAVG", "mean_TMAX", "mean_TMIN"]).as(["tempKey", "tempValue"]),
    vl.filter("datum.tempKey == 'mean_' + tempType")
  )
  .encode(
    vl.x().fieldT("month").title("Month"),
    vl.y()
      .fieldQ("tempValue")
      .axis({
        title: {
          expr: `
            tempType == "TAVG" ? "Average Temperature (°F)" :
            tempType == "TMAX" ? "Maximum Temperature (°F)" :
                                 "Minimum Temperature (°F)"
          `
        }
      }),
    vl.color().fieldN("state").title("State"),
    vl.tooltip([
      vl.fieldT("month"),
      vl.fieldN("state"),
      vl.fieldQ("tempValue"),
      vl.fieldN("tempKey")  // tempKey => "mean_TAVG" / "mean_TMAX" / "mean_TMIN"
    ])
  )
   .title("Monthly Temperature in all States（Max, Min, Avg)")
  .width(800)
  .height(400)
  .render();


}


function _16(md){return(
md`Monthly Precipitation

Findings:
  - We can see TX got maximum 26 inches precipitation cause TX expericnce storm Cindy(https://www.weather.gov/mob/cindy)
  - (Click \`max_PRCP\`)`
)}

function _17(vl,weatherForPlotMonth)
{
  
const statType = vl.param()
  .name("statType")
  .value("mean_PRCP")
  .bind(vl.menu(["mean_PRCP", "max_PRCP", "min_PRCP"]));

return vl
  .layer(
    vl.markLine(),
    vl.markCircle({ size: 50 })
  )
  .data(weatherForPlotMonth)
  .params(statType)
  .transform(
    vl.calculate("parseFloat(datum.PRCP)").as("PRCP"),
    vl.aggregate([
      { op: "mean", field: "PRCP", as: "mean_PRCP" },
      { op: "max",  field: "PRCP", as: "max_PRCP" },
      { op: "min",  field: "PRCP", as: "min_PRCP" }
    ]).groupby(["month", "state"]),
    vl.fold(["mean_PRCP","max_PRCP","min_PRCP"]).as(["aggType","aggValue"]),
    vl.filter("datum.aggType == statType")
  )
  .encode(
    vl.x().fieldT("month").title("Month"),
    vl.y().fieldQ("aggValue").axis({
    title: {
      expr: `
        statType == "mean_PRCP" ? "Average Precipitation (inch)" :
        statType == "max_PRCP"  ? "Maximum Precipitation (inch)" :
                             "Minimum Precipitation (inch)"
      `
    }
  }),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldT("month"),
      vl.fieldN("state"),
      vl.fieldQ("aggValue"),
      vl.fieldN("aggType")
    ])
  )
  .title("Mean / Max / Min Monthly Precipitation for all States")
  .width(800)
  .height(400)
  .render();

}


function _18(md){return(
md`Monthly Wind Speed

Findings:
  - Notable spikes in wind speed appear in TX (spring/summer storms https://www.weather.gov/mob/cindy).
  - AK and FL can also see higher wind during hurricane months.`
)}

function _19(vl,weatherForPlotMonth)
{
  // dyncmic convert "mean_AWND"、"max_AWND"、"min_AWND"
  const statType = vl.param()
    .name("statType")
    .value("mean_AWND")  // initial value
    .bind(vl.menu(["mean_AWND", "max_AWND", "min_AWND"]));

  return vl
    .layer(
      vl.markLine(),
      vl.markCircle({ size: 50 })
    )
    .data(weatherForPlotMonth)
    .params(statType)
    .transform(
      vl.calculate("parseFloat(datum.AWND)").as("AWND"),
      vl.aggregate([
        { op: "mean", field: "AWND", as: "mean_AWND" },
        { op: "max",  field: "AWND", as: "max_AWND" },
        { op: "min",  field: "AWND", as: "min_AWND" }
      ]).groupby(["month","state"]),
      // fold to (aggType, aggValue)
      vl.fold(["mean_AWND", "max_AWND", "min_AWND"]).as(["aggType","aggValue"]),
      // according to statType（"mean_AWND" / "max_AWND" / "min_AWND"）to filter data
      vl.filter("datum.aggType == statType")
    )
    .encode(
      vl.x().fieldT("month").title("Month"),
      vl.y().fieldQ("aggValue").axis({
        // Dynmic title
        title: {
          expr: `
            statType == "mean_AWND" ? "Average Daily Wind Speed (mph)" :
            statType == "max_AWND"  ? "Maximum Daily Wind Speed (mph)" :
                                      "Minimum Daily Wind Speed (mph)"
          `
        }
      }),
      vl.color().fieldN("state").title("State"),
      vl.tooltip([
        vl.fieldT("month"),
        vl.fieldN("state"),
        vl.fieldN("aggType"),
        vl.fieldQ("aggValue")
      ])
    )
    .title("Mean / Max / Min Monthly Wind Speed for all States")
    .width(800)
    .height(400)
    .render();
}


function _20(md){return(
md`Monthly Snowfall

Findings:
  - Substantial snowfall largely restricted to ME from roughly Janurary to March.
  - NY experienced a snowstorm between February and March.`
)}

function _21(vl,weatherForPlotMonth)
{
  const statType = vl.param()
    .name("statType")
    .value("mean_SNOW")
    .bind(vl.menu(["mean_SNOW", "max_SNOW", "min_SNOW"]));

  return vl
    .layer(
      vl.markLine(),
      vl.markCircle({ size: 50 })
    )
    .data(weatherForPlotMonth)
    .params(statType)
    .transform(
      vl.calculate("parseFloat(datum.SNOW)").as("SNOW"),
      vl.aggregate([
        { op: "mean", field: "SNOW", as: "mean_SNOW" },
        { op: "max",  field: "SNOW", as: "max_SNOW" },
        { op: "min",  field: "SNOW", as: "min_SNOW" },
      ]).groupby(["month", "state"]),
      vl.fold(["mean_SNOW", "max_SNOW", "min_SNOW"]).as(["aggType","aggValue"]),
      vl.filter("datum.aggType == statType")
    )
    .encode(
      vl.x().fieldT("month").title("Month"),
      vl.y().fieldQ("aggValue").axis({
        title: {
          expr: `
            statType == "mean_SNOW" ? "Average Snowfall (inch)" :
            statType == "max_SNOW"  ? "Maximum Snowfall (inch)" :
                                      "Minimum Snowfall (inch)"
          `
        }
      }),
      vl.color().fieldN("state").title("State"),
      vl.tooltip(["month","state","aggType","aggValue"])
    )
    .title("Mean / Max / Min Monthly Snow for all States")
    .width(800)
    .height(400)
    .render();
}


function _22(vl,weather){return(
vl.markBoxplot()
  .data(weather)
  .encode(
    vl.x().fieldN("state"),
    vl.y().fieldQ("TAVG"),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldN("state"),
      vl.fieldQ("TAVG")
    ])
  )
  .title('Boxplot of Average Temperature (TAVG) in all States')
  .width(800)
  .height(400)
  .render()
)}

function _23(vl,weather){return(
vl.markBoxplot()
  .data(weather)
  .encode(
    vl.x().fieldN("state"),
    vl.y().fieldQ("PRCP"),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldN("state"),
      vl.fieldQ("PRCP")
    ])
  )
  .title('Boxplot of Daily Precipitation (PRCP) in all States')
  .width(800)
  .height(400)
  .render()
)}

function _24(vl,weather){return(
vl.markBoxplot()
  .data(weather)
  .encode(
    vl.x().fieldN("state"),
    vl.y().fieldQ("AWND"),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldN("state"),
      vl.fieldQ("AWND")
    ])
  )
  .title("Boxplot of Daily Wind Speed (AWND) in all States")
  .width(800)
  .height(400)
  .render()
)}

function _25(vl,weather){return(
vl.markBoxplot()
  .data(weather)
  .encode(
    vl.x().fieldN("state"),
    vl.y().fieldQ("SNOW"),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldN("state"),
      vl.fieldQ("SNOW")
    ])
  )
  .title('Boxplot of Snowfall (SNOW) in all States')
  .width(800)
  .height(400)
  .render()
)}

function _26(md){return(
md`#### Scatter Plots and Correlations
TAVG vs. PRCP
Observations: 
  - No strong negative or positive correlation emerges—heavy rain occurs across a wide temperature range.
Implication:
 - Precipitation in these states may be more influenced by storms or regional weather patterns rather than strictly temperature.`
)}

function _27(vl,weather){return(
vl.markPoint()
  .data(weather)
  .encode(
    vl.x().fieldQ("PRCP").title("Precipitation (inches)"),
    vl.y().fieldQ("TAVG").title("Average Temperature (°F)"),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldN("state"),
      vl.fieldQ("PRCP"),
      vl.fieldQ("TAVG")
    ])
  )
  .title('Scatter Plot of Average Temperature (°F) vs. Precipitation (inches) in all States')
  .width(800)
  .height(400)
  .render()
)}

function _28(md){return(
md`TAVG vs. AWND

Observations:
  - Generally, wind speeds cluster around 0–20 mph, but some outliers appear at lower temperatures, hinting at cold fronts or winter storms.
    
Conclusion:
 - Wind speed does not have a simple linear relationship with temperature, but extremes can be tied to specific meteorological events.`
)}

function _29(vl,weather){return(
vl.markPoint()
  .data(weather)
  .encode(
    vl.x().fieldQ("AWND").title("Wind Speed (mph)"),
    vl.y().fieldQ("TAVG").title("Average Temperature (°F)"),
    vl.color().fieldN("state"),
    vl.tooltip([
      vl.fieldN("state"),
      vl.fieldQ("AWND"),
      vl.fieldQ("TAVG")
    ])
  )
  .title('Scatter Plot of Average Temperature (°F) vs. Wind Speed (mph) in all States')
  .width(800)
  .height(400)
  .render()
)}

function _states(weather){return(
Array.from(new Set(weather.map(d => d.state))).sort()
)}

function _31(md){return(
md`#### Geographic Scatter (Longitude vs. Latitude, Colored by TAVG)`
)}

function _32(md){return(
md`Observations:
  - Warmer colors cluster in the south, cooler in the north.
    
Conclusion:
  - A spatial view quickly highlights the latitudinal temperature gradient and helps identify which stations are in warmer or colder zones.`
)}

function _33(vl,weather)
{
  return vl.markCircle({ size: 60, opacity: 0.7 })
        .data(weather)
          .transform(
          vl.aggregate([{ op: "mean", field: "TAVG", as: "mean_TAVG" }]).groupby(["station","state","latitude","longitude"])
        )
        .params( vl.selectInterval().bind('scales')) 
        .encode(
          vl.x().fieldQ("longitude").title("Longitude"),
          vl.y().fieldQ("latitude").title("Latitude"),
          vl.color().fieldQ("mean_TAVG").title("Temperature (°F)").scale({ scheme: "viridis" }),
          vl.tooltip(["state", "station", "mean_TAVG", "latitude", "longitude"])
        )
        .title('Map of Stations Colored by Average Temperature (°F) in all States')
        .width(800)
        .height(400)
        .render();
}


function _34(vl,weatherForPlotMonth){return(
vl.markBar()
  .data(weatherForPlotMonth)
  .transform(
    vl.aggregate([{ op: "mean", field: "PRCP", as: "avg_PRCP" }]).groupby(["month", "state"])
  )
  .encode(
    vl.x().fieldO("month").title("Month"),
    vl.y().fieldQ("avg_PRCP").title("Average Precipitation (in)"),
    vl.color().fieldN("state"),
    vl.tooltip(["state", "month", "avg_PRCP"])
  )
  .title('Monthly Average Precipitation (inches) by State (Stacked Bar)')
  .width(800)
  .height(400)
  .render()
)}

function _35(vl,weatherForPlotMonth){return(
vl.markBar()
  .data(weatherForPlotMonth)
  .transform(
    vl.aggregate([{ op: "mean", field: "AWND", as: "avg_AWND" }]).groupby(["month", "state"])
  )
  .encode(
    vl.x().fieldO("month").title("Month"),
    vl.y().fieldQ("avg_AWND").title("Average Wind Speed (mph)"),
    vl.color().fieldN("state"),
    vl.tooltip(["state", "month", "avg_AWND"])
  )
  .title('Monthly Average Wind Speed (mph) by State (Stacked Bar)')
  .width(800)
  .height(400)
  .render()
)}

function _36(vl,weather)
{
  const maxTempPlot = vl.markBar()
  .data(weather)
  .transform(
    vl.aggregate([{ op: "max", field: "TMAX", as: "max_TMAX" }]).groupby(["station", "state"])
  )
  .encode(
    vl.x().fieldN("station").title(null).axis(null).sort(vl.fieldN("state")),
    vl.y().fieldQ("max_TMAX").title("Max Temperature (°F)") .scale({ domain: ['-20', '100']}),
    vl.color().fieldN("state"),
    vl.tooltip(["station", "state", "max_TMAX"])
  )
    .title('Maximum and Minimum Temperatures (°F) by Station in all States')
  .width(800)
  .height(200);

const minTempPlot = vl.markBar()
  .data(weather)
  .transform(
    vl.aggregate([{ op: "min", field: "TMIN", as: "min_TMIN" }]).groupby(["station", "state"])
  )
  .encode(
    vl.x().fieldN("station").title("Station").axis(null).sort(vl.fieldN("state")),
    vl.y().fieldQ("min_TMIN").title("Min Temperature (°F)") .scale({ domain: ['-20', '100'] }),
    vl.color().fieldN("state"),
    vl.tooltip(["station", "state", "min_TMIN"])
  )
  .width(800)
  .height(200);

return vl.vconcat(maxTempPlot, minTempPlot)
  .spacing(10)
  .render();

}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cleaned_weather@4.csv", {url: new URL("./files/10132e7fcd569eaa4e161b4e44c74e9934ed8fe42f30ff8e20adbfa422b6997d3bf57f5fe352cea3815b8dc0ac868aacc9a6f9245d9b145880745605f7faec2b.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("printTable", child2);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("weather")).define("weather", ["FileAttachment"], _weather);
  main.variable(observer()).define(["printTable","weather"], _8);
  main.variable(observer("weatherForPlotMonth")).define("weatherForPlotMonth", ["weather"], _weatherForPlotMonth);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["vl","weather"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["vl","weatherForPlotMonth"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["vl","weatherForPlotMonth"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["vl","weatherForPlotMonth"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["vl","weatherForPlotMonth"], _21);
  main.variable(observer()).define(["vl","weather"], _22);
  main.variable(observer()).define(["vl","weather"], _23);
  main.variable(observer()).define(["vl","weather"], _24);
  main.variable(observer()).define(["vl","weather"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["vl","weather"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["vl","weather"], _29);
  main.variable(observer("states")).define("states", ["weather"], _states);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["vl","weather"], _33);
  main.variable(observer()).define(["vl","weatherForPlotMonth"], _34);
  main.variable(observer()).define(["vl","weatherForPlotMonth"], _35);
  main.variable(observer()).define(["vl","weather"], _36);
  return main;
}
