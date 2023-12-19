import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAnalytics } from "../../../../../../actions/getAnalytics";
import DataCard from "./_components/dataCard";
import Chart from "../../dashboard/_components/chart";

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
      </div>
      <Chart data={data}/>
    </div>
  );
};

export default AnalyticsPage;
