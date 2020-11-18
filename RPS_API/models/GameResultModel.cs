using System;

namespace RPS_API.Models
{
    public class GetGameResult
    {
        public string GameCode { get; set; }
        public string GameResult { get; set; }

        public GetGameResult(string _gameCode, string _gameResult)
        {
            this.GameCode = _gameCode;
            this.GameResult = _gameResult;
        }

    }
}