const moment = require('moment');

const initialState = {
  posts: [],
  postsStatus: '',
  repos: [],
  reposStatus: '',
  tweets: [],
  tweetsStatus: '',
  videos: [],
  videosStatus: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_GITHUB_REPOS_DONE': {
      const repos = action.repos.map((item) => {
        const formattedRepo = { ...item };
        formattedRepo.date = moment(item.pushed_at).valueOf();
        formattedRepo.dateContext = 'Code updated';
        formattedRepo.source = 'github';
        formattedRepo.title = item.name.replace(/-/g, ' ');
        if (formattedRepo.title.indexOf('js') > -1) {
          formattedRepo.title = formattedRepo.title.replace(' js', '.js');
        }
        formattedRepo.code = item.html_url;
        return formattedRepo;
      });
      return {
        ...state,
        repos,
        reposStatus: 'done',
      };
    }
    case 'GET_GITHUB_REPOS_PENDING':
      return {
        ...state,
        reposStatus: 'searching',
      };
    case 'GET_MEDIUM_POSTS_DONE': {
      const posts = action.posts.map((item) => {
        const formattedPost = { ...item };
        formattedPost.date = item.firstPublishedAt;
        formattedPost.dateContext = 'Blogged';
        formattedPost.description = item.virtuals.snippet;
        formattedPost.source = 'medium';
        formattedPost.homepage = `https://medium.com/@pnowelldesign/${item.uniqueSlug}`;
        return formattedPost;
      });
      return {
        ...state,
        posts,
        postsStatus: 'done',
      };
    }
    case 'GET_MEDIUM_POSTS_PENDING':
      return {
        ...state,
        postsStatus: 'searching',
      };
    case 'GET_TWITTER_TWEETS_DONE': {
      const tweets = action.tweets.map((item) => {
        const formattedTweet = { ...item };
        formattedTweet.date = moment(new Date(item.created_at)).valueOf();
        formattedTweet.dateContext = 'Tweeted';
        formattedTweet.description = item.text;
        if (item.entities.media) {
          formattedTweet.image = item.entities.media[0].media_url;
        }
        formattedTweet.popularity = item.retweet_count * 2 + item.favorite_count;
        formattedTweet.source = 'twitter';
        formattedTweet.homepage = `https://twitter.com/seejamescode/status/${item.id_str}`;
        return formattedTweet;
      }).filter((tweet) => !tweet.retweeted);
      return {
        ...state,
        tweets,
        tweetsStatus: 'done',
      };
    }
    case 'GET_TWITTER_TWEETS_PENDING':
      return {
        ...state,
        tweetsStatus: 'searching',
      };
    case 'GET_VIMEO_VIDEOS_DONE': {
      let videos = action.videos.data.map((item) => {
        let formattedVideo = {};
        formattedVideo = { ...item };
        formattedVideo.date = moment(new Date(item.created_time)).valueOf();
        formattedVideo.dateContext = 'Video posted';
        if (!formattedVideo.description) {
          formattedVideo.description = '';
        }
        formattedVideo.id = item.uri.substring(item.uri.indexOf('videos/') + 7);
        if (formattedVideo.id.match(/\D/) !== null) {
          formattedVideo.id = formattedVideo.id.substring(0, formattedVideo.id.match(/\D/).index);
        }
        formattedVideo.id = Number(formattedVideo.id);
        formattedVideo.source = 'vimeo';
        formattedVideo.title = item.name;
        formattedVideo.homepage = item.link;
        return formattedVideo;
      });
      videos = videos.filter(item => item.privacy.view === 'anybody');

      return {
        ...state,
        videos,
        videosStatus: 'done',
      };
    }
    case 'GET_VIMEO_VIDEOS_PENDING':
      return {
        ...state,
        videosStatus: 'searching',
      };
    default:
      return state;
  }
}
