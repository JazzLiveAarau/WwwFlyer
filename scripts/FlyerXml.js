// File: FlyerXml.js
// Date: 2020-02-21
// Author: Gunnar Lidén

// File content
// =============
// XML functions



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Season Program Active Mode  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Returns the season XML object defined by the Flyer application mode
// Flag g_flyer_application_mode defines the mode
// If mode= AdminXml: Returned object is getSeasonXmlObjectForActiveMode()
// If mode= EditXml: Returned object is element g_current_concert_number of g_xml_edit_objects
function getSeasonXmlObjectForActiveMode()
{
	var ret_season_data_xml_object = null; 

    if (g_flyer_application_mode == "AdminXml")
	{
		ret_season_data_xml_object = g_current_season_xml;
	}
	else if (g_flyer_application_mode == "EditXml")
	{
		ret_season_data_xml_object = g_xml_edit_objects[g_current_concert_number-1];
	}

    return ret_season_data_xml_object;
	
} // getSeasonXmlObjectForActiveMode

// Returns the concert number for the active mode
function getConcertNumberForActiveMode(i_concert_number)
{
	
    if (g_flyer_application_mode == "AdminXml")
	{
		return i_concert_number;
	}
	else if (g_flyer_application_mode == "EditXml")
	{
		return 1;
	}
	else
	{
		return -99;
	}
	
} // getConcertNumberForActiveMode

// Returns true if in AdminXml mode
function inAdminXmlMode()
{
    if (g_flyer_application_mode == "AdminXml")
	{
		return true;
	}
	else if (g_flyer_application_mode == "EditXml")
	{
		return false;
	}	
	
} // inAdminXmlMode


// Returns text that XML data not is available in XML Edit mode
function getTextNotAvailableInXmlEditMode()
{
	return "Data not available in XML Edit Mode";
	
} // getTextNotAvailableInXmlEditMode


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Season Program Active Mode  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Season Program Get Functions  /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Returns the number of musicians for a given concert number
function getNumberOfMusicians(i_concert_number)
{
	var ret_number_musicians = -12345;
	
	if (null == getSeasonXmlObjectForActiveMode())
	{
		alert("getNumberOfMusicians Season program XML object getSeasonXmlObjectForActiveMode() is null");
		
		ret_number_musicians = -1;
		
		return ret_number_musicians;
	}	
	
	if (i_concert_number < 1 || i_concert_number > 12)
	{
		alert("getNumberOfMusicians Concert number not between 1 and 12");
		
		ret_number_musicians = -2;
		
		return ret_number_musicians;		
	}
	
	var concert_node = getConcertNodeForActiveMode(i_concert_number);
	
	var musician_nodes = concert_node.getElementsByTagName(g_tag_season_program_musician);
	
	ret_number_musicians = musician_nodes.length;
	
	return ret_number_musicians;
	
} // getNumberOfMusicians


// Returns the musician name for a given concert and a given musician number
function getMusicianName(i_concert_number, i_musician_number)
{
	var ret_name = '';
	
	var musician_node_value = getMusicianNodeValue(g_tag_season_program_musician_name, i_concert_number, i_musician_number);
	
	ret_name = musician_node_value;
	
	return ret_name;
	
} // getMusicianName

// Returns the musician instrument for a given concert and a given musician number
function getMusicianInstrument(i_concert_number, i_musician_number)
{
	var ret_instrument = '';
	
	var musician_node_value = getMusicianNodeValue(g_tag_season_program_musician_instrument, i_concert_number, i_musician_number);
	
	ret_instrument = musician_node_value;
	
	return ret_instrument;
	
} // getMusicianInstrument

// Returns the musician text for a given concert and a given musician number
function getMusicianText(i_concert_number, i_musician_number)
{
	var ret_text = '';
	
	var musician_node_value = getMusicianNodeValue(g_tag_season_program_musician_text, i_concert_number, i_musician_number);
	
	ret_text = musician_node_value;
	
	return ret_text;
	
} // getMusicianText


// Returns the short text for a given concert number
function getConcertShortText(i_concert_number)
{
	return getConcertNodeValue(g_tag_season_program_short_text, i_concert_number);
	
} // getConcertShortText

/*QQQQ
// Returns the additional text label for a given concert number
function getConcertLabelAdditionalText(i_concert_number)
{
    if (g_flyer_application_mode == "AdminXml")
	{
	    // return "Label for additional Text from season program XML not available";
		g_flyer_application_mode = "EditXml";
		
		var concert_node_value = getConcertNodeValue(g_tag_season_program_label_additional_text, i_concert_number);
		
		g_flyer_application_mode = "AdminXml";
		
		return concert_node_value;
	}
	
	return getConcertNodeValue(g_tag_season_program_label_additional_text, i_concert_number);
	
} // getConcertLabelAdditionalText

// Returns the additional text for a given concert number
function getConcertAdditionalText(i_concert_number)
{
	return getConcertNodeValue(g_tag_season_program_additional_text, i_concert_number);
	
} // getConcertAdditionalText
QQQ*/
// Returns the flyer text label for a given concert number
function getConcertLabelFlyerText(i_concert_number)
{
	/*QQQQ
    if (g_flyer_application_mode == "AdminXml")
	{
		g_flyer_application_mode = "EditXml";
		
		var concert_node_value = getConcertNodeValue(g_tag_season_program_label_flyer_text, i_concert_number);
		
		g_flyer_application_mode = "AdminXml";
		
		return concert_node_value;
	}
	QQQ*/
	
	return getConcertNodeValue(g_tag_season_program_label_flyer_text, i_concert_number);
	
} // getConcertLabelFlyerText

// Returns the flyer text for a given concert number
function getConcertFlyerText(i_concert_number)
{
	return getConcertNodeValue(g_tag_season_program_flyer_text, i_concert_number);
	
} // getConcertFlyerText


// Returns the band name for a given concert number
function getBandName(i_concert_number)
{
	return getConcertNodeValue(g_tag_season_program_band_name, i_concert_number);
	
} // getBandName

// Returns the publish flyer text flag for a given concert number
function getPublishFlyerText(i_concert_number)
{
	var flag_value = getConcertNodeValue(g_tag_season_program_publish_flyer_text, i_concert_number);
	
	if (flag_value == "TRUE")
	{
		return true;
	}
	else
	{
		return false;
	}
	
} // getPublishFlyerText



// Returns the band website for a given concert number
function getBandWebsite(i_concert_number)
{
    if(!inAdminXmlMode())
	   return getTextNotAvailableInXmlEditMode();	
   
	return getConcertNodeValue(g_tag_season_program_band_website, i_concert_number);
	
} // getBandWebsite

// Returns the a sound sample link for a given concert number
function getSoundSample(i_concert_number)
{
    if(!inAdminXmlMode())
	   return getTextNotAvailableInXmlEditMode();	
   
	return getConcertNodeValue(g_tag_season_program_band_sound_sample, i_concert_number);
	
} // getSoundSample

// Returns the concert year for a given concert number
function getConcertYear(i_concert_number)
{
    if(!inAdminXmlMode())
	   return getTextNotAvailableInXmlEditMode();		
	return getConcertNodeValue(g_tag_season_program_year, i_concert_number);
	
} // getConcertYear

// Returns the concert month for a given concert number
function getConcertMonth(i_concert_number)
{
    if(!inAdminXmlMode())
	   return getTextNotAvailableInXmlEditMode();	
   
	return getConcertNodeValue(g_tag_season_program_month, i_concert_number);
	
} // getConcertMonth

// Returns the concert day for a given concert number
function getConcertDay(i_concert_number)
{
    if(!inAdminXmlMode())
	   return getTextNotAvailableInXmlEditMode();	
   
	return getConcertNodeValue(g_tag_season_program_day, i_concert_number);
	
} // getConcertDay


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Season Program Get Functions  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start XML Season Program Utility Functions //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns concert node for the active mode
function getConcertNodeForActiveMode(i_concert_number)
{	
	var season_xmp_object_current_season = getSeasonXmlObjectForActiveMode();
	
	var concert_nodes = season_xmp_object_current_season.getElementsByTagName(g_tag_season_program_concert);
	
	var mode_concert_number = getConcertNumberForActiveMode(i_concert_number);
	
	var ret_concert_node = concert_nodes[mode_concert_number-1];	
	
	return ret_concert_node;
	
} // getConcertNodeForActiveMode

// Returns the node value for a given concert number and a tag name
function getConcertNodeValue(i_concert_tag, i_concert_number)
{
	var ret_data = '';
	
	if (null == getSeasonXmlObjectForActiveMode())
	{
		alert("getConcertNodeValue Season program XML object getSeasonXmlObjectForActiveMode() is null");
		return ret_data;
	}	
	
	if (i_concert_number < 1 || i_concert_number > 12)
	{
		alert("getConcertNodeValue Concert number not between 1 and 12");
		return ret_data;		
	}
		
	var xml_node = getConcertNodeForActiveMode(i_concert_number);
	
	var xml_node_value = getNodeValueTagName(xml_node, i_concert_tag);
	
	ret_data = removeFlagNodeValueNotSet(xml_node_value);
	
	// ret_data = removeXmlEscapeCodes(ret_data);
	
	return ret_data;
	
} // getConcertNodeValue

// Returns a musician node value for a musician tag, musician number and concert number
function getMusicianNodeValue(i_musician_tag, i_concert_number, i_musician_number)
{
	var ret_node_value = '';
	
	if (null == getSeasonXmlObjectForActiveMode())
	{
		alert("getMusicianNodeValue Season program XML object getSeasonXmlObjectForActiveMode() is null");
		return ret_node_value;
	}	
	
	if (i_concert_number < 1 || i_concert_number > 12)
	{
		alert("getMusicianNodeValue Concert number not between 1 and 12");
		return ret_node_value;		
	}
		
	var concert_node = getConcertNodeForActiveMode(i_concert_number);
	
	var musician_nodes = concert_node.getElementsByTagName(g_tag_season_program_musician);
	
	if (i_musician_number < 1 || i_musician_number > musician_nodes.length)
	{
		alert("getMusicianNodeValue Musician number is not between 1 and " + musician_nodes.length.toString());
		return ret_node_value;
	}

	var musician_node = musician_nodes[i_musician_number - 1];
	
	var musician_node_value = getNodeValueTagName(musician_node, i_musician_tag);
	
	ret_node_value = removeFlagNodeValueNotSet(musician_node_value);
	
	// ret_node_value = removeXmlEscapeCodes(ret_node_value);
	
	return ret_node_value;
	
} // getMusicianNodeValue

// Returns the node value. Input is an XML node and the tag name
function getNodeValueTagName(i_node, i_xml_tag)
{	
	return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
	
} // getNodeValueTagName

// Returns the node value. Input is an XML node 
function getNodeValue(i_node)
{	
	return i_node.childNodes[0].nodeValue;
	
} // getNodeValueTagName



// Sets the node value for a given concert number and a tag name
// Remark: Concert number is not really used, but anyhow kept as input
//         In the future it may be that also data is set in the season
//         program XML file in the subdirectory AdminXml
function setConcertNodeValue(i_concert_tag, i_concert_number, i_node_value)
{
	if (null == getSeasonXmlObjectForActiveMode())
	{
		alert("setConcertNodeValue Season program XML object getSeasonXmlObjectForActiveMode() is null");
		return ret_data;
	}	
	
	if (i_concert_number < 1 || i_concert_number > 12)
	{
		alert("setConcertNodeValue Concert number not between 1 and 12");
		return ret_data;		
	}
		
	var xml_node = getConcertNodeForActiveMode(i_concert_number);
	
	setNodeValue(xml_node, i_concert_tag, i_node_value);
	
} // setConcertNodeValue

// Sets a musician node value for a musician tag, musician number and concert number
// Remark: Concert number is not really used, but anyhow kept as input
//         In the future it may be that also data is set in the season
//         program XML file in the subdirectory AdminXml
function setMusicianNodeValue(i_musician_tag, i_concert_number, i_musician_number, i_musician_node_value)
{
	if (null == getSeasonXmlObjectForActiveMode())
	{
		alert("setMusicianNodeValue Season program XML object getSeasonXmlObjectForActiveMode() is null");
		return ret_node_value;
	}	
	
	if (i_concert_number < 1 || i_concert_number > 12)
	{
		alert("setMusicianNodeValue Concert number not between 1 and 12");
		return ret_node_value;		
	}
		
	var concert_node = getConcertNodeForActiveMode(i_concert_number);
	
	var musician_nodes = concert_node.getElementsByTagName(g_tag_season_program_musician);
	
	if (i_musician_number < 1 || i_musician_number > musician_nodes.length)
	{
		alert("setMusicianNodeValue Musician number is not between 1 and " + musician_nodes.length.toString());
		return ret_node_value;
	}

	var musician_node = musician_nodes[i_musician_number - 1];
	
	setNodeValue(musician_node, i_musician_tag, i_musician_node_value);
	
} // setMusicianNodeValue


// Sets a node value. Input is an XML node, the tag name and the node value
function setNodeValue(i_node, i_xml_tag, i_node_value)
{	
	i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
	
} // setNodeValue


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End XML Season Program Utility Functions ////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start XML Edit Set Functions  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the musician name for a given concert and a given musician number
function setMusicianName(i_concert_number, i_musician_number, i_musician_name)
{
	setMusicianNodeValue(g_tag_season_program_musician_name, i_concert_number, i_musician_number, i_musician_name);
	
} // setMusicianName

// Sets the musician instrument for a given concert and a given musician number
function setMusicianInstrument(i_concert_number, i_musician_number, i_musician_instrument)
{
	setMusicianNodeValue(g_tag_season_program_musician_instrument, i_concert_number, i_musician_number, i_musician_instrument);
	
} // setMusicianInstrument

// Sets the musician text for a given concert and a given musician number
function setMusicianText(i_concert_number, i_musician_number, i_musician_text)
{
	setMusicianNodeValue(g_tag_season_program_musician_text, i_concert_number, i_musician_number, i_musician_text);
	
} // setMusicianText


// Sets the short text for a given concert number
function setConcertShortText(i_concert_number, i_short_text)
{
	setConcertNodeValue(g_tag_season_program_short_text, i_concert_number, i_short_text);
	
} // setConcertShortText

/*QQQ
// Sets the additional text label for a given concert number
function setConcertLabelAdditionalText(i_concert_number, i_label_additional_text)
{
    if (g_flyer_application_mode == "AdminXml")
	{
	    Alert ("Label for additional Text cannot be set in season program XML");
		return;
	}
	
	setConcertNodeValue(g_tag_season_program_label_additional_text, i_concert_number, i_label_additional_text);
	
} // setConcertLabelAdditionalText

// Sets the additional text for a given concert number
function setConcertAdditionalText(i_concert_number, i_additional_text)
{
	setConcertNodeValue(g_tag_season_program_additional_text, i_concert_number, i_additional_text);
	
} // setConcertAdditionalText
QQQ*/

// Sets the flyer text label for a given concert number
function setConcertLabelFlyerText(i_concert_number, i_label_flyer_text)
{
    if (g_flyer_application_mode == "AdminXml")
	{
	    Alert ("Label for additional Text cannot be set in season program XML");
		return;
	}
	
	setConcertNodeValue(g_tag_season_program_label_flyer_text, i_concert_number, i_label_flyer_text);
	
} // setConcertLabelFlyerText

// Sets the flyer text for a given concert number
function setConcertFlyerText(i_concert_number, i_flyer_text)
{
	setConcertNodeValue(g_tag_season_program_flyer_text, i_concert_number, i_flyer_text);
	
} // setConcertFlyerText

// Sets the band name for a given concert number
function setBandName(i_concert_number, i_band_name)
{
	setConcertNodeValue(g_tag_season_program_band_name, i_concert_number, i_band_name);
	
} // setBandName

// Sets the publish flyer text flag for a given concert number
function setPublishFlyerText(i_concert_number, i_publish_flag)
{
    var flag_value = "FALSE";
	if (i_publish_flag == true)
	{
	    flag_value = "TRUE";
	}
	
	setConcertNodeValue(g_tag_season_program_publish_flyer_text, i_concert_number, flag_value);
	
} // setPublishFlyerText


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End XML Edit Set Functions  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Application Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Returns the club name
function getApplicationClubName()
{
	var ret_club_name = '';
	
	if (null == g_application_xml)
	{
		alert("getApplicationClubName Subdirectory names XML object g_application_xml is null");
		return ret_club_name;
	}	
	
	var club_name_node = g_application_xml.getElementsByTagName(g_tag_application_club_name)[0];
	
	var club_name_node_value = getNodeValue(club_name_node);
	
	ret_club_name = club_name_node_value;
	
    return ret_club_name;
	
} // getApplicationClubName

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Application Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Directory Names Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the number of subdirectory names
function getNumberOfSubdirNames()
{
	var ret_number = -12345;
	
	if (null == g_subdirectory_names_xml)
	{
		alert("getNumberOfSubdirNames Subdirectory names XML object g_subdirectory_names_xml is null");
		return ret_number;
	}	

    // Get all name nodes 
	var name_nodes = g_subdirectory_names_xml.getElementsByTagName(g_tag_subdir_name);
	
	ret_number = name_nodes.length;
	
    return ret_number;
		
} // getNumberOfSubdirNames

// Returns the subdirectory name for a given subdirectory number 
// between 1 and the number of subdirectory names
function getSubdirectoryName(i_subdir_number)
{
	var ret_subdir_name = '';
	
    // Get all name nodes 
	var name_nodes = g_subdirectory_names_xml.getElementsByTagName(g_tag_subdir_name);
	
	if (i_subdir_number < 1 || i_subdir_number > name_nodes.length)
	{
		alert("getSubdirectoryName Subdirectory number is not between 1 and " + name_nodes.length.toString());
	
		return ret_subdir_name;
	}
	
	var subdir_name_node = name_nodes[i_subdir_number - 1];
	
	var subdir_name_node_value = getNodeValue(subdir_name_node);
	
	ret_subdir_name = subdir_name_node_value;
	
	return ret_subdir_name;
	
} // getSubdirectoryName



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Directory Names Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start User & Password Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the number of user names
function getNumberOfUserNames()
{
	var ret_number_user_names = -12345;
	
	if (null == g_name_users_passwords_xml)
	{
		alert("getNumberOfUserNames User names and passwords XML object g_name_users_passwords_xml is null");
		return ret_number_user_names;
	}	

    // Get all user name nodes 
	var user_name_nodes = g_name_users_passwords_xml.getElementsByTagName(g_tag_user_name);
	
	ret_number_user_names = user_name_nodes.length;
	
    return ret_number_user_names;
		
} // getNumberOfUserNames

// Returns the number of user passwords
function getNumberOfUserPasswords()
{
	var ret_number_user_passwords = -12345;
	
	if (null == g_name_users_passwords_xml)
	{
		alert("getNumberOfUserPasswords User names and passwords XML object g_name_users_passwords_xml is null");
		return ret_number_user_passwords;
	}	

    // Get all password nodes 
	var name_nodes = g_name_users_passwords_xml.getElementsByTagName(g_tag_user_password);
	
	ret_number_user_passwords = name_nodes.length;
	
    return ret_number_user_passwords;
		
} // getNumberOfUserPasswords


// Returns the user name for a given user number 
// between 1 and the number of user names
function getUserName(i_user_number)
{
	var ret_user_name = '';
	
    // Get all user name nodes 
	var user_name_nodes = g_name_users_passwords_xml.getElementsByTagName(g_tag_user_name);
	
	if (i_user_number < 1 || i_user_number > user_name_nodes.length)
	{
		alert("getUserName User number is not between 1 and " + user_name_nodes.length.toString());
	
		return ret_user_name;
	}
	
	var user_name_node = user_name_nodes[i_user_number - 1];
	
	var user_name_node_value = getNodeValue(user_name_node);
	
	ret_user_name = user_name_node_value;
	
	return ret_user_name;
	
} // getUserName

// Returns the user password for a given user number 
// between 1 and the number of user names
function getUserPassword(i_user_number)
{
	var ret_user_password = '';
	
    // Get all user name nodes 
	var user_password_nodes = g_name_users_passwords_xml.getElementsByTagName(g_tag_user_password);
	
	if (i_user_number < 1 || i_user_number > user_password_nodes.length)
	{
		alert("getUserPassword User number is not between 1 and " + user_password_nodes.length.toString());
	
		return ret_user_password;
	}
	
	var user_password_node = user_password_nodes[i_user_number - 1];
	
	var user_password_node_value = getNodeValue(user_password_node);
	
	ret_user_password = user_password_node_value;
	
	return ret_user_password;
	
} // getUserPassword

// Sets the user password for a given user number 
// between 1 and the number of user names
function setUserPassword(i_user_number, i_user_password)
{
    // Get all user name nodes 
	var user_password_nodes = g_name_users_passwords_xml.getElementsByTagName(g_tag_user_password);
	
	if (i_user_number < 1 || i_user_number > user_password_nodes.length)
	{
		alert("setUserPassword User number is not between 1 and " + user_password_nodes.length.toString());
	
		return;
	}
	
	var user_password_node = user_password_nodes[i_user_number - 1];
	
	user_password_node.childNodes[0].nodeValue = i_user_password;
	
	
} // setUserPassword


// Returns the season start year that is defined in the user-passwords XML file
function getSeasonStartYear()
{
	var ret_season_start_year = -12345;
	
	if (null == g_name_users_passwords_xml)
	{
		alert("getNumberOfUserPasswords User names and passwords XML object g_name_users_passwords_xml is null");
		return ret_number_user_passwords;
	}	
	
	var season_start_year_node = g_name_users_passwords_xml.getElementsByTagName(g_tag_season_start_year)[0];
	
	var season_start_year_node_value = getNodeValue(season_start_year_node);
	
	ret_season_start_year = parseInt(season_start_year_node_value);
	
    return ret_season_start_year;
	
} // getSeasonStartYear


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End User & Password Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_not_yet_set_node_value = "NotYetSetNodeValue";

// Returns true if the node value is set
function nodeValueIsSet(i_node_value)
{
	if (i_node_value == g_not_yet_set_node_value)
	{
		return false;
	}
	else
	{
		return true;
	}
	
} // nodeValueIsSet

// Returns empty string if i_node_value is equal to g_not_yet_set_node_value
function removeFlagNodeValueNotSet(i_node_value)
{
	if (!nodeValueIsSet(i_node_value))
	{
		return "";
	}
	
	return i_node_value; 
	
} // removeFlagNodeValueNotSet

// Return flag (string) g_not_yet_set_node_value if input string is empty
function setFlagNodeValueIsNotSetForEmptyString(i_node_value)
{
	var trimmed_node_value = i_node_value.trim();
	
	if (trimmed_node_value.length == 0)
	{
		return g_not_yet_set_node_value;
	}
	
	return i_node_value;

} // setFlagNodeValueIsNotSetForEmptyString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Replace String Functions //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_char_ampersand = "&";
var g_char_html_ampersand = "&amp;";

var g_char_less_than = "<";
var g_char_html_less_than = "&lt;";

var g_char_greater_than = ">";
var g_char_html_greater_than = "&gt;";


// Replaces not allowed characters for an XML value like for instance &, < and >
function ReplaceNotAllowedXmlChars(i_xml_value)
{
	var ret_html_value = i_xml_value;
	
	// This shall not be done here. It is done by function saveXmlEditObjectToFile
	/*
	ret_html_value = ret_html_value.replace(g_char_ampersand, g_char_html_ampersand);
	
	ret_html_value = ret_html_value.replace(g_char_less_than, g_char_html_less_than);
	
	ret_html_value = ret_html_value.replace(g_char_greater_than, g_char_html_greater_than);
	*/
	
	return ret_html_value;
	
} // ReplaceNotAllowedXmlChars

// Removes the escape codes for &, < and >
function removeXmlEscapeCodes(i_xml_value)
{
	var ret_html_value = i_xml_value;
	
	ret_html_value = ret_html_value.replace(g_char_html_ampersand, g_char_ampersand);
	
	ret_html_value = ret_html_value.replace(g_char_html_less_than, g_char_less_than);
	
	ret_html_value = ret_html_value.replace(g_char_html_greater_than, g_char_greater_than);
	
	return ret_html_value;
	
} // removeXmlEscapeCodes


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Replace String Functions ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/*
        /// <summary>Remove a not defined value, add quotes and comma</summary>
        static private string Mod(string i_xml_value)
        {
            string ret_str = "\"\",";

            if (!JazzXml.XmlNodeValueIsSet(i_xml_value))
                return ret_str;

            if (i_xml_value.Equals("TRUE"))
                return "true,";

            if (i_xml_value.Equals("FALSE"))
                return "false,";

            ret_str = "\"" + ReplaceNotAllowedChars(i_xml_value) + "\",";

            return ret_str;

        } // Mod

        /// <summary>Remove a not defined value, add quotes and comma</summary>
        static private string End(string i_xml_value)
        {
            string ret_str = "\"\"";

            if (!JazzXml.XmlNodeValueIsSet(i_xml_value))
                return ret_str;

            if (i_xml_value.Equals("TRUE"))
                return "true";

            if (i_xml_value.Equals("FALSE"))
                return "false";

            ret_str = "\"" + ReplaceNotAllowedChars(i_xml_value) + "\"";

            return ret_str;

        } // End

        /// <summary>Replace not allowed characters</summary>
        static public string ReplaceNotAllowedChars(string i_xml_value)
        {
            string ret_str = i_xml_value;

            if (ret_str.Length == 0)
                return ret_str;

            ret_str = AdminUtils.RemoveJazzLiveAarauUrl(ret_str);
            if (!JazzXml.XmlNodeValueIsSet(ret_str) || ret_str.Length == 0) 
                return "";

            // Before there are & that this function added
            string amp_str = "&";
            string amp_html = "&amp;";
            ret_str = ret_str.Replace(amp_str, amp_html);

            string lt_str = "<";
            string lt_html = "&lt;";
            ret_str = ret_str.Replace(lt_str, lt_html);

            string gt_str = ">";
            string gt_html = "&gt;";
            ret_str = ret_str.Replace(gt_str, gt_html);

            // Add < and > after the above two calls
            string new_line = "\r\n";
            string html_new_line = "<br>";
            ret_str = ret_str.Replace(new_line, html_new_line);

            new_line = "\n";
            ret_str = ret_str.Replace(new_line, html_new_line);

            string qout_str = "\"";
            string qout_html = "&quot;";
            ret_str = ret_str.Replace(qout_str, qout_html);

            qout_str = "„";
            ret_str = ret_str.Replace(qout_str, qout_html);

            qout_str = "“";
            ret_str = ret_str.Replace(qout_str, qout_html);


            string apos_str = "'";
            string apos_html = "&apos;";
            ret_str = ret_str.Replace(apos_str, apos_html);

            return ret_str;

        } // ReplaceNotAllowedChars

*/