import { create } from "zustand";

export type Person = {
  id: string;
  name: string;
  jobTitle: string;
  status: "active" | "offline" | "away";
  email: string;
  phone: string;
  tags: string[];
  address: string;
  avatar: string;
};

export type Document = {
  id: string;
  name: string;
  size: string;
  author: string;
  authorAvatar: string;
  uploadedAt: string;
  icon: string;
};

export type ChartDataPoint = {
  month: string;
  newLeads: number;
  replied: number;
};

export type StatCard = {
  id: string;
  titleKey: string;
  value: string;
  icon: string;
};

interface DashboardState {
  people: Person[];
  documents: Document[];
  chartData: ChartDataPoint[];
  stats: StatCard[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setPeople: (people: Person[]) => void;
  setDocuments: (documents: Document[]) => void;
  setChartData: (chartData: ChartDataPoint[]) => void;
  setStats: (stats: StatCard[]) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Fetch methods
  fetchPeople: () => Promise<void>;
  fetchDocuments: () => Promise<void>;
  fetchChartData: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAll: () => Promise<void>;

  getFilteredPeople: () => Person[];
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  people: [],
  documents: [],
  chartData: [],
  stats: [],
  searchQuery: "",
  isLoading: false,
  error: null,

  setPeople: (people) => set({ people }),
  setDocuments: (documents) => set({ documents }),
  setChartData: (chartData) => set({ chartData }),
  setStats: (stats) => set({ stats }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  fetchPeople: async () => {
    try {
      const locale = window.location.pathname.split('/')[1] || 'en';
      const response = await fetch(`/${locale}/api/people`);
      if (!response.ok) throw new Error('Failed to fetch people');
      const data = await response.json();
      set({ people: data });
    } catch (error) {
      console.error('Error fetching people:', error);
      set({ error: 'Failed to load people' });
    }
  },

  fetchDocuments: async () => {
    try {
      const locale = window.location.pathname.split('/')[1] || 'en';
      const response = await fetch(`/${locale}/api/documents`);
      if (!response.ok) throw new Error('Failed to fetch documents');
      const data = await response.json();
      set({ documents: data });
    } catch (error) {
      console.error('Error fetching documents:', error);
      set({ error: 'Failed to load documents' });
    }
  },

  fetchChartData: async () => {
    try {
      const locale = window.location.pathname.split('/')[1] || 'en';
      const response = await fetch(`/${locale}/api/chart-data?year=2025`);
      if (!response.ok) throw new Error('Failed to fetch chart data');
      const data = await response.json();
      set({ chartData: data });
    } catch (error) {
      console.error('Error fetching chart data:', error);
      set({ error: 'Failed to load chart data' });
    }
  },

  fetchStats: async () => {
    try {
      const locale = window.location.pathname.split('/')[1] || 'en';
      const response = await fetch(`/${locale}/api/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      set({ stats: data });
    } catch (error) {
      console.error('Error fetching stats:', error);
      set({ error: 'Failed to load stats' });
    }
  },

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        get().fetchPeople(),
        get().fetchDocuments(),
        get().fetchChartData(),
        get().fetchStats(),
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      set({ error: 'Failed to load dashboard data' });
    } finally {
      set({ isLoading: false });
    }
  },

  getFilteredPeople: () => {
    const { people, searchQuery } = get();
    if (!searchQuery) return people;
    const query = searchQuery.toLowerCase();
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.email.toLowerCase().includes(query) ||
        person.jobTitle.toLowerCase().includes(query) ||
        person.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  },
}));
