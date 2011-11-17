var oSnmpRqst =  new ActiveXObject("CoreAsp.SnmpRqst");
// var myfilename = c:\oSNMPDetails["sysName"]);
// Get the device ID
var nDeviceID = Context.GetProperty("DeviceID");
// var oDate = new Date(dateStr);
// var nPollDate = parseInt(oDate.getTime());

var sdate = "";
// Create a date object.
var dt = new Date();
// Get the month, day, and year.
// sdate  += (dt.getMonth() + 1) + "/";
// sdate  += dt.getDate() + "/";
// sdate  += dt.getFullYear();

var ddate, sdate  = "";
var cdate = ":";
   ddate = new Date();
   sdate += ddate.getHours() + cdate;
   sdate += ddate.getMinutes() + cdate;
   sdate += ddate.getSeconds();
//   sdate += ddate.getSeconds() + cdate;
//   sdate += ddate.getMilliseconds();





//
// Function to get SNMP details
//
function getSnmpDetails()
{
var oResult = oSnmpRqst.Initialize(nDeviceID);
if(oResult.Failed)
{
   return null;
}
var oReturnArray = new Array();
oReturnArray["sysDescr"] = SnmpGet("1.3.6.1.2.1.1.1.0"); // sysDescr
if(oReturnArray["sysDescr"] == null)
{
   return null;
}
oReturnArray["objectID"] = SnmpGet("1.3.6.1.4.1.674.10892.1.700.20.1.6.1.1"); // objectID
// oReturnArray["sysUpTime"] = SnmpGet("1.3.6.1.2.1.1.3.0"); // sysUpTime
// oReturnArray["sysContact"] = SnmpGet("1.3.6.1.2.1.1.4.0"); // sysContact
oReturnArray["sysName"] = SnmpGet("1.3.6.1.2.1.1.5.0"); // sysName
// oReturnArray["sysLocation"] = SnmpGet("1.3.6.1.2.1.1.6.0"); // sysLocation
return oReturnArray;
}
//
// Helper function to get specific OID
//
function SnmpGet(sOid)
{
var oResult = oSnmpRqst.Get(sOid);
if(oResult.Failed)
{
   return null;
}
else
{
   return oResult.GetPayload;
}
}
//
// Get the SNMP details for the device that we passed in via the Context.
//
var oSNMPDetails = getSnmpDetails();
if(oSNMPDetails != null)
{
// Context.LogMessage( "SNMP Details");
// Context.LogMessage( " sysDescr=" + oSNMPDetails["sysDescr"]);
Context.LogMessage( "Temp is " + oSNMPDetails["objectID"]);
Context.LogMessage(sdate );

// Context.LogMessage(%System.Date & ", "&  %System.Time");



// Context.LogMessage( " sysUpTime=" + oSNMPDetails["sysUpTime"]);
// Context.LogMessage( " sysContact=" + oSNMPDetails["sysContact"]);
// Context.LogMessage( " sysName=" + oSNMPDetails["sysName"]);
// Context.LogMessage( " sysLocation=" + oSNMPDetails["sysLocation"]);
// Set success
// Context.SetResult(0, "Device is SNMP enabled." );
}

var fso = new ActiveXObject("Scripting.FileSystemObject");

var a = fso.CreateTextFile("c:\\server-temp.txt", true);

// a.WriteLine( oSNMPDetails["sysName"] + Environment.NewLine + oSNMPDetails["objectID"]);
// a.WriteLine( oSNMPDetails["sysName"] + oSNMPDetails["objectID"]);
a.WriteLine( oSNMPDetails["objectID"]); //Server Temp
a.WriteLine( oSNMPDetails["sysName"]); //server Name
// a.WriteLine( sdate); //Server Time


a.Close();

fso = new ActiveXObject("Scripting.FileSystemObject");
fso.CopyFile ("c:\\server-temp.txt", "c:\\server\\server-temp.txt")
f = fso.GetFile("c:\\server-temp.txt");
f.Delete();

// else
// {
// Set an error
// Context.SetResult(1, "Device is not SNMP enabled.");
// }