// Start a list that holds the fields
var emptyFields = [];

// Traverse the form fields
for (var i=0; i<this.numFields; i++) {

    // Get each field name
    var thisField = this.getField(this.getNthFieldName(i));

    // When a field is not a button and is marked mandatory
    if (thisField.type!="button" && thisField.required ) {

        // If the field is empty, add it to the list
        if ((thisField.type=="text" && thisField.value=="")
        || (thisField.type=="checkbox" && thisField.value=="Off")
        || (thisField.type=="combobox" && thisField.value==" ")
        || (thisField.type=="listbox" && thisField.value==" "))
        emptyFields.push(thisField.name);
     }
}

// If there are empty fields captured in the list
if (emptyFields.length>0) {

    // String them together and display an alert
    app.alert("Please fill in the following mandatory fields:\n\n" + emptyFields.join("\n"));

// Otherwise submit the form as a preformatted email
} else {

    // Field used in the Subject line or body - replace "FIELD 1" with your Field Name
    var firstField = this.getField("FIELD 1").value;

    // Field used in the Subject line or body - replace "FIELD 2" with your Field Name
    var secondField = this.getField("FIELD 2").value;

    // Send to this email address - hardcode it here or retrieve from a field
    var toAddress = "YourEmail@YourWebsite.ca"

    // (Optional) CC this email address - replace "EMAIL FIELD" with your Field Name
    // Validate the email field with with this code: if (event.value) event.rc = eMailValidate(event.value);
    var ccAddress = this.getField("EMAIL FIELD").value;

    // Customize the Subject line of the email message
    var subjectLine = "Form submission: " + firstField + ", " + secondField

    // Customize the body text of the email message
    var msgBody = "A form has been submitted." + "\n\n" + "Field #1: " + firstField + "\n" + "Field #2: " + secondField

    // Send the entire PDF as a file attachment in an email
    this.mailDoc({bUI: true, cTo: toAddress, cCc: ccAddress, cSubject: subjectLine, cMsg: msgBody});

}