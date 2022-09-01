import { PieChart as ReactPieChart } from "react-minimal-pie-chart";

type PieChartProps = {
  incomes: number;
  expenses: number;
  incomesTotal: number;
  expensesTotal: number;
};

export function PieChart({
  incomes,
  expenses,
  incomesTotal,
  expensesTotal,
}: PieChartProps) {
  return (
    <div>
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
      <div className="information">
        <div className="incomes">
          <div
            className="square"
            style={{
              width: 20,
              height: 20,
              background: "#11D94D",
              marginRight: 15,
            }}
          ></div>
          <span>Incomes: {incomesTotal}</span>
        </div>
        <div className="expenses">
          <div
            className="square"
            style={{
              width: 20,
              height: 20,
              background: "#D91133",
              marginRight: 15,
            }}
          ></div>
          <span>Expenses: {expensesTotal}</span>
        </div>
      </div>
    </div>
  );
}
