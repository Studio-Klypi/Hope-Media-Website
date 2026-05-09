export interface DashboardState {
  stats: {
    views: number;
    messages: number;
    testimonials: {
      new: number;
      public: number;
    };
  };
  graph: any;
  loading: {
    stats: boolean;
    graph: boolean;
  };
}

export const defaults: DashboardState = {
  stats: {
    views: -1,
    messages: -1,
    testimonials: {
      new: -1,
      public: -1,
    },
  },
  graph: null,
  loading: {
    stats: false,
    graph: false,
  },
};
