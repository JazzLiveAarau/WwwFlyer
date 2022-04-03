// File: Flyer.js
// Date: 2022-03-05
// Author: Gunnar Lidén

// File content
// =============
// Global variables, main, load, init and event functions

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Flag telling if the user is the administrator or a musician setting text data for a concert
// Values: Admin, Tester or concert number 1, 2, ....., 12
var g_user_case_str = "undefined";

// XML object corresponding to the XML file with the subdirectory names
var g_subdirectory_names_xml = null;

// XML object corresponding to the XML file with the user names and passwords
var g_name_users_passwords_xml = null;

// XML object corresponding to the application XML file
var g_application_xml = null;

// XML object corresponding to the current season XML file
var g_current_season_xml = null

// XML objects corresponding to the XML Edit files
var g_xml_edit_objects = [];

// XML Edit file names corresponding to g_xml_edit_objects
var g_xml_edit_file_names = [];

// Flyer application mode flag
// Eq. AdminXml: Use from Admin exported season data in subdirectory AdminXml
// Eq. EditXml: Use season data in subdirectory EditTexts
var g_flyer_application_mode = "EditXml";

// The current season number
var g_current_season_number = 1;

// The current concert number
var g_current_concert_number = 1;

// The current musician number
var g_current_musician_number = 1;

// The current text number
// Eq. 1: Short text and band name
// Eq. 2: Musician name, instrument and text
// Eq. 3: Additional text and label
var g_current_text_number = 1;


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Names //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The sub directory for data that is set and updated by programm Admin
var g_dir_admin_xml = "AdminXml";

// The sub directory for the logos directory
var g_dir_logos = "Logos";

// The file name for the text logo image
var g_file_name_text_logo = "jazz_live_aarau_text.png";

// The file name for the black image left or right of the text logo
var g_file_name_black_logo = "jazz_live_aarau_black.png";

// The XML file that holds the name of the subdirectories that have been updated by Admin
var g_file_name_subdirectory_names_xml = "SubDirectoryNames.xml";

// The XML file that holds user names and passwords
var g_file_name_users_passwords_xml = "UsersPasswords.xml";

// The XML application file that program Admin has copied from www/XML
var g_file_name_jazz_application_xml = "JazzApplication.xml";

// An XML season file that program Admin has copied from www/XML to one 
// of the subdirectories defined by g_file_name_subdirectory_names_xml
var g_file_name_season_program_xml = "SaisonProgramm.xml";

// Start parts of file names for the PDF files
var g_file_name_flyer_folded_a6_front_start = "FlyerFoldedA6_Front_Concert_";
var g_file_name_flyer_folded_a6_reverse_start = "FlyerFoldedA6_Reverse_Concert_";

// The sub directory for XML Edit text data
var g_dir_edit_texts = "EditTexts";

// Start part of an XML Edit file
var g_start_part_file_name_xml_edit = "EditTextBand_";

// Defines the start part of a QR Code image file name
var g_file_name_qr_code_image_start = "QrCode_Band_";

// QR Code image name part defining that the QR Code (link) is a sound URL
var g_file_name_qr_code_image_sound = "_Sound.png";

// QR Code image name part defining that the QR Code (link) is a website URL
var g_file_name_qr_code_image_website = "_Website.png";

// QR Code image extension
var g_file_name_qr_code_image_extension = ".png";

// Defines the start part of the image poster file name
var g_file_name_image_poster_start = "FlyerBild_";

// Defines the start part of the user name
var g_user_name_start = "Band";

// The sub directory for JavaScripts
var g_directory_name_scripts = "scripts";

// The sub directory for backups of XML files
var g_directory_name_backup = "backup";

// User case Tester
var g_user_case_tester = "Tester";

// User case Admin
var g_user_case_admin = "Admin";

// User case Drucker (Printer)
var g_user_case_printer = "Drucker";

// User case Musician (only used for header)
var g_user_case_musician = "Musician";



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Names ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_reloaded_once = false;

// Main (onload) function of HTML file FlyerFoldedA6.htm
// Please note that the season program and the other XML files are loaded and
// many of the global variables are set after login. See file FlyerLogin.js.
// Input data: User case telling if the user is the administrator, a tester or a musician
//             Current season number. TODO What, why ... 
// TODO The input data could probably be hardcoded to admin and one (1)
// 1. Set the current concert number (g_current_concert_number) to one (1). Call of initCurrentConcertNumber
// 2. Set the current season number g_current_season_number to the input number. TODO Probably always one
// 3. Remove all borders for all (a hardcoded list of) elements. Call of removeAllBorders.
// 4. Set the application header with a tooltip. Call of setApplicationHeader
// 5. Set the link to the Flyer help document. Call of setParagraphHelp
// 6. Load the XML file with the user names and passwords. Call of loadUserNamesPasswordXml.
//    After loading this function calls afterLoadUserNamesPasswordXml 
function mainFlyerA6(i_user_case_str, i_current_season_number)
{
	g_user_case_str = i_user_case_str;
	
	initCurrentConcertNumber(g_user_case_str);
	
	g_current_season_number = parseInt(i_current_season_number);
	
	removeAllBorders();
	
	setApplicationHeader();
	
	setParagraphHelp();

  hideButtonCheckBandData();

  hideDivDisplayCheckBandData();
		
	loadUserNamesPasswordXml();
			
} // mainFlyerA6

// Function called after load of the user-names-passwords XML file
// 1. Set login dropdown. Call of setLoginDropDown
// 2. Hide the tool tip application header. Call of hideToolTipApplicationHeader
// 3. Hide page print one. Call of hidePagePrintOne
// 4. Hide page print two. Call of hidePagePrintTwo
function afterLoadUserNamesPasswordXml()
{
	setLoginDropDown(g_id_div_login_drop_down);
		
	hideToolTipApplicationHeader();
		
	hidePagePrintOne();
		
	hidePagePrintTwo();
		
} // afterLoadUserNamesPasswordXml

// Initialize the current concert number
function initCurrentConcertNumber(i_user_case_str)
{
	if (i_user_case_str == g_user_case_admin)
	{
		g_current_concert_number = 1;		
	}
	else
	{
		g_current_concert_number = parseInt(i_user_case_str);
		
		alert("initCurrentConcertNumber This function cannot be removed. It is used");
		
	}
		
} // initCurrentConcertNumber


// Returns the name and path of the current season program XML file
function getFileNamePathSeasonXml()
{
	var ret_file_name_path_season_xml = '';
	
	ret_file_name_path_season_xml = ret_file_name_path_season_xml + g_dir_admin_xml + '/';
	
	ret_file_name_path_season_xml = ret_file_name_path_season_xml + GetSubdirectoryNameCurrentSeason() + '/';
	
	ret_file_name_path_season_xml = ret_file_name_path_season_xml + g_file_name_season_program_xml;
	
	return ret_file_name_path_season_xml;
	
} // getFileNamePathSeasonXml

// Returns the name and path of the XML Edit file for a given file number
function getFileNamePathEditXml(i_xml_edit_file_number)
{
	var ret_file_name_path_edit_xml = '';
	
	ret_file_name_path_edit_xml = ret_file_name_path_edit_xml + g_dir_edit_texts + '/';
	
	ret_file_name_path_edit_xml = ret_file_name_path_edit_xml + GetSubdirectoryNameCurrentSeason() + '/';
	
	ret_file_name_path_edit_xml = ret_file_name_path_edit_xml + g_start_part_file_name_xml_edit;
	
	ret_file_name_path_edit_xml = ret_file_name_path_edit_xml + i_xml_edit_file_number.toString() + '.xml';
	
	return ret_file_name_path_edit_xml;
	
} // getFileNamePathEditXml

// Returns the subdirectory name for current season
function GetSubdirectoryNameCurrentSeason()
{
	var subdir_name_current_season = getSubdirectoryName(g_current_season_number);
	
	return subdir_name_current_season;
	
} // GetSubdirectoryNameCurrentSeason

// Returns the name with relative path to the XML file that holds the name of the subdirectories
function getFileNamePathSubdirectoryNamesXml()
{
	return g_dir_admin_xml + '/' + g_file_name_subdirectory_names_xml;
	
} // getFileNamePathSubdirectoryNamesXml

// Returns the name with relative path to the XML application file 
function getFileNamePathApplicationXml()
{
	return g_dir_admin_xml + '/' + g_file_name_jazz_application_xml;
	
} // getFileNamePathApplicationXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Load subdirectory names XML (SubDirectoryNames.xml) and call function afterLoadSubdirNames
// 1. Load file and create XML object. Call of XMLHttpRequest.open and .send
// 2. After loading: 
//    2.1 Set global parameter g_subdirectory_names_xml (the object that holds data for the subdirectory names)
//    2.2 Hide elements and call the next XML load function. Call of afterLoadSubdirNames
function loadSubdirNames(i_filename_path_subdir_names_xml) 
{
  // Request server object for the XML file
  var next_season_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  next_season_xmlhttp.onreadystatechange = function() 
  {
    // This statement will be called four times, i.e. "ready state" changes four times
    // Value	State	Description
    // 0	UNSENT	Client has been created. open() not called yet.
    // 1	OPENED	open() has been called.
    // 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
    // 3	LOADING	Downloading; responseText holds partial data.
    // 4	DONE	The operation is complete.
	// status
	// * UNSENT 0
    // * OPENED 0
    // * LOADING 200
    // * DONE 200
    if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 200) 
	{
		g_subdirectory_names_xml = next_season_xmlhttp.responseXML;
		
		afterLoadSubdirNames();
		
    }
    else if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 404) 
	{
      alert("Error 404: File " + i_filename_path_subdir_names_xml + " not found" );
    }	
  };
  
  // Open the file
  next_season_xmlhttp.open("GET", i_filename_path_subdir_names_xml, true);
  
  next_season_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  next_season_xmlhttp.send();	

} // loadSubdirNames

// Load application XML and call function that loads current season xml 
// 1. Load file and create XML object. Call of XMLHttpRequest.open and .send
// 2. After loading: 
//    2.1 Set global parameter g_application_xml (the object that holds the application data)
//    2.2 
//    2.3
function loadApplicationXml(i_filename_path_application_xml) 
{
  // Request server object for the XML file
  var next_season_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  next_season_xmlhttp.onreadystatechange = function() 
  {
    if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 200) 
	{
		g_application_xml = next_season_xmlhttp.responseXML;
		
		afterLoadApplicationXml();

    }
    else if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 404) 
	{
      alert("Error 404: File " + i_filename_path_application_xml + " not found" );
    }	
  };
  
  // Open the file
  next_season_xmlhttp.open("GET", i_filename_path_application_xml, true);
  
  next_season_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  next_season_xmlhttp.send();	

} // loadApplicationXml

// Load an XML Edit file. 
// There are twelve XML Edit files and this function is called recursively, 
// i.e. it calls itself twelve times. The XML objects are stored in the 
// global variable g_xml_edit_objects
// 1. Construct file name, load file and create XML object. Call of XMLHttpRequest.open and .send
// 2. After loading: 
//    2.1 Set global parameter g_xml_edit_objects
//      If all XML Edit files have been loaded: loadXmlEdit
//      Otherwise increase file number and call this function again
function loadXmlEdit(i_xml_edit_file_number, i_case_load) 
{
  var file_name_path = getFileNamePathEditXml(i_xml_edit_file_number);
  
  // Request server object for the XML file
  var xml_edit_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  xml_edit_xmlhttp.onreadystatechange = function() 
  {
    if (xml_edit_xmlhttp.readyState == 4 && xml_edit_xmlhttp.status == 200) 
	{
		g_xml_edit_objects[i_xml_edit_file_number-1] = xml_edit_xmlhttp.responseXML;
		
		var file_name_season_xml = getFileNamePathSeasonXml();
		
		g_xml_edit_file_names[i_xml_edit_file_number-1] = file_name_path;
		
		var next_file_number = i_xml_edit_file_number + 1;
		if (next_file_number <= 12)
		{
		    loadXmlEdit(next_file_number, i_case_load);
		}
		else
		{
			afterLoadXmlEdit(i_case_load);
		}
    }
    else if (xml_edit_xmlhttp.readyState == 4 && xml_edit_xmlhttp.status == 404) 
	{
      alert("Error 404: File " + file_name_path + " not found" );
    }	
  };
  
  // Open the file
  xml_edit_xmlhttp.open("GET", file_name_path, true);
  
  xml_edit_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  xml_edit_xmlhttp.send();	

} // loadXmlEdit


// Load application XML and call function that loads current season xml 
// 1. Load file and create XML object. Call of XMLHttpRequest.open and .send
// 2. After loading: 
//    2.1 Call afterLoadSeasonProgramXml
function loadSeasonXmlSetDropdowns(i_file_name_season_xml) 
{
	var debug_msg = 'loadSeasonXmlSetDropdowns i_file_name_season_xml= ' + i_file_name_season_xml;
	console.log(debug_msg);

  // Request server object for the XML file
  var next_season_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  next_season_xmlhttp.onreadystatechange = function() 
  {
    if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 200) 
	{
		g_current_season_xml = next_season_xmlhttp.responseXML;
		
		afterLoadSeasonProgramXml();
    }
    else if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 404) 
	{
      alert("Error 404: File " + i_file_name_season_xml + " not found" );
    }	
  };
  
  // Open the file
  next_season_xmlhttp.open("GET", i_file_name_season_xml, true);
  
  next_season_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  next_season_xmlhttp.send();	

} // loadSeasonXmlSetDropdowns

// Load application XML and call function that loads current season xml 
// 1. Load file and create XML object. Call of XMLHttpRequest.open and .send
// 2. After loading: 
//    2.1 Load XML Edit file case 2
//    2.2 
//    2.3
function loadSeasonXml(i_file_name_season_xml) 
{
	var debug_msg = 'loadSeasonXml i_file_name_season_xml= ' + i_file_name_season_xml;
	console.log(debug_msg);

  // Request server object for the XML file
  var next_season_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  next_season_xmlhttp.onreadystatechange = function() 
  {
    if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 200) 
	{
		g_current_season_xml = next_season_xmlhttp.responseXML;
		
		loadXmlEdit(1, 2);

    }
    else if (next_season_xmlhttp.readyState == 4 && next_season_xmlhttp.status == 404) 
	{
      alert("Error 404: File " + i_file_name_season_xml + " not found" );
    }	
  };
  
  // Open the file
  next_season_xmlhttp.open("GET", i_file_name_season_xml, true);
  
  next_season_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  next_season_xmlhttp.send();	

} // loadSeasonXml


// Load user names and passwords XML and call afterLoadUserNamesPasswordXml
// This XML file is originally created and uploaded by the Admin application
// The administrator can in this application flyer change the passwords
// 1. Get the full name of the XML file. Call of getFileNamePathUserNamesPasswords
// 2. Load file and create XML object. Call of XMLHttpRequest.open and .send
// 3. Set login dropdown and hide pages after loading of the file. 
//    Call of afterLoadUserNamesPasswordXml 
function loadUserNamesPasswordXml() 
{
  var file_name_user_names_passwords_xml = getFileNamePathUserNamesPasswords();
  
  // Request server object for the XML file
  var user_names_passwords_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  user_names_passwords_xmlhttp.onreadystatechange = function() 
  {
    if (user_names_passwords_xmlhttp.readyState == 4 && user_names_passwords_xmlhttp.status == 200) 
	{
		g_name_users_passwords_xml = user_names_passwords_xmlhttp.responseXML;
		
		afterLoadUserNamesPasswordXml();
		
    }
    else if (user_names_passwords_xmlhttp.readyState == 4 && user_names_passwords_xmlhttp.status == 404) 
	{
      alert("Error 404: File " + file_name_user_names_passwords_xml + " not found" );
    }	
  };
  
  // Open the file
  user_names_passwords_xmlhttp.open("GET", file_name_user_names_passwords_xml, true);
  
  user_names_passwords_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  user_names_passwords_xmlhttp.send();	

} // loadUserNamesPasswordXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Load Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the button save texts and send confirmation email
function eventSaveTextsConfirmationEmail()
{
	
	
} // eventSaveTextsConfirmationEmail


 ///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
