// File: FlyerChecks.js
// Date: 2022-04-12
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

	displayButtonCheckFixBandData();

	var concert_comparison = new FlyerConcertComparisonData(g_current_concert_number);

	var error_html_str = getFlyerConcertDataAdminPrinterHtmlString(concert_comparison);

	if (error_html_str.length > 0)
	{
		debug_msg = 'checkFlyerConcertData There were errors returned from getFlyerConcertDataAdminPrinterHtmlString';
		console.log(debug_msg);

		var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

		element_div_display_band_data.innerHTML = error_html_str;

		displayDivDisplayCheckBandData();
	}

} // checkFlyerConcertData

// Check flyer data for a concert after login as Administrator, Tester or Printer
// The function returns an HTML string describing the error. Empty string if all is OK.
function getFlyerConcertDataAdminPrinterHtmlString(i_concert_comparison)
{
	var debug_msg = 'Enter getFlyerConcertDataAdminPrinterHtmlString Concert number= ' + i_concert_comparison.m_concert_number.toString();
	console.log(debug_msg);

	var ret_error_html_str = '';

	if (g_user_case_str == g_user_case_printer)
	{
		ret_error_html_str = i_concert_comparison.getFlyerConcertDataPrinterErrorHtmlString();
	}
	else
	{
		ret_error_html_str = i_concert_comparison.getFlyerConcertDataAdminErrorHtmlString();
	}

	return ret_error_html_str;

} // getFlyerConcertDataAdminPrinterHtmlString

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

		// Flag telling if the order of musicians has changed
		this.m_order_musicians_unchanged_bool = null;

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
		this.m_error_homepage_str = 'Daten Website:<br>';

		// String for homepage, i.e. defining data from the season XML file
		this.m_error_homepage_2_str = 'Daten Website';

		// String for edit, i.e. defining data from an edit XML file
		this.m_error_edit_str = 'Daten Flyer:<br>';

		// String for edit, i.e. defining data from an edit XML file
		this.m_error_edit_2_str = 'Daten Flyer';

		// String for string comparison result
		this.m_compare_result_str = 'Die letzten Zeichen die gleich sind: ';

		// Error string band names are not equal
		this.m_error_band_name = 'Bandnamen sind nicht gleich';

		// Error string band texts are not equal
		this.m_error_band_text = 'Bandtexte sind nicht gleich';

		// Error string number of musicians is not equal
		this.m_error_number_musicians = 'Anzahl Musiker ist nicht gleich';

		// Error string titles for the free text are not equal
		this.m_error_title_free_text = 'Titel freier Texte sind nicht gleich';

		// Error string free texts are not equal
		this.m_error_free_text = 'Die freie Texte sind nicht gleich';

		// Error string musician names are not equal
		this.m_error_musician_names = 'Folgende Musiker-Namen sind nicht gleich:';

		// Error string musician instruments are not equal
		this.m_error_musician_instruments = 'Folgende Musiker-Instrumente sind nicht gleich:';

		// Error string musician texts are not equal
		this.m_error_musician_texts = 'Folgende Musiker-Texte sind nicht gleich:';

		// Error string first character of the compare strings are not equal
		this.m_error_first_char = 'Erstes Zeichen ist nicht gleich';

		// Error string order of musician names is not equal
		this.m_error_order_musicians = 'Musikernamen Reihenfolge ist nicht gleich';

		// Administrator errors header
		this.m_error_admin_errors = 'Fehler die korrigiert werden müssen';
		this.m_error_admin_underl = '============================';
		this.m_error_admin_errors_2 = 'Bitte Check/Fix Button klicken, aber vorher mit Admin->Flyer Saisonprogramm exportieren.';

		// Printer errors header
		this.m_error_edit_errors = 'Warnung: Website und Flyer Texte sind nicht gleich';
		this.m_error_edit_underl = '=======================================';
		this.m_error_edit_errors_2 = 'Bitte als Administrator Texte mit Admin->Flyer importieren (oder Flyer Texte ändern)'

		// The number of displayed equal characters compairing two strings
		this.m_compare_string_number = 35;

		// Check all concert data
		this.checkAllConcertData();
		
    } // constructor

	// Status functions
	// ================

	// Returns true if no comparison errors were found 
	noComparisonErrors()
	{
		var ret_status_all = true;

		if (!this.noAdminComparisonErrors())
		{
			ret_status_all = false;
		}

		if (!this.noEditComparisonErrors())
		{
			ret_status_all = false;
		}

		return ret_status_all;

	} // noComparisonErrors

	// Returns true if there are no admin (homepage) errors
	// These are the texts that are written in Admin and set on the Homepage.
	// Admin exports these texts from the Homepage to the Flyer application.
	noAdminComparisonErrors()
	{
		var ret_status_admin = true;

		if (!this.bandNameNoError())
		{
			ret_status_admin = false;
		}

		if (!this.numberMusiciansNoError())
		{
			ret_status_admin = false;
		}

		if (!this.musicianNamesNoError())
		{
			ret_status_admin = false;
		}

		if (!this.musicianInstrumentsNoError())
		{
			ret_status_admin = false;
		}

		return ret_status_admin;
		
	} // noAdminComparisonErrors	

	// Returns true if there are no edit (flyer) errors
	// These are the texts that are written with the Flyer application 
	// and that are imported by Admin to the Homepage 
	noEditComparisonErrors()
	{
		var ret_status_edit = true;

		if (!this.bandTextNoError())
		{
			ret_status_edit = false;
		}

		if (!this.labelFreeTextNoError())
		{
			ret_status_edit = false;
		}

		if (!this.freeTextNoError())
		{
			ret_status_edit = false;
		}

		if (!this.musicianTextsNoError())
		{
			ret_status_edit = false;
		}

		return ret_status_edit;
		
	} // noEditComparisonErrors

	// Returns true if the band names are equal
	bandNameNoError()
	{
		return this.m_band_name_bool;

	} // bandNameNoError

	// Returns true if the band texts are equal
	bandTextNoError()
	{
		return this.m_band_text_bool;

	} // bandTextNoError

	// Returns true if the free text labels are equal
	labelFreeTextNoError()
	{
		return this.m_flyer_label_bool;

	} // labelFreeTextNoError

	// Returns true if the free texts are equal
	freeTextNoError()
	{
		return this.m_flyer_text_bool;

	} // freeTextNoError

	// Returns true if the number of musicians is equal
	numberMusiciansNoError()
	{
		return this.m_number_musicians_bool;

	} // numberMusiciansNoError

	// Returns true if the order of musicians is equal
	orderMusiciansNoError()
	{
		return this.m_order_musicians_unchanged_bool;

	} // orderMusiciansNoError

	// Returns true if the musician names equal
	musicianNamesNoError()
	{
		var ret_names = true;

		if (!this.numberMusiciansNoError())
		{
			ret_names = false;

			return ret_names;
		}

		for (var index_name=0; index_name < this.m_musicians_bool.length; index_name++)
		{
			if (!this.m_musicians_bool[index_name])
			{
				ret_names = false;

				break;
			}
		}

		return ret_names;

	} // musicianNamesNoError

	// Returns true if the musician instruments equal
	musicianInstrumentsNoError()
	{
		var ret_instruments = true;

		if (!this.numberMusiciansNoError())
		{
			ret_instruments = false;

			return ret_instruments;
		}

		for (var index_instrument=0; index_instrument < this.m_instruments_bool.length; index_instrument++)
		{
			if (!this.m_instruments_bool[index_instrument])
			{
				ret_instruments = false;

				break;
			}
		}

		return ret_instruments;

	} // musicianInstrumentsNoError

	// Returns true if the musician texts equal
	musicianTextsNoError()
	{
		var ret_texts = true;

		if (!this.numberMusiciansNoError())
		{
			ret_texts = false;

			return ret_texts;
		}

		for (var index_text=0; index_text < this.m_musician_texts_bool.length; index_text++)
		{
			if (!this.m_musician_texts_bool[index_text])
			{
				ret_texts = false;

				break;
			}
		}

		return ret_texts;

	} // musicianTextsNoError

	// Error HTML strings
	// ==================

	// Returns an HTML string if there were errors for the Administrator
	getFlyerConcertDataAdminErrorHtmlString()
	{
		var ret_error_html_str = '';

		var error_header = this.m_error_admin_errors + '<br>' + this.m_error_admin_underl + '<br>' + '<br>' + 
		this.m_error_admin_errors_2 + '<br>' + '<br>';
	
		ret_error_html_str = ret_error_html_str + this.getBandNameErrorHtmlString();
	
		var error_number_musician_str = this.getNumberMusiciansErrorHtmlString();
	
		ret_error_html_str = ret_error_html_str + error_number_musician_str;
	
		if (error_number_musician_str.length > 0)
		{
			return error_header + ret_error_html_str;
		}

		ret_error_html_str = ret_error_html_str + this.getOrderOfMusiciansErrorHtmlString();
	
		ret_error_html_str = ret_error_html_str + this.getMusicianNamesErrorHtmlString();
	
		ret_error_html_str = ret_error_html_str + this.getMusicianInstrumentsErrorHtmlString();
	
		if (ret_error_html_str.length > 0)
		{
			var debug_msg = 'getFlyerConcertDataAdminErrorHtmlString There were band name, musician name, instrument and or text errors';
			console.log(debug_msg);
	
			ret_error_html_str = error_header + ret_error_html_str;
		}

		return ret_error_html_str;
		
	}  // getFlyerConcertDataAdminErrorHtmlString

	// Checks flyer data for a concert after login as printer and returns error HTML string 
	getFlyerConcertDataPrinterErrorHtmlString()
	{
		var debug_msg = 'getFlyerConcertDataPrinterErrorHtmlString';
		console.log(debug_msg);

		var ret_error_html_str = '';

		ret_error_html_str = ret_error_html_str + this.getBandTextErrorHtmlString();

		ret_error_html_str = ret_error_html_str + this.getFreeTextLabelErrorHtmlString();

		ret_error_html_str = ret_error_html_str + this.getFreeTextErrorHtmlString();

		ret_error_html_str = ret_error_html_str + this.getMusicianTextsErrorHtmlString();

		if (ret_error_html_str.length > 0)
		{
			debug_msg = 'getFlyerConcertDataPrinterErrorHtmlString There were band text, free text and/or free text label errors';
			console.log(debug_msg);

			var error_header = '<br><br>' + this.m_error_edit_errors + '<br>' + this.m_error_edit_underl + '<br>' + '<br>' + 
										    this.m_error_edit_errors_2 + '<br>' + '<br>';

			ret_error_html_str = error_header + ret_error_html_str;
		}

		ret_error_html_str = this.getFlyerConcertDataAdminErrorHtmlString() + ret_error_html_str; 

		return ret_error_html_str;

	} // getFlyerConcertDataPrinterErrorHtmlString

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

		ret_band_name_str = ret_band_name_str + this.m_error_band_name + '<br>';

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

		ret_band_text_str = ret_band_text_str + this.m_error_band_text + '<br>';

		ret_band_text_str = ret_band_text_str + this.m_error_homepage_str + this.m_band_text_homepage + '<br><br>';

		ret_band_text_str = ret_band_text_str + this.m_error_edit_str + this.m_band_text_edit + '<br><br>';

		ret_band_text_str = ret_band_text_str + this.getBandTextCompareString() + '<br><br>';

		return ret_band_text_str;

	} // getBandTextErrorHtmlString

	// Returns substring with the last characters that were equal for the band texts. 
	// Returns empty string if OK.
	getBandTextCompareString()
	{
		var sub_str = this.compareStrings(this.m_band_text_homepage, this.m_band_text_edit, this.m_compare_string_number);
		
		return  this.m_compare_result_str + '"' + sub_str + '"';

	} // getBandTextCompareString

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

		ret_n_musicians_str = ret_n_musicians_str + this.m_error_number_musicians + '<br><br>';

		ret_n_musicians_str = ret_n_musicians_str + this.m_error_homepage_str + 'Anzahl ' + this.m_number_musicians_homepage.toString() + '<br><br>';

		for (var index_homepage=0; index_homepage < this.m_number_musicians_homepage; index_homepage++)
		{
			ret_n_musicians_str = ret_n_musicians_str + this.m_musicians_homepage[index_homepage] + ' ' + 
					this.m_instruments_homepage[index_homepage] + ' Musiker '  +  (index_homepage + 1).toString() + '<br>'; 
		}

		ret_n_musicians_str = ret_n_musicians_str + '<br>'; 

		ret_n_musicians_str = ret_n_musicians_str + this.m_error_edit_str + 'Anzahl ' + this.m_number_musicians_edit.toString() + '<br><br>';

		for (var index_homepage=0; index_homepage < this.m_number_musicians_edit; index_homepage++)
		{
			ret_n_musicians_str = ret_n_musicians_str + this.m_musicians_edit[index_homepage] + ' ' + 
								this.m_instruments_edit[index_homepage] + ' Musiker '  +  (index_homepage + 1).toString() + '<br>'; 
		}

		return ret_n_musicians_str;

	} // getNumberMusiciansErrorHtmlString

	// Returns a description of the error in HTML format for not equal number of musicians
	// Returns empty string if OK.
	getOrderOfMusiciansErrorHtmlString()
	{
		var ret_order_musician_str = '';

		if (this.m_order_musicians_unchanged_bool)
		{
			return ret_order_musician_str;
		}

		ret_order_musician_str = ret_order_musician_str + '<br>';

		ret_order_musician_str = ret_order_musician_str + this.m_error_order_musicians + '<br>';

		var n_musicians = this.m_musicians_homepage.length;

		for (var index_musician=-1; index_musician < n_musicians; index_musician++)
		{
			if (-1 == index_musician)
			{
				ret_order_musician_str = ret_order_musician_str + this.m_error_homepage_2_str + '&nbsp;&nbsp;&nbsp;&nbsp;' + this.m_error_edit_2_str + '<br>';
			}
			else
			{
				var current_name_homepage = this.m_musicians_homepage[index_musician];
			
				var current_name_edit = this.m_musicians_edit[index_musician];
				
				ret_order_musician_str = ret_order_musician_str + current_name_homepage + '&nbsp;&nbsp;&nbsp;&nbsp;';
				
				ret_order_musician_str = ret_order_musician_str + current_name_edit + '&nbsp;&nbsp;&nbsp;&nbsp;';

				ret_order_musician_str = ret_order_musician_str  + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
			}
	
		}

		return ret_order_musician_str;

	} // getOrderOfMusiciansErrorHtmlString
	
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

		ret_free_text_label_str = ret_free_text_label_str + this.m_error_title_free_text + '<br>';

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

		ret_free_text_str = ret_free_text_str + this.m_error_free_text + '<br>';

		ret_free_text_str = ret_free_text_str + this.m_error_homepage_str + this.m_flyer_text_homepage + '<br><br>';

		ret_free_text_str = ret_free_text_str + this.m_error_edit_str + this.m_flyer_text_edit + '<br><br>';

		ret_free_text_str = ret_free_text_str + this.getFreeTextCompareString() + '<br>';

		return ret_free_text_str;

	} // getFreeTextErrorHtmlString

	// Returns substring with the last characters that were equal for the free texts 
	// Returns empty string if OK.
	getFreeTextCompareString()
	{
		var sub_str = this.compareStrings(this.m_flyer_text_homepage, this.m_flyer_text_edit, this.m_compare_string_number);
		
		return  this.m_compare_result_str + '"' + sub_str + '"';

	} // getFreeTextCompareString	

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

		ret_musician_names_str = ret_musician_names_str + this.m_error_musician_names + '<br>';

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
				
				ret_musician_names_str = ret_musician_names_str + this.m_error_edit_str + current_name_edit + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
	
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
		
		ret_musician_instruments_str = ret_musician_instruments_str + this.m_error_musician_instruments + '<br>';

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
				
				ret_musician_instruments_str = ret_musician_instruments_str + this.m_error_edit_str + current_instrument_edit + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br>';
	
			}
		}		
		
		return ret_musician_instruments_str;

	} // getMusicianInstrumentsErrorHtmlString

	// Returns a description of the error in HTML format for not equal musician texts
	// Returns empty string if OK.
	getMusicianTextsErrorHtmlString()
	{
		var ret_musician_texts_str = '';

		if (this.m_musician_texts_bool == null)
		{
			return ret_musician_texts_str;
		}

		if (this.allBoolInArrayAreTrue(this.m_musician_texts_bool))
		{
			return ret_musician_texts_str;
		}
		
		ret_musician_texts_str = ret_musician_texts_str + '<br>';
		
		ret_musician_texts_str = ret_musician_texts_str + this.m_error_musician_texts + '<br>';

		ret_musician_texts_str = ret_musician_texts_str + '<br>';
		
		var n_musicians = this.m_musician_texts_bool.length;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var current_bool = this.m_musician_texts_bool[index_musician];

			if (current_bool == false)
			{
				var current_text_homepage = this.m_musician_texts_homepage[index_musician];
				
				var current_text_edit = this.m_musician_texts_edit[index_musician];

				var sub_str = this.compareStrings(current_text_homepage, current_text_edit, this.m_compare_string_number);
				
				ret_musician_texts_str = ret_musician_texts_str + this.m_error_homepage_str + current_text_homepage + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br><br>';
				
				ret_musician_texts_str = ret_musician_texts_str + this.m_error_edit_str + current_text_edit + ' (Musiker ' + (index_musician+1).toString() + ')' + '<br><br>';

				ret_musician_texts_str = ret_musician_texts_str + this.m_compare_result_str + '"' + sub_str + '"' + '<br>';
	
			}
		}		
		
		return ret_musician_texts_str;

	} // getMusicianTextsErrorHtmlString

	// Utility functions
	// =================

	// Returns a substring with the last characters that were equal
	// An empty substring is returned if the strings are equal
	compareStrings(i_admin_str, i_edit_str, i_n_substring)
	{
		var ret_substring = '';

		var equal_bool = true;

		var n_admin_str = i_admin_str.length;

		var n_edit_str = i_edit_str.length;

		var n_end = n_admin_str;

		if (n_edit_str > n_admin_str)
		{
			n_end = n_edit_str;
		}

		for (var index_char=0; index_char < n_end; index_char++)
		{
			var admin_char = '';

			if (index_char < n_admin_str)
			{
				admin_char = i_admin_str[index_char];
			}

			var edit_char = '';

			if (index_char < n_edit_str)
			{
				edit_char = i_edit_str[index_char];
			}

			if (admin_char == edit_char)
			{
				ret_substring = this.appendCompareSubstring(admin_char, ret_substring, i_n_substring);
			}
			else
			{
				equal_bool = false;

				break;
			}

		} // index_char

		if (equal_bool)
		{
			return '';
		}
		else if (!equal_bool && ret_substring.length == 0)
		{
			return this.m_error_first_char;
		}
		else
		{
			return ret_substring;
		}

	} // compareStrings

	// Append to compare substring
	appendCompareSubstring(i_char, i_substring, i_n_substring)
	{
		var ret_substring = '';

		if (i_substring.length < i_n_substring)
		{
			ret_substring = i_substring + i_char;
		}
		else
		{
			ret_substring = i_substring.substring(1) + i_char;
		}

		return ret_substring;

	} // appendCompareSubstring
	
	// Returns true if all elements in the input array are true
	allBoolInArrayAreTrue(i_bool_array)
	{
		var i_dum = 1;

		if (i_bool_array == null)
		{
			i_dum = 2;

			return;
		}

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
	
		this.flyerNumberOfMusiciansIsEqual();
	
		this.flyerMusicianNamesAreEqual();

		this.orderOfMusiciansIsUnChanged(); // Must be called after flyerNumberOfMusiciansIsEqual and flyerMusicianNamesAreEqual

		this.flyerMusicianInstrumentsAreEqual();
		
		this.flyerMusicianTextsAreEqual();
	
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

		if (band_name_homepage.trim() == band_name_edit.trim())
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

		if (band_text_homepage.trim() == band_text_edit.trim())
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

		if (flyer_label_homepage.trim() == flyer_label_edit.trim())
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

		if (flyer_text_homepage.trim() == flyer_text_edit.trim())
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

    // Returns true if order of musicians not has changed
	orderOfMusiciansIsUnChanged()
    {
		if (!this.numberMusiciansNoError())
		{
			return null;
		}

        var ret_order_not_changed = true;

        for (var index_website=0; index_website < this.m_musicians_bool.length; index_website++)
		{
            var name_website = this.m_musicians_homepage[index_website];

            var index_order = -1;

            for (var index_flyer=0; index_flyer < this.m_musicians_bool.length; index_flyer++)
            {
                var name_flyer = this.m_musicians_edit[index_flyer];

                if (name_website == name_flyer)
                {
                    index_order = index_flyer;
                }

            } // index_flyer

            // index_order= - 1 means that name is missing
            if (index_website != index_order && index_order >= 0)
            {
                ret_order_not_changed = false;
            }
            else if (index_order < 0 && this.m_musicians_bool[index_website])
            {
                alert("orderOfMusiciansIsUnChanged Name not found and bool is true");
            }

        } // index_website

		this.m_order_musicians_unchanged_bool = ret_order_not_changed;

		if (!ret_order_not_changed)
		{
			var debug_msg = 'FlyerConcertComparisonData.orderOfMusiciansIsUnChanged Musician names are not equal';
			console.log(debug_msg);
		}

        return ret_order_not_changed;

    } // orderOfMusiciansIsUnChanged

	// Returns an array with booleans telling if the musician name is equal or not
	// in the season program XML file and the edit XML file
	flyerMusicianNamesAreEqual()
	{
		var debug_msg = '';

		var b_admin = true;

		var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

		b_admin = false;

		var musicians_edit = getFlyerMusicianNamesArray(b_admin);

		this.m_musicians_homepage = musicians_homepage;

		this.m_musicians_edit = musicians_edit;

		if (musicians_homepage.length != musicians_edit.length)
		{
			debug_msg = 'FlyerConcertComparisonData.flyerMusicianNamesAreEqual Not the same number of musicians. Names only set';
			console.log(debug_msg);

			return null;
		}

		var n_musicians = musicians_homepage.length;

		var ret_musicians_bool = [];

		var debug_bool = true;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var musician_homepage = musicians_homepage[index_musician];

			var musician_edit = musicians_edit[index_musician];

			if (musician_homepage.trim() == musician_edit.trim())
			{
				ret_musicians_bool[index_musician] = true;
			}
			else
			{
				ret_musicians_bool[index_musician] = false;

				debug_bool = false;
			}

		} // index_musician

		this.m_musicians_bool = ret_musicians_bool;

		if (!debug_bool)
		{
			debug_msg = 'FlyerConcertComparisonData.flyerMusicianNamesAreEqual Musician names are not equal';
			console.log(debug_msg);
		}

		return ret_musicians_bool;

	} // flyerMusicianNamesAreEqual

	// Returns an array with booleans telling if the musician instrument is equal or not
	// in the season program XML file and the edit XML file
	flyerMusicianInstrumentsAreEqual()
	{
		var debug_msg = '';

		var b_admin = true;

		var instruments_homepage = getFlyerMusicianInstrumentsArray(b_admin);

		b_admin = false;

		var instruments_edit = getFlyerMusicianInstrumentsArray(b_admin);

		this.m_instruments_homepage = instruments_homepage;

		this.m_instruments_edit = instruments_edit;

		if (instruments_homepage.length != instruments_edit.length)
		{
			debug_msg = 'FlyerConcertComparisonData.flyerMusicianInstrumentsAreEqual Not the same number of musicians. Instruments only set';
			console.log(debug_msg);

			return null;
		}

		var n_musicians = instruments_homepage.length;

		var ret_instruments_bool = [];

		var debug_bool = true;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var instrument_homepage = instruments_homepage[index_musician];

			var instrument_edit = instruments_edit[index_musician];

			if (instrument_homepage.trim() == instrument_edit.trim())
			{
				ret_instruments_bool[index_musician] = true;
			}
			else
			{
				ret_instruments_bool[index_musician] = false;

				debug_bool = false;
			}

		} // index_musician

		this.m_instruments_bool = ret_instruments_bool;

		if (!debug_bool)
		{
			debug_msg = 'FlyerConcertComparisonData.flyerMusicianInstrumentsAreEqual Musician instruments are not equal';
			console.log(debug_msg);
		}

		return ret_instruments_bool;

	} // flyerMusicianInstrumentsAreEqual

	// Returns an array with booleans telling if the musician text is equal or not
	// in the season program XML file and the edit XML file
	flyerMusicianTextsAreEqual()
	{
		var debug_msg = '';

		var b_admin = true;

		var musician_texts_homepage = getFlyerMusicianTextsArray(b_admin);

		b_admin = false;

		var musician_texts_edit = getFlyerMusicianTextsArray(b_admin);

		this.m_musician_texts_homepage = musician_texts_homepage;

		this.m_musician_texts_edit = musician_texts_edit;

		if (musician_texts_homepage.length != musician_texts_edit.length)
		{
			debug_msg = 'FlyerConcertComparisonData.flyerMusicianTextsAreEqual Not the same number of musicians. Texts only set';
			console.log(debug_msg);

			return null;
		}

		var n_musicians = musician_texts_homepage.length;

		var ret_musician_texts_bool = [];

		var debug_bool = true;

		for (var index_musician=0; index_musician < n_musicians; index_musician++)
		{
			var musician_text_homepage = musician_texts_homepage[index_musician];

			var musician_text_edit = musician_texts_edit[index_musician];

			if (musician_text_homepage.trim() == musician_text_edit.trim())
			{
				ret_musician_texts_bool[index_musician] = true;
			}
			else
			{
				ret_musician_texts_bool[index_musician] = false;

				debug_bool = false;
			}

		} // index_musician

		this.m_musician_texts_bool = ret_musician_texts_bool;

		if (!debug_bool)
		{
			debug_msg = 'FlyerConcertComparisonData.flyerMusicianTextsAreEqual Musician texts are not equal';
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
///////////////////////// Start Hide And Display Comparison Results  //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////// End Hide And Display Comparison Results  ////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////