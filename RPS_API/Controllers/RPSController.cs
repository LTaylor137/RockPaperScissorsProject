using System;
using Microsoft.AspNetCore.Mvc;
using RPS_API.Models;
using System.Collections.Generic;
using System.Linq;

namespace RPS_API.Controllers
{
    [ApiController]
    [Route("Api/Result")]
    public class ResultController : ControllerBase
    {
        public static List<User> ListOfPlayers = new List<User>();
        public List<User> ListUnsorted = new List<User>();

        [HttpPost]
        public GameResult PlayRequest(PlayRequest model)
        {
            GameResult GR = new GameResult(model.Username, model.PlayerChoice);
            bool nameexists = false;

            foreach (User item in ListOfPlayers)
            {
                if (item.Username.Contains(model.Username))
                {
                    nameexists = true;
                    break;
                }
            }

            if (nameexists == true)
            {
                foreach (User item in ListOfPlayers)
                {
                    if (item.Username.Contains(model.Username))
                    {
                        if (GR.Result == "Player Wins")
                        {
                            item.Wins++;
                        }
                        item.TurnsPlayed++;
                    }
                }
            }

            //creates a new user with 1 turnplayed(from App) and a private variable if they won.
            if (nameexists == false)
            {
                int newplayerwin = 0;
                if (GR.Result == "Player Wins")
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



    }
}
