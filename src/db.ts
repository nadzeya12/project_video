export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: 'Video 1',
      author: 'John Doe',
      canBeDownloaded: false,
      minAgeRestriction: 0,
      createdAt: new Date(),
      publicationDate: new Date(+1).toISOString(),
      avaibleResolutions: [],
    },
    {
      id: 2,
      title: 'Video 2',
      author: 'Michael Dark',
      canBeDownloaded: true,
      minAgeRestriction: 6,
      createdAt: new Date().toISOString(),
      publicationDate: new Date(+1),
      avaibleResolutions: [],
    },
    {
      id: 3,
      title: 'Video 3',
      author: 'Michael Dark',
      canBeDownloaded: true,
      minAgeRestriction: 12,
      createdAt: new Date(),
      publicationDate: new Date().toString(),
      avaibleResolutions: [],
    },
  ],
};
