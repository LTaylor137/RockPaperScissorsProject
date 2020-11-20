using System;
using Microsoft.AspNetCore.Mvc;
using RPS_API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace RPS_API.Controllers
{
    [ApiController]
    [Route("Api")]
    public class ResultController : ControllerBase
    {
        SqlConnectionStringBuilder stringBuilder = new SqlConnectionStringBuilder();
        IConfiguration configuration;
        string connectionString = "";
        public ResultController(IConfiguration iConfig)
        {
            this.configuration = iConfig;
            this.stringBuilder.DataSource = this.configuration.GetSection("DBConnectionString").GetSection("Url").Value;
            this.stringBuilder.InitialCatalog = this.configuration.GetSection("DBConnectionString").GetSection("Database").Value;
            this.stringBuilder.UserID = this.configuration.GetSection("DBConnectionString").GetSection("User").Value;
            this.stringBuilder.Password = this.configuration.GetSection("DBConnectionString").GetSection("Password").Value;
            connectionString = this.stringBuilder.ConnectionString;
        }
        public static List<User> ListOfPlayers = new List<User>();
        public List<User> ListUnsorted = new List<User>();

        public List<User> ListfromDB = new List<User>();

        [HttpPost("GetRoundResult")]
        public GetRoundResult PlayRequest(PlayRequest model)
        {
            GetRoundResult GR = new GetRoundResult(model.GameCode, model.Username, model.PlayerChoice);
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
                ListOfPlayers.Add(new User(model.Username, model.TurnsPlayed, newplayerwin, 0, ""));
            }

            SqlConnection connection = new SqlConnection(connectionString);
            string queryString = "INSERT INTO ROUND (USERNAME, GAMECODE, RDATETIME,"
            + "TURNNUMBER, PLAYERCHOICE, CPUCHOICE, ROUNDRESULT)"
            + "VALUES (@Username, @GameCode, @datetime, @TurnNumber,"
            + "@PlayerChoice, @CpuChoice, @RoundResult)";

            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@Username", GR.Username);
            command.Parameters.AddWithValue("@GameCode", model.GameCode);
            command.Parameters.AddWithValue("@DateTime", GR.DateTimeStr);
            command.Parameters.AddWithValue("@TurnNumber", model.TurnNumber);
            command.Parameters.AddWithValue("@PlayerChoice", GR.PlayerChoice);
            command.Parameters.AddWithValue("@CpuChoice", GR.CpuChoice);
            command.Parameters.AddWithValue("@RoundResult", GR.RoundResult);

            connection.Open();
            var result = command.ExecuteNonQuery();
            connection.Close();
            return GR;

        }

        [HttpPost("SendGameResult")]
        public GetGameResult GetGameResult(PlayRequest model)
        {
            GetGameResult GGR = new GetGameResult(model.GameCode, model.GameResult);
            SqlConnection connection = new SqlConnection(connectionString);
            string sendresult = "";

            switch (model.GameResult)
            {
                case "Player Wins Game":
                    sendresult = "W";
                    break;
                case "CPU Wins Game":
                    sendresult = "L";
                    break;
                case "It's a Draw":
                    sendresult = "D";
                    break;
            }

            string queryString = "UPDATE GAME SET GAMERESULT = @GameResult WHERE GAMECODE = @GameCode";
            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@GameCode", model.GameCode);
            command.Parameters.AddWithValue("@GameResult", sendresult);

            try
            {
                connection.Open();
                var result = command.ExecuteNonQuery();
                return GGR;
            }
            finally
            {
                connection.Close();
            }

        }

        [HttpGet("GetLeaderboard")]
        public List<User> GetLeaderboard()
        {
            SqlConnection connection = new SqlConnection(connectionString);

            string queryString = "SELECT P.USERNAME, COUNT(R.USERNAME) AS RNDSPLD,"
            + "(SELECT COUNT(CASE ROUNDRESULT WHEN 'Player Wins' THEN 1 ELSE NULL END) AS blah)"
            + "FROM [ROUND] R INNER JOIN [PLAYER] P ON P.USERNAME = R.USERNAME GROUP BY P.USERNAME";

            var command = new SqlCommand(queryString, connection);
            connection.Open();
            int WinRatio;

            try
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        //get win ratio percentage
                        WinRatio = (int)Math.Round((double)(100 * (int)reader[2]) / (int)reader[1]);
                        string NameToPass = reader[0].ToString();
                        //add all values as a list item to ListfromDB
                        ListfromDB.Add(
                        new User(reader[0].ToString(), (int)reader[1], (int)reader[2], (int)WinRatio, (string)GetGameResultString(reader[0].ToString()))
                        );
                    };
                };
                //using Linq
                //https://stackoverflow.com/questions/3309188/how-to-sort-a-listt-by-a-property-in-the-object
                List<User> ListSorted = ListfromDB.OrderByDescending(User => User.WinRatio).ToList();
                return ListSorted;
            }
            finally
            {
                connection.Close();
            }
        }

        [HttpPost("CreateGame")]
        public GameCodeRequest CreateGame(PlayRequest model)
        {
            string queryString = "";
            GameCodeRequest GCR = new GameCodeRequest(model.Username);

            if (CheckUserExists(model.Username) == true)
            {
                queryString = "INSERT INTO GAME (Username, GDATETIME, GAMECODE) VALUES (@Username, @GDateTime, @GameCode)";
            }
            else
            {
                queryString = "INSERT INTO PLAYER (Username) VALUES (@Username)"
                + "INSERT INTO GAME (Username, GAMECODE) VALUES (@Username, @GameCode)";
            }

            SqlConnection connection = new SqlConnection(connectionString);

            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@Username", GCR.Username);
            command.Parameters.AddWithValue("@GDateTime", GCR.DateTimeStr);
            command.Parameters.AddWithValue("@GameCode", GCR.GameCode);
            connection.Open();

            try
            {
                var result = command.ExecuteNonQuery();
                return GCR;
            }
            finally
            {
                connection.Close();
            }


        }

        // used to check if name already exists in the PLAYER table in database.
        public Boolean CheckUserExists(string checkname)
        {
            var NameExists = false;
            string DBresponse = "";
            SqlConnection connection = new SqlConnection(connectionString);

            string queryString = "SELECT USERNAME FROM [PLAYER] WHERE Username = @checkname";
            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@checkname", checkname);
            connection.Open();

            try
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        DBresponse = reader[0].ToString();
                    }
                }
                if (DBresponse == checkname)
                {
                    NameExists = true;
                }
                return NameExists;
            }
            finally
            {
                connection.Close();
            }
        }

        public string GetGameResultString(string passedname)
        {
            SqlConnection connection = new SqlConnection(connectionString);

            string WinString = "";
            string queryString = "SELECT GAMERESULT FROM [GAME] WHERE USERNAME = @checkname ORDER BY GDATETIME";

            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@checkname", passedname);
            connection.Open();

            using (SqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    WinString = WinString + (reader[0].ToString());
                }
            }
            connection.Close();
            return WinString;
        }


    }
}
