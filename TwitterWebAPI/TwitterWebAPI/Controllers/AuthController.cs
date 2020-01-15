using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TwitterWebAPI.Data;
using TwitterWebAPI.Dtos;
using TwitterWebAPI.Models;

namespace TwitterWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository;
        IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository,IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration =  configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            if (await _authRepository.UserExists(userForRegisterDto.userLoginName))
            {
                ModelState.AddModelError("UserLoginName", "User Login Name entered already exists");
                
            }
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userToCreate = new User()
            {
                userName = userForRegisterDto.userName,
                userSurname = userForRegisterDto.userSurname,
                password = userForRegisterDto.password,
                loginName = userForRegisterDto.userLoginName,
                email = userForRegisterDto.email,
                imageUrl = userForRegisterDto.imageUrl
            };

            var createdUser = await _authRepository.Register(userToCreate, userForRegisterDto.password);

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login ([FromBody] UserForLoginDto userForLoginDto)
        {
            var user = await _authRepository.Login(userForLoginDto.userLoginName,userForLoginDto.password);
            if (user==null)
            {
                return Unauthorized();
            }

            var tokenHandLer = new JwtSecurityTokenHandler();
            // appsettings de tanımladığımız token key'e ulaşmamız gerekir.
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier,user.userId.ToString()),
                new Claim(ClaimTypes.Name,user.loginName)
                }),
                // Token süresi belirleme. Örn 1 gün.
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandLer.CreateToken(tokenDescriptor);
            var tokenString = tokenHandLer.WriteToken(token);

            return Ok(tokenString);

        }


    }
}