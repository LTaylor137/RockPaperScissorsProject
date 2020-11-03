using System;

namespace RPS_API.Models
{
    public class GameResult
    {
        public string Username { get; set; }
        public string PlayerChoice { get; set; }
        public string CpuChoice { get; set; }
        public string Result { get; set; }

        public GameResult(string _username, string _playerChoice)
        {
            Username = _username;
            PlayerChoice = _playerChoice;
            CpuChoice = CalculateCpuChoice();
            Result = CalculateResult();
        }

        public string CalculateCpuChoice()
        {
            string[] options = { "rock", "paper", "scissors" };
            Random random = new Random();
            string _cpuChoice = options[random.Next(0, 3)];
            return _cpuChoice;
        }

        public string CalculateResult()
        {
            //player win
            if ((this.PlayerChoice == "rock" && this.CpuChoice == "scissors") ||
            (this.PlayerChoice == "paper" && this.CpuChoice == "rock") ||
            (this.PlayerChoice == "scissors" && this.CpuChoice == "paper"))
            {
                this.Result = "Player Wins";
            }
            else
            {
                this.Result = "CPU Wins";
            }

            //Draw
            if (this.CpuChoice == this.PlayerChoice)
            {
                this.Result = "It's a Draw";
            }

            //player no selection sent
            if ((this.PlayerChoice != "rock") &&
            (this.PlayerChoice != "paper") &&
            (this.PlayerChoice != "scissors"))
            {
                this.Result = "Player did not send a valid selection";
            }

            return Result;
        }

    }
}