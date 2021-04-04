// File: FlyerSave.js
// Date: 2019-05-16
// Author: Gunnar Lidén

// File content
// =============
// Functions for saving XML Edit (or other) files on the server



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Save Function  ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Save the current XML Edit object to file
function saveXmlEditObjectToFile()
{
	if (g_flyer_application_mode != "EditXml")
	{
		alert("saveXmlEditObjectToFile Save of XML Edit file only allowed in mode EditXml");
		
		return;
	}
	
	var edit_xml_object = getSeasonXmlObjectForActiveMode();
	
	var xml_content_str = xmlToString(edit_xml_object);
	
	var file_name_path = g_xml_edit_file_names[g_current_concert_number-1];
	
    if (!saveFileWithJQueryPostFunction(file_name_path, xml_content_str))
	{
		alert("saveXmlEditObjectToFile Saving XML Edit file failed");
	}
	
} // saveXmlEditObjectToFile



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Save Function  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Save User Password XML  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Save the users-passwords XML file on the server
function saveXmlUserPasswordObjectToFile()
{
    if (null == g_name_users_passwords_xml)
	{
	    alert("saveXmlUserPasswordObjectToFile XML object g_name_users_passwords_xml is null");
	}
	
	var xml_content_str = xmlToString(g_name_users_passwords_xml);
	
	var file_name_path = getFileNamePathUserNamesPasswords();
	
    if (!saveFileWithJQueryPostFunction(file_name_path, xml_content_str))
	{
		alert("saveXmlUserPasswordObjectToFile Saving XML Edit file failed");
	}
	
} // saveXmlUserPasswordObjectToFile


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Save User Password XML  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Basic Save File Function  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Save a file with the JQuery function "post"
// Please refer to SaveFileOnServer.php for a detailed description of "post"
// Input parameter i_file_name is the server file name
// Input parameter i_content_string is the content of the file
// The function returns false for failure
function saveFileWithJQueryPostFunction(i_file_name, i_content_string)
{
    $.post
      ("SaveFileOnServer.php",
        {
          file_content: i_content_string,
          file_name: i_file_name
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of SaveFileOnServer.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // saveFileWithJQueryPostFunction


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Basic Save File Function  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Content XML File  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Convert XML object to string
function xmlToString(i_xml_object)
{
	// https://www.dotnettricks.com/learn/javascript/convert-string-to-xml-and-xml-to-string-using-javascript
	
    //code for IE
    if (window.ActiveXObject) 
    {
       var out_xml_str = i_xml_object.xml; return out_xml_str;
    } 
    // code for Chrome, Safari, Firefox, Opera, etc.
    else 
    {
       return (new XMLSerializer()).serializeToString(i_xml_object);
    }
	
 } // xmlToString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Content XML File  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////