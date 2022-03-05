// File: FlyerControls.js
// Date: 2022-01-25
// Author: Gunnar Lidén

// File content
// =============
// Creates and sets controls like dropdowns and 


// Arrays for the concert drop down
var g_drop_down_concert_name_array = [];
var g_drop_down_concert_number_array = [];

// Arrays for the season drop down
var g_drop_down_season_name_array = [];
var g_drop_down_season_number_array = [];

// Arrays for the login drop down
var g_drop_down_user_name_array = [];
var g_drop_down_user_index_array = [];
var g_drop_down_user_password_array = [];

// Arrays for the musician drop down
var g_drop_down_musician_name_array = [];
var g_drop_down_musician_number_array = [];

// Arrays for the text drop down
var g_drop_down_text_name_array = [];
var g_drop_down_text_number_array = [];

// String defining the logout event function
var g_logout_event_fctn_str = ' onclick="eventLogoutFlyer()" ';

// Flag telling that the logout button is being initialized
var g_init_logout_button = false;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Concert  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set concerts dropdown 
// Input data is an id for a <div> element where the dropdown shall be added and
// the case musician (concert number) or administrator (global variable g_user_case_str) 
// 1. Set the global array variables with data for the dropdown. Call of setSeasonConcertArrays.
// 2. Set (selected) array data defining the dropdown. Call of setConcertDropDownArrays 
// 3. Get the HTML code for the dropdown. Call of getConcertsDropDownHtml
// 4. Get the <div> element with the input identity
// 5. Set the value (innerHTML) of the <div> element.
// 6. Set current musician number to one (1)
function setConcertsDropDown(i_id_div_element_concert)
{
    for (var concert_number=1; concert_number <= 12; concert_number++)
	{
		g_drop_down_concert_name_array[concert_number - 1] = "Konzert " + concert_number.toString();
		g_drop_down_concert_number_array[concert_number - 1] = concert_number;
	}
   
    var dropdown_html = getConcertsDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element_concert);	
    if (null == element_div_dropdown)
    {
        alert("setConcertsDropDown element_div_dropdown is null");
        return;
    }
	
	var dropdown_tooltip = getTooltipHtml(g_tooltip_concert_dropdown, g_id_tooltip_concert_dropdown);
		
    element_div_dropdown.innerHTML = dropdown_html + dropdown_tooltip + '<br>';
	
	g_current_musician_number = 1;
	
} // setConcertsDropDown

// Get the concerts dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
function getConcertsDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_dropdown_html = '';
	
    if (g_drop_down_concert_name_array.length == 0)
	{
        alert("getConcertsDropDownHtml g_drop_down_concert_name_array has length zero (0)");
        return ret_dropdown_html;
	}

    ret_dropdown_html = ret_dropdown_html + '<select class= "custom_select" id= "id_dropdown_concerts" name="dropdown_concerts"  onchange= "eventSelectConcertDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_concert_name_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_concert_number_array[index_dropdown].toString() + '">' + g_drop_down_concert_name_array[index_dropdown] + '</option><br>';

        ret_dropdown_html = ret_dropdown_html + option_str;  
    }

    ret_dropdown_html = ret_dropdown_html + '</select>';
	
    return ret_dropdown_html;
	
} // getConcertsDropDownHtml

// Event handling function when the user selected a concert
function eventSelectConcertDropDown()
{	
    var dropdown_element = document.getElementById("id_dropdown_concerts");
    if (dropdown_element == null)
	{
        alert("eventSelectConcertDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_concert_number = dropdown_element.value;
	
	g_current_concert_number = new_value_concert_number;
	
	g_current_musician_number = 1;

	g_current_text_number = 1;
	
	setMusiciansDropDown(g_id_div_musician_drop_down);
	
	setTextsDropDown(g_id_div_text_drop_down);

    setAllTexts();
	
	setAllImages();
	
	setXmlEditControls();

	hideDivDisplayCheckBandData();
	
} // eventSelectConcertDropDown


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Start Dropdown Concert  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Season  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set seasons dropdown 
// Input data is an id for a <div> element where the dropdown shall be added and
// the case musician (concert number) or administrator (global variable g_user_case_str) 
// 1. Set the global array variables with data for the dropdown. Call of setSeasonConcertArrays.
// 2. Set (selected) array data defining the dropdown. Call of setConcertDropDownArrays 
// 3. Get the HTML code for the dropdown. Call of getSeasonsDropDownHtml
// 4. Get the <div> element with the input identity
// 5. Set the value (innerHTML) of the <div> element.
function setSeasonsDropDown(i_id_div_element_season)
{
	var n_number_subdir_names = getNumberOfSubdirNames();
	
    for (var season_number=1; season_number <= n_number_subdir_names; season_number++)
	{
		var subdir_name = getSubdirectoryName(season_number);
		
		g_drop_down_season_name_array[season_number - 1] = subdir_name;
		g_drop_down_season_number_array[season_number - 1] = season_number;
	}
   
    var dropdown_html = getSeasonsDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element_season);	
    if (null == element_div_dropdown)
    {
        alert("setSeasonsDropDown element_div_dropdown is null");
        return;
    }
	
	var dropdown_tooltip = getTooltipHtml(g_tooltip_season_dropdown, g_id_tooltip_season_dropdown);
	
    element_div_dropdown.innerHTML = dropdown_html + dropdown_tooltip + '<br>';
	
	setDropdownSeasonToCurrentSeason();
	
} // setSeasonsDropDown

// Get the season dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
function getSeasonsDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_dropdown_html = '';
	
    if (g_drop_down_season_name_array.length == 0)
	{
        alert("getSeasonsDropDownHtml g_drop_down_season_name_array has length zero (0)");
        return ret_dropdown_html;
	}

    ret_dropdown_html = ret_dropdown_html + '<select class= "custom_select" id= "id_dropdown_seasons" name="dropdown_seasons"  onchange= "eventSelectSeasonDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_season_name_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_season_number_array[index_dropdown].toString() + '">' + g_drop_down_season_name_array[index_dropdown] + '</option><br>';

        ret_dropdown_html = ret_dropdown_html + option_str;  
    }

    ret_dropdown_html = ret_dropdown_html + '</select>';
	
    return ret_dropdown_html;
	
} // getSeasonsDropDownHtml

// Set dropdown season to current season
function setDropdownSeasonToCurrentSeason()
{
   var dropdown_element = document.getElementById("id_dropdown_seasons");
   if (dropdown_element == null)
   {
        alert("setDropdownSeasonToCurrentSeason id_dropdown_seasons is null");
        return;		
   }	
   
   dropdown_element.value = g_current_season_number;
	
} // setDropdownSeasonToCurrentSeason

// Event handling function when the user selected a season
function eventSelectSeasonDropDown()
{	
    var dropdown_element = document.getElementById("id_dropdown_seasons");
    if (dropdown_element == null)
	{
        alert("eventSelectSeasonDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_season_number = dropdown_element.value;
	
	g_current_season_number = new_value_season_number;

	hideDivDisplayCheckBandData();
	
	var file_name_season_xml = getFileNamePathSeasonXml();
		
	loadSeasonXml(file_name_season_xml);
	
} // eventSelectSeasonDropDown


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Dropdown Season  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Login  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set login dropdown 
// Input data is an id for a <div> element where the dropdown shall be added and
// the case musician (concert number) or administrator (global variable g_user_case_str) 
// 1. Set the global array variables with data for the dropdown. Call of setSeasonConcertArrays.
// 2. Set (selected) array data defining the dropdown. Call of setConcertDropDownArrays 
// 3. Get the HTML code for the dropdown. Call of getLoginDropDownHtml
// 4. Get the <div> element with the input identity
// 5. Set the value (innerHTML) of the <div> element.
function setLoginDropDown(i_id_div_element_login)
{
	var n_number_login_names = getNumberOfUserNames();
	
	g_drop_down_user_name_array[0] = g_label_login_name;
	g_drop_down_user_password_array[0] = "-";
	g_drop_down_user_index_array[0] = 0;	
	
    for (var user_number=1; user_number <= n_number_login_names; user_number++)
	{		
		var user_name = getUserName(user_number);
		var user_password = getUserPassword(user_number);
		
		g_drop_down_user_name_array[user_number] = user_name;
		g_drop_down_user_password_array[user_number] = user_password;
		g_drop_down_user_index_array[user_number] = user_number;
	}
   
    var login_dropdown_html = getLoginDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element_login);	
    if (null == element_div_dropdown)
    {
        alert("setLoginDropDown element_div_dropdown is null");
        return;
    }
	
	var dropdown_tooltip = getTooltipHtml(g_tooltip_login_dropdown, g_id_tooltip_login_dropdown);
	
    element_div_dropdown.innerHTML = login_dropdown_html + dropdown_tooltip + '<br>';
	
} // setLoginDropDown


// Get the login dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
function getLoginDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_login_dropdown_html = '';
	
    if (g_drop_down_user_name_array.length == 0)
	{
        alert("getLoginDropDownHtml g_drop_down_user_name_array has length zero (0)");
        return ret_login_dropdown_html;
	}

    ret_login_dropdown_html = ret_login_dropdown_html + '<select class= "custom_select" id= "id_dropdown_login" name="dropdown_login"  onchange= "eventSelectLoginDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_user_name_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_user_index_array[index_dropdown].toString() + '">' + g_drop_down_user_name_array[index_dropdown] + '</option><br>';

        ret_login_dropdown_html = ret_login_dropdown_html + option_str;  
    }

    ret_login_dropdown_html = ret_login_dropdown_html + '</select>';
	
    return ret_login_dropdown_html;
	
} // getLoginDropDownHtml

// Remove the login dropdown
function hideLoginDropDown()
{
    var element_div_dropdown = document.getElementById("id_dropdown_login");	
    if (null == element_div_dropdown)
    {
        alert("hideLoginDropDown element_div_dropdown is null");
        return;
    }
	
    element_div_dropdown.style.display = "none";
	
} // hideLoginDropDown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Dropdown Login  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Password  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Set password dropdown 
// Input data is an id for a <div> element where the dropdown shall be added and
// the case musician (concert number) or administrator (global variable g_user_case_str) 
// 1. Set the global array variables with data for the dropdown. Call of setSeasonConcertArrays.
// 2. Set (selected) array data defining the dropdown. Call of setConcertDropDownArrays 
// 3. Get the HTML code for the dropdown. Call of getPasswordDropDownHtml
// 4. Get the <div> element with the input identity
// 5. Set the value (innerHTML) of the <div> element.
function setPasswordDropDown(i_id_div_element_password)
{
	var n_number_login_names = getNumberOfUserNames();
	
	g_drop_down_user_name_array[0] = g_label_login_passwords;
	g_drop_down_user_password_array[0] = "-";
	g_drop_down_user_index_array[0] = 0;	
	
    for (var user_number=1; user_number <= n_number_login_names; user_number++)
	{		
		var user_name = getUserName(user_number);
		var user_password = getUserPassword(user_number);
		
		g_drop_down_user_name_array[user_number] = user_name;
		g_drop_down_user_password_array[user_number] = user_password;
		g_drop_down_user_index_array[user_number] = user_number;
	}
   
    var password_dropdown_html = getPasswordDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element_password);	
    if (null == element_div_dropdown)
    {
        alert("setPasswordDropDown element_div_dropdown is null");
        return;
    }
	
	var dropdown_tooltip = getTooltipHtml(g_tooltip_password_dropdown, g_id_tooltip_password_dropdown);
	
    element_div_dropdown.innerHTML = password_dropdown_html + dropdown_tooltip + '<br>';
	
} // setPasswordDropDown


// Get the password dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
function getPasswordDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_password_dropdown_html = '';
	
    if (g_drop_down_user_name_array.length == 0)
	{
        alert("getPasswordDropDownHtml g_drop_down_user_name_array has length zero (0)");
        return ret_password_dropdown_html;
	}

    ret_password_dropdown_html = ret_password_dropdown_html + '<select class= "custom_select" id= "id_dropdown_password" name="dropdown_password"  onchange= "eventSelectPasswordDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_user_name_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_user_index_array[index_dropdown].toString() + '">' + g_drop_down_user_name_array[index_dropdown] + '</option><br>';

        ret_password_dropdown_html = ret_password_dropdown_html + option_str;  
    }

    ret_password_dropdown_html = ret_password_dropdown_html + '</select>';
	
    return ret_password_dropdown_html;
	
} // getPasswordDropDownHtml

// Remove the password dropdown
function removePasswordDropDown()
{
    var element_div_dropdown = document.getElementById("id_dropdown_password");	
    if (null == element_div_dropdown)
    {
        alert("removePasswordDropDown element_div_dropdown is null");
        return;
    }
	
    element_div_dropdown.style.display = "none";
	
} // removePasswordDropDown

// Event handling function when the user selected a login name
function eventSelectPasswordDropDown()
{	
    var dropdown_element = document.getElementById("id_dropdown_password");
    if (dropdown_element == null)
	{
        alert("eventSelectPasswordDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_password_index = dropdown_element.value;
	
	var user_name = g_drop_down_user_name_array[new_value_password_index];
	var user_old_password = g_drop_down_user_password_array[new_value_password_index];
	
	var new_password = getNewPasswordFromAdministrator(user_name, user_old_password);
	
	if (new_password.length > 0)
	{
		
		g_drop_down_user_password_array[new_value_password_index] = new_password;
		
		setUserPassword(new_value_password_index, new_password);
		
		saveXmlUserPasswordObjectToFile();
		
		dropdown_element.value = 0;
	}
	else
	{
		alert("Passwort ist ungültig");
		
		// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_value

		dropdown_element.value = 0;
	}
	
} // eventSelectPasswordDropDown


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Dropdown Password  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Musician  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set musicians dropdown 
// Input data is an id for a <div> element where the dropdown shall be added 
// 1. Set the global array variables with data for the dropdown. Call of getNumberOfMusicians
// 2. Get the HTML code for the dropdown. Call of getMusiciansDropDownHtml
// 3. Get the <div> element with the input identity
// 4. Set the value (innerHTML) of the <div> element.
function setMusiciansDropDown(i_id_div_element_musician)
{
	g_drop_down_musician_name_array.length = 0;
	g_drop_down_musician_number_array.length = 0;
	
    var n_musicians = getNumberOfMusicians(g_current_concert_number);
	
    for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_name = getMusicianName(g_current_concert_number, musician_number);
		
		g_drop_down_musician_name_array[musician_number - 1] = musician_name;		
		
		g_drop_down_musician_number_array[musician_number - 1] = musician_number;
	}
   
    var dropdown_html = getMusiciansDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element_musician);	
    if (null == element_div_dropdown)
    {
        alert("setMusiciansDropDown element_div_dropdown is null");
        return;
    }

    var dropdown_tooltip = getTooltipHtml(g_tooltip_musician_dropdown, g_id_tooltip_musician_dropdown);

    element_div_dropdown.innerHTML = dropdown_html + dropdown_tooltip + '<br>';
	
} // setMusiciansDropDown

// Get the concerts dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
function getMusiciansDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_musician_dropdown_html = '';
	
    if (g_drop_down_musician_name_array.length == 0)
	{
        alert("getMusiciansDropDownHtml g_drop_down_musician_name_array has length zero (0)");
        return ret_musician_dropdown_html;
	}

    ret_musician_dropdown_html = ret_musician_dropdown_html + '<select class= "custom_select" id= "id_dropdown_musicians" name="dropdown_musicians"  onchange= "eventSelectMusicianDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_musician_name_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_musician_number_array[index_dropdown].toString() + '">' + g_drop_down_musician_name_array[index_dropdown] + '</option><br>';

        ret_musician_dropdown_html = ret_musician_dropdown_html + option_str;  
    }

    ret_musician_dropdown_html = ret_musician_dropdown_html + '</select>';
	
    return ret_musician_dropdown_html;
	
} // getMusiciansDropDownHtml

// Event handling function when the user selected a musician
function eventSelectMusicianDropDown()
{	
    var dropdown_element = document.getElementById("id_dropdown_musicians");
    if (dropdown_element == null)
	{
        alert("eventSelectMusicianDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_musician_number = dropdown_element.value;
	
	g_current_musician_number = new_value_musician_number;

    setXmlEditControls();
	
	
} // eventSelectMusicianDropDown


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Dropdown Musician  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Text  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set texts dropdown 
// Input data is an id for a <div> element where the dropdown shall be added and
// the case musician (concert number) or administrator (global variable g_user_case_str) 
// 1. Set the global array variables with data for the dropdown. 
// 2. Get the HTML code for the dropdown. Call of getTextsDropDownHtml
// 3. Get the <div> element with the input identity
// 4. Set the value (innerHTML) of the <div> element.
function setTextsDropDown(i_id_div_element_text)
{
    var n_texts = 3;
	
	g_drop_down_text_name_array[0] = g_label_text_short_text;
	g_drop_down_text_name_array[1] = g_label_text_musician_text;
	
    if (g_user_case_str == g_user_case_admin || g_user_case_str == g_user_case_tester)
	{
	    g_drop_down_text_name_array[2] = g_label_text_additional_text;
	}
	
    for (var text_number=1; text_number <= n_texts; text_number++)
	{		
		g_drop_down_text_number_array[text_number - 1] = text_number;
	}
   
    var dropdown_html = getTextsDropDownHtml();
	
    var element_div_dropdown = document.getElementById(i_id_div_element_text);	
    if (null == element_div_dropdown)
    {
        alert("setTextsDropDown element_div_dropdown is null");
        return;
    }
	
	var dropdown_tooltip = getTooltipHtml(g_tooltip_text_input_case_dropdown, g_id_tooltip_text_input_case_dropdown);
	
    element_div_dropdown.innerHTML = dropdown_html + dropdown_tooltip + '<br>';
	
} // setTextsDropDown

// Get the texts dropdown dialog as HTML code
// The dropdown arrays must have been set before this function is called,
function getTextsDropDownHtml()
{
    // https://www.w3schools.com/tags/att_select_name.asp
	
    var ret_text_dropdown_html = '';
	
    if (g_drop_down_text_name_array.length == 0)
	{
        alert("getTextsDropDownHtml g_drop_down_text_name_array has length zero (0)");
        return ret_text_dropdown_html;
	}

    ret_text_dropdown_html = ret_text_dropdown_html + '<select class= "custom_select" id= "id_dropdown_texts" name="dropdown_texts"  onchange= "eventSelectTextDropDown()" ><br>';
	
    for (index_dropdown=0; index_dropdown < g_drop_down_text_name_array.length; index_dropdown++)
    {
        var option_str = '<option value="' + g_drop_down_text_number_array[index_dropdown].toString() + '">' + g_drop_down_text_name_array[index_dropdown] + '</option><br>';

        ret_text_dropdown_html = ret_text_dropdown_html + option_str;  
    }

    ret_text_dropdown_html = ret_text_dropdown_html + '</select>';
	
    return ret_text_dropdown_html;
	
} // getTextsDropDownHtml

// Event handling function when the user selected a musician
function eventSelectTextDropDown()
{	
    var dropdown_element = document.getElementById("id_dropdown_texts");
    if (dropdown_element == null)
	{
        alert("eventSelectTextDropDown dropdown_element is null");
        return;		
	}
	
    var new_value_text_number = dropdown_element.value;
	
	g_current_text_number = new_value_text_number;

    setXmlEditControls();
	
	setAllTexts();
		
} // eventSelectTextDropDown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Dropdown Text  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Textarea Tester  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set textarea for test results
function setTesterTextarea()
{
    var tester_textarea_html = getTesterTextareHtml();
	
    var element_div_tester_textarea = document.getElementById(g_id_div_tester_textarea);	
    if (null == element_div_tester_textarea)
    {
        alert("setTesterTextarea element_div_tester_textarea is null");
        return;
    }
	
    element_div_tester_textarea.innerHTML = tester_textarea_html;	
	
} // setTesterTextarea

// Returns the html code for tester textarea element
function getTesterTextareHtml()
{
	// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_textarea_readonly
	
	var ret_tester_textarea_html = '';
	
	ret_tester_textarea_html = ret_tester_textarea_html + '<textarea  class= "textarea_text" id= ';
	
	ret_tester_textarea_html = ret_tester_textarea_html + g_id_tester_textarea;
	
	ret_tester_textarea_html = ret_tester_textarea_html + ' rows="90" cols="80" ></textarea>';
	
	return ret_tester_textarea_html;
	
} // getTesterTextareHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Textarea Tester  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Textarea Concert  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set textarea for concert text
function setConcertTextarea()
{
    var concert_textarea_html = getConcertTextareaHtml();
	
    var element_div_concert_textarea = document.getElementById(g_id_div_text_textarea);	
    if (null == element_div_concert_textarea)
    {
        alert("setConcertTextarea element_div_concert_textarea is null");
        return;
    }
	
	var text_tooltip = getTooltipHtml(g_tooltip_text_input, g_id_tooltip_text_input);
	
    element_div_concert_textarea.innerHTML = concert_textarea_html + text_tooltip;	
	
	if (!dataIsCopied())
	{
		alert(g_msg_concert_data_not_yet_copied);
		
		setElementOnlyReadable(g_id_text_textarea);
	}
	
} // setConcertTextarea

// Returns the html code for concert textarea element
function getConcertTextareaHtml()
{
	// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_textarea_readonly
	// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onkeyup
	
	var ret_concert_textarea_html = '';
	
	ret_concert_textarea_html = ret_concert_textarea_html + '<textarea class= "textarea_text" id= ';
	
	ret_concert_textarea_html = ret_concert_textarea_html + g_id_text_textarea;
	
	ret_concert_textarea_html = ret_concert_textarea_html + ' onkeyup="eventConcertTextareaKeyUp()" ';	
	
	ret_concert_textarea_html = ret_concert_textarea_html + ' rows="10" cols="40" ></textarea>';
	
	return ret_concert_textarea_html;
	
} // getConcertTextareaHtml

// The user added (or deleted) a character
function eventConcertTextareaKeyUp()
{
	execConcertTextAreaChange();
	
} // eventConcertTextareaKeyUp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Textarea Concert  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Textarea Warning  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set textarea for warnings
function setWarningTextarea()
{
    var warning_textarea_html = getWarningTextareHtml();
	
    var element_div_warning_textarea = document.getElementById(g_id_div_warning_textarea);	
    if (null == element_div_warning_textarea)
    {
        alert("setWarningTextarea g_id_div_warning_textarea is null");
        return;
    }
	
    element_div_warning_textarea.innerHTML = warning_textarea_html;	
	
	hideTextareaHeightWarning();
	
} // setWarningTextarea

// Returns the html code for warning textarea element
function getWarningTextareHtml()
{
	// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_textarea_readonly
	
	var ret_warning_textarea_html = '';
	
	ret_warning_textarea_html = ret_warning_textarea_html + '<textarea id= ';
	
	ret_warning_textarea_html = ret_warning_textarea_html + g_id_warning_textarea;
	
	ret_warning_textarea_html = ret_warning_textarea_html + ' class= "warning_msg" readonly rows="6" cols="42" ></textarea>';
	
	return ret_warning_textarea_html;
	
} // getWarningTextareHtml

// Get element warning textarea
function getElementWarningTextarea()
{
    var element_warning_textarea = document.getElementById(g_id_warning_textarea);	
    if (null == element_warning_textarea)
    {
        alert("setWarningTextarea g_id_warning_textarea is null");
        return null;
    }	
	
	return element_warning_textarea;
	
} // getElementWarningTextarea

// Set a warning. At printing in a message box
// No message box if the message is g_msg_number_rows_bandname_short_text
// (Not a very good solution ....) 
function setTextHeightWarning(i_msg_warning)
{
    var element_warning_text = getElementWarningTextarea();
	
	element_warning_text.style.display = "block";

	var index_warning = i_msg_warning.indexOf(g_msg_number_rows_bandname_short_text);

	if (g_user_case_str == g_user_case_printer && index_warning < 0)
	{
		alert(g_msg_printer_warning_or_error + i_msg_warning);
	}
	else
	{
		element_warning_text.innerHTML = i_msg_warning;
	}
	
} // setTextHeightWarning

// Hide warning textarea
function hideTextareaHeightWarning()
{
    var element_warning_text = getElementWarningTextarea();
	
	element_warning_text.style.display = "none";
	
} // hideTextareaHeightWarning

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Textarea Warning  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Header Text  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text header
function setTextHeader()
{
    var text_header_html = getTextHeaderHtml();
	
    var element_div_text_header = document.getElementById(g_id_div_header_text);	
    if (null == element_div_text_header)
    {
        alert("setTextHeader element_div_text_header is null");
        return;
    }
	
	var text_tooltip = getTooltipHtml(g_tooltip_bandname_text, g_id_tooltip_bandname_text);
	
    element_div_text_header.innerHTML = text_header_html + text_tooltip;	
	
} // setTextHeader

// Returns the html code for the text header element
function getTextHeaderHtml()
{
	var ret_text_header_html = '';
	
	ret_text_header_html = ret_text_header_html + '<input type="text" id= ';
	
	ret_text_header_html = ret_text_header_html + g_id_header_text;
	
	ret_text_header_html = ret_text_header_html + ' onkeyup="eventConcertTextKeyUp()" ';	
	
	ret_text_header_html = ret_text_header_html + ' name="name_header_text" required  minlength="4" maxlength="70" size="20">';

	return ret_text_header_html;
	
} // getTextHeaderHtml

// The user added (or deleted) a character
function eventConcertTextKeyUp()
{
	execConcertTextLabelChange();
	
} // eventConcertTextKeyUp


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Header Text  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Instrument Text  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Set text instrument
function setTextInstrument() 
{
    var text_instrument_html = getTextInstrumentHtml();
	
    var element_div_text_instrument = document.getElementById(g_id_div_instrument_text);	
    if (null == element_div_text_instrument)
    {
        alert("setTextInstrument element_div_text_instrument is null");
        return;
    }
	
	var text_tooltip = getTooltipHtml(g_tooltip_instrument_text, g_id_tooltip_instrument_text);
	
    element_div_text_instrument.innerHTML = text_instrument_html + text_tooltip;	
	
} // setTextInstrument

// Returns the html code for the text instrument element
function getTextInstrumentHtml()
{
	var ret_text_instrument_html = '';
	
	ret_text_instrument_html = ret_text_instrument_html + '<input type="text" id= ';
	
	ret_text_instrument_html = ret_text_instrument_html + g_id_instrument_text;
	
	ret_text_instrument_html = ret_text_instrument_html + ' name="name_header_text" required  minlength="4" maxlength="30" size="20">';

	return ret_text_instrument_html;
	
} // getTextInstrumentHtml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Instrument Text  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Labels  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set label textarea concert
function setLabelTextareaConcert()
{
    var label_textarea_concert_html = getLabelTextareaHtml();
	
    var element_div_textarea_concert = document.getElementById(g_id_div_label_text_textarea);	
    if (null == element_div_textarea_concert)
    {
        alert("setLabelTextareaConcert element_div_textarea_concert is null");
        return;
    }
	
    element_div_textarea_concert.innerHTML = label_textarea_concert_html;	
	
} // setLabelTextareaConcert

// Returns the html code for the text instrument element
function getLabelTextareaHtml()
{
	return '<b>Label Textarea</b>';
	
} // getLabelTextareaHtml

// Set label text header
function setLabelTextHeader()
{
    var label_header_text_html = getLabelTextHtml();
	
    var element_div_label_text = document.getElementById(g_id_div_label_header_text);	
    if (null == element_div_label_text)
    {
        alert("setLabelTextHeader element_div_label_text is null");
        return;
    }
	
    element_div_label_text.innerHTML = label_header_text_html;	
	
} // setLabelTextHeader

// Returns the html code for the label header
function getLabelTextHtml()
{
	return '<b>Label Header</b>';
	
} // getLabelTextHtml

// Set label instrument
function setLabelInstrument()
{
    var label_header_text_html = getLabelInstrumentHtml();
	
    var element_div_label_instrument = document.getElementById(g_id_div_label_instrument_text);	
    if (null == element_div_label_instrument)
    {
        alert("setLabelInstrument element_div_label_instrument is null");
        return;
    }
	
    element_div_label_instrument.innerHTML = label_header_text_html;	
	
} // setLabelInstrument

// Returns the html code for the label instrument element
function getLabelInstrumentHtml()
{
	return '<b>Instrument</b>';
	
} // getLabelInstrumentHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Labels  /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Application Header  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the application header with tooltip
function setApplicationHeader()
{
    var application_header_html = getApplicationHeaderHtml(g_user_case_musician);
	
    var element_application_header = document.getElementById(g_id_div_header_application_flyer);	
    if (null == element_application_header)
    {
        alert("setApplicationHeader g_id_div_header_application_flyer is null");
        return;
    }
	
    element_application_header.innerHTML = application_header_html;	
	
} // setApplicationHeader

// Change the application header 
function changeApplicationHeader(i_user_case)
{
    var application_header_html = getApplicationHeaderHtml(i_user_case);
	
    var element_application_header = document.getElementById(g_id_div_header_application_flyer);	
    if (null == element_application_header)
    {
        alert("setApplicationHeader g_id_div_header_application_flyer is null");
        return;
    }
	
    element_application_header.innerHTML = application_header_html;	
	
	hideToolTipApplicationHeader(); // TODO
	
} // changeApplicationHeader


// Returns the html code for the application header
function getApplicationHeaderHtml(i_user_case)
{
	var ret_application_header_html = '';
	
	ret_application_header_html = ret_application_header_html + '<h1><b>';
	
	ret_application_header_html = ret_application_header_html + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	
	ret_application_header_html = ret_application_header_html + getApplicationHeaderString(i_user_case);
	
	ret_application_header_html = ret_application_header_html + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_application_header, g_id_tooltip_application_header);
	
	ret_application_header_html = ret_application_header_html + text_tooltip;
	
	ret_application_header_html = ret_application_header_html + '</h1>';

	return ret_application_header_html;	
	
} // getApplicationHeaderHtml

// Returns the header string
function getApplicationHeaderString(i_user_case)
{
	var ret_application_header_str = "Undefined string";
	
	if (i_user_case == g_user_case_admin)
	{
		ret_application_header_str = g_text_application_header_admin;
	}
	else if (i_user_case == g_user_case_tester)	
	{
		ret_application_header_str = g_text_application_header_tester;
	}
	else if (i_user_case == g_user_case_printer)	
	{
		ret_application_header_str = g_text_application_header_printer;
	}
	else
	{
		ret_application_header_str = g_text_application_header;
	}


	return ret_application_header_str;
	
} // getApplicationHeaderString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Application Header  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Active Mode  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set active mode
function setParagraphActiveMode()
{
    var paragraph_active_mode_html = getActiveModeHtml();
	
    var element_div_active_mode = document.getElementById(g_id_div_active_mode);	
    if (null == element_div_active_mode)
    {
        alert("setParagraphActiveMode element_div_active_mode is null");
        return;
    }
	
    element_div_active_mode.innerHTML = paragraph_active_mode_html;	
	
} // setParagraphActiveMode

// Returns the html code for active mode element
function getActiveModeHtml()
{
    // https://www.w3schools.com/js/tryit.asp?filename=tryjs_event_onclick3
	
	var ret_paragraph_active_mode_html = '';
	
	ret_paragraph_active_mode_html = ret_paragraph_active_mode_html + '<p id= "' + g_id_paragraph_active_mode + '" onclick="changeActiveMode(this)"><b>';
	
	ret_paragraph_active_mode_html = ret_paragraph_active_mode_html + getActiveModeLabel() + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_active_mode, g_id_tooltip_active_mode);
	
	ret_paragraph_active_mode_html = ret_paragraph_active_mode_html + text_tooltip;
	
	ret_paragraph_active_mode_html = ret_paragraph_active_mode_html + '</p>';

	return ret_paragraph_active_mode_html;	
	
} // getActiveModeHtml


// Returns the active mode label
function getActiveModeLabel()
{
    if (g_flyer_application_mode == "AdminXml")
	{
	    return '<b>' + g_label_active_mode_xml_admin + '</b>';
	}
    else if (g_flyer_application_mode == "EditXml")
	{
	    return '<b>' + g_label_active_mode_xml_edit + '</b>';
	}	
	else
	{
	    return "Undefined Mode";
	}

} // getActiveModeLabel

// Change the active mode
function changeActiveMode(i_id_paragraph_mode) 
{
    if (g_flyer_application_mode == "AdminXml")
	{
	    g_flyer_application_mode = "EditXml";
	}
    else if (g_flyer_application_mode == "EditXml")
	{
	    g_flyer_application_mode = "AdminXml";
	}
    else
    {
        alert("changeActiveMode Mode is not AdminXml nor EditXml");
    }	

    i_id_paragraph_mode.innerHTML = getActiveModeLabel();
	
    setAllTexts();
		
	setAllImages();	
	
	setXmlEditControls();
	
} // changeActiveMode

// Change the active mode to Admin XML
function changeActiveModeToAdminXml() 
{
    g_flyer_application_mode = "AdminXml";
	
	var element_id_div_paragraph_active_mode = document.getElementById(g_id_paragraph_active_mode);
	if (null == element_id_div_paragraph_active_mode)
	{
		alert("changeActiveModeToAdminXml Element with id g_id_paragraph_active_mode is null");
		
		return;
	}	
	
    element_id_div_paragraph_active_mode.innerHTML = getActiveModeLabel();
	
    setAllTexts();
		
	setAllImages();	
	
} // changeActiveModeToAdminXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Set Active Mode  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Display Boundaries  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Flag telling if the boundaries shall be displayed
var g_flyer_display_boundaries = false;

// Set display boundaries
function setParagraphDisplayBoundaries()
{
    var paragraph_display_boundaries_html = getDisplayBoundariesHtml();
	
    var element_div_display_boundaries = document.getElementById(g_id_div_display_boundaries);	
    if (null == element_div_display_boundaries)
    {
        alert("setParagraphDisplayBoundaries g_id_div_display_boundaries is null");
        return;
    }
	
    element_div_display_boundaries.innerHTML = paragraph_display_boundaries_html;	
	
} // setParagraphDisplayBoundaries

// Returns the html code for the display boundaries element
function getDisplayBoundariesHtml()
{
    // https://www.w3schools.com/js/tryit.asp?filename=tryjs_event_onclick3
	
	var ret_paragraph_display_boundaries_html = '';
	
	ret_paragraph_display_boundaries_html = ret_paragraph_display_boundaries_html + '<p id= "' + g_id_paragraph_display_boundaries + '" onclick="changeDisplayBoundaries(this)"><b>';
	
	ret_paragraph_display_boundaries_html = ret_paragraph_display_boundaries_html + getDisplayBoundariesLabel() + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_display_boundaries, g_id_tooltip_display_boundaries);
	
	ret_paragraph_display_boundaries_html = ret_paragraph_display_boundaries_html + text_tooltip;
	
	ret_paragraph_display_boundaries_html = ret_paragraph_display_boundaries_html + '</p>';

	return ret_paragraph_display_boundaries_html;	
	
} // getDisplayBoundariesHtml


// Change the display of the boundaries
function changeDisplayBoundaries(i_id_paragraph_mode) 
{
    if (g_flyer_display_boundaries)
	{
	    g_flyer_display_boundaries = false;
	}
    else 
	{
	    g_flyer_display_boundaries = true;
	}

    i_id_paragraph_mode.innerHTML = getDisplayBoundariesLabel();
	
	setPrinterProperties();  // Add space for boundaries +1.0 to width
	
    displayOrHideBoundaries();
			
} // changeDisplayBoundaries

// Returns the label for display boundaries
function getDisplayBoundariesLabel()
{
    if (g_flyer_display_boundaries)
	{
	    return '<b>' + g_label_boundaries_displayed + '</b>';
	}
    else
	{
	    return '<b>' + g_label_boundaries_not_displayed + '</b>';
	}

} // getDisplayBoundariesLabel

// Display or set boundaries
function displayOrHideBoundaries()
{
	if (g_flyer_display_boundaries)
	{
		setBorderPagePrintOne();
		setBorderPagePrintTwo();
		setBorderBoxPageTwo();
		setBorderBoxPageThree();
		setBorderBoxPageFour();		
		setBorderBoxPageOne();
		setBorderBoxPageFive();
		setBorderBoxPageSix();		
	}
    else
	{
		hideBorderPagePrintOne();
		hideBorderPagePrintTwo();
		hideBorderBoxPageTwo();
		hideBorderBoxPageThree();
		hideBorderBoxPageFour();
		hideBorderBoxPageOne();
		hideBorderBoxPageFive();
		hideBorderBoxPageSix();
	}		
	
} // displayOrHideBoundaries


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Display Boundaries  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide Or Display Cutting Lines /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Flag telling if the cutting lines shall be hidden
var g_flyer_cutting_lines_hide = false;

// Set display boundaries
function setParagraphDisplayHideCuttingLines()
{
    var paragraph_display_hide_cutting_lines_html = getDisplayHideCuttingLinesHtml();
	
    var element_div_display_hide_cutting_lines = document.getElementById(g_id_div_display_hide_cutting_lines);	
    if (null == element_div_display_hide_cutting_lines)
    {
        alert("setParagraphDisplayHideCuttingLines g_id_div_display_hide_cutting_lines is null");
        return;
    }
	
    element_div_display_hide_cutting_lines.innerHTML = paragraph_display_hide_cutting_lines_html;	
	
} // setParagraphDisplayHideCuttingLines

// Returns the html code for the display or hide the cutting lines element
function getDisplayHideCuttingLinesHtml()
{
    // https://www.w3schools.com/js/tryit.asp?filename=tryjs_event_onclick3
	
	var ret_paragraph_display_hide_cutting_lines_html = '';
	
	ret_paragraph_display_hide_cutting_lines_html = ret_paragraph_display_hide_cutting_lines_html + '<p id= "' + g_id_paragraph_display_boundaries + '" onclick="changeDisplayHideCuttingLines(this)"><b>';
	
	ret_paragraph_display_hide_cutting_lines_html = ret_paragraph_display_hide_cutting_lines_html + getDisplayHideCuttingLinesLabel() + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_display_hide_cutting_lines, g_id_paragraph_display_hide_cutting_lines);
	
	ret_paragraph_display_hide_cutting_lines_html = ret_paragraph_display_hide_cutting_lines_html + text_tooltip;
	
	ret_paragraph_display_hide_cutting_lines_html = ret_paragraph_display_hide_cutting_lines_html + '</p>';

	return ret_paragraph_display_hide_cutting_lines_html;	
	
} // getDisplayHideCuttingLinesHtml


// Change the display of the boundaries
function changeDisplayHideCuttingLines(i_id_paragraph_mode) 
{
    if (g_flyer_cutting_lines_hide)
	{
	    g_flyer_cutting_lines_hide = false;
	}
    else 
	{
	    g_flyer_cutting_lines_hide = true;
	}

    i_id_paragraph_mode.innerHTML = getDisplayHideCuttingLinesLabel();
	
    displayOrHideCuttingLines();
			
} // changeDisplayHideCuttingLines

// Returns the label for display boundaries
function getDisplayHideCuttingLinesLabel()
{
    if (g_flyer_cutting_lines_hide)
	{
	    return '<b>' + g_label_cutting_lines_not_displayed + '</b>';
	}
    else
	{
	    return '<b>' + g_label_cutting_lines_displayed + '</b>';
	}

} // getDisplayHideCuttingLinesLabel

// Display or hide the cutting lines
function displayOrHideCuttingLines()
{
	var cutting_element_id_top_vl_left_page_one = getIdCuttingLine(g_id_top_left_vl_page_one);	

	var cutting_element_id_top_left_hl_page_one = getIdCuttingLine(g_id_top_left_hl_page_one);

	var cutting_element_id_top_vl_right_page_one = getIdCuttingLine(g_id_top_right_vl_page_one);
	
	var cutting_element_id_top_right_hl_page_one = getIdCuttingLine(g_id_top_right_hl_page_one);

	var cutting_element_id_bottom_vl_left_page_one = getIdCuttingLine(g_id_bottom_left_vl_page_one);
	
	var cutting_element_id_bottom_left_hl_page_one = getIdCuttingLine(g_id_bottom_left_hl_page_one);
	
	var cutting_element_id_bottom_vl_right_page_one = getIdCuttingLine(g_id_bottom_right_vl_page_one);
	
	var cutting_element_id_bottom_right_hl_page_one = getIdCuttingLine(g_id_bottom_right_hl_page_one);
	
	var cutting_element_id_top_vl_left_page_two = getIdCuttingLine(g_id_top_left_vl_page_two);
	
	var cutting_element_id_top_left_hl_page_two = getIdCuttingLine(g_id_top_left_hl_page_two);
	
	var cutting_element_id_top_vl_right_page_two = getIdCuttingLine(g_id_top_right_vl_page_two);
	
	var cutting_element_id_top_right_hl_page_two = getIdCuttingLine(g_id_top_right_hl_page_two);
	
	var cutting_element_id_bottom_vl_left_page_two = getIdCuttingLine(g_id_bottom_left_vl_page_two);
	
	var cutting_element_id_bottom_left_hl_page_two = getIdCuttingLine(g_id_bottom_left_hl_page_two);
	
	var cutting_element_id_bottom_vl_right_page_two = getIdCuttingLine(g_id_bottom_right_vl_page_two);
	
	var cutting_element_id_bottom_right_hl_page_two = getIdCuttingLine(g_id_bottom_right_hl_page_two);

	if (g_flyer_cutting_lines_hide)
	{
		cutting_element_id_top_vl_left_page_one.style.display = 'none';
		cutting_element_id_top_left_hl_page_one.style.display = 'none';
		cutting_element_id_top_vl_right_page_one.style.display = 'none';
		cutting_element_id_top_right_hl_page_one.style.display = 'none';
		cutting_element_id_bottom_vl_left_page_one.style.display = 'none';
		cutting_element_id_bottom_left_hl_page_one.style.display = 'none';
		cutting_element_id_bottom_vl_right_page_one.style.display = 'none';
		cutting_element_id_bottom_right_hl_page_one.style.display = 'none';
	
		cutting_element_id_top_vl_left_page_two.style.display = 'none';
		cutting_element_id_top_left_hl_page_two.style.display = 'none';
		cutting_element_id_top_vl_right_page_two.style.display = 'none';
		cutting_element_id_top_right_hl_page_two.style.display = 'none';
		cutting_element_id_bottom_vl_left_page_two.style.display = 'none';
		cutting_element_id_bottom_vl_right_page_two.style.display = 'none';
		cutting_element_id_bottom_left_hl_page_two.style.display = 'none';
		cutting_element_id_bottom_right_hl_page_two.style.display = 'none';
	}
	else
	{
		cutting_element_id_top_vl_left_page_one.style.display = 'block';
		cutting_element_id_top_left_hl_page_one.style.display = 'block';
		cutting_element_id_top_vl_right_page_one.style.display = 'block';
		cutting_element_id_top_right_hl_page_one.style.display = 'block';
		cutting_element_id_bottom_vl_left_page_one.style.display = 'block';
		cutting_element_id_bottom_left_hl_page_one.style.display = 'block';
		cutting_element_id_bottom_vl_right_page_one.style.display = 'block';
		cutting_element_id_bottom_right_hl_page_one.style.display = 'block';
	
		cutting_element_id_top_vl_left_page_two.style.display = 'block';
		cutting_element_id_top_left_hl_page_two.style.display = 'block';
		cutting_element_id_top_vl_right_page_two.style.display = 'block';
		cutting_element_id_top_right_hl_page_two.style.display = 'block';
		cutting_element_id_bottom_vl_left_page_two.style.display = 'block';
		cutting_element_id_bottom_vl_right_page_two.style.display = 'block';
		cutting_element_id_bottom_left_hl_page_two.style.display = 'block';
		cutting_element_id_bottom_right_hl_page_two.style.display = 'block';
	}
	
} // displayOrHideCuttingLines


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide Or Display Cutting Lines ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create PDF Files  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets button create PDF files
function setParagraphCreatePdfFiles()
{
    var paragraph_create_pdf_files_html = getParagraphCreatePdfFilesHtml();
	
    var element_div_create_pdf_files = document.getElementById(g_id_div_create_pdf_files);	
    if (null == element_div_create_pdf_files)
    {
        alert("setParagraphCreatePdfFiles g_id_div_create_pdf_files is null");
        return;
    }
	
    element_div_create_pdf_files.innerHTML = paragraph_create_pdf_files_html;	
	
} // setParagraphCreatePdfFiles

// Returns the html code for the display boundaries element
function getParagraphCreatePdfFilesHtml()
{	
	var ret_paragraph_create_pdf_files_html = '';
	
	ret_paragraph_create_pdf_files_html = ret_paragraph_create_pdf_files_html + '<p onclick="eventCreatePdfFiles()"><b>';
	
	ret_paragraph_create_pdf_files_html = ret_paragraph_create_pdf_files_html + g_cap_create_pdf_files + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_create_pdf_files, g_id_tooltip_create_pdf_files);
	
	ret_paragraph_create_pdf_files_html = ret_paragraph_create_pdf_files_html + text_tooltip;
	
	ret_paragraph_create_pdf_files_html = ret_paragraph_create_pdf_files_html + '</p>';

	return ret_paragraph_create_pdf_files_html;	
	
} // getParagraphCreatePdfFilesHtml


// Change the display of the boundaries
function eventCreatePdfFiles() 
{
	createPdfFiles();
			
} // eventCreatePdfFiles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create PDF Files  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets button logout
function setParagraphLogout()
{
	var para_logout_str = getParagraphLogoutHtml();
	
	var element_div_logout = document.getElementById(g_id_div_logout_button);	
    if (null == element_div_logout)
    {
        alert("setParagraphLogout g_id_div_logout_button is null");
        return;
    }
	
    element_div_logout.innerHTML = para_logout_str;	
	
	
} // setParagraphLogout

// Returns the html code for the logout paragraph (button)
function getParagraphLogoutHtml()
{	
	var ret_paragraph_logout_html = '';
	
	ret_paragraph_logout_html = ret_paragraph_logout_html + '<p ' + g_logout_event_fctn_str + '><b>';
	
	ret_paragraph_logout_html = ret_paragraph_logout_html + g_cap_logout_str + '</b>';
	
	ret_paragraph_logout_html = ret_paragraph_logout_html + '</p>';

	return ret_paragraph_logout_html;	
	
} // getParagraphLogoutHtml

// Sets and displays the logout button
function setAndDisplayLogoutButton()
{
	setParagraphLogout();
	
	displayLogoutButton();
	
} // setAndDisplayLogoutButton

// Hides the logout button
function hideLogoutButton()
{
	var element_div_logout = document.getElementById(g_id_div_logout_button);	
    if (null == element_div_logout)
    {
        alert("hideLogoutButton g_id_div_logout_button is null");
        return;
    }
	
	element_div_logout.style.display = 'none';
	
} // hideLogoutButton

// Hides the logout button
function displayLogoutButton()
{
	// https://www.w3schools.com/js/js_htmldom_eventlistener.asp

	var element_div_logout = document.getElementById(g_id_div_logout_button);	
    if (null == element_div_logout)
    {
        alert("hideLogoutButton g_id_div_logout_button is null");
        return;
    }

	g_init_logout_button = true;

	element_div_logout.addEventListener('click', eventLogoutFlyer);
	
	element_div_logout.style.display = 'block';

	element_div_logout.style.width = '230px';

	g_init_logout_button = false;
	
} // displayLogoutButton

// Logout event
function eventLogoutFlyer() 
{
	if (g_init_logout_button)
	{
		return;
	}

	hideLogoutButton();
	
	location.reload();
			
} // eventLogoutFlyer

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Logout Files  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Logout Files  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Publish Flag  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set publish concert text checkbox
function setPublishTextCheckbox()
{
    var checkbox_publish_text_html = getPublishTextHtml();
	
    var element_div_publish_concert_texts = document.getElementById(g_id_div_publish_concert_texts);	
    if (null == element_div_publish_concert_texts)
    {
        alert("setPublishTextCheckbox g_id_div_publish_concert_texts is null");
        return;
    }
	
    element_div_publish_concert_texts.innerHTML = checkbox_publish_text_html;

    setPublishTextFlagCheckBox();	
	
} // setPublishTextCheckbox

// Set publish text flag
function setPublishTextFlagCheckBox()
{
	var publish_flag = getPublishFlyerText(g_current_concert_number);
	
	var element_publish_flag = getElementPublishCheckbox();
	if (null == element_publish_flag)
	{
		return;
	}
	
	element_publish_flag.checked = publish_flag;	
	
} // setPublishTextFlagCheckBox

// Returns the html code for the publish concert text checkbox
function getPublishTextHtml()
{	
	var ret_checkbox_publish_text_html = '';
	
	ret_checkbox_publish_text_html = ret_checkbox_publish_text_html + '<input type="checkbox" ';

    ret_checkbox_publish_text_html = ret_checkbox_publish_text_html + 'id="' + g_id_publish_concert_texts + '" onclick="eventPublishCheckbox()" ';
	
	ret_checkbox_publish_text_html = ret_checkbox_publish_text_html + 'class= "check_box" name="publish_name" value="publish_value"><b>Text publizieren</b><br>';
	
	return ret_checkbox_publish_text_html;	
	
} // getPublishTextHtml

// User sets the publish flag
function eventPublishCheckbox()
{
	var element_publish_checkbox = getElementPublishCheckbox();
	if (null == element_publish_checkbox)
	{
		return;
	}

	if (element_publish_checkbox.checked)
	{
	    setPublishFlyerText(g_current_concert_number, true);
	}
	else
	{
		setPublishFlyerText(g_current_concert_number, false);
	}	

    saveXmlEditObjectToFile();	
	
	
} // eventPublishCheckbox

function getElementPublishCheckbox()
{
	var element_publish_checkbox = document.getElementById(g_id_publish_concert_texts);
	if (null == element_publish_checkbox)
	{
		alert("getElementPublishCheckbox Element with id g_id_publish_concert_texts is null");
	}
	
	return element_publish_checkbox;
	
} // getElementPublishCheckbox


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Publish Flag  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Flyer Help ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set Flyer help
function setParagraphHelp()
{
    var paragraph_flyer_help_html = getFlyerHelpHtml();
	
    var element_div_flyer_help = document.getElementById(g_id_div_flyer_help);	
    if (null == element_div_flyer_help)
    {
        alert("setParagraphHelp g_id_div_flyer_help is null");
        return;
    }
	
    element_div_flyer_help.innerHTML = paragraph_flyer_help_html;	
	
} // setParagraphHelp

// Returns the html code for flyer help
function getFlyerHelpHtml()
{	
	var ret_paragraph_flyer_help_html = '';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '<p onclick="eventFlyerHelp()"><b>';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + 'Hilfe' + '</b>';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '</p>';

	return ret_paragraph_flyer_help_html;	
	
} // getFlyerHelpHtml


// Event flyer help
function eventFlyerHelp() 
{
    window.open("http://www.jazzliveaarau.ch/Flyer/FlyerFoldedA6Help.htm");
	
} // eventFlyerHelp


// Set Flyer admin help
function setParagraphHelpAdmin()
{
    var paragraph_flyer_help_admin_html = getFlyerHelpAdminHtml();
	
    var element_div_flyer_help = document.getElementById(g_id_div_flyer_help);	
    if (null == element_div_flyer_help)
    {
        alert("setParagraphHelpAdmin g_id_div_flyer_help is null");
        return;
    }
	
    element_div_flyer_help.innerHTML = paragraph_flyer_help_admin_html;	
	
} // setParagraphHelpAdmin

// Returns the html code for flyer admin help
function getFlyerHelpAdminHtml()
{	
	var ret_paragraph_flyer_help_html = '';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '<p><b>';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '<A href="https://jazzliveaarau.ch/Tasks/Documents/A0093.pdf">Admin Hilfe</A>' + '</b>';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '</p>';

	return ret_paragraph_flyer_help_html;	
	
} // getFlyerHelpAdminHtml



// Set Flyer printer help
function setParagraphHelpPrinter()
{
    var paragraph_flyer_help_printer_html = getFlyerHelpPrinterHtml();
	
    var element_div_flyer_help = document.getElementById(g_id_div_flyer_help);	
    if (null == element_div_flyer_help)
    {
        alert("setParagraphHelp g_id_div_flyer_help is null");
        return;
    }
	
    element_div_flyer_help.innerHTML = paragraph_flyer_help_printer_html;	
	
} // setParagraphHelpPrinter

// Returns the html code for flyer printer help
function getFlyerHelpPrinterHtml()
{	
	var ret_paragraph_flyer_help_html = '';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '<p><b>';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '<A href="https://jazzliveaarau.ch/Tasks/Documents/A0007.pdf">Drucker Hilfe</A>' + '</b>';
	
	ret_paragraph_flyer_help_html = ret_paragraph_flyer_help_html + '</p>';

	return ret_paragraph_flyer_help_html;	
	
} // getFlyerHelpPrinterHtml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Flyer Help //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Tooltip Functions  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the HTML code for a tooltip
function getTooltipHtml(i_tooltip_str, i_id_tootip)
{
	var ret_tooltip_html = '';
	
	ret_tooltip_html = ret_tooltip_html + '&nbsp;&nbsp;';
	
	ret_tooltip_html = ret_tooltip_html + '<span id="';
	
	ret_tooltip_html = ret_tooltip_html + i_id_tootip + '" ';
	
	ret_tooltip_html = ret_tooltip_html + ' class="tooltip"><img src="icon_info.png" alt="Information" width="25">';
	
	ret_tooltip_html = ret_tooltip_html + '<span class="tooltiptext">';
	
	ret_tooltip_html = ret_tooltip_html + i_tooltip_str;
	
	ret_tooltip_html = ret_tooltip_html + '</span></span>';
	
	return ret_tooltip_html;
	
} // getTooltipHtml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Tooltip Functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set an element only readable
function setElementOnlyReadable(i_id_elemement)
{
    var input_element = document.getElementById(i_id_elemement);	
    if (null == input_element)
    {
        alert("setElementOnlyReadable Element " + i_id_elemement + " is null");
        return;
    }		
		
	input_element.readOnly = true;	
	
} // setElementOnlyReadable


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

