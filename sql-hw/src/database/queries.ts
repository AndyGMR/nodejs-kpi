import Database from './database';

export default class Queries {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getUsersWithChannels(): Promise<any[]> {
    const query = `
      SELECT users.id, users.name, users.avatar_url, channels.photo_url, channels.description, channels.created_at
      FROM Users
      JOIN Channels ON Users.id = Channels.user_id
      ORDER BY channels.created_at DESC;
    `;

    return this.database.query(query);
  }

  async getTopLikedVideos(): Promise<any[]> {
    const query = `
      SELECT videos.title, videos.description, COUNT(likes.video_id)
      FROM videos
      JOIN likes ON videos.id = likes.video_id
      WHERE likes.positive = TRUE
      GROUP BY videos.id
      ORDER BY COUNT(likes.video_id) DESC
      LIMIT 5;
    `;

    return this.database.query(query);
  }

  async getVideosFromUserSubscription(userName: string): Promise<any[]> {
    const query = `
      SELECT videos.id, videos.title, videos.preview_url, videos.duration, videos.published_at
      FROM videos
      JOIN channels ON videos.channel_id = channels.id
      JOIN users ON channels.user_id = users.id
      WHERE users.name = $1
      ORDER BY videos.published_at DESC;
    `;

    return this.database.query(query, [userName]);
  }

  async getChannelSubscribers(channelId: string): Promise<any[]> {
    const query = `
      SELECT channels.id, channels.user_id, channels.description, channels.photo_url, channels.created_at,
      (SELECT COUNT(*) FROM subscriptions WHERE subscriptions.channel_id = channels.id) AS amount_of_subscribers
      FROM channels
      WHERE channels.id = $1;
    `;

    return this.database.query(query, [channelId]);
  }

  async getTopRatedVideos(): Promise<any[]> {
    const query = `
      SELECT v.title, COUNT(l.video_id) AS total_ratings
      FROM videos v
      JOIN likes l ON v.id = l.video_id
      WHERE v.published_at >= '2021-09-01' AND l.positive = TRUE
      GROUP BY v.id
      HAVING COUNT(l.video_id) > 4
      ORDER BY total_ratings DESC
      LIMIT 10;
    `;

    return this.database.query(query);
  }

  async getUserSubscriptions(userName: string): Promise<any[]> {
    const query = `
      SELECT users.name, users.avatar_url, channels.photo_url, channels.description, 
      subscriptions.level, subscriptions.subscribed_at
      FROM users
      JOIN channels ON users.id = channels.user_id
      JOIN subscriptions ON users.id = subscriptions.user_id
      WHERE users.name = $1
      ORDER BY
      CASE subscriptions.level
        WHEN 'vip' THEN 1
        WHEN 'follower' THEN 2
        WHEN 'fan' THEN 3
        WHEN 'standard' THEN 4
      END, subscriptions.subscribed_at DESC;
    `;
    return this.database.query(query, [userName]);
  }
}
