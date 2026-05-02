USE [Apartment_brokerage_DB]
GO

/*******************************************************************************
   1. יצירת טבלאות 
*******************************************************************************/

-- הסרת טבלאות קיימות למניעת שגיאות כפל
IF OBJECT_ID('dbo.Apartments', 'U') IS NOT NULL DROP TABLE dbo.Apartments;
IF OBJECT_ID('dbo.Agents', 'U') IS NOT NULL DROP TABLE dbo.Agents;
IF OBJECT_ID('dbo.ApartmentStatuses', 'U') IS NOT NULL DROP TABLE dbo.ApartmentStatuses;
GO

-- טבלת סוכנים
CREATE TABLE [dbo].[Agents](
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[FullName] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL
);

-- טבלת סטטוסים
CREATE TABLE [dbo].[ApartmentStatuses](
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] [nvarchar](50) NOT NULL
);

-- טבלת דירות
CREATE TABLE [dbo].[Apartments](
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Title] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Price] [decimal](12, 2) NOT NULL,
	[Rooms] [int] NOT NULL,
	[City] [nvarchar](100) NOT NULL,
	[Address] [nvarchar](200) NOT NULL,
	[StatusId] [int] NOT NULL,
	[AgentId] [int] NOT NULL,
	[CreatedAt] [datetime] DEFAULT (getdate()) NOT NULL,
	
	CONSTRAINT [FK_Apartments_Agent] FOREIGN KEY([AgentId]) REFERENCES [dbo].[Agents] ([Id]),
	CONSTRAINT [FK_Apartments_Status] FOREIGN KEY([StatusId]) REFERENCES [dbo].[ApartmentStatuses] ([Id])
);
GO

/*******************************************************************************
   2. פרוצדורות (Stored Procedures) 
*******************************************************************************/

CREATE PROCEDURE [dbo].[Apartments_GetAll] (@Search NVARCHAR(100) = NULL) AS
BEGIN
    SELECT A.Id, A.Title, A.Price, A.Rooms, A.City, A.Address, A.Description,
           S.Name AS StatusName, AG.FullName AS AgentName, A.CreatedAt
    FROM Apartments A
    JOIN ApartmentStatuses S ON A.StatusId = S.Id
    JOIN Agents AG ON A.AgentId = AG.Id
    WHERE @Search IS NULL OR A.Title LIKE N'%' + @Search + N'%' OR A.City LIKE N'%' + @Search + N'%' OR A.Address LIKE N'%' + @Search + N'%'
    ORDER BY A.CreatedAt DESC;
END
GO

CREATE PROCEDURE [dbo].[Apartments_GetById] (@Id INT) AS
BEGIN
    SELECT A.*, S.Name AS StatusName, AG.FullName AS AgentName, AG.Phone, AG.Email
    FROM Apartments A
    JOIN ApartmentStatuses S ON A.StatusId = S.Id
    JOIN Agents AG ON A.AgentId = AG.Id
    WHERE A.Id = @Id;
END
GO

CREATE PROCEDURE [dbo].[Apartments_Create] 
    (@Title NVARCHAR(200), @Description NVARCHAR(MAX), @Price DECIMAL(12,2), @Rooms INT, @City NVARCHAR(100), @Address NVARCHAR(200), @StatusId INT, @AgentId INT) AS
BEGIN
    INSERT INTO Apartments (Title, Description, Price, Rooms, City, Address, StatusId, AgentId, CreatedAt)
    VALUES (@Title, @Description, @Price, @Rooms, @City, @Address, @StatusId, @AgentId, GETDATE());
END
GO

CREATE PROCEDURE [dbo].[Apartments_Update]
    (@Id INT, @Title NVARCHAR(200), @Description NVARCHAR(MAX), @Price DECIMAL(12,2), @Rooms INT, @City NVARCHAR(100), @Address NVARCHAR(200), @StatusId INT, @AgentId INT) AS
BEGIN
    UPDATE Apartments SET Title = @Title, Description = @Description, Price = @Price, Rooms = @Rooms, City = @City, Address = @Address, StatusId = @StatusId, AgentId = @AgentId
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE [dbo].[Agents_GetAll] AS BEGIN SELECT Id, FullName FROM Agents ORDER BY FullName; END
GO

CREATE PROCEDURE [dbo].[Statuses_GetAll] AS BEGIN SELECT Id, Name FROM ApartmentStatuses ORDER BY Id; END
GO

/*******************************************************************************
   3. נתונים ראשוניים (Seed Data) 
*******************************************************************************/

-- הכנסת סטטוסים
INSERT INTO [dbo].[ApartmentStatuses] ([Name]) VALUES (N'פנוי'), (N'במשא ומתן'), (N'תפוס');

-- הכנסת סוכנים
INSERT INTO [dbo].[Agents] ([FullName], [Phone], [Email]) VALUES 
(N'עטרה שטיגליץ', '0556777526', 'a0556777526@gmail.com'),
(N'שני רבינסקי', '0583206302', 'sh0583206303@gmail.com'),
(N'טובה אושינסקי', '0583285224', 'tandt5224@gmail.com');

-- הכנסת דירות (שימוש ב-IDs ידניים כדי להבטיח עבודה חלקה)
INSERT INTO [dbo].[Apartments] ([Title], [Description], [Price], [Rooms], [City], [Address], [StatusId], [AgentId])
VALUES 
(N'פנטהאוז יוקרתי עם נוף לים', N'דירה מרווחת, מעוצבת אדריכלית, מרפסת ענקית', 4500000, 5, N'נתניה', N'המלכים 12', 1, 1),
(N'דירת גן שקטה ומשופצת', N'קרובה למוסדות חינוך, גינה מטופחת', 2850000, 4, N'פתח תקווה', N'הדרים 5', 2, 2),
(N'דירת 3 חדרים במרכז העיר', N'מתאימה להשקעה, מרחק הליכה מהרכבת', 1950000, 3, N'רחובות', N'הרצל 102', 1, 3),
(N'וילה פרטית במושב', N'שטח בנוי גדול, בריכה פרטית, פרטיות מלאה', 6200000, 6, N'כפר חב"ד', N'הזית 4', 1, 1),
(N'דירת בוטיק חדשה מקבלן', N'מפרט טכני עשיר, חניה תת קרקעית ומחסן', 3100000, 4, N'בני ברק', N'חזון איש 40', 1, 2),
(N'דופלקס מעוצב בשכונה החדשה', N'קומה גבוהה, נוף פתוח, סוויטת הורים גדולה', 3750000, 5, N'ירושלים', N'בית הדפוס 15', 2, 3),
(N'דירה קטנה ומתוקה לזוגות', N'מוארת מאוד, קרובה לפארק, מיזוג מרכזי', 1650000, 2, N'אלעד', N'בן זכאי 8', 1, 1),
(N'נכס מסחרי במיקום אסטרטגי', N'מתאים לקליניקה או משרד', 2200000, 3, N'תל אביב', N'נחלת בנימין 5', 3, 2);
GO