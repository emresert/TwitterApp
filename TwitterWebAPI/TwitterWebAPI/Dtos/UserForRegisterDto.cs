using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterWebAPI.Dtos
{
    public class UserForRegisterDto
    {
        public string userLoginName { get; set; }
        public string password { get; set; }

        public string userName { get; set; }

        public string userSurname { get; set; }

        public string email { get; set; }

        public IFormFile file { get; set; }
        public string imageUrl { get; set; }
    }
}
