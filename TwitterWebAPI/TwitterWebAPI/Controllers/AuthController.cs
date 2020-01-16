using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TwitterWebAPI.Data;
using TwitterWebAPI.Dtos;
using TwitterWebAPI.Helpers;
using TwitterWebAPI.Models;

namespace TwitterWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository;
        IConfiguration _configuration;

        private IOptions<CloudinarySettings> _cloudinaryConfig;
        Cloudinary _cloudinary;

        public AuthController(IAuthRepository authRepository,IConfiguration configuration, IOptions<CloudinarySettings> cloudinarySettings)
        {
            _authRepository = authRepository;
            _configuration =  configuration;
            _cloudinaryConfig = cloudinarySettings;
           
            Account account = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiSecret, _cloudinaryConfig.Value.ApiKey);
            _cloudinary = new Cloudinary(account);
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

            var userToCreate = new User();
            userToCreate.userName = userForRegisterDto.userName;
            userToCreate.userSurname = userForRegisterDto.userSurname;
            userToCreate.password = userForRegisterDto.password;
            userToCreate.loginName = userForRegisterDto.userLoginName;
            userToCreate.email = userForRegisterDto.email;
            

            var file = userForRegisterDto.file;
            var uploadResult = new ImageUploadResult();


            if (file.Length > 0) // dosya varsa
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                    userToCreate.imageUrl = uploadResult.Uri.ToString();
                };
            }
            else
            {
                userToCreate.imageUrl = "..\\src\\assets\\img\\ppDefault.jpg";
            }

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