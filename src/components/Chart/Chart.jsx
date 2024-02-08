import { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { data } from "./db";
import "./Chat.scss";

export function Chart() {
  const [chartData, setChartData] = useState(data);
  const [range, setRange] = useState(400);
  const [country, setCountry] = useState(data[0].country);
  const [dimension, setDimension] = useState("litres");

  useEffect(() => {
    am4core.useTheme(am4themes_animated.default);
    am4core.useTheme(am4themes_kelly.default);

    const chart = am4core.create("chartdiv", am4charts.XYChart3D);

    chart.data = chartData;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.title.text = "Countries";

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Litres sold (M)";

    const series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "litres";
    series.dataFields.categoryX = "country";
    series.name = "Sales";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.columns.template.events.on("hit", function (ev) {
      setRange(ev.target.dataItem.dataContext.litres);
      setCountry(ev.target.dataItem.categoryX);
      setDimension("litres");
    });

    const series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "units";
    series2.dataFields.categoryX = "country";
    series2.name = "Units";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.columns.template.events.on("hit", function (ev) {
      setRange(ev.target.dataItem.dataContext.units);
      setCountry(ev.target.dataItem.categoryX);

      setDimension("units");
    });

    chart.cursor = new am4charts.XYCursor();

    return () => {
      chart.dispose();
    };
  }, [chartData]);

  const handleRangeChange = ({ target: { value } }) => {
    setRange(value);
    setTimeout(() => {
      setChartData((prev) =>
        prev.map((item) =>
          item.country === country ? { ...item, [dimension]: value } : item
        )
      );
    }, 300);
  };
  console.log({ country });
  console.log({ dimension });

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      <div>{country}</div>
      <div>
        <input
          type="range"
          min="0"
          max="1000"
          step="1"
          className="progress"
          onChange={handleRangeChange}
          value={range}
        />
        <span>{range}</span>
      </div>
    </div>
  );
}
