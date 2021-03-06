﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TwitterWebAPI.Data;
using TwitterWebAPI.Dtos;
using TwitterWebAPI.Models;

namespace TwitterWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    // Yukarıdaki çalışmazsa alt kısımdakini yaz. .Net Core farklılıkları
    //[Produces("application/json")]
    //[Route("api/Tweets")]

    public class TweetsController : Controller //ControllerBase 
    {
        //Repository enjekte edilir.
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public TweetsController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        //  api/Tweets 
        public ActionResult GetTweets()
        {
            // Repositorydeki metodu çağırıp  dto için mapping yaptık.
            // Çünkü kullanıcının bazı alanları görmemesi gerekir.
            var tweets = _appRepository.GetTweets().ToList();

            List<UserTweetInfoDto> _listOfuti = new List<UserTweetInfoDto>();
            foreach (var tweet  in tweets)
            {
                var user = _appRepository.GetUser(tweet.userIdFk);
                UserTweetInfoDto _uti = new UserTweetInfoDto() { 
                userId = user.userId,
                loginName = user.loginName,
                userName = user.userName,
                userSurname = user.userSurname,
                userImageUrl = user.imageUrl,
                tweetContent = tweet.tweetContent,
                tweetDate = tweet.tweetDate,
                tweetId = tweet.tweetId
                };

                _listOfuti.Add(_uti);
            }

           
            
            return Ok(_listOfuti);
        }
        // api/Tweets/detail/id
        [HttpGet]
        [Route("detail")]
        public ActionResult GetTweet(int id)
        {

            var tweet = _appRepository.GetSelectedTweet(id);

            return Ok(tweet);
        }
        // api/Tweets/detail/id
        [HttpGet]
        [Route("mytweets")]
        public ActionResult GetTweetofUser(int id)
        {

            var myTweet = _appRepository.GetTweetsOfUser(id);

            return Ok(myTweet);
        }
        // api/Tweets/tweetInfo/?uid=(userId)&tid=(tweetId)
        [HttpGet]
        [Route("tweetInfo")]
        public ActionResult GetTweetAndUserInfo(int uid, int tid)
        {
            var user = _appRepository.GetUser(uid);
            var tweet = _appRepository.GetSelectedTweet(tid);
            UserTweetInfoDto _utInfo = new UserTweetInfoDto()
            {
                userId = user.userId,
                loginName = user.loginName,
                userName = user.userName,
                userSurname = user.userSurname,
                userImageUrl = user.imageUrl,
                tweetId = tweet.tweetId,
                tweetContent = tweet.tweetContent,
                tweetDate = tweet.tweetDate
            };

            return Ok(_utInfo);
        }

        // api/Tweets/add 
        [HttpPost]
        [Route("add")] 
        public ActionResult AddTweet([FromBody]tweetForAddDto _tweetForAddDto)
        {
            //Patterndeki metodlara entity gönderdik
            Tweet tweet = new Tweet();
            tweet.tweetDate = DateTime.Now;
            tweet.tweetContent = _tweetForAddDto.tweetContent;
            tweet.userIdFk = _tweetForAddDto.userIdFk;

            _appRepository.Add(tweet);
            _appRepository.SaveAll();
            return Ok(tweet);
        }


   
    }
}