import express, { response } from 'express';
import { setupApp } from './setup-app';

// создание приложения
const app = express();
setupApp(app);

const PORT = process.env.PORT || 5001;

const videos = {
  id: 'integer($int32)',
  title: 'string',
  author: 'string',
  canBeDownloaded: 'boolean',
  default: false,
  minAgeRestriction: 'integer($int32)',
  createdAt: 'string($date-time)',
  publicationDate: toString(),
};

export enum AvailableResolutionsEnum {
  P144 = 'P144',
  P240 = 'P240',
  P360 = 'P360',
  P480 = 'P480',
  P720 = 'P720',
  P1080 = 'P1080',
  P1440 = 'P1440',
  P2160 = 'P2160',
}

export type VideoInputType = {
  title: string;
  author: string;
  availableResolutions: AvailableResolutionsEnum[];
};

export type Video = {
  id: number;
  title: string;
  author: string;
  availableResolutions: AvailableResolutionsEnum[];
  minAgeRestriction: number | null;
  canBeDownloaded: boolean;
  createdAt: Date;
  publicationDate: Date;
};

type DBType = {
  videos: Video[];
};

export const db: DBType = {
  videos: [],
};

app.get('/videos', (_req, res) => {
  res.send(videos).status(200);
});

app.get('/videos/:id', (req, res) => {
  const video = db.videos.find((video) => video.id === +req.params.id);

  if (videos.id !== req.params.id) {
    res.send("video for passed id does't exist").send(404);
    return;
  }
  res.status(200).send(video);
});

app.post('/videos', (req, res) => {
  if (typeof req.body.title !== 'string' || req.body.title.trim() === '') {
    res.status(400).send('Title is required');
    return;
  }
  if (typeof req.body.author !== 'string' || req.body.author.trim() === '') {
    res.status(400).send('Author is required');
    return;
  }
  if (req.body.avaibleResolutions.trim() === '') {
    res.status(400).send('Atleast one avaible resolution must be provided');
    return;
  }
  const newVideo: Video = {
    id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: req.body.canBeDownloaded,
    minAgeRestriction: req.body.minAgeRestriction,
    createdAt: new Date(),
    publicationDate: new Date(),
    availableResolutions: [AvailableResolutionsEnum.P144],
  };
  db.videos.push(newVideo);
});

app.put('/videos/:id', (req, res) => {
  const errorsMessages: { message: string; field: string }[] = [];
  try {
    if (typeof req.body.title !== 'string' || req.body.title.trim() === '') {
      errorsMessages.push({
        message: 'Title is required and must be a non-empty string',
        field: 'title',
      });
      res.status(400);
      return;
    }
    if (typeof req.body.author !== 'string' || req.body.author.trim() === '') {
      errorsMessages.push({
        message: 'Author is required and must be a non-empty string',
        field: 'author',
      });
      res.status(400);
      return;
    }
    if (req.body.avaibleResolutions.trim() === '') {
      errorsMessages.push({
        message:
          'Avaibleresolutions is required and must be a non-empty string',
        field: 'AvaibleResolutions',
      });
      res.status(400);
      return;
    }
    res.status(404).send('Video not found');
  } catch (e) {
    db.videos.find((video) => video.id === +req.params.id);
    res.status(204).send('No content');
    return;
  }
});

app.delete('/videos/:id', (req, res) => {
  if (req.params.id !== req.params.id) {
    res.send("video for passed id doesn't exist").send(404);
    return;
  }
  res.status(204).send('Video deleted');
});

app.delete('/testing/all-data', (_req, res) => {
  db.videos = [];
  res.status(200).send('all videos deleted successfully.');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
