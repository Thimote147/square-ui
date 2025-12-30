export type StatCard = {
  id: string;
  titleKey: string;
  value: string;
  icon: string;
};

export const mockStats: StatCard[] = [
  {
    id: "1",
    titleKey: "stats.totalClients",
    value: "67",
    icon: "users",
  },
  {
    id: "2",
    titleKey: "stats.activeProjects",
    value: "12",
    icon: "clipboard",
  },
  {
    id: "3",
    titleKey: "stats.weeklyRevenue",
    value: "$4,571",
    icon: "wallet",
  },
  {
    id: "4",
    titleKey: "stats.sentInvoices",
    value: "32",
    icon: "invoice",
  },
];

