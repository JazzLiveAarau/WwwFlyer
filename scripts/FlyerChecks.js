// File: FlyerChecks.js
// Date: 2022-04-03
// Author: Gunnar Lidén

// File content
// =============
// Data check functions


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Exeute Check Functions ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Check flyer data for a concert
function checkFlyerConcertData()
{
	var debug_msg = 'checkFlyerConcertData Concert number= ' + g_current_concert_number.toString();
	console.log(debug_msg);

	hideDivDisplayCheckBandData();

	hideDivDisplayCheckBandData();

	var concert_comparison = new FlyerConcertComparisonData(g_current_concert_number);

	var error_html_str = checkFlyerConcertDataAdminPrinter(concert_comparison);

	if (error_html_str.length > 0)
	{
		debug_msg = 'checkFlyerConcertData There were errors returned from checkFlyerConcertDataAdminPrinter';
		console.log(debug_msg);

		//Temporary QQQQQQQQQQQQQQQ  displayDivDisplayCheckBandData();

		var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

		element_div_display_band_data.innerHTML = error_html_str;
	}

} // checkFlyerConcertData

// Check flyer data for a concert after login as Administrator, Tester or Printer
// The function returns an HTML string describing the error. Empty string if all is OK.
// 1. Get band names HTML error string. Call of getBandNameErrorHtmlString
function checkFlyerConcertDataAdminPrinter(i_concert_comparison)
{
	var debug_msg = 'Enter checkFlyerConcertDataAdminPrinter Concert number= ' + i_concert_comparison.m_concert_number.toString();
	console.log(debug_msg);

	var ret_error_html_str = '';

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getBandNameErrorHtmlString();

	var error_number_musician_str = i_concert_comparison.getNumberMusiciansErrorHtmlString();

	ret_error_html_str = ret_error_html_str + error_number_musician_str;

	if (error_number_musician_str.length > 0)
	{
		return ret_error_html_str;
	}

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getMusicianNamesErrorHtmlString();

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getMusicianInstrumentsErrorHtmlString();

	if (ret_error_html_str.length > 0)
	{
		debug_msg = 'checkFlyerConcertDataAdminPrinter There were band name, musician name, instrument and or text errors';
		console.log(debug_msg);

		ret_error_html_str = 'Fehler: Daten müssen korrigiert werden' + '<br>' + '===============================' + '<br>' + '<br>' + ret_error_html_str;
	}

	if (g_user_case_str == g_user_case_printer)
	{
		ret_error_html_str = checkFlyerConcertDataPrinter(i_concert_comparison, ret_error_html_str);
	}

	return ret_error_html_str;

} // checkFlyerConcertDataAdminPrinter

// Check flyer data for a concert after login as printer
function checkFlyerConcertDataPrinter(i_concert_comparison, i_error_html_str)
{
	var debug_msg = 'checkFlyerConcertDataPrinter';
	console.log(debug_msg);

	var ret_error_html_str = '';

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getBandTextErrorHtmlString();

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getFreeTextLabelErrorHtmlString();

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getFreeTextErrorHtmlString();

	ret_error_html_str = ret_error_html_str + i_concert_comparison.getMusicianTextsErrorHtmlString();

	if (ret_error_html_str.length > 0)
	{
		debug_msg = 'checkFlyerConcertDataPrinter There were band text, free text and/or free text label errors';
		console.log(debug_msg);

		ret_error_html_str = '<br><br>' + 'Warnung: Bitte Texte überprüfen' + '<br>' + '========================' + '<br>' + '<br>' + ret_error_html_str;
	}

	ret_error_html_str = i_error_html_str + ret_error_html_str;

	return ret_error_html_str;

} // checkFlyerConcertDataPrinter

// Check ....
function checkFlyerBandData()
{
	var debug_msg = 'checkFlyerBandData The function is not yet used';
	console.log(debug_msg);

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

		// String for homepage, i.e. defining data from the season XML file
		this.m_error_homepage_str = 'Saison XML:<br>';

		// String for edit, i.e. defining data from an edit XML file
		this.m_error_edit_str = 'Flyer XML:<br>';

		// Check all concert data
		this.checkAllConcertData();
		
    } // constructor

	// Error HTML strings
	// ==================

	// Returns a description of the error in HTML format for not equal band names. 
	// Returns empty string if OK.
	getBandNameErrorHtmlString()
	{
		var ret_band_name_str = '';

		if (this.m_band_name_bool)
		{
			return ret_band_name_str;
		}

		ret_band_name_str = ret_band_name_str + '<br>';

		ret_band_name_str = ret_band_name_str + 'Bandnamen sind nicht gleich' + '<br>';

		ret_band_name_str = ret_band_name_str + this.m_error_homepage_str + this.m_band_name_homepage + '<br>';

		ret_band_name_str = ret_band_name_str + this.m_error_edit_str + this.m_band_name_edit + '<br>';

		return ret_band_name_str;

	} // getBandNameErrorHtmlString

	// Returns a description of the error in HTML format for not equal band texts. 
	// Returns empty string if OK.
	getBandTextErrorHtmlString()
	{
		var ret_band_text_str = '';

		if (this.m_band_text_bool)
		{
			return ret_band_text_str;
		}

		ret_band_text_str = ret_band_text_str + '<br>';

		ret_band_text_str = ret_band_text_str + 'Bandtexte sind nicht gleich' + '<br>';

		ret_band_text_str = ret_band_text_str + this.m_error_homepage_str + this.m_band_text_homepage + '<br>';

		ret_band_text_str = ret_band_text_str + this.m_error_edit_str + this.m_band_text_edit + '<br>';

		return ret_band_text_str;

	} // getBandTextErrorHtmlString

	// Returns a description of the error in HTML format for not equal number of musicians
	// Returns empty string if OK.
	getNumberMusiciansErrorHtmlString()
	{
		var ret_n_musicians_str = '';

		if (this.m_number_musicians_bool)
		{
			return ret_n_musicians_str;
		}

		ret_n_musicians_str = ret_n_musicians_str + '<br>';

		ret_n_musicians_str = ret_n_musicians_str + 'Anzahl Musiker ist nicht gleich' + '<br>';

		ret_n_musicians_str = ret_n_musicians_str + this.m_error_homepage_str + this.m_number_musicians_homepage.toString() + '<br>';

		ret_n_musicians_str = ret_n_musicians_str + this.m_error_edit_str + this.m_number_musicians_edit.toString() + '<br>';

		return ret_n_musicians_str;

	} // getNumberMusiciansErrorHtmlString
	
	// Returns a description of the error in HTML format for not equal free text labels
	// Returns empty string if OK.
	getFreeTextLabelErrorHtmlString()
	{
		var ret_free_text_label_str = '';

		if (this.m_flyer_label_bool)
		{
			return ret_free_text_label_str;
		}

		ret_free_text_label_str = ret_free_text_label_str + '<br>';

		ret_free_text_label_str = ret_free_text_label_str + 'Titel freier Textes sind nicht gleich' + '<br>';

		ret_free_text_label_str = ret_free_text_label_str + this.m_error_homepage_str + this.m_flyer_label_homepage + '<br>';

		ret_free_text_label_str = ret_free_text_label_str + this.m_error_edit_str + this.m_flyer_label_edit + '<br>';

		return ret_free_text_label_str;

	} // getFreeTextLabelErrorHtmlString

	// Returns a description of the error in HTML format for not equal free texts
	// Returns empty string if OK.
	getFreeTextErrorHtmlString()
	{
		var ret_free_text_str = '';

		if (this.m_flyer_text_bool)
		{
			return ret_free_text_str;
		}

		ret_free_text_str = ret_free_text_str + '<br>';

		ret_free_text_str = ret_free_text_str + 'Die freie Texte sind nicht gleich' + '<br>';

		ret_free_text_str = ret_free_text_str + this.m_error_homepage_str + this.m_flyer_text_homepage + '<br>';

		ret_free_text_str = ret_free_text_str + this.m_error_edit_str + this.m_flyer_text_edit + '<br>';

		return ret_free_text_str;

	} // getFreeTextErrorHtmlString

	// Returns a description of the error in HTML format for not equal musician names
	// Returns empty string if OK.
	getMusicianNamesErrorHtmlString()
	{
		var ret_musician_names_str = '';

		if (this.allBoolInArrayAreTrue(this.m_musicians_bool))
		{
			return ret_musician_names_str;
		}

		ret_musician_names_str = ret_musician_names_str + '<br>';

		ret_musician_names_str = ret_musician_names_str + 'Folgende Musiker-Namen sind nicht gleich:' + '<br>';

		ret_musician_names_str = ret_musician_names_str + '<br>';
		
		var n_musicians = this.m_musicians_bool.length;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var current_bool = this.m_musicians_bool[index_musician];

			if (current_bool == false)
			{
				var current_name_homepage = this.m_musicians_homepage[index_musician];
				
				var current_name_edit = this.m_musicians_edit[index_musician];
				
				ret_musician_names_str = ret_musician_names_str + this.m_error_homepage_str + current_name_homepage + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
				
				ret_musician_names_str = ret_musician_names_str + this.m_error_homepage_str + current_name_edit + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
	
			}
		}		
		
		return ret_musician_names_str;

	} // getMusicianNamesErrorHtmlString

	// Returns a description of the error in HTML format for not equal musician instrumenents
	// Returns empty string if OK.
	getMusicianInstrumentsErrorHtmlString()
	{
		var ret_musician_instruments_str = '';

		if (this.allBoolInArrayAreTrue(this.m_instruments_bool))
		{
			return ret_musician_instruments_str;
		}
		
		ret_musician_instruments_str = ret_musician_instruments_str + '<br>';
		
		ret_musician_instruments_str = ret_musician_instruments_str + 'Folgende Musiker-Instrumente sind nicht gleich:' + '<br>';

		ret_musician_instruments_str = ret_musician_instruments_str + '<br>';
		
		var n_musicians = this.m_instruments_bool.length;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var current_bool = this.m_instruments_bool[index_musician];

			if (current_bool == false)
			{
				var current_instrument_homepage = this.m_instruments_homepage[index_musician];
				
				var current_instrument_edit = this.m_instruments_edit[index_musician];
				
				ret_musician_instruments_str = ret_musician_instruments_str + this.m_error_homepage_str + current_instrument_homepage + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
				
				ret_musician_instruments_str = ret_musician_instruments_str + this.m_error_homepage_str + current_instrument_edit + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
	
			}
		}		
		
		return ret_musician_instruments_str;

	} // getMusicianInstrumentsErrorHtmlString

	// Returns a description of the error in HTML format for not equal musician texts
	// Returns empty string if OK.
	getMusicianTextsErrorHtmlString()
	{
		var ret_musician_texts_str = '';

		if (this.allBoolInArrayAreTrue(this.m_musician_texts_bool))
		{
			return ret_musician_texts_str;
		}
		
		ret_musician_texts_str = ret_musician_texts_str + '<br>';
		
		ret_musician_texts_str = ret_musician_texts_str + 'Folgende Musiker-Texte sind nicht gleich:' + '<br>';

		ret_musician_texts_str = ret_musician_texts_str + '<br>';
		
		var n_musicians = this.m_musician_texts_bool.length;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var current_bool = this.m_musician_texts_bool[index_musician];

			if (current_bool == false)
			{
				var current_text_homepage = this.m_musician_texts_homepage[index_musician];
				
				var current_text_edit = this.m_musician_texts_edit[index_musician];
				
				ret_musician_texts_str = ret_musician_texts_str + this.m_error_homepage_str + current_text_homepage + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
				
				ret_musician_texts_str = ret_musician_texts_str + this.m_error_homepage_str + current_text_edit + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
	
			}
		}		
		
		return ret_musician_texts_str;

	} // getMusicianTextsErrorHtmlString
	
	// Returns true if all elements in the input array are true
	allBoolInArrayAreTrue(i_bool_array)
	{
		var ret_all_bool = true;

		var n_elements = i_bool_array.length;

		for (var index_element=0; index_element < n_elements; index_element++)
		{
			var current_element = i_bool_array[index_element];

			if (current_element == false)
			{
				ret_all_bool = false;

				break;
			}
		}

		return ret_all_bool;

	} // allBoolInArrayAreTrue
		
	// Check all concert data
	// ======================

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