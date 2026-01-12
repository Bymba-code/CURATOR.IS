// Top featured editors showcase data

export interface TopEditor {
  id: string;
  name: string;
  role: string;
  bio: string;
  profileImage?: string;
  specialties: string[];
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    awardsWon?: number;
  };
  socialLinks: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    portfolio?: string;
  };
  featuredVideos: {
    title: string;
    thumbnail?: string;
    videoUrl: string;
    views?: string;
  }[];
  achievements: string[];
}

export const topEditors: TopEditor[] = [
  {
    id: "1",
    name: "Battulga Munkhbat",
    role: "Cinematic Editor",
    bio: "Award-winning editor specializing in cinematic storytelling and color grading. Known for emotional narratives that captivate audiences.",
    specialties: ["Cinematic Storytelling", "Color Grading", "Sound Design"],
    stats: {
      projectsCompleted: 150,
      yearsExperience: 5,
      awardsWon: 3,
    },
    socialLinks: {
      instagram: "https://instagram.com/battulga.edits",
      youtube: "https://youtube.com/@battulga",
      portfolio: "https://battulga.portfolio.com",
    },
    featuredVideos: [
      {
        title: "Mongolian Landscapes - Cinematic Short",
        videoUrl: "https://youtube.com/watch?v=example1",
        views: "50K",
      },
      {
        title: "Urban Stories - Documentary Edit",
        videoUrl: "https://youtube.com/watch?v=example2",
        views: "32K",
      },
    ],
    achievements: [
      "Championship Winner 2024",
      "Best Color Grading Award",
      "Featured in Adobe Showcase",
    ],
  },
  {
    id: "2",
    name: "Saruul Erdene",
    role: "Social Media Specialist",
    bio: "Master of viral content. Creates high-energy edits that dominate TikTok and Instagram with millions of views.",
    specialties: ["Viral Content", "Social Media Reels", "Trend Adaptation"],
    stats: {
      projectsCompleted: 280,
      yearsExperience: 3,
      awardsWon: 2,
    },
    socialLinks: {
      instagram: "https://instagram.com/saruul.edits",
      tiktok: "https://tiktok.com/@saruul",
      youtube: "https://youtube.com/@saruul",
    },
    featuredVideos: [
      {
        title: "Dance Transition Pack",
        videoUrl: "https://youtube.com/watch?v=example3",
        views: "120K",
      },
      {
        title: "Product Launch Reel",
        videoUrl: "https://youtube.com/watch?v=example4",
        views: "85K",
      },
    ],
    achievements: [
      "1M+ Total Views",
      "Social Media Category Winner",
      "Brand Partnership with 5+ Companies",
    ],
  },
  {
    id: "3",
    name: "Enkhjin Bold",
    role: "Music Video Editor",
    bio: "Rhythmic precision meets visual artistry. Specializes in music videos and performance edits with perfect beat synchronization.",
    specialties: ["Music Videos", "Beat Sync", "Visual Effects"],
    stats: {
      projectsCompleted: 95,
      yearsExperience: 4,
      awardsWon: 2,
    },
    socialLinks: {
      instagram: "https://instagram.com/enkhjin.cuts",
      youtube: "https://youtube.com/@enkhjin",
    },
    featuredVideos: [
      {
        title: "Hip Hop Performance Edit",
        videoUrl: "https://youtube.com/watch?v=example5",
        views: "45K",
      },
      {
        title: "Electronic Music Visualizer",
        videoUrl: "https://youtube.com/watch?v=example6",
        views: "38K",
      },
    ],
    achievements: [
      "Music Video Category Winner",
      "Collaborated with Top Mongolian Artists",
      "Premiere Pro Expert",
    ],
  },
  {
    id: "4",
    name: "Nandin Tsolmon",
    role: "Commercial Editor",
    bio: "Brand storyteller. Crafts compelling commercial edits that convert viewers into customers with polished, professional results.",
    specialties: ["Commercial Ads", "Brand Stories", "Product Videos"],
    stats: {
      projectsCompleted: 200,
      yearsExperience: 6,
      awardsWon: 4,
    },
    socialLinks: {
      instagram: "https://instagram.com/nandin.pro",
      youtube: "https://youtube.com/@nandin",
      portfolio: "https://nandin.studio",
    },
    featuredVideos: [
      {
        title: "Tech Product Launch",
        videoUrl: "https://youtube.com/watch?v=example7",
        views: "60K",
      },
      {
        title: "Fashion Brand Campaign",
        videoUrl: "https://youtube.com/watch?v=example8",
        views: "52K",
      },
    ],
    achievements: [
      "Worked with 20+ Brands",
      "Commercial Category Winner",
      "Highest Client Satisfaction Rating",
    ],
  },
];
