using System;
using Microsoft.AspNetCore.Mvc;
using RPS_API.Models;
using System.Collections.Generic;
using System.Linq;

namespace RPS_API.Controllers
{
    [ApiController]
    [Route("Api")]
    public class ResultController : ControllerBase
    {
        public static List<User> ListOfPlayers = new List<User>();
        public List<User> ListUnsorted = new List<User>();
        public GameCodeRequest GameCode = new GameCodeRequest();

        [HttpPost("GetResult")]
        public GameResult PlayRequest(PlayRequest model)
        {
            GameResult GR = new GameResult(model.Username, model.PlayerChoice);
            bool nameexists = false;

            // check if user exists in list
            foreach (User item in ListOfPlayers)
            {
                if (item.Username.Contains(model.Username))
                {
                    nameexists = true;
                    break;
                }
            }

            // if user exists, +1 to turns played and wins (if winner)
            if (nameexists == true)
            {
                foreach (User item in ListOfPlayers)
                {
                    if (item.Username.Contains(model.Username))
                    {
                        if (GR.RoundResult == "Player Wins")
                        {
                            item.Wins++;
                        }
                        item.TurnsPlayed++;
                    }
                }
            }

            //if user doesn't exist, create a new user, then , +1 to turns played and wins (if winner)
            if (nameexists == false)
            {
                int newplayerwin = 0;
                if (GR.RoundResult == "Player Wins")
                {
                    newplayerwin = 1;
                }
                ListOfPlayers.Add(new User(model.Username, model.TurnsPlayed, newplayerwin));
            }

            return GR;
        }

        [HttpGet("GetLeaderboard")]
        public List<User> GetLeaderboard()
        {
            int Percentage;
            foreach (User item in ListOfPlayers)
            {
                Percentage = (int)Math.Round((double)(100 * item.Wins) / item.TurnsPlayed);
                item.WinRatio = Percentage;
                ListUnsorted.Add(item);
            }

            //using Linq
            //https://stackoverflow.com/questions/3309188/how-to-sort-a-listt-by-a-property-in-the-object

            List<User> ListSorted = ListUnsorted.OrderByDescending(User => User.WinRatio).ToList();

            return ListSorted;
        }

        [HttpGet("GetGameCode")]
        public GameCodeRequest GetGameCode()
        {            
            return GameCode;
        }

    }
}
