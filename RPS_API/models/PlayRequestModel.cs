using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace RPS_API.models
{
    public class PlayRequest
    {

        public string Input { get; set; }

        //testing player input hardcoded as rock.
        public string PlayRock()
        {

            string[] rules = { "rock", "paper", "scissors" };
            string playerSelection = "rock";
            string Result = "Draw";

            Random random = new Random();
            string AISelection = rules[random.Next(0, 3)];

            //no selection sent
            if (playerSelection != "rock" || playerSelection != "paper" || playerSelection != "scissors")
            {
                Result = "Player did not send selection";
            }

            //player win
            if (playerSelection == "rock" && AISelection == "scissors")
            {
                Result = "Player Wins";
            }
            if (playerSelection == "paper" && AISelection == "rock")
            {
                Result = "Player Wins";
            }
            if (playerSelection == "scissors" && AISelection == "paper")
            {
                Result = "Player Wins";
            }

            //AI win
            if (AISelection == "rock" && playerSelection == "scissors")
            {
                Result = "AI Wins";
            }
            if (AISelection == "paper" && playerSelection == "rock")
            {
                Result = "AI Wins";
            }
            if (AISelection == "scissors" && playerSelection == "paper")
            {
                Result = "AI Wins";
            }

            //DRAW
            if (AISelection == "rock" && playerSelection == "rock")
            {
                Result = "Draw";
            }
            if (AISelection == "paper" && playerSelection == "paper")
            {
                Result = "Draw";
            }
            if (AISelection == "scissors" && playerSelection == "scissors")
            {
                Result = "Draw";
            }

            string PrintString = (
                $"Player Selected = {playerSelection}" + Environment.NewLine +
                $"Computer Selected = {AISelection}" + Environment.NewLine +
                $"Result = {Result}");

            return PrintString;
        }

        //sends custom input
        public string GameResult()
        {
            string[] rules = { "rock", "paper", "scissors" };
            string playerSelection = Input;
            string Result = null;

            Random random = new Random();
            string AISelection = rules[random.Next(0, 3)];

            //no selection sent
            if ((playerSelection != "rock") &&
            (playerSelection != "paper") &&
            (playerSelection != "scissors"))
            {
                Result = "Player did not send selection";
            }

            //player win
            if ((playerSelection == "rock" && AISelection == "scissors") ||
            (playerSelection == "paper" && AISelection == "rock") ||
            (playerSelection == "scissors" && AISelection == "paper"))
            {
                Result = "Player Wins";
            }

            //AI win
            if ((AISelection == "rock" && playerSelection == "scissors") ||
            (AISelection == "paper" && playerSelection == "rock") ||
            (AISelection == "scissors" && playerSelection == "paper"))
            {
                Result = "AI Wins";
            }

            //DRAW
            if ((AISelection == "rock" && playerSelection == "rock") ||
            (AISelection == "paper" && playerSelection == "paper") ||
            (AISelection == "scissors" && playerSelection == "scissors"))
            {
                Result = "Draw";
            }

            string PrintString = (
                $"Player Selected = {playerSelection}" + Environment.NewLine +
                $"Computer Selected = {AISelection}" + Environment.NewLine +
                $"Result = {Result}");

            return PrintString;
        }

    }

}



