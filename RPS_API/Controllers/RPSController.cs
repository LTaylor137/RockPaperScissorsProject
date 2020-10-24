using System;
using Microsoft.AspNetCore.Mvc;
using RPS_API.Models;

namespace RPS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResultController : ControllerBase
    {
        [HttpPost]
        public GameResult GetResult(PlayRequest _postInput)
        {
            GameResult GR = new GameResult(_postInput.PlayerChoice);
            return GR;
        }

    }

}
