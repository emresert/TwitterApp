using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterWebAPI.Models;

namespace TwitterWebAPI.Data
{
    public class AppRepository : IAppRepository
    {
        private TwitterAPIContext _context;
        public AppRepository(TwitterAPIContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public List<Tweet> GetSelectedTweet(int id)
        {
            throw new NotImplementedException();
        }

        public List<Tweet> GetTweets()
        {
            var tweets = _context.Tweets.ToList();
            
            return tweets;
        }

        public List<Tweet> GetTweetsOfUser(int userId)
        {
            var tweetsOfUser = _context.Tweets.Where(t => t.userIdFk
            == userId
            ).ToList();

            return tweetsOfUser;
        }

        public User GetUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.userId == userId);
            return user;
        }

    

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public List<User> GetRecommendUsers(int userId)
        {
            var recommendUsers = _context.Users.Where(u => u.userId !=
            userId
            ).ToList();

            return recommendUsers;
        }
    }
}
