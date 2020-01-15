using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterWebAPI.Models;

namespace TwitterWebAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        private TwitterAPIContext _context;
        public AuthRepository(TwitterAPIContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string userLoginName, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.loginName == userLoginName);

            if (user==null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password,user.passwordHash,user.passwordSalt))
            {
                return null;
            }

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] userPasswordHash, byte[] userPasswordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(userPasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userPasswordHash[i])
                    {
                        return false;
                    }
                }
                return true;


            }
        }

        public async Task<User> Register(User user, string password)
        {
           
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt);
            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;

            await  _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string userLoginName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.loginName == userLoginName);
            if (user != null)
            {
                return true;
            }
            return false;
        }
    }
}
