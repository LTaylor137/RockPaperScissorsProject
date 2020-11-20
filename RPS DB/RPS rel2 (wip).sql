-- SELECT name, database_id, create_date  
-- FROM sys.databases ;  
-- GO  

-- CREATE DATABASE RPSDB;


-- USE RPSDB; 

-- IF OBJECT_ID('PLAYER') IS NOT NULL 
--   DROP TABLE PLAYER;
-- IF OBJECT_ID('GAME') IS NOT NULL 
--   DROP TABLE GAME;
-- IF OBJECT_ID('ROUND') IS NOT NULL 
--   DROP TABLE ROUND;

--   GO

-- CREATE TABLE PLAYER
-- (
--     USERNAME NVARCHAR(50),
--     PRIMARY KEY (USERNAME)
-- );

-- CREATE TABLE GAME
-- (
--     USERNAME NVARCHAR(50),
--     GAMECODE NVARCHAR(15),
--     GDATETIME NVARCHAR(50),
--     -- NUMBEROFTURNS INTEGER,
--     GAMERESULT NVARCHAR(50),
--     PRIMARY KEY (USERNAME, GAMECODE, GDATETIME),
--     FOREIGN KEY (USERNAME) REFERENCES PLAYER(USERNAME)
-- );

-- CREATE TABLE ROUND
-- (
--     USERNAME NVARCHAR(50),
--     GAMECODE NVARCHAR(15),
--     RDATETIME NVARCHAR(50),
--     TURNNUMBER INTEGER,
--     PLAYERCHOICE NVARCHAR(15),
--     CPUCHOICE NVARCHAR(15),
--     ROUNDRESULT NVARCHAR(15),
--     PRIMARY KEY (USERNAME, GAMECODE, RDATETIME, TURNNUMBER),
--     FOREIGN KEY (USERNAME) REFERENCES PLAYER(USERNAME)
-- );


-- SELECT * FROM RPSDB.INFORMATION_SCHEMA.TABLES
-- GO


SELECT  * FROM player;
SELECT  * FROM game;
SELECT  * FROM round;


SELECT
  P.USERNAME,
  COUNT(R.USERNAME) AS RNDSPLD,
  (SELECT COUNT(CASE ROUNDRESULT WHEN 'Player Wins' THEN 1 ELSE NULL END) AS blah)
  FROM
  [ROUND] R
 INNER JOIN [PLAYER] P ON P.USERNAME = R.USERNAME
GROUP BY P.USERNAME


 SELECT
   USERNAME, GDATETIME, GAMERESULT
 from GAME
 WHERE USERNAME = 'Adam'
 ORDER BY GDATETIME



-- UPDATE GAME SET GAMERESULT = ('win') WHERE GAMECODE = 'GFNOJZ';


-- SELECT
--   R.USERNAME,
--   COUNT(R.USERNAME) AS TOTALROUNDSPLAYED,
--   COUNT(R.ROUNDRESULT)
--   FROM
--   PLAYER P
-- LEFT JOIN ROUND R ON P.USERNAME = R.USERNAME
-- GROUP BY R.USERNAME

-- SELECT
--   USERNAME,
--   COUNT(USERNAME) AS TOTALROUNDSPLAYED,
--   COUNT(ROUNDRESULT)
--   FROM
--   ROUND
-- GROUP BY USERNAME

-- SELECT
--   USERNAME,
--   COUNT(USERNAME) AS TOTALROUNDSPLAYED
--   FROM [ROUND]
-- GROUP BY USERNAME;

-- SELECT
--   COUNT(ROUNDRESULT) AS WINS
--   FROM [ROUND]
--   WHERE (ROUNDRESULT = 'Player Wins')
-- GROUP BY ROUNDRESULT;


-- SELECT
--   R.USERNAME,
--   COUNT(R.USERNAME) AS TOTALROUNDSPLAYED,
--   COUNT(R.ROUNDRESULT)
--   FROM
--   PLAYER P
-- LEFT JOIN ROUND R ON P.USERNAME = R.USERNAME
-- GROUP BY R.USERNAME

-- SELECT COUNT(CASE authorization WHEN 'denied' THEN 1 ELSE NULL END) as denied,





-- SELECT ROUNDRESULT, COUNT(*) FROM [ROUND] WHERE USERNAME = 'lachlan'
--   GROUP BY ROUNDRESULT;