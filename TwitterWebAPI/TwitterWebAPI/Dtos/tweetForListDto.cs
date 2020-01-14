using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Dtos
{
    public class tweetForListDto
    {
        public int tweetId { get; set; }
        public string tweetContent { get; set; }
        public DateTime tweetDate { get; set; }
        public int userIdFk { get; set; }
    }
}
