// File: FlyerLogin.js
// Date: 2023-09-23
// Author: Gunnar Lidén

// File content
// =============
// Functions for login as user (musician), administrator and tester

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Login  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Event handling function when the user selected a login name
// 1. Get the user name and password from the arrays g_drop_down_user_name_array and 
//    g_drop_down_user_password_array. 
// 2. Get the password from the user and check it. Call of getPasswordFromUser
// 3. Set global parameter values and load 
function eventSelectLoginDropDown()
{	
    var dropdown_element = document.getElementById("id_dropdown_login");
    if (dropdown_element == null)
	{
        alert("eventSelectLoginDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_login_index = dropdown_element.value;
	
	var user_name = g_drop_down_user_name_array[new_value_login_index];
	var user_password = g_drop_down_user_password_array[new_value_login_index];
	
	var password_ok = getPasswordFromUser(user_name, user_password);
	
	if (password_ok)
	{
		setGlobalParametersLoadXml(user_name);
	}
	else
	{
		alert(g_err_msg_not_a_valid_password);
		
		// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_value

		dropdown_element.value = 0;
	}
	
} // eventSelectLoginDropDown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Login  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Login  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set global parameters after login and load of XML objects
// Input data is the user name, i.e. admin, printer, tester, Band 01, Band 02, ....
// The following global parameters are set:
// g_user_case_str (concert number, admin, printer or tester) and 
// g_current_concert_number 
// 1. Get the concert number from the input user name. Call of getConcertNumberFromBandName
// 2. Different cases depending on the login name (user name). For all cases the parameters
//    g_user_case_str (concert number, admin or tester) and g_current_concert_number 
// 2.a Case Musician: Hide the publish check box. Call hidePublishCheckbox
// 2.b Case Administrator: Displays the element <PagePrint> one (first/front page) 
//                         Call of displayPagePrintOne
// 2.c Case Tester: Call of displayPagePrintOne
// 2.d Case Printer: Call of displayPagePrintOne and hidePublishCheckbox
// 3. Displays the element <PagePrint> two (reverse page). Call of displayPagePrintTwo
// 4. Load the XML file SubDirectoryNames.xml and call afterLoadSubdirNames.
//    Call of loadSubdirNames (that will call xxx after loading)
function setGlobalParametersLoadXml(i_user_name)
{	
	var concert_number_from_band_name = getConcertNumberFromBandName(i_user_name);
		
	if (concert_number_from_band_name >= 1)
	{
		g_user_case_str = concert_number_from_band_name.toString();
		
		g_current_concert_number = concert_number_from_band_name;
		
		hidePublishCheckbox();
		
		setAndDisplayLogoutButton();
	}
	else if (i_user_name == "Administrator")
	{
		g_current_concert_number = 1;
		g_user_case_str = g_user_case_admin;
		
		displayPagePrintOne();
	}
	else if (i_user_name == g_user_case_tester)
	{
		g_current_concert_number = 1;
		g_user_case_str = g_user_case_tester;
		
		displayPagePrintOne();
	}		
	else if (i_user_name == g_user_case_printer)
	{
		g_current_concert_number = 1;
		g_user_case_str = g_user_case_printer;
		
		displayPagePrintOne();
		
		hidePublishCheckbox();
	}			
	
	displayPagePrintTwo();
	
	var filename_path_subdir_names_xml = getFileNamePathSubdirectoryNamesXml();

	loadSubdirNames(filename_path_subdir_names_xml);	
	
} // setGlobalParametersLoadXml

// This function is called after loading of the XML file SubDirectoryNames.xml
// The XML file is created and uploaded by the Admin application
// 1. Set current season number. Call of setCurrentSeasonNumber TODO Investigate what the function actually is doing
// 2. Hide the div element login drop down. Call of hideLoginDropDown
// 3. Hide the tooltip for the login dropdown. Call of hideLoginDropDown
// 4. Load the application XML file JazzApplication.xml. Call of loadApplicationXml
//    The file JazzApplication.xml is uploaded by the Admin application
function afterLoadSubdirNames()
{
		setCurrentSeasonNumber(); // The user-password XML and the seasons XML must have been loaded before calling this function
		
		hideLoginDropDown();
		
		hideToolTipLoginDropdown();
		
		var filename_path_application_xml = getFileNamePathApplicationXml();
		
		loadApplicationXml(filename_path_application_xml);
				
} // afterLoadSubdirNames

// This function is called after loading of the XML file JazzApplication.xml
// This file is a copy from directory XML. The application Admin has uploaded the file
// 1. Load the XML edit files EditTextBand_1.xml, EditTextBand_2.xml, ...
//    Call of loadXmlEdit case one (1)
function afterLoadApplicationXml()
{
	initLoadSeasonXml();

		//20230923 var xml_edit_file_number = 1;
		
		//20230923 var case_load = 1;
		
		//20230923 loadXmlEdit(xml_edit_file_number, case_load);	
		
} // afterLoadApplicationXml


// This function is called after load of XML edit files
function afterLoadXmlEdit(i_case_load)
{
	var debug_msg = 'afterLoadXmlEdit i_case_load= ' + i_case_load.toString();
	console.log(debug_msg);

	if (1 == i_case_load)
	{
		afterLoadXmlEditCaseOne();
	}
	else if (2 == i_case_load)
	{
		afterLoadXmlEditCaseTwo();
	}
			
} // afterLoadXmlEdit

// This function is called after loading XML edit files for case one (1)
// 1. 
function afterLoadXmlEditCaseOne()
{
	var debug_msg = 'Enter afterLoadXmlEditCaseOne';
	console.log(debug_msg);

	var file_name_season_xml = getFileNamePathSeasonXml();

	loadSeasonXmlSetDropdowns(file_name_season_xml);	
	
} // afterLoadXmlEditCaseOne

// This function is called after loading XML edit files for case two (2)
// That is when the season program has been loaded
// 1. Set musicians dropdown. Call of setMusiciansDropDown
// 2. Set texts dropdown. Call of setTextsDropDown
// 3. Set text header. Call of setTextHeader
// 4. Set text instrument. Call of setTextInstrument
// 5. Set the label for text area concert. Call of  setLabelTextareaConcert
// 6. Set the label for the text header. Call of setLabelTextHeader
// 7. Set the label for the instrument. Call of setLabelInstrument
// 8. Set the text for all (1-6) flyer pages. Call of setAllTexts
// 9. Set all images on the flyer pages. Call of setAllImages
// 10. Set the edit controls. Call of setXmlEditControls
function afterLoadXmlEditCaseTwo()
{
	var debug_msg = 'Enter afterLoadXmlEditCaseTwo';
	console.log(debug_msg);

	setMusiciansDropDown(g_id_div_musician_drop_down);

	setTextsDropDown(g_id_div_text_drop_down);

	setConcertTextarea();

	setWarningTextarea();

	setTextHeader();

	setTextInstrument();

	setLabelTextareaConcert();

	setLabelTextHeader();

	setLabelInstrument();

	setAllTexts();

	setAllImages();

	setXmlEditControls();

	checkFlyerConcertData();
				
} // afterLoadXmlEditCaseTwo

// This function is called after loading the XML file SaisonProgramm.xml
// The file is a copy of a season file in the XML directory. The file is
// uploaded by the application Admin
//
function afterLoadSeasonProgramXml()
{
	var debug_msg = 'Enter afterLoadSeasonProgramXml';
	console.log(debug_msg);

	if (g_user_case_str == g_user_case_admin || g_user_case_str == g_user_case_tester || g_user_case_str == g_user_case_printer)
	{
		setAndHideElementsForAdministratorTesterPrinter();
	}

	if (g_user_case_str == g_user_case_admin )
	{
		setAndHideElementsForAdministrator();
	}

	if (g_user_case_str == g_user_case_tester )
	{
		setAndHideElementsForTester();
	}

	setPublishTextCheckbox();

	setMusiciansDropDown(g_id_div_musician_drop_down);

	setTextsDropDown(g_id_div_text_drop_down);

	setConcertTextarea();

	setWarningTextarea();

	setTextHeader();

	setTextInstrument();

	setLabelTextareaConcert();

	setLabelTextHeader();

	setLabelInstrument();

	setAllTexts();

	setAllImages();

	setXmlEditControls();

	hideToolTipTextInputCaseDropdown();

	hideToolTipMusicianDropdown();

	if (g_user_case_str != g_user_case_admin && g_user_case_str != g_user_case_tester && g_user_case_str != g_user_case_printer)
	{
		setAndHideElementsForMusician();
	}	

	if (g_user_case_str == g_user_case_printer)
	{
		setAndHideElementsForPrinter();
	}	

	changeApplicationHeader(g_user_case_str);

	checkFlyerConcertData();
	
} // afterLoadSeasonProgramXml

// Sets and hides element for the users Administrator, Tester and Printer
function setAndHideElementsForAdministratorTesterPrinter()
{
	setSeasonsDropDown(g_id_div_season_drop_down);

	setConcertsDropDown(g_id_div_concert_drop_down);

	setParagraphActiveMode();

	setPasswordDropDown(g_id_div_password_drop_down);

	hideToolTipSeasonDropdown();

	hideToolTipConcertDropdown();

	setButtonCheckFixBandData();

	// displayButtonCheckFixBandData();
	
} // setAndHideElementsForAllUsersExceptMusician

// Sets and hides element for the user Administrator
function setAndHideElementsForAdministrator()
{
	setParagraphHelpAdmin();	
	
} // setAndHideElementsForAdministrator

// Sets and hides element for the user Printer
function setAndHideElementsForPrinter()
{
	setPrinterProperties();

	changeActiveModeToAdminXml();

	setParagraphHelpPrinter();

	hideMusiciansDropdown();

	hideTextDropdown();

	hidePasswordDropdown();

	hideActiveMode();

	hideLabelTextArea();

	hideTextArea();

	hideLabelHeaderText();

	hideHeaderText();

	hideWarningTextArea();

	setParagraphDisplayBoundaries();

	setParagraphDisplayHideCuttingLines();

	setParagraphCreatePdfFiles();

	hideCreatePdfFiles();
	
	displayOrHideBoundaries();

} // setAndHideElementsForPrinter	

// Hide the function that creates PDF files with html2canvas
// The quality is bad. Users try to use it for printing althought the manual
// clearly says that pdfCreator shall be used
function hideCreatePdfFiles()
{
	var element_div_create_pdf_files = document.getElementById(g_id_div_create_pdf_files);	

	if (element_div_create_pdf_files != null)
	{
		element_div_create_pdf_files.style.display = 'none';
	}
} // hideCreatePdfFiles

// Sets and hides elements for the user Musician
// 1. Hide the free text page four (4) if not used for musician texts.
//    Width of the page is also decreased if page four is hidden
//    Call of pageFourDisplaysMusicians, hidePageFourBox and 
//    decreaseWidthPagePrintTwo
function setAndHideElementsForMusician()
{
	if (!pageFourDisplaysMusicians())
	{
		hidePageFourBox(); 
		
		decreaseWidthPagePrintTwo();
	}
	
} // setAndHideElementsForMusician

// Sets and hides element for the user Tester
function setAndHideElementsForTester()
{
	setTesterTextarea();

	initTesterTextarea();

	appendApplicationFlyerStrings();

	setBorderTextBlockPageTwo();
	setBorderTextBlockPageThree();
	setBorderTextBlockPageFour();
	setBorderBoxPageTwo();
	setBorderBoxPageThree();
	setBorderBoxPageFour();			

	setParagraphHelpAdmin();
	
} // setAndHideElementsForTester


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// End Main Login  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Login Names & Passwords  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Returns the login names
function getLoginNames()
{
	var ret_login_names = [];
	
	
	return ret_login_names;
	
} // getLoginNames

// Returns the login names
function getLoginPasswords()
{
	var ret_login_passwords = [];
	
	
	return ret_login_passwords;	
	
} // getLoginPasswords


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// End Login Names & Passwords  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Login Utility Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns true if user inputs the right password
function getPasswordFromUser(i_user_name, i_user_password)
{
	var ret_password_ok = false;
	
	var prompt_password = prompt("Passwort für " + i_user_name, "");

    if (prompt_password != null) 
	{
		if (prompt_password == i_user_password)
		{
			ret_password_ok = true;
		}
	}

    return ret_password_ok;
	
} // getPasswordFromUser

// Returns the new password
function getNewPasswordFromAdministrator(i_user_name, i_user_old_password)
{
	var prompt_new_password = prompt("Neues Passwort für " + i_user_name, i_user_old_password);
	
	if (prompt_new_password == null)
	{
		alert("getNewPasswordFromAdministrator Error prompt_new_password is null");
		
		return "";
	}
	
	var prompt_new_password_trim = prompt_new_password.trim();

    if (prompt_new_password_trim.length > 0) 
	{
		return prompt_new_password_trim;
	}
	else
	{
	   alert("Passwort nich gültig (leer)");
	
	   return "";		
	}
	
	
} // getNewPasswordFromAdministrator

// Returns the name with relative path to the XML file with user names and passwords
function getFileNamePathUserNamesPasswords()
{
	return g_dir_admin_xml + '/' + g_file_name_users_passwords_xml;
	
} // getFileNamePathUserNamesPasswords

// Returns the current concert number for a band name
// The function is based upon the way that the band names are set
// by the Admin function that creates the file UsersPasswords.xml  
// It is assumed that band name starts with 'Band' (g_user_name_start)
// and that the band names are 01, 02, ....
// TODO Find a better solution
// The function returns -1 if not a band name
function getConcertNumberFromBandName(i_user_name)
{
	var index_band = i_user_name.indexOf(g_user_name_start);
	if (index_band < 0)
	{
		return -1;
	}
	
	var concert_number_str = i_user_name.substring(index_band + g_user_name_start.length + 1);
	
	if (concert_number_str.length == 2)
	{
		var first_char = concert_number_str.substring(0, 1);
		
		if (first_char == "0")
		{
			concert_number_str = concert_number_str.substring(1);
		}
	}
	
	var ret_current_concert_number = parseInt(concert_number_str);
	
	return ret_current_concert_number;
		
} // getConcertNumberFromBandName


// Set current season
// Get the season start year that is defined in the user-passwords XML file. Call of getSeasonStartYear()
// TODO For the test version of Flyer this is the next season. For the printing one year less
// Please note. This function cannot be called by setGlobalParametersLoadXml. The user-passwords XML file
// is not yet loaded.
function setCurrentSeasonNumber()
{
	var season_start_year = getSeasonStartYear();
	
	/* ??? 20200520
	if (g_user_case_str == g_user_case_printer)
	{
		season_start_year = season_start_year - 1;
	}
	

	var autumn_year_str = (parseInt(season_start_year) + 1).toString();
	var spring_year_str = (parseInt(season_start_year) + 2).toString();	
	??? 20200520*/

	var autumn_year_str = (parseInt(season_start_year) + 0).toString();
	var spring_year_str = (parseInt(season_start_year) + 1).toString();	
	
	g_current_season_number = 1;
	
	var n_number_subdir_names = getNumberOfSubdirNames();
	
	for (var season_number=1; season_number <= n_number_subdir_names; season_number++)
	{
		var subdir_name = getSubdirectoryName(season_number);
		
		var index_autumn_year = subdir_name.indexOf(autumn_year_str);
		
		var index_spring_year = subdir_name.indexOf(spring_year_str);
		
		if (index_autumn_year >= 0 && index_spring_year >= 0)
		{
			g_current_season_number = season_number;
			break;
		}
		
	}
	
} // setCurrentSeasonNumber

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Login Utility Functions  ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

