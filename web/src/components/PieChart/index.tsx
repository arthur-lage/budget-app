import { PieChart as ReactPieChart } from "react-minimal-pie-chart";

type PieChartProps = {
  incomes: number;
  expenses: number;
};

export function PieChart({ incomes, expenses }: PieChartProps) {
  return (
    <ReactPieChart
      style={{
        width: 200,
        height: 200,
      }}
      animate
      animationEasing="ease"
      animationDuration={1000}
      labelPosition={50}
      labelStyle={{
        fontSize: "12px",
        fontFamily: "sans-serif",
      }}
      //@ts-ignore
      label={(data) => `${Math.round(data.dataEntry.percentage)} %`}
      data={[
        {
          title: "Incomes",
          value: incomes,
          color: "#11D94D",
        },
        {
          title: "Expense",
          value: expenses,
          color: "#D91133",
        },
      ]}
    />
  );
}
