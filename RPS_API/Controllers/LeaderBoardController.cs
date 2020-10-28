using System;
using Microsoft.AspNetCore.Mvc;
using RPS_API.Models;

namespace RPS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LeaderBoardController : ControllerBase
    {
        [HttpPost]
        public ShowLeaderBoard ShowLeaderBoard(UsernameRequest _unInput)
        {
            ShowLeaderBoard LB = new ShowLeaderBoard(_unInput.Username);
            return LB;
        }

    }

}
