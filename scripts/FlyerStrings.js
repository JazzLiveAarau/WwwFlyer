// File: FlyerStrings.js
// Date: 2021-05-28
// Author: Gunnar Lidén

// File content
// =============
// Menus, titles, messages, identities, ....
// (Fonts and text sizes are defined in the CSS file corresponding to the HTM file) 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Tooltips Strings //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_tooltip_application_header = 
"(Verborgen)" + "<br>" + 
"Für jedes Konzert gibt es ein Flyer." + "<br>" +
"Mit dieser Web-Applikation wird der Flyer kreiert und gedruckt." + "<br>" +
"Bandtext und MusikerInnenbios werden von den Musikern erfasst.";

var g_tooltip_login_dropdown = 
"Bandnummer wählen und Passwort eingeben." + "<br>" +
"Bitte JAZZ <i>live</i> AARAU kontaktieren, falls kein Passwort vorhanden ist.";

var g_tooltip_season_dropdown = 
"(Verborgen)" + "<br>" + 
"Saison wählen.";

var g_tooltip_concert_dropdown = 
"(Verborgen)" + "<br>" + 
"Konzert wählen.";

var g_tooltip_text_input_case_dropdown = 
"(Verborgen)" + "<br>" + 
"Bandtext, MusikerInnenbios oder Freier Text (nur Administrator) wählen";

var g_tooltip_text_input = 
"Bitte Text eingeben." + "<br>" +
"Warnung falls Text zu lang.";

var g_tooltip_bandname_text = "Kann nicht geändert werden";

var g_tooltip_instrument_text = 
"(Pogrammierungsproblem! Wird nicht gezeigt. TODO)" + "<br>" +
"Kann nicht geändert werden";

var g_tooltip_active_mode = 
"Zwei Textdatenquellen für den Flyer:" + "<br>" + 
"- Server mit Texten, von Admin gespeichert" + "<br>" + 
"- XML Dateien mit Texten, von dieser Applikation erfasst" + "<br>" + 
"Datenquelle wechseln mit Linksklick";

var g_tooltip_musician_dropdown = 
"(Verborgen)" + "<br>" + 
"Musiker wählen";

var g_tooltip_password_dropdown = "Passwörter für Login Namen ändern";

var g_tooltip_display_boundaries = 
"Für Probedruck können Begrenzungslinien gezeigt werden." + "<br>" + 
"Mit oder ohne Linien mit Linksklick wechseln.";

var g_tooltip_create_pdf_files = 
"Druckdaten der Flyer sind zwei PDF-Dateien (Vorder- und Rückseite)." + "<br>" + 
"Die Flyer werden in einer Druckerei gedruckt und die Breite und" + "<br>" +
"Höhe der PDF-Datei sind genau vorgeschrieben." + "<br>" +
"Beim Klicken werden zwei solche PDF Dateien zum Anschauen kreiert." + "<br>" +
"Die Qualität (Auflösung) dieser zwei PDF Dateien genügt aber nicht." + "<br>" +
"Wie man PDF-Dateien für die Druckerei generiert ist im Handbuch" + "<br>" +
"(Drucker Hilfe) beschrieben.";

var g_tooltip_display_hide_cutting_lines = 
"Mit oder ohne Schnittlinien drucken" + "<br>" + 
"(Für Druckerei printline mit Schnittlinien drucken.)";


var g_tooltip_parameter_names = 
[
	"g_tooltip_application_header", 
	"g_tooltip_login_dropdown",
	"g_tooltip_season_dropdown",
	"g_tooltip_concert_dropdown",
	"g_tooltip_text_input_case_dropdown",
	"g_tooltip_text_input",
	"g_tooltip_bandname_text",
	"g_tooltip_instrument_text",
	"g_tooltip_active_mode",
	"g_tooltip_musician_dropdown",
	"g_tooltip_password_dropdown",
	"g_tooltip_display_boundaries",
	"g_tooltip_create_pdf_files",
	"g_tooltip_display_hide_cutting_lines"
]


var g_tooltip_parameter_values = 
[
	g_tooltip_application_header, 
	g_tooltip_login_dropdown,
	g_tooltip_season_dropdown,
	g_tooltip_concert_dropdown,
	g_tooltip_text_input_case_dropdown,
	g_tooltip_text_input,
	g_tooltip_bandname_text,
	g_tooltip_instrument_text,
	g_tooltip_active_mode,
	g_tooltip_musician_dropdown,
	g_tooltip_password_dropdown,
	g_tooltip_display_boundaries,
	g_tooltip_create_pdf_files,
	g_tooltip_display_hide_cutting_lines
]

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Tooltips Strings ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Header Strings ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_text_application_header = "JAZZ <i>live</i> AARAU Flyer - Texteingabetool für MusikerInnen";

var g_text_application_header_admin = "JAZZ <i>live</i> AARAU Flyer - Administrator Funktionen";

var g_text_application_header_tester = "JAZZ <i>live</i> AARAU Flyer - Test Funktionen";

var g_text_application_header_printer = "JAZZ <i>live</i> AARAU Flyer - Drucker Funktionen";

var g_text_logo = "JAZZ <i>live</i> AARAU";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Header Strings //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Dropdown Strings //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Dropdown concert
var g_dropdown_concert = "Konzert ";

// Names for the text array
var g_label_text_short_text = "Bandtext";
var g_label_text_musician_text = "MusikerInnenbios";
var g_label_text_additional_text = "Freier Text";

var g_label_login_name = "Login Name";

var g_label_login_passwords = "Login Passwörter";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Dropdown Strings ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Message Strings ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Data for this concert has not yet been copied by the Admin Application
var g_msg_concert_data_not_yet_copied =
"Keine Konzertdaten vorhanden, Texterfassung nicht möglich."+ "\r\n" + 
"Bitte JAZZ live AARAU kontaktieren.";

var g_msg_number_rows_bandname_short_text =
"Warnung!" + "\r\n" + "Bandtext ist zu lang.";

var g_msg_number_rows_bandname_short_text_maximum =
"Maximale Zeilenanzahl ist ";

var g_msg_size_bandname_short_text_maximum =
"Maximale Grösse (Millimeter) ist ";

var g_msg_number_musician_rows_exceeded =
"Maximale Gesamtzeilenanzahl überschritten!" + "\r\n" + 
"Folgende MusikerInnenbios erscheinen nicht auf Flyer:" + "\r\n";

var g_msg_free_text_exceeded =
"Zu viele Zeilen für den freien Text!";

var g_msg_number_musician_rows_exceeded_free_text =
"Text für maximum sechs (6) MusikerInnen können momentan erfasst werden." + "\r\n" + 
"Bitte Bios für folgende MusikerInnen separat schreiben und per E-Mail übermitteln:" + "\r\n";

var g_msg_parameter_names = 
[
	"g_msg_concert_data_not_yet_copied",
	"g_msg_number_rows_bandname_short_text",
	"g_msg_number_rows_bandname_short_text_maximum",
	"g_msg_size_bandname_short_text_maximum",
	"g_msg_number_musician_rows_exceeded",
	"g_msg_free_text_exceeded",
	"g_msg_number_musician_rows_exceeded_free_text"
]

var g_msg_parameter_values = 
[
	g_msg_concert_data_not_yet_copied,
	g_msg_number_rows_bandname_short_text,
	g_msg_number_rows_bandname_short_text_maximum,
	g_msg_size_bandname_short_text_maximum,
	g_msg_number_musician_rows_exceeded,
	g_msg_free_text_exceeded,
	g_msg_number_musician_rows_exceeded_free_text
]

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Message Strings /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Error Messages  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Error message: Password is not valid
var g_err_msg_not_a_valid_password = "Passwort ist ungültig";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Error Messages  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Label Strings /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


var g_label_concert = "Konzert: ";
var g_label_date = "Datum: ";
var g_label_short_descr = "Bandtext";
var g_label_band_name = "Bandname";
var g_label_musician_name = "Musikername";
var g_label_instrument = "Instrument";
var g_label_musician_text = "MusikerInnenbio";
var g_label_additional_text_header = "Titel";
var g_label_additional_text = "Freier Text";

var g_label_active_mode_xml_edit = "Daten Flyer";
var g_label_active_mode_xml_admin = "Daten Web/App";

var g_label_boundaries_not_displayed = "Ohne Begrenzungslinien";
var g_label_boundaries_displayed = "Mit Begrenzungslinien";

var g_label_cutting_lines_not_displayed = "Ohne Schnittlinien";
var g_label_cutting_lines_displayed = "Mit Schnittlinien";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Label Strings ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Caps Strings //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_cap_create_pdf_files = "Test-Druckdaten";

var g_cap_logout_str = "Logout";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Caps Strings ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

