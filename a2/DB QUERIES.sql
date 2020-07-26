create database Ettendance;
use Ettendance;

create Table tblEmployee (
  emp_id varchar (10) unique,
  full_name varchar (50),
  emailAddress varchar (50) unique,
  password varchar (20) unique,
  phoneNumber varchar(15),
  isAdmin varchar (5),
  isOnProject varchar (5),
  isManager varchar (5),
  isTeamLead varchar(5)
);


select * from tblEmployee;

create Table tblAttendance (
  att_id int identity (1,1) primary key,
  emp_id varchar (10),
  checkInDateTime varchar (20),
  checkOutDateTime varchar (20), 
  workHourDone decimal(5,2)
);

create Table tblLeave(
  leave_id int identity(1,1) primary key,
  emp_id varchar (10),
  startDate varchar (20),
  endDate varchar (20),
  isHalfDay varchar (20),
  Reason varchar (5530),
  status varchar (20)
);




create Table tblProject(
  project_id int  identity(1,1) primary key,
  projectName varchar (50),
  description varchar (200),
  location varchar (200),
  projectStatus varchar (20)
);

create Table tblOnProject(
  onProject_id int identity (1,1) primary key,
  project_id int ,
  emp_id varchar (10),
  empWorkingStatus varchar (20)
);

create Table tblTasks(
  task_id int identity (1,1) primary key,
  assignedByID varchar (10),
  assignedBy varchar (50),
  assignedToID varchar (10),
  assignedTo varchar (50),
  taskName varchar (50),
  detail varchar (200),
  status varchar (20)
 );
---------------------------------------------------------------------
 select * from tblEmployee;
 insert into tblEmployee values ('cs161118','Muhammad Maaz','moazkhan05@gmail.com','1122','03203711012','Yes','Yes','Yes','Yes');
 insert into tblEmployee values ('cs161015','Ansar Udiin','kh.ansarudiin@gmail.com','112','03313536249','Yes','Yes','No','No');
 
 --------------------------------------------------------------------
 0