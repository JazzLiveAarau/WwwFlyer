// File: FlyerChecks.js
// Date: 2022-04-03
// Author: Gunnar Lidén

// File content
// =============
// Data check functions

// Object of class FlyerConcertComparisonData that holds comparison data
var g_flyer_concert_comparison = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Exeute Check Functions ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Check flyer data for a concert
function checkFlyerConcertData()
{
	var debug_msg = 'checkFlyerConcertData Concert number= ' + g_current_concert_number.toString();
	console.log(debug_msg);

	hideDivDisplayCheckBandData();

	g_flyer_concert_comparison = new FlyerConcertComparisonData(g_current_concert_number);

	if (g_user_case_str == g_user_case_admin || g_user_case_str == g_user_case_tester)
	{
		checkFlyerConcertDataAdmin();
	}
	else if (g_user_case_str == g_user_case_printer)
	{
		checkFlyerConcertDataPrinter();
	}
	else
	{
		alert("checkFlyerConcertData Error g_user_case_str= " + g_user_case_str.toString());

		return;
	}

} // checkFlyerConcertData

// Check flyer data for a concert after login as Administrator or Tester
function checkFlyerConcertDataAdmin()
{
	var debug_msg = 'checkFlyerConcertDataAdmin';
	console.log(debug_msg);

} // checkFlyerConcertDataAdmin

// Check flyer data for a concert after login as printer
function checkFlyerConcertDataPrinter()
{
	var debug_msg = 'checkFlyerConcertDataPrinter';
	console.log(debug_msg);

} // checkFlyerConcertDataPrinter

// Check that band names, musician names and musician instruments are equal in admin 
// data (season program XML) and edit data (edit XML files)
function checkFlyerBandData()
{
	var input_flyer_application_mode = g_flyer_application_mode; 

	// displayBandDataHomepageAndEdit();

	if (!flyerNumberOfMusiciansIsEqual())
	{
		alert("Number of musicians is not equal");

		g_flyer_application_mode = input_flyer_application_mode;

		return;
	}

	var musicians_equal = flyerMusicianTextsAreEqual();

	var b_all_equal = true;

	for (var index_musician=0; index_musician < musicians_equal.length; index_musician++)
	{
		var b_names_equal = musicians_equal[index_musician];

		if (!b_names_equal)
		{
			alert("Musician texts not equal for musician number " + (index_musician + 1).toString());

			b_all_equal = false;
		}

	}

	if (b_all_equal)
	{
		alert("All musician texts are equal");
	}

	g_flyer_application_mode = input_flyer_application_mode;

} // checkFlyerBandData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Exeute Check Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class FlyerConcertComparisonData //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Holds the flyer comparison data
class FlyerConcertComparisonData
{
    // Creates the instance of the class
    constructor(i_concert_number)
    {
        // Member variables
        // ================

		// Concert number
		this.m_concert_number = i_concert_number;

        // Band name homepage
        this.m_band_name_homepage = '';

        // Band name edit
        this.m_band_name_edit = '';

        // Band name comparison result
        this.m_band_name_bool = null;

		// Band text homepage
		this.m_band_text_homepage = '';

		// Band text edit
		this.m_band_text_edit = '';

        // Band text comparison result
        this.m_band_text_bool = null;

		// Label free text homepage
		this.m_flyer_label_homepage = '';

		// Label free text edit
		this.m_flyer_label_edit = '';

        // Label free text comparison result
        this.m_flyer_label_bool = null;

		// Free text homepage
		this.m_flyer_text_homepage = '';

		// Free text edit
		this.m_flyer_text_edit = '';

		// Free text comparison result
		this.m_flyer_text_bool = null;

		// Number of musicians homepage
		this.m_number_musicians_homepage = -1234;

		// Number of musicians edit
		this.m_number_musicians_edit = -1234;

		// Number of musicians comparison result
		this.m_number_musicians_bool = null;

		// Array of musician names homepage
		this.m_musicians_homepage = null;

		// Array of musician names edit
		this.m_musicians_edit = null;

		// Array of musicians comparison result
		this.m_musicians_bool = null;

		// Array of instruments homepage
		this.m_instruments_homepage = null;

		// Array of instruments edit
		this.m_instruments_edit = null;

		// Array of instruments comparison result
		this.m_instruments_bool = null;

		// Array of musician texts homepage
		this.m_musician_texts_homepage = null;

		// Array of musician texts edit
		this.m_musician_texts_edit = null;

		// Array of musician texts comparison result
		this.m_musician_texts_bool = null;		

		// Check all concert data
		this.checkAllConcertData();
		
    } // constructor

	// Check all concert data
	checkAllConcertData()
	{
		this.flyerBandNameIsEqual();

		this.flyerBandTextIsEqual();

		this.flyerFreeLabelIsEqual();
	
		this.flyerFreeTextIsEqual();
	
		var number_musicians_bool = this.flyerNumberOfMusiciansIsEqual();
	
		if (number_musicians_bool)
		{
			this.flyerMusicianNamesAreEqual();
	
			this.flyerMusicianInstrumentsAreEqual();
			
			this.flyerMusicianTextsAreEqual();		
		}
	
	} // checkAllConcertData

	// Check lineup functions
	// ======================

	// Returns true if band name is equal in the season program XML file and the edit XML file
	flyerBandNameIsEqual()
	{
		var ret_band_name_bool = true;

		var input_flyer_application_mode = g_flyer_application_mode; 

		g_flyer_application_mode = "AdminXml";

		var band_name_homepage = getBandName(g_current_concert_number);

		g_flyer_application_mode = "EditXml";

		var band_name_edit = getBandName(g_current_concert_number);

		g_flyer_application_mode = input_flyer_application_mode;

		if (band_name_homepage == band_name_edit)
		{
			ret_band_name_bool = true;
		}
		else
		{
			ret_band_name_bool = false;
		}

		this.m_band_name_homepage = band_name_homepage;

		this.m_band_name_edit = band_name_edit;

		this.m_band_name_bool = ret_band_name_bool;

		if (!ret_band_name_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerBandNameIsEqual Band names are not equal';
			console.log(debug_msg);
		}

		return ret_band_name_bool;

	} // flyerBandNameIsEqual

	// Returns true if band text is equal in the season program XML file and the edit XML file
	flyerBandTextIsEqual()
	{
		var ret_band_text_bool = true;

		var input_flyer_application_mode = g_flyer_application_mode; 

		g_flyer_application_mode = "AdminXml";

		var band_text_homepage = getConcertShortText(g_current_concert_number);

		g_flyer_application_mode = "EditXml";

		var band_text_edit = getConcertShortText(g_current_concert_number);

		g_flyer_application_mode = input_flyer_application_mode;

		if (band_text_homepage == band_text_edit)
		{
			ret_band_text_bool = true;
		}
		else
		{
			ret_band_text_bool = false;
		}

		this.m_band_text_homepage = band_text_homepage;

		this.m_band_text_edit = band_text_edit;

		this.m_band_text_bool = ret_band_text_bool;

		if (!ret_band_text_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerBandTextIsEqual Band texts are not equal';
			console.log(debug_msg);
		}

		return ret_band_text_bool;

	} // flyerBandTextIsEqual

	// Returns true if the free flyer label is equal in the season program XML file and the edit XML file
	flyerFreeLabelIsEqual()
	{
		var ret_flyer_label_bool = true;

		var input_flyer_application_mode = g_flyer_application_mode; 

		g_flyer_application_mode = "AdminXml";

		var flyer_label_homepage = getConcertLabelFlyerText(g_current_concert_number);

		g_flyer_application_mode = "EditXml";

		var flyer_label_edit = getConcertLabelFlyerText(g_current_concert_number);

		g_flyer_application_mode = input_flyer_application_mode;

		if (flyer_label_homepage == flyer_label_edit)
		{
			ret_flyer_label_bool = true;
		}
		else
		{
			ret_flyer_label_bool = false;
		}

		this.m_flyer_label_homepage = flyer_label_homepage;

		this.m_flyer_label_edit = flyer_label_edit;

		this.m_flyer_label_bool = ret_flyer_label_bool;

		if (!ret_flyer_label_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerFreeLabelIsEqual Free text label are not equal';
			console.log(debug_msg);
		}

		return ret_flyer_label_bool;

	} // flyerFreeLabelIsEqual

	// Returns true if the free flyer text is equal in the season program XML file and the edit XML file
	flyerFreeTextIsEqual()
	{
		var ret_flyer_text_bool = true;

		var input_flyer_application_mode = g_flyer_application_mode; 

		g_flyer_application_mode = "AdminXml";

		var flyer_text_homepage = getConcertFlyerText(g_current_concert_number);

		g_flyer_application_mode = "EditXml";

		var flyer_text_edit = getConcertFlyerText(g_current_concert_number);

		g_flyer_application_mode = input_flyer_application_mode;

		if (flyer_text_homepage == flyer_text_edit)
		{
			ret_flyer_text_bool = true;
		}
		else
		{
			ret_flyer_text_bool = false;
		}

		this.m_flyer_text_homepage = flyer_text_homepage;

		this.m_flyer_text_edit = flyer_text_edit;

		this.m_flyer_text_bool = ret_flyer_text_bool;

		if (!ret_flyer_text_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerFreeTextIsEqual Free texts are not equal';
			console.log(debug_msg);
		}

		return ret_flyer_text_bool;

	} // flyerFreeTextIsEqual

	// Returns true if the number of musicians is equal in the season program XML file and the edit XML file
	flyerNumberOfMusiciansIsEqual()
	{	
		var ret_number_musicians_bool = true;
		
		var b_admin = true;

		var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

		var number_musicians_homepage = musicians_homepage.length;

		b_admin = false;

		var musicians_edit = getFlyerMusicianNamesArray(b_admin);

		var number_musicians_edit = musicians_edit.length;

		if (number_musicians_homepage == number_musicians_edit)
		{
			ret_number_musicians_bool = true;
		}
		else
		{
			ret_number_musicians_bool = false;
		}

		this.m_number_musicians_homepage = number_musicians_homepage;

		this.m_number_musicians_edit = number_musicians_edit;

		this.m_number_musicians_bool = ret_number_musicians_bool;

		if (!ret_number_musicians_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerNumberOfMusiciansIsEqual Number of musicians are not equal';
			console.log(debug_msg);
		}

		return ret_number_musicians_bool;

	} // flyerNumberOfMusiciansIsEqual

	// Returns an array with booleans telling if the musician name is equal or not
	// in the season program XML file and the edit XML file
	flyerMusicianNamesAreEqual()
	{
		if (!this.flyerNumberOfMusiciansIsEqual())
		{
			alert("flyerMusicianNamesAreEqual Number of musicians is not equal");

			return null;
		}

		var b_admin = true;

		var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

		b_admin = false;

		var musicians_edit = getFlyerMusicianNamesArray(b_admin);

		var n_musicians = musicians_homepage.length;

		var ret_musicians_bool = [];

		var debug_bool = true;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var musician_homepage = musicians_homepage[index_musician];

			var musician_edit = musicians_edit[index_musician];

			if (musician_homepage == musician_edit)
			{
				ret_musicians_bool[index_musician] = true;
			}
			else
			{
				ret_musicians_bool[index_musician] = false;

				debug_bool = false;
			}

		} // index_musician

		this.m_musicians_homepage = musicians_homepage;

		this.m_musicians_edit = musicians_edit;

		this.m_musicians_bool = ret_musicians_bool;

		if (!debug_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerMusicianNamesAreEqual Musician names are not equal';
			console.log(debug_msg);
		}

		return ret_musicians_bool;

	} // flyerMusicianNamesAreEqual

	// Returns an array with booleans telling if the musician instrument is equal or not
	// in the season program XML file and the edit XML file
	flyerMusicianInstrumentsAreEqual()
	{
		if (!this.flyerNumberOfMusiciansIsEqual())
		{
			alert("flyerMusicianInstrumentsAreEqual Number of musicians is not equal");

			return null;
		}

		var b_admin = true;

		var instruments_homepage = getFlyerMusicianInstrumentsArray(b_admin);

		b_admin = false;

		var instruments_edit = getFlyerMusicianInstrumentsArray(b_admin);

		var n_musicians = instruments_homepage.length;

		var ret_instruments_bool = [];

		var debug_bool = true;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var instrument_homepage = instruments_homepage[index_musician];

			var instrument_edit = instruments_edit[index_musician];

			if (instrument_homepage == instrument_edit)
			{
				ret_instruments_bool[index_musician] = true;
			}
			else
			{
				ret_instruments_bool[index_musician] = false;

				debug_bool = false;
			}

		} // index_musician

		this.m_instruments_homepage = instruments_homepage;

		this.m_instruments_edit = instruments_edit;

		this.m_instruments_bool = ret_instruments_bool;

		if (!debug_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerMusicianInstrumentsAreEqual Musician instruments are not equal';
			console.log(debug_msg);
		}

		return ret_instruments_bool;

	} // flyerMusicianInstrumentsAreEqual

	// Returns an array with booleans telling if the musician text is equal or not
	// in the season program XML file and the edit XML file
	flyerMusicianTextsAreEqual()
	{
		if (!this.flyerNumberOfMusiciansIsEqual())
		{
			alert("flyerMusicianTextsAreEqual Number of musicians is not equal");

			return null;
		}

		var b_admin = true;

		var musician_texts_homepage = getFlyerMusicianTextsArray(b_admin);

		b_admin = false;

		var musician_texts_edit = getFlyerMusicianTextsArray(b_admin);

		var n_musicians = musician_texts_homepage.length;

		var ret_musician_texts_bool = [];

		var debug_bool = true;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var musician_text_homepage = musician_texts_homepage[index_musician];

			var musician_text_edit = musician_texts_edit[index_musician];

			if (musician_text_homepage == musician_text_edit)
			{
				ret_musician_texts_bool[index_musician] = true;
			}
			else
			{
				ret_musician_texts_bool[index_musician] = false;

				debug_bool = false;
			}

		} // index_musician

		this.m_musician_texts_homepage = musician_texts_homepage;

		this.m_musician_texts_edit = musician_texts_edit;

		this.m_musician_texts_bool = ret_musician_texts_bool;

		if (!debug_bool)
		{
			var debug_msg = 'FlyerConcertComparisonData.flyerMusicianTextsAreEqual Musician texts are not equal';
			console.log(debug_msg);
		}

		return ret_musician_texts_bool;

	} // flyerMusicianTextsAreEqual

} // FlyerConcertComparisonData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class FlyerConcertComparisonData ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Data Functions  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays homepage (season program XML file) and flyer (edit XML files) data
function displayBandDataHomepageAndEdit()
{
	var homepage_html = getBandDataHomepageHtmlString();

	var edit_html = getBandDataEditHtmlString();

	displayDivDisplayCheckBandData();

	var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

	element_div_display_band_data.innerHTML = homepage_html + edit_html;

} // displayBandDataHomepageAndEdit

// Displays homepage (season program XML file) data
function displayBandDataHomepage()
{
	var homepage_html = getBandDataHomepageHtmlString();

	displayDivDisplayCheckBandData();

	var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

	element_div_display_band_data.innerHTML = homepage_html;

} // displayBandDataHomepage

// Displays flyer (edit XML files) data
function displayBandDataEdit()
{
	var edit_html = getBandDataEditHtmlString();

	displayDivDisplayCheckBandData();

	var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

	element_div_display_band_data.innerHTML = edit_html;

} // displayBandDataEdit

// Returns the band data defined on the homepage, i.e in the season program XML file
function getBandDataHomepageHtmlString()
{
	var ret_html_homepage = '';

	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "AdminXml";

	var band_name_homepage = getBandName(g_current_concert_number);

	var band_text_homepage = getConcertShortText(g_current_concert_number);

	var flyer_label_hompage = getConcertLabelFlyerText(g_current_concert_number);

	var flyer_text_homepage = getConcertFlyerText(g_current_concert_number);

	var b_admin = true;

	var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

	var instruments_homepage = getFlyerMusicianInstrumentsArray(b_admin);

	var texts_homepage = getFlyerMusicianTextsArray(b_admin);

	var title_homepage = 'Homepage (Saisonprogram) Daten';

	ret_html_homepage = getBandDataHtmlString(title_homepage, band_name_homepage, band_text_homepage, musicians_homepage, instruments_homepage, texts_homepage, flyer_label_hompage, flyer_text_homepage);

	g_flyer_application_mode = input_flyer_application_mode;

	return ret_html_homepage;

} // getBandDataHomepageHtmlString

// Returns the band data defined in the flyer, i.e in the flyer edit XML files
function getBandDataEditHtmlString()
{
	var ret_html_edit = '';

	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "EditXml";

	var band_name_edit = getBandName(g_current_concert_number);

	var band_text_edit = getConcertShortText(g_current_concert_number);

	var b_admin = false;

	var musicians_edit = getFlyerMusicianNamesArray(b_admin);

	var instruments_edit = getFlyerMusicianInstrumentsArray(b_admin);

	var texts_edit = getFlyerMusicianTextsArray(b_admin);

	var flyer_label_edit = getConcertLabelFlyerText(g_current_concert_number);

	var flyer_text_edit = getConcertFlyerText(g_current_concert_number);

	var title_edit = 'Edit XML Daten';

	ret_html_edit = getBandDataHtmlString(title_edit, band_name_edit, band_text_edit, musicians_edit, instruments_edit, texts_edit, flyer_label_edit, flyer_text_edit);

	g_flyer_application_mode = input_flyer_application_mode;

	return ret_html_edit;

} // getBandDataEditHtmlString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Data Functions  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Data Arrays  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get the musician name array
function getFlyerMusicianNamesArray(i_b_admin)
{
	var musician_names = [];

	var input_flyer_application_mode = g_flyer_application_mode; 

	if (i_b_admin)
	{
		g_flyer_application_mode = "AdminXml";
	}
	else
	{
		g_flyer_application_mode = "EditXml";
	}

	var n_musicians = getNumberOfMusicians(g_current_concert_number);

	for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_name = getMusicianName(g_current_concert_number, musician_number);

		musician_names[musician_number - 1] = musician_name;
	}

	g_flyer_application_mode = input_flyer_application_mode;

	return musician_names;

} // getFlyerMusicianNamesArray

// Get the musician instruments array
function getFlyerMusicianInstrumentsArray(i_b_admin)
{
	var musician_instruments = [];

	var input_flyer_application_mode = g_flyer_application_mode; 

	if (i_b_admin)
	{
		g_flyer_application_mode = "AdminXml";
	}
	else
	{
		g_flyer_application_mode = "EditXml";
	}

	var n_musicians = getNumberOfMusicians(g_current_concert_number);

	for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_instrument = getMusicianInstrument(g_current_concert_number, musician_number);

		musician_instruments[musician_number - 1] = musician_instrument;
	}

	g_flyer_application_mode = input_flyer_application_mode;

	return musician_instruments;

} // getFlyerMusicianInstrumentsArray


// Get the musician texts array
function getFlyerMusicianTextsArray(i_b_admin)
{
	var musician_texts = [];

	var input_flyer_application_mode = g_flyer_application_mode; 

	if (i_b_admin)
	{
		g_flyer_application_mode = "AdminXml";
	}
	else
	{
		g_flyer_application_mode = "EditXml";
	}

	var n_musicians = getNumberOfMusicians(g_current_concert_number);

	for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_text = getMusicianText(g_current_concert_number, musician_number);

		musician_texts[musician_number - 1] = musician_text;
	}

	g_flyer_application_mode = input_flyer_application_mode;

	return musician_texts;

} // getFlyerMusicianTextsArray

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Data Arrays  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Html Code  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns band data as an HTML string
function getBandDataHtmlString(i_title, i_band_name, i_band_text, i_musicians, i_instruments, i_texts, i_flyer_label, i_flyer_text)
{
	var ret_html_str = '';

	ret_html_str = ret_html_str + getBandDataTitleHtmlString(i_title);

	ret_html_str = ret_html_str + getBandDataTitleHtmlString(i_band_name);

	ret_html_str = ret_html_str + getBandDataBandTextHtmlString(i_band_text);

	ret_html_str = ret_html_str + getBandDataMusicianNamesInstrumentsTextsHtmlString(i_musicians, i_instruments, i_texts);

	ret_html_str = ret_html_str + getFlyerLabelHtmlString(i_flyer_label);

	ret_html_str = ret_html_str + getFlyerTextTextHtmlString(i_flyer_text);

	return ret_html_str;

} // getBandDataHtmlString

// Returns title as an HTML string
function getBandDataTitleHtmlString(i_title)
{
	return '<h2>' + i_title + '</h2>';

} // getBandDataTitleHtmlString

// Returns band name as an HTML string
function getBandDataBandNameHtmlString(i_band_name)
{
	return '<h3>' + i_band_name + '</h3>';

} // getBandDataBandNameHtmlString

// Returns band text as an HTML string
function getBandDataBandTextHtmlString(i_band_text)
{
	return '<p>' + i_band_text + '</p>';

} // getBandDataBandTextHtmlString

// Returns band text as an HTML string
function getBandDataMusicianNamesInstrumentsTextsHtmlString(i_musicians, i_instruments, i_texts)
{
	var ret_musicians_str = '';

	var n_musicians = i_musicians.length;

	for (var index_musician=0; index_musician < n_musicians; index_musician++)
	{
		var musician_name = i_musicians[index_musician];

		var musician_instr = i_instruments[index_musician];

		var musician_text = i_texts[index_musician];

		ret_musicians_str = ret_musicians_str + getBandDataMusicianNameInstrumentHtmlString(musician_name, musician_instr);

		ret_musicians_str = ret_musicians_str + getBandDataMusicianTextHtmlString(musician_text);
	}
	
	return ret_musicians_str;

} // getBandDataMusicianNamesInstrumentsTextsHtmlString

// Returns band name as an HTML string
function getBandDataMusicianNameInstrumentHtmlString(i_musician_name, i_musician_instr)
{
	return '<h4>' + i_musician_name + ' ' + i_musician_instr + '</h4>';

} // getBandDataMusicianNameInstrumentHtmlString

// Returns musician text as an HTML string
function getBandDataMusicianTextHtmlString(i_musician_text)
{
	return '<p>' + i_musician_text + '</p>';

} // getBandDataMusicianTextHtmlString

// Returns flyer label as an HTML string
function getFlyerLabelHtmlString(i_flyer_label)
{
	return '<h3>' + i_flyer_label + '</h3>';

} // getFlyerLabelHtmlString

// Returns flyer text as an HTML string
function getFlyerTextTextHtmlString(i_flyer_text)
{
	return '<p>' + i_flyer_text + '</p>';

} // getFlyerTextTextHtmlString


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Html Code  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The user clicked the button 'Check band data'
function eventCheckBandData()
{
    checkFlyerBandData();

} // eventCheckBandData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Check Band Data  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set active mode
function setButtonCheckBandData()
{
    var button_check_band_data_html = getButtonCheckBandDataHtml();
	
    var element_div_check_band_data = document.getElementById(g_id_div_check_band_data);	
    if (null == element_div_check_band_data)
    {
        alert("setButtonCheckBandData element_div_check_band_data is null");
        return;
    }
	
    element_div_check_band_data.innerHTML = button_check_band_data_html;	
	
} // setButtonCheckBandData

// Returns the html code for active mode element
function getButtonCheckBandDataHtml()
{	
	var ret_button_check_band_data_html = '';
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + '<p id= "' + g_id_div_check_band_data + '" onclick="eventCheckBandData()"><b>';
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + getCheckBandDataCaption() + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_check_band_data, g_id_tooltip_check_band_data);
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + text_tooltip;
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + '</p>';

	return ret_button_check_band_data_html;	
	
} // getButtonCheckBandDataHtml


// Returns the caption for the button
function getCheckBandDataCaption()
{
   return 'Check<br> Band-Daten';

} // getCheckBandDataCaption


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Check Band Data  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide And Display Button  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hides the button (<div>) 'Check band data'
function hideButtonCheckBandData()
{
	var element_id_div_check_band_data = document.getElementById(g_id_div_check_band_data);
	if (null == element_id_div_check_band_data)
	{
		alert("hideCheckBandData Element with id g_id_div_check_band_data is null");
		
		return;
	}
		
	element_id_div_check_band_data.style.display = "none";
	
} // hideButtonCheckBandData

// Displays the button (<div>) 'Check band data'
function displayButtonCheckBandData()
{
	var element_id_div_check_band_data = document.getElementById(g_id_div_check_band_data);
	if (null == element_id_div_check_band_data)
	{
		alert("hideCheckBandData Element with id g_id_div_check_band_data is null");
		
		return;
	}
		
	element_id_div_check_band_data.style.display = "block";
	
} // displayButtonCheckBandData

// Hides the <div> displaying the result of the band data check
function hideDivDisplayCheckBandData()
{
	var element_id_div_display_check_band_data = document.getElementById(g_id_div_display_check_result);
	if (null == element_id_div_display_check_band_data)
	{
		alert("hideDivDisplayCheckBandData Element with id g_id_div_display_check_result is null");
		
		return;
	}
		
	element_id_div_display_check_band_data.style.display = "none";
	
} // hideDivDisplayCheckBandData

// Displays the <div> displaying the result of the band data check
function displayDivDisplayCheckBandData()
{
	var element_id_div_display_check_band_data = document.getElementById(g_id_div_display_check_result);
	if (null == element_id_div_display_check_band_data)
	{
		alert("displayDivDisplayCheckBandData Element with id g_id_div_display_check_result is null");
		
		return;
	}
		
	element_id_div_display_check_band_data.style.display = "block";
	
} // displayDivDisplayCheckBandData


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide And Display Button  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////