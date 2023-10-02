import React, { useState } from "react";
import { Tabs, Table, Space, Tag, Progress } from "antd";
import type { TabsProps } from "antd";
import NoContent from "./NoContent";
import { CompanyData, OpportunityData, Opportunity } from "./app.interface";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { TotalData, calculateColumnTotals } from "./utils";
const { TabPane } = Tabs;

interface dt {
  companyName: String;
  opportunity: [
    {
      opportunityName: String;
      active: [
        {
          month: "january" | "febuary" | "march" | "may";
          applied: Number;
          recommended: Number;
          interview: Number;
          offer: Number;
          hired: Number;
        }
      ];
      disqualified: [
        {
          month: "january" | "febuary" | "march" | "may";
          applied: Number;
          recommended: Number;
          interview: Number;
          offer: Number;
          hired: Number;
        }
      ];
    }
  ];
}

const Overview: React.FC = () => {
  Chart.register(...registerables);
  function generateCompanyDataList(count: number): CompanyData[] {
    const companyDataArray: CompanyData[] = [];

    for (let i = 1; i <= count; i++) {
      const companyName = `Company ${i}`;
      const opportunities: Opportunity[] = [];

      for (let j = 1; j <= 3; j++) {
        const opportunityName = `Opportunity ${j}`;
        const active: OpportunityData[] = [];
        const disqualified: OpportunityData[] = [];

        // Generate data for months
        const months: ("January" | "February" | "March" | "April" | "May")[] = [
          "January",
          "February",
          "March",
          "April",
          "May",
        ];
        months.forEach((month) => {
          active.push({
            month,
            applied: Math.floor(Math.random() * 100),
            recommended: Math.floor(Math.random() * 70),
            interview: Math.floor(Math.random() * 50),
            offer: Math.floor(Math.random() * 30),
            hired: Math.floor(Math.random() * 20),
          });

          disqualified.push({
            month,
            applied: Math.floor(Math.random() * 20),
            recommended: Math.floor(Math.random() * 5),
            interview: Math.floor(Math.random() * 2),
            offer: Math.floor(Math.random() * 1),
            hired: Math.floor(Math.random() * 1),
          });
        });

        opportunities.push({
          opportunityName,
          active,
          disqualified,
        });
      }

      companyDataArray.push({
        companyName,
        opportunity: opportunities,
      });
    }

    return companyDataArray;
  }

  const columns = [
    {
      title: "Opportunity Name",
      dataIndex: "opportunityName",
      key: "opportunityName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Applied",
      dataIndex: "applied",
      key: "applied",
    },
    {
      title: "Recommended",
      dataIndex: "recommended",
      key: "recommended",
    },
    {
      title: "Interview",
      dataIndex: "interview",
      key: "interview",
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
    },
    {
      title: "Hired",
      dataIndex: "hired",
      key: "hired",
    },
  ];
  const generatedData: CompanyData[] = generateCompanyDataList(2);

  console.log(generatedData);

  const transformedData = generateCompanyDataList(2).map((company) => ({
    companyName: company.companyName,
    opportunityData: company.opportunity.map((opportunity) => ({
      opportunityName: opportunity.opportunityName,
      status: "Active",
      applied: opportunity.active.reduce((acc, curr) => acc + curr.applied, 0),
      recommended: opportunity.active.reduce(
        (acc, curr) => acc + curr.recommended,
        0
      ),
      interview: opportunity.active.reduce(
        (acc, curr) => acc + curr.interview,
        0
      ),
      offer: opportunity.active.reduce((acc, curr) => acc + curr.offer, 0),
      hired: opportunity.active.reduce((acc, curr) => acc + curr.hired, 0),
    })),
  }));

  const [filter, setFilter] = useState("applied");

  const activeData = generatedData.map((company) => {
    return company.opportunity[0].active.reduce(
      (acc, item) => acc + Number(item[filter as keyof OpportunityData]),
      0
    );
  });

  const disqualifiedData = generatedData.map((company) => {
    return company.opportunity[0].disqualified.reduce(
      (acc, item) => acc + Number(item[filter as keyof OpportunityData]),
      0
    );
  });

  const months = generatedData[0].opportunity[0].active.map(
    (item) => item.month
  );

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Active",
        data: months.map((month) =>
          generatedData
            .map((company) => {
              const data = company.opportunity[0].active.find(
                (item) => item.month.toLowerCase() === month.toLowerCase()
              );
              return data ? Number(data[filter as keyof OpportunityData]) : 0;
            })
            .reduce((acc, item) => acc + item, 0)
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,

        pointStyle: "circle",
        pointRadius: 12,
      },
      {
        label: "Disqualified",
        data: months.map((month) =>
          generatedData
            .map((company) => {
              const data = company.opportunity[0].disqualified.find(
                (item) => item.month.toLowerCase() === month.toLowerCase()
              );
              return data ? Number(data[filter as keyof OpportunityData]) : 0;
            })
            .reduce((acc, item) => acc + item, 0)
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        pointStyle: "circle",
        pointRadius: 12,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: false, // Hide the default legend
    },
  };
  const active: TotalData = calculateColumnTotals(generatedData, "active");
  const disqualified: TotalData = calculateColumnTotals(generatedData, "disqualified");
  const smallTable = [
    {
      key: "applied",
      column: "Applied",
      active: active.applied,
      disqualified: disqualified.applied,
    },
    {
      key: "recommended",
      column: "Recommended",
      active: active.recommended,
      disqualified: disqualified.recommended,
    },
    {
      key: "interview",
      column: "Interview",
      active: active.interview,
      disqualified: disqualified.interview,
    },
    {
      key: "offer",
      column: "Offer",
      active: active.offer,
      disqualified: disqualified.offer,
    },
    {
      key: "hired",
      column: "Hired",
      active: active.hired,
      disqualified: disqualified.hired,
    },
  ];

  const smallColumns = [
    {
      title: "Column",
      dataIndex: "column",
      key: "column",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Disqualified",
      dataIndex: "disqualified",
      key: "disqualified",
    },
  ];

  return (
    <div className="w-full h-full overflow-scroll bg-[#F9FAFF]">
      <div className="text-red-500">working in progress</div>
      <div className="m-5 flex gap-7">
        <div className="flex-[3]">
          <div className="flex gap-5 my-3">
            <div className="bg-white flex-1 h-40 flex flex-col justify-between p-5">
              <div className="font-bold text-lg">Applied</div>
              <div className="font-bold text-xl">3,122</div>
              <div>Previous Period</div>
              <div>
                1590{" "}
                <span>
                  <Tag color="magenta">10%</Tag>{" "}
                </span>
              </div>
            </div>
            <div className="bg-white flex-1 h-40 flex flex-col justify-between p-5">
              <div className="font-bold text-lg">Offer</div>
              <div className="font-bold text-xl">2,642</div>
              <div>Previous Period</div>
              <div>
                1590{" "}
                <span>
                  <Tag color="magenta">10%</Tag>{" "}
                </span>
              </div>
            </div>
            <div className="bg-white flex-1 h-40 flex flex-col justify-between p-5">
              <div className="font-bold text-lg">Hired</div>
              <div className="font-bold text-xl">8,373</div>
              <div>Previous Period</div>
              <div>
                1590{" "}
                <span>
                  <Tag color="magenta">10%</Tag>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white my-5 p-5">
            <div className="w-full">
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="applied">Applied</option>
                <option value="recommended">Recommended</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
              </select>
              <Line width={10} height={5} data={chartData} options={options} />
            </div>
          </div>
        </div>
        <div className="flex-[2] my-3 ">
          <div className="flex flex-col h-full gap-7">
            <div className="flex-[3]  bg-white">
              <div className="font-bold text-lg">Total Candidate Flow</div>
              <div className="font-bold text-xl">3,122</div>
              <Progress percent={60} size="small" />

              <div>
              <h2>Total Data</h2>
      <Table pagination={false} columns={smallColumns} dataSource={smallTable} />
              </div>
            </div>
            <div className="flex-[1] ">
              <div className="flex gap-7">
                <div className="bg-white flex-1 h-40 flex flex-col justify-between p-5">
                  <div className="flex justify-between">
                    <div className="font-bold text-base">Recommended</div>
                    <div className="font-bold text-base">1,265</div>
                  </div>
                  <div>Previous Period</div>
                  <div>
                    1590{" "}
                    <span>
                      <Tag color="magenta">10%</Tag>{" "}
                    </span>
                  </div>
                </div>
                <div className="bg-white flex-1 h-40 flex flex-col justify-between p-5">
                  <div className="flex justify-between">
                    <div className="font-bold text-base">Interview</div>
                    <div className="font-bold text-base">422</div>
                  </div>
                  <div>Previous Period</div>
                  <div>
                    1590{" "}
                    <span>
                      <Tag color="magenta">10%</Tag>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <div className="m-5">
        <div></div>
        <div></div>
        <Space direction="vertical" size={30} className="w-full">
          {transformedData.map((company) => (
            <div key={company.companyName} className="w-full">
              <h2>{company.companyName}</h2>
              <Tabs defaultActiveKey="active" tabPosition="top">
                <TabPane tab="Active" key="active">
                  <Table
                    dataSource={company.opportunityData}
                    columns={columns}
                    pagination={false}
                  />
                </TabPane>
                <TabPane tab="Disqualified" key="disqualified">
                  <Table
                    dataSource={company.opportunityData.map((opportunity) => ({
                      ...opportunity,
                      status: "Disqualified",
                    }))}
                    columns={columns}
                    pagination={false}
                  />
                </TabPane>
              </Tabs>
            </div>
          ))}
        </Space>
      </div>
      {/* 
      <Space direction="vertical" size={30}>
        {transformedData.map((company) => (
          <div key={company.companyName}>
            <h2>{company.companyName}</h2>
            <Tabs defaultActiveKey="active" tabPosition="top">
              <TabPane tab="Active" key="active">
                <Table
                  dataSource={company.opportunityData}
                  columns={columns}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Disqualified" key="disqualified">
                <Table
                  dataSource={company.opportunityData.map((opportunity) => ({
                    ...opportunity,
                    status: "Disqualified",
                  }))}
                  columns={columns}
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </div>
        ))}
      </Space> */}
    </div>
  );
};

export default Overview;
