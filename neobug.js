var NeoBug = (function () {
    function insertDataIntoInput(input) {
        var label = $('label[for="' + input.attr('id') + '"]');
        input.focus();
        if (input.attr('type') == 'text') {

            if (label.length <= 0) {
                label = input.parent().parent().find('label');
                errorMessage("NeoBug says: the input below does not have a clear label! Finding closest label available...");

                if (label.length <= 0) {
                    errorMessage("NeoBug says: the input below does not have a clear label, and I could not find an usable label replacement!");
                    input.val("No Label!");
                }

                console.info(input);
            }

            input.val(discoverData(input.attr('type'), label.text()));
        }
        if (input.attr('type') == 'radio') {
            var radioGroupName = input.attr('name');
            if ($('input[name="' + radioGroupName + '"]').first().prop('checked')) {
                if (Math.random() <= .5) {
                    label.click();
                }
            } else {
                label.click();
            }

        }
        if (input.attr('type') == 'checkbox') {
            input.click();
        }
        if (input.is('select')) {
            input.val(input.find('option').last().attr('value')).selectric('refresh');
        }
    }

    var petNames = [
        "Fido",
        "Alexander",
        "Fluffy",
        "Bailey",
        "Max",
        "Charlie",
        "Buddy",
        "Bella",
        "Lucy",
        "Molly",
        "Daisy"
    ];
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

    function successMessage(msg) {
        console.log('%c ' + msg + ' ', 'background: #222; color: #7FFF00; font-size:21px;');
    }
    function errorMessage(msg) {
        console.log('%c ' + msg + ' ', 'background: #222; color: #FF6666; font-size:21px;');
    }
    function neutralMessage(msg) {
        console.log('%c ' + msg + ' ', 'background: #222; color: #FFF; font-size:21px;');
    }

    function testFormFields() {
        console.info("Neobug is filling out any available inputs, and making sure they all have a label attached to them.");
        var inputs = $('input, select');
        var missingLabels = 0;
        inputs.each(function (i) {
            var input = $(this);

            setTimeout(function () {
                insertDataIntoInput(input);
            }, 100 * i);
        });

    }


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
            if (searchCrit.indexOf("address 1") >= 0) {
                return "1 Grove Road";
            }
            if (searchCrit.indexOf("address 2") >= 0) {
                return "";
            }
            if (searchCrit.indexOf("city") >= 0) {
                return "gosport";
            }
            if (searchCrit.indexOf("county") >= 0) {
                return "hampshire";
            }
            if (searchCrit.indexOf("promo code") >= 0 || searchCrit.indexOf("promotional code") >= 0) {
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
            if (searchCrit.indexOf('price') >= 0) {
                return Math.round(Math.random() * 100);
            }
            if (searchCrit.indexOf('account holder') >= 0) {
                return "MR J R DOE";
            }
            if (searchCrit.indexOf('account number') >= 0) {
                return "12345678";
            }
            if (searchCrit.indexOf('sort code') >= 0) {
                return "11-11-11";
            }
            if (searchCrit.indexOf('reference code') >= 0) {
                return "";
            }
            if (searchCrit.indexOf('pet') >= 0 && searchCrit.indexOf('name') >= 0) {
                return petNames[Math.round(Math.random()*petNames.length)];
            }

            return "Dummy Data";

        }
    }

    function checkForImageAlts() {
        console.info("Neobug is testing all your images for alt tags.")
        var missingAlts = 0;
        $('img').each(function () {
            if ($(this).attr('alt') == "" || typeof $(this).attr('alt') == 'undefined') {
                console.warn("NeoBug says: this image does not have an alt tag!");
                missingAlts++;
            }
        })

        if (missingAlts > 0) {
            errorMessage("NeoBug found " + missingAlts + " images missing alt tags!");
        } else {
            successMessage("All images have an alt attribute!");
        }

        return missingAlts;
    }

    function checkForHtmlLangAttribute() {
        console.info("Neobug is testing to ensure that your html tag has a language attribute attached");
        if ($('html').attr('lang') == "" || typeof $('html').attr('lang') === 'undefined') {
            errorMessage("Neobug found that your HTML element does not contain a lang tag!");
        }
    }

    function checkForEmptyLinks() {
        var errors = 0;
        $('a').each(function () {
            if ($(this).text() == "") {
                errors++;
                $(this).css('border', '1px solid red');
            }
        })
        if (errors > 0) {
            errorMessage("NeoBug found " + errors + " a tags without text inside them!");
        }
    }

    function checkForTagValidity() {
        var errors = 0;
        if ($('strike').length > 0) {
            errorMessage("The <strike> tag is used " + $('strike').length + " times! Consider using <del> or <ins>");
            errors++;
        }
        if ($('b').length > 0) {
            errorMessage("The <b> tag is used " + $('b').length + " times! Consider using <strong>")
            errors += $('b').length;
        }
        if ($('i').length > 0) {
            errorMessage("The <i> tag is used " + $('i').length + " times! Consider using <em>")
            errors += $('i').length
        }
        if ($('[style]').length > 0) {
            errorMessage("Try not to use inline styling! We found " + $('[style]').length + " occurances of this.");
            errors++;
        }
        if ($('blink').length > 0 || $('marquee').length > 0) {
            errorMessage("Please burn this website. No <blink> or <marquee> tags. Ever.");
            errors++;
        }
        if (errors <= 0) {
            successMessage("All tags are valid!");
        }
        
    }

    function run() {
        neutralMessage('---------NEOBUG IS NOW ANALYSING--------- ');
        testFormFields();
        checkForImageAlts();
        checkForHtmlLangAttribute();
        checkForEmptyLinks();
        checkForTagValidity();
    }

    var publicApi = {
        run: run
    };

    return publicApi;
})();



$(window).on('keydown', function (e) {
    var kc = e.keyCode || e.which;
    if (kc == 65 && e.ctrlKey && e.shiftKey) {
        NeoBug.run();
    }
})
