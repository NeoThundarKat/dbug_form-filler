function fillData() {
    var inputs = $('input, select');
    var missingLabels = 0;
    inputs.each(function (i) {
        var input = $(this);
        var label = $('label[for="' + input.attr('id') + '"]');

        setTimeout(function () {

            input.focus();
            if (input.attr('type') == 'text') {

                if (label.length <= 0) {
                    label = $(this).closest('label');
                    console.warn("Debug Autofiller says: the input below does not have a clear label! Finding closest label available.");
                    console.info(input);
                    missingLabels++;
                } else {
                    console.warn("Debug Autofiller says: the input below does not have a clear label, and I could not find an usable label replacement!");
                    missingLabels++;
                }

                input.val(discoverData(input.attr('type'), label.text()));
            }
            if (input.attr('type') == 'radio') {
                label.click();
            }
            if (input.attr('type') == 'checkbox') {
                input.click();
            }
            if (input.is('select')) {
                input.val(input.find('option').last().attr('value')).selectric('refresh');
            }
            console.log(missingLabels);
        }, 100 * i);
    });


    //Error Reporting
    setTimeout(function () {
        console.log("------------ ERROR REPORTING ---------")
        var errors = false;
        if (missingLabels > 0) {
            console.error("Debug Autofiller found " + missingLabels + " occurences of missing labels!");
            errors = true;
        }
        $('img').each(function () {
            $('img')
        })

        if (!errors) {
            console.info("We found no errors in your code");
        }
    }, 100 * inputs.length + 500)


}
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var today = dd + '/' + mm + '/' + yyyy;

function discoverData(type, label) {
    var searchCrit = label.toLowerCase();
    if (type == "text") {
        if (searchCrit.indexOf("first name") >= 0) {
            return "John";
        }
        if (searchCrit.indexOf("last name") >= 0 || searchCrit.indexOf("surname") >= 0) {
            return "Doe";
        }
        if (searchCrit.indexOf("date of birth") >= 0) {
            return "23/03/1996";
        }
        if (searchCrit.indexOf("postcode") >= 0) {
            return "PO12 4JH";
        }
        if (searchCrit.indexOf("house number") >= 0) {
            return "1";
        }
        if (searchCrit == "address 1") {
            return "1 Grove Road";
        }
        if (searchCrit == "address 2") {
            return "";
        }
        if (searchCrit == "city") {
            return "gosport";
        }
        if (searchCrit == "county") {
            return "hampshire";
        }
        if (searchCrit == "promo code" || searchCrit == "promotional code") {
            return "";
        }
        if (searchCrit.indexOf("contact number") >= 0 || searchCrit.indexOf("telephone") >= 0) {
            return "07876 756 645";
        }
        if (searchCrit.indexOf('email address') >= 0) {
            return "email@example.com";
        }
        if (searchCrit.indexOf('start') >= 0) {
            return today;
        }
        if (searchCrit.indexOf('price') >= 0) {
            return Math.round(Math.random() * 100);
        }

        return "dummy data";

    }
}

$(window).on('keydown', function (e) {
    var kc = e.keyCode || e.which;
    if (kc == 65 && e.ctrlKey && e.shiftKey) {
        fillData();
    }
})