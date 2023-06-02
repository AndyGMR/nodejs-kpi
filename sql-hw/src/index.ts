import Database from './database/database';
import Queries from './database/queries';

async function executeQueries(): Promise<void> {
  const db = new Database();
  const queryExecutor = new Queries(db);

  try {
    const usersWithChannels = await queryExecutor.getUsersWithChannels();
    console.log('List of all users with their channels:', usersWithChannels);

    const topLikedVideos = await queryExecutor.getTopLikedVideos();
    console.log('Data for the top 5 most liked videos:', topLikedVideos);

    const videosFromUserSubscription = await queryExecutor.getVideosFromUserSubscription('Stephanie Bulger');
    console.log('List of videos taken from subscriptions of user Stephanie Bulger:', videosFromUserSubscription);

    const channelSubscribers = await queryExecutor.getChannelSubscribers('79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76');
    console.log('Data for the channel with ID "79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76" and its subscriber count:', channelSubscribers);

    const topRatedVideos = await queryExecutor.getTopRatedVideos();
    console.log('List of the top 10 highest-rated videos (positive/negative ratings from the "likes" table) starting from September 2021, among videos with more than 4 positive ratings:', topRatedVideos);

    const userSubscriptions = await queryExecutor.getUserSubscriptions('Ennis Haestier');
    console.log('List of data taken from subscriptions of user Ennis Haestier:', userSubscriptions);
  } catch (error) {
    console.error('Error executing queries:', error);
  } finally {
    db.close();
  }
}

executeQueries();
