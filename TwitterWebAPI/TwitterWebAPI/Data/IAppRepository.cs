using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterWebAPI.Models;

namespace TwitterWebAPI.Data
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T : class;
        bool SaveAll();

        List<Tweet> GetTweets();
        List<Tweet> GetTweetsOfUser(int _userId);
        Tweet GetSelectedTweet(int _tweetId);
        User GetUser(int _userId);
        List<User> GetRecommendUsers(int _userId);
      

    }
}
