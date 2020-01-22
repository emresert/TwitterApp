using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Dtos
{
    public class tweetForAddDto
    {

        public string tweetContent { get; set; }
        public int userIdFk { get; set; }
    }
}
