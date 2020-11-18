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
                ListOfPlayers.Add(new User(model.Username, model.TurnsPlayed, newplayerwin));
            }

            SqlConnection connection = new SqlConnection(connectionString);
            string queryString = "INSERT INTO ROUND (USERNAME, GAMECODE, RDATETIME,"
            + "TURNNUMBER, PLAYERCHOICE, CPUCHOICE, ROUNDRESULT)"
            + "VALUES (@Username, @GameCode, @datetime, @TurnNumber,"
            + "@PlayerChoice, @CpuChoice, @RoundResult)";

            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@Username", GR.Username);
            command.Parameters.AddWithValue("@GameCode", model.GameCode);
            command.Parameters.AddWithValue("@DateTime", GR.DateTime);
            command.Parameters.AddWithValue("@TurnNumber", model.TurnNumber);
            command.Parameters.AddWithValue("@PlayerChoice", GR.PlayerChoice);
            command.Parameters.AddWithValue("@CpuChoice", GR.CpuChoice);
            command.Parameters.AddWithValue("@RoundResult", GR.RoundResult);

            connection.Open();
            var result = command.ExecuteNonQuery();
            return GR;
        }

        [HttpPost("SendGameResult")]
        public GetGameResult GetGameResult(PlayRequest model)
        {
            GetGameResult GGR = new GetGameResult(model.GameCode, model.GameResult);
            SqlConnection connection = new SqlConnection(connectionString);

            string queryString = "UPDATE GAME SET GAMERESULT = @GameResult WHERE GAMECODE = @GameCode";

            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@GameCode", model.GameCode);
            command.Parameters.AddWithValue("@GameResult", model.GameResult);

            connection.Open();
            var result = command.ExecuteNonQuery();
            return GGR;
        }

        [HttpGet("GetLeaderboard")]
        public List<User> GetLeaderboard()
        {
            SqlConnection connection = new SqlConnection(connectionString);

            string queryString = "SELECT * FROM ROUND";
            
            var command = new SqlCommand(queryString, connection);
            connection.Open();

            using (SqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    ListfromDB.Add(
                    new User(reader[0].ToString(), (int)reader[3], (int)reader[3])
                    );
                };
            };
            return ListfromDB;

            //     int Percentage;
            //         foreach (User item in ListOfPlayers)
            //         {
            //             Percentage = (int) Math.Round((double)(100 * item.Wins) / item.TurnsPlayed);
            //             item.WinRatio = Percentage;
            //             ListUnsorted.Add(item);
            //         }

            // //using Linq
            // //https://stackoverflow.com/questions/3309188/how-to-sort-a-listt-by-a-property-in-the-object
            // List<User> ListSorted = ListUnsorted.OrderByDescending(User => User.WinRatio).ToList();

            // return ListSorted;
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
            command.Parameters.AddWithValue("@GDateTime", GCR.DateTime);
            command.Parameters.AddWithValue("@GameCode", GCR.GameCode);
            connection.Open();

            // try
            // {
            var result = command.ExecuteNonQuery();
            return GCR;
            // }
            // catch (SqlException se)
            // {
            //     return Game;
            //     return "Cannot Delete user with id: 91" + se.Message;
            // }

        }

        // used to check if name already exists in the PLAYER table in database.
        public Boolean CheckUserExists(string checkname)
        {
            var NameExists = false;
            string DBresponse = "";
            SqlConnection connection = new SqlConnection(connectionString);

            string queryString = "SELECT * FROM PLAYER WHERE Username = @checkname";
            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddWithValue("@checkname", checkname);
            connection.Open();

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



    }
}
