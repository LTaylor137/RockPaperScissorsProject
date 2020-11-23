using System;

namespace RPS_API.Models
{
    public class GetRoundResult
    {
        public string Username { get; set; }
        public string PlayerChoice { get; set; }
        public string GameCode { get; set; }
        public string CpuChoice { get; set; }
        public string RoundResult { get; set; }


        public GetRoundResult(string _gameCode, string _username, string _playerChoice)
        {
            this.GameCode = _gameCode;
            this.Username = _username;
            this.PlayerChoice = _playerChoice;
            this.CpuChoice = CalculateCpuChoice();
            this.RoundResult = CalculateResult();
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
                this.RoundResult = "Player Wins";
            }
            else
            {
                this.RoundResult = "CPU Wins";
            }

            //Draw
            if (this.CpuChoice == this.PlayerChoice)
            {
                this.RoundResult = "It's a Draw";
            }

            //player no selection sent
            if ((this.PlayerChoice != "rock") &&
            (this.PlayerChoice != "paper") &&
            (this.PlayerChoice != "scissors"))
            {
                this.RoundResult = "Player did not send a valid selection";
            }

            return RoundResult;
        }

    }
}