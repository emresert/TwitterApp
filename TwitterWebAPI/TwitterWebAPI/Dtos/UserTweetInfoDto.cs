using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Dtos
{
    public class UserTweetInfoDto
    {
        public int tweetId { get; set; }
        public string tweetContent { get; set; }
        public DateTime tweetDate { get; set; }
        public int userId { get; set; }
        public string userName { get; set; }
        public string userSurname { get; set; }
        public string loginName { get; set; }
        public string userImageUrl { get; set; }

    }
}
