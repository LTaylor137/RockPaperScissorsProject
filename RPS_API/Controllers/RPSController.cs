using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RPS_API.models;

namespace RPS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResultController : ControllerBase
    {
        public static PlayRequest R = new PlayRequest();

        //testing player input hardcoded as rock.
        [HttpGet("PlayRock")]
        public string GetPlayRock(string Result)
        {
            return R.PlayRock();
        }

        //sends custom input
        [HttpPost]
        public string GetResult(PlayRequest PostInput)
        {
            R.Input = PostInput.Input;
            return R.GameResult();
        }

    }

}
