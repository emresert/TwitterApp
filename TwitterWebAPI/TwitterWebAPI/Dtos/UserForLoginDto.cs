using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Dtos
{
    public class UserForLoginDto
    {
        public string userLoginName { get; set; }
        public string password { get; set; }
    }
}
